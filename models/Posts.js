
const mongoose = require('mongoose')

const Posts = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    token:{
        type: String
    }
});

module.exports = mongoose.model('Posts',Posts);