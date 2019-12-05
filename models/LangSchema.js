const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LangSchema = new Schema(
    {
        name: {
            type: String
        },
        id: {
            type: String
        }
    },
    {
        timestamps: true
    });

let Lang = mongoose.model("languages", LangSchema,"zfont");
module.exports = Lang;
