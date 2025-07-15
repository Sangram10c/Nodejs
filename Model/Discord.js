const mongoose = require('mongoose');

const DiscordSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    role:{
        type:String
    }

});
module.exports = mongoose.model('Discord',DiscordSchema)