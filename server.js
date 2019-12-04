const Font = require("./models/FontSchema"),
    Lang = require("./models/LangSchema"),
    font_db = require("./db/font_db"),
    lang_db = require("./db/lang_db"),
    express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app)
io = require('socket.io').listen(server);
app.get('/', (req, res) => {

    font_db.then(db => {
        Font.find({}).then(font => {
            res.send(font);
        });
    });

    //Read
    // connect.then(db => {
    //     Font.find({}).then(font => {
    //         res.send(font);
    //     });
    // });

    // let font = { title: "NEW_TITLE2"};
    // Font.findOneAndUpdate('5de7475760fe41009da1a747', font, { new: true }, function (err, doc) {
    //     if (err) return res.send(500, { error: err });
    //     return res.send('Succesfully saved.');
    // });
});


io.on('connection', (socket) => {
    socket.on('open', function (userNickname) {
        console.log(userNickname + " : has open the app ");

        Font.find({}, { title: 1 }).then(font => {
            io.emit('useropentheapp', font);
        });

        Lang.find({}).then(lang => {
            io.emit('lang', lang);
        });
    });

    socket.on('update_font', (id, mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage) => {
        var font = { title: mTitle, url: mUrl, is_new: mNew, size: mSize, thumbnail: mThumbnail, author: mAuthor, designer: mDesigner, count: "1", language: mLanguage };
        for (let key in font) {
            if (font[key] == 1) {
                delete font[key];
            }
        }

        Font.findOneAndUpdate(id, font, { new: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return console.log('Updated: '+mTitle);
        });

        
    });

    socket.on('add_font', (mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage) => {
        let font = new Font({ title: mTitle, url: mUrl, is_new: mNew, size: mSize, thumbnail: mThumbnail, author: mAuthor, designer: mDesigner, count: "1", language: mLanguage });
        font.save();
        console.log(mTitle + " : Saved");
    });

    socket.on('add_lang', (mId, mName) => {
        let lang = new Lang({ name: mName, id: mId });
        lang.save();
        console.log(name + " : Saved");
    });

    socket.on('disconnect', function () {
        console.log(' user has left ')
        socket.broadcast.emit("userdisconnect", " user has left ")
    });

});


server.listen(3000, () => {

    console.log('Node app is running on port 3000');

});
