const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')


const token = uuid.v4();
//validate username already exist or no
const validateUsername = async (name) => {
    let user = await Users.findOne({ username: name });
    if (user) {
        return false;
    } else {
        return true;
    }
}
//Registration user
router.post('/', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.confirm || !req.body.email) {
            res.status(400).send({ msg: 'fields can not be empty' })
        } else {
            let validation = await validateUsername(req.body.username)
            if (!validation) {
                res.status(400).send({ msg: 'username already exist' })
            } else if (req.body.password !== req.body.confirm) {
                res.status(400).send({ msg: "Passwords don'nt match" })
            }
            else {
                //get hashed password
                const hashedpw = await bcrypt.hash(req.body.password, 12)
                const newUser = new Users({
                    username: req.body.username,
                    password: hashedpw,
                    email: req.body.email,
                    role: "user",
                    token: token,
                })
                newUser.save()
                    .then(data => {
                        res.json(token)
                    })
            }

        }
    } catch (error) {
        res.status(400).send({ msg: 'could not create account' })
    }



})
module.exports = router;