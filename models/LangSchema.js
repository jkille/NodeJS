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

let Lang = mongoose.model("langs", LangSchema,'languages');
module.exports = Lang;
