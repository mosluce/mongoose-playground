const mongoose = require('mongoose');
const {Schema} = mongoose;
const {plugin} = require('../libs/database');

let schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: '(沒有內容)'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.plugin(plugin);

module.exports.Post = mongoose.model('Post', schema);