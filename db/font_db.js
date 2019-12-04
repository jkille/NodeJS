const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  url  =  "mongodb://localhost:27017/font";
const  font_db  =  mongoose.connect(url, { useNewUrlParser: true  ,useUnifiedTopology: true});
module.exports  =  font_db;