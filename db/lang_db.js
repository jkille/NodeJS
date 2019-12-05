const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  url  =  "mongodb://localhost:27017/langs";
const  lang_db  =  mongoose.connect(url, { useNewUrlParser: true  ,useUnifiedTopology: true});
module.exports  =  lang_db;