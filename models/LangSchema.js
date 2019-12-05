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
mongoose.models = {};
let Lang = mongoose.model("zfont", LangSchema,"languages");
module.exports = Lang;
