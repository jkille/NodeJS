const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FontSchema = new Schema(
    {
        n: {
            type: String
        },
        u: {
            type: String
        },
        in:{
            type: Boolean,
            default: false
        },
        s:{
            type: String
        },
        t: {
            type: String
        },
        a: {
            type: String,
            default:''
        },
        d: {
            type: String,
            default:''
        },
        c: {
            type: String,
            default: '0'
        },
        l: {
            type: String
        }
    },
    {
        timestamps: true
    });

mongoose.models = {};
let Font = mongoose.model("zfont", FontSchema,"fonts");
module.exports = Font;
