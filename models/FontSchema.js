const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FontSchema = new Schema(
    {
        title: {
            type: String
        },
        url: {
            type: String
        },
        is_new:{
            type: String
        },
        size:{
            type: String
        },
        thumbnail: {
            type: String
        },
        author: {
            type: String
        },
        designer: {
            type: String
        },
        count: {
            type: String
        },
        language: {
            type: String
        }
    },
    {
        timestamps: true
    });

let Font = mongoose.model("zFont", FontSchema);
module.exports = Font;
