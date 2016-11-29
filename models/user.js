const mongoose = require('mongoose');
const {Schema} = mongoose;
const {plugin} = require('../libs/database');

let settingsSchema = new Schema({
    email: String
});

let schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        default: '使用者'
    },
    setting: settingsSchema
});

schema.plugin(plugin);

module.exports.User = mongoose.model('User', schema);