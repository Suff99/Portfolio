

function isDev() {
    return false;
}



// Twitch
const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT,
    client_secret: process.env.TWITCH_SECRET
});

async function getTwitchUser(loginName) {
    const users = await twitch.getUsers(loginName);
    const user = users.data[0];
    return user;
}


// CurseForge
const headers = {
    'Accept':'application/json',
    'x-api-key': process.env.CURSEFORGE
  };
  
  fetch('https://api.curseforge.com/v1/games/432',
  {
    method: 'GET',
  
    headers: headers
  })
  .then(function(res) {
      return res.json();
  }).then(function(body) {
      console.log(body);
  });
  

module.exports = {isDev, getTwitchUser};
