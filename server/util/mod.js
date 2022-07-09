const { MongoClient } = require('mongodb');


const projectIds = [{id: 291249}, {id: 401678}, {id: 290247}, {id: 274275}, {id: 450434}, {id: 345190}, {id: 392383}, {id: 449238}, {id: 310076}, {id: 306294}, {id: 366127}, {id: 470487}, {id: 411719}, {id: 221939, contributionMsg: 'My contribution to this mod was adding support for Minecrafts Slim Player Model Design and updating its animation system to a modern framework'}];


var minutes = 20, the_interval = minutes * 60 * 1000;
setInterval(function () {
    wipeModsDb();
    for (let index = 0; index < projectIds.length; index++) {
        const element = projectIds[index];
        processMod(element)
    }
}, the_interval);

function wipeModsDb() {
    MongoClient.connect(process.env.MONGODB, function (err, db) {
        if (err) throw err;
        var dbo = db.db("minecraft_mods");
        dbo.collection("mods").remove({}, function (err, numberRemoved) {
            console.log('Cleared remote mod data');
        });
    });
}

wipeModsDb();
for (let index = 0; index < projectIds.length; index++) {
    const element = projectIds[index];
    console.log(element)
    processMod(element)
}



async function processMod(project) {

    await fetch('https://api.cfwidget.com/' + project.id).then((response) => response.json()).then(res => {


        // Collect Mod Versions with MC versions latest files
        let modVersions = [];
        Object.entries(res.versions).map(([key, value]) => {
            modVersions.push({ file: value[0], version: key });
        });

        let authors = [];
        res.members.map((data) => {
            authors.push(data);
        });

        // Initial Data for mod
        fetch('https://api.curseforge.com/v1/mods/' + project.id, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': process.env.CURSEFORGE
            }
        }).then((response) => response.json()).then(res => {
            console.log('Loading mod: ' + res.data.name)
            MongoClient.connect(process.env.MONGODB, function (err, db) {

                if (err) throw err;

                var dbo = db.db("minecraft_mods");
                dbo.collection("mods").createIndex({ id: 1 });


                const finalMod = {
                    title: res.data.name,
                    slug: res.data.slug,
                    summary: res.data.summary,
                    downloads: res.data.downloadCount,
                    categories: res.data.categories,
                    screenshots: res.data.screenshots,
                    classId: res.data.classId,
                    dateCreated: res.data.dateCreated,
                    dateReleased: res.data.dateReleased,
                    website: res.data.links.websiteUrl,
                    versionFiles: modVersions,
                    logo: res.data.logo.url,
                    curseId: res.data.id,
                    authors: res.data.authors,
                    contributionMsg: project.contributionMsg
                }

                dbo.collection("mods").insertOne(finalMod, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        })

    })

}