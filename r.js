const  Font  = require("./models/FontSchema"),
connect  = require("./db");

connect.then(db => {
	Font.find({}).then(font => {
	console.log(font);
});
});
