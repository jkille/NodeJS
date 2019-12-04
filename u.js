const  Font  = require("./models/FontSchema"),
connect  = require("./db");

let font = new Font({title : "Title",url:"URL",is_new: "1",thumbnail:"Thumbnail",author:"zFont",
designer:"zFont",count: "1"});
console.log(font.newData);
