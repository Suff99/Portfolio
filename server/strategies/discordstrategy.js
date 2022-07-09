const DiscordAuthStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if(user){
        done(null, user);
    }
})

passport.use(new DiscordAuthStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {

    try {
        const user = await DiscordUser.findOne({
            discordId: profile.id
        });

        if(user){
            user.avatar = profile.avatar;
            user.username = profile.username;
            user.save();
            done(null, user);
        } else {
            const newUser = await DiscordUser.create({discordId: profile.id, username: profile.username, avatar: profile.avatar, role: 'casual', minecraft: ''});
            const saveduser = await newUser.save();
            done(null, saveduser);
        }

    } catch (err) {
        console.log('Error' + err)
        done(err, null);
    }
}))