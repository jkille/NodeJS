const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FontSchema = new Schema(
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

let Font = mongoose.model("Lang", FontSchema);
module.exports = Font;
