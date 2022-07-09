const router = require('express').Router();
const { MongoClient } = require('mongodb');

function isAuthorized(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function isAdminAuthorized(req, res, next) {
    if (req.user) {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.send(200);
})

router.get('/get-mods', (req, res) => {
    MongoClient.connect(process.env.MONGODB, function (err, db) {
        db.db("minecraft_mods").collection("mods")
            .find()
            .toArray()
            .then((docs) => res.json({ data: docs }))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });
})

const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT,
    client_secret: process.env.TWITCH_SECRET
});


async function getUser(loginName) {
    const users = await twitch.getUsers(loginName);
    const user = users.data[0];
    return user;
}

router.get('/twitch', async (req, res) => {

    if (!req.query.user) {
        res.json({ message: 'Missing username!' })
    } else {
        await getUser(req.query.user).then(data => {
            res.json(data)
        })
    }
})

router.get('/add-skin', isAdminAuthorized, (req, res) => {
    addSkin(req.query.downloadUrl, req.query.skinName, req.query.destination, req.query.author_uuid, req.query.author_link);
    res.json({ message: 'added' })
})

function addSkin(downloadUrl, skinName, destination, author_uuid, author_link) {
    MongoClient.connect(process.env.MONGODB, function (err, db) {
        if (err) throw err;
        var dbo = db.db("minecraft_mods");
        var myobj = { url: downloadUrl, name: skinName, destination: destination, isSlim: destination.includes('alex'), author: { uuid: author_uuid, link: author_link } };

        dbo.collection("skins").createIndex({ name: 1 });

        dbo.collection("skins").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("Inserted Skin: " + skinName + " with url " + downloadUrl);
            db.close();
        });
    });
}


module.exports = router;
