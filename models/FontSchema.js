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
            type: Boolean,
            default: false
        },
        size:{
            type: String
        },
        thumbnail: {
            type: String
        },
        author: {
            type: String,
            default:'zFont'
        },
        designer: {
            type: String,
            default:'zFont'
        },
        count: {
            type: String,
            default: '0'
        },
        language: {
            type: String
        }
    },
    {
        timestamps: true
    });

mongoose.models = {};
let Font = mongoose.model("zfont", FontSchema,"fonts");
module.exports = Font;