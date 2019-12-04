const Font = require("./models/FontSchema"),
    connect = require("./db"),
    express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app)
io = require('socket.io').listen(server);
app.get('/', (req, res) => {
    res.send('Succesfully!');
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
        connect.then(db => {
            Font.find({}).then(font => {
                socket.broadcast.emit('useropentheapp', font);
            });
        });
    });


    socket.on('messagedetection', (senderNickname, messageContent) => {

        //log the message in console 

        console.log(senderNickname + " :" + messageContent)
        //create a message object 
        let message = { "message": messageContent, "senderNickname": senderNickname }
        // send the message to the client side  
        io.emit('message', message);

    });


    socket.on('disconnect', function () {
        console.log(' user has left ')
        socket.broadcast.emit("userdisconnect", " user has left ")

    });



});





server.listen(3000, () => {

    console.log('Node app is running on port 3000');

});
