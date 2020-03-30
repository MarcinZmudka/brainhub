const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
let dataSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})
module.exports = dataSchema =  mongoose.model("dataModel", dataSchema);