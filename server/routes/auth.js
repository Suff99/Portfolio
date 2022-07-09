const router = require('express').Router();
const { json } = require('express');
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');
const isDev = require('../util');

router.get('/discord', passport.authenticate('discord'));


router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect(process.env.REDIRECT_URL);
});


// TODO, design page that mounts the response and saves it to discord logged in user 
router.get('/minecraft', isAuthorized, (req, res) => {

    let code = req.query.mcAuth;

    if (code == null) {
        res.redirect('https://mc-auth.com/oAuth2/authorize?client_id=2868706533640766525&redirect_uri=' + process.env.REDIRECT_URL + '&response_type=code');
    } else {

        fetch('https://mc-auth.com/oAuth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                code: code,
                client_id: '2868706533640766525',
                client_secret: "9EnglkTh.2872291224964826184.H4sZ",
                redirect_uri: process.env.REDIRECT_URL,
                grant_type: 'authorization_code'
            })
        })
            .then((response) => response.json()).then(async resp => {

                const user = await DiscordUser.findOne({
                    discordId: req.user.discordId
                });

                if (resp.data != null) {
                    if (!user.minecraft.length > 0) {
                        user.minecraft = resp.data.uuid;
                        console.log('Updated User');
                        user.save();
                    }
                }
                res.redirect(isDev() ? 'http://localhost:3000/#/u/dashboard' : 'https://mc.craig.software/#/u/dashboard');
            })
    }
});

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect(process.env.REDIRECT_URL);
    });
});

router.get('/', (req, res) => {

    if (req.user) {
        res.send(req.user);
    } else {
        res.status(401).send({ msg: 'unauthorised' })
    }
});


function isAuthorized(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;

