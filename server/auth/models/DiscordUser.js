const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    discordId: {type: String, required: true}, 
    username:  {type: String, required: true},
    avatar:  {type: String, required: true},
    role: {type: String, required: true},
    minecraft: {type: String, required: false}
})

const DiscordUser = module.exports = mongoose.model('User', userSchema);
