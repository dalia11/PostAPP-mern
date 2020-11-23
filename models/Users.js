
const mongoose = require('mongoose')

const Users = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "superuser"]
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type:String,
    }
});

module.exports = mongoose.model('Users', Users);