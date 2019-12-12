const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LangSchema = new Schema(
    {
        "banner": {
          "type": "String"
        },
        "interstitial": {
          "type": "String"
        },
        "rewarded": {
          "type": "String"
        },
        "sponsor": {
          "type": "String"
        },
        "show_ad_limit": {
          "type": "Number"
        },
        "admob": {
          "type": "Boolean"
        },
        "img": {
          "type": "String"
        },
        "font": {
          "type": "String"
        },
        "lang": {
          "type": [
            "Mixed"
          ]
        },
        "rooted": {
          "type": [
            "Mixed"
          ]
        },
        "featured": {
          "type": [
            "Mixed"
          ]
        }
      },
    {
        timestamps: true
    });
mongoose.models = {};
let Lang = mongoose.model("zfont", LangSchema,"constants");
module.exports = Lang;

