const Font = require("./models/FontSchema"),
    Lang = require("./models/LangSchema"),
    font_db = require("./db/font_db"),
    express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app)
io = require('socket.io').listen(server);


app.get('/', (req, res) => {
    if (req.query.title != null) {
        console.log("Add Font");
        addFontFromGet(req.query);
    } else if (req.query.lang != null) {
Lang.find({}).then(lang => {
res.send(lang);
    });
    } else if (req.query.font != null) {
        Font.find({}).then(font => {
            res.send(font);
        });
    }


    font_db.then(db => {
        Font.find({},
            function (err, docs) {
                if (err) return res.send(err);
                res.send(docs);
            });

        if (req.query.delete != null) {
            Font.deleteMany({}, function (err) {
                console.log("Remove: " + err);
            })
        }
    });
});

function getFontById(id) {
    Font.findOne({ _id: id }, {
        in: 0,
        t: 0,
        c: 0,
    }).then(font => {
        io.emit('font_details', font);
    });
}

function loadFonts() {
    Font.find({"$where": "function() { return this.l.toString() == 1 || this.l.toString() == 2 || this.l.toString() == 0 || this.l.toString() == 9 }"}).then(font => {
        io.emit('load_fonts', font);
    });
}

function loadFontsByLanguage(lang) {
    Font.find({ "$where": "function() { return this.language.toString() == "+lang+" }" }).then(font => {
        io.emit('load_done_by_lang', lang, font);
    });
}

function loadLangs() {
Lang.find({}).then(lang => {
        io.emit('load_langs', lang);
    });
}

function updateFont(id, mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage) {
    var font = { n: mTitle, u: mUrl, in: mNew, s: mSize, t: mThumbnail, a: mAuthor, d: mDesigner, c: "1", l: mLanguage };
    for (let key in font) {
        if (font[key] == "") {
            delete font[key];
        }
    }

    Font.findOneAndUpdate(id, font, { new: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        loadFonts(); return console.log('Updated: ' + mTitle);
    });
}


function updateCount(id, mCount) {
    var font = { count: mCount };
    Font.findOneAndUpdate(id, font, { new: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        loadFonts(); getFontById(id); return console.log('Updated: ' + mTitle);
    });
}

function addFont(mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage) {
    let font = new Font({ n: mTitle, u: mUrl, in: mNew, s: mSize, t: mThumbnail, a: mAuthor, d: mDesigner, c: "1", l: mLanguage });
    font.save().then(() => {
        console.log(mTitle + " : " + mLanguage);
        loadFonts();
    }).catch((e) => {
        console.log('There was an error', e.message);
    });
}

function addFontFromGet(data) {
    let font = new Font(data);
    font.save().then(() => {
        console.log(data.title + " : " + data.language);
        loadFonts();
    }).catch((e) => {
        console.log('There was an error', e.message);
    });
}

function addLang(mId, mName) {
    let lang = new Lang({ name: mName, id: mId });
    lang.save().then(() => {
        console.log(mName + " : Saved");
        loadLangs();
    }).catch((e) => {
        console.log('There was an error', e.message);
    });
    lang.save();
}

io.on('connection', (socket) => {

    socket.on('open', function (userNickname) {
        console.log(userNickname + " : has open the app ");
        loadFonts();
        loadLangs();
    });


    socket.on('load_fonts', function (userNickname) {
        loadFonts();
    });

    socket.on('load_fonts_by_lang', function (userNickname, lang) {
        loadFontsByLanguage(lang);
    });

    socket.on('load_langs', function (userNickname) {
        loadLangs();
    });


    socket.on('update_font', (id, mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage) => {
        updateFont(id, mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage);
    });

    socket.on('get_font_detail', (id) => {
        getFontById(id);
    });

    socket.on('add_font', (mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage) => {
        addFont(mTitle, mUrl, mNew, mThumbnail, mSize, mAuthor, mDesigner, mLanguage)
    });

    socket.on('add_lang', (mId, mName) => {
        addLang(mId, mName);
    });

    socket.on('update_count', (mId, mCount) => {
        updateCount(mId, mCount);
    });

    socket.on('disconnect', function () {
        console.log(' user has left ')
        socket.broadcast.emit("userdisconnect", " user has left ")
    });

});


server.listen(3001, () => {
    console.log('Node app is running on port 3001');

});

