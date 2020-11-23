const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')


const token = uuid.v4();

router.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({ msg: 'username or password can not be empty' })
        }
        else {
            //check username exist
            const user = await Users.findOne({ username: req.body.username });
            if (!user) {
                res.status(400).send({ msg: "username doesn't exist" })
            } else {
                //check matchig password
                const isMatch = bcrypt.compare(req.body.password, user.password)
                if (isMatch) {
                    // let token = jwt.sign({
                    //     user_id:user._id,
                    //     role:user.role,
                    //     username:user.username,
                    // })
                    // let result = {
                    //     username:user.username,
                    //     token:token,
                    // }
                    // res.json(result)
                    res.json(user.token)
                } else {
                    res.send({ msg: "wrong password" })
                }
            }



        }
    } catch (error) {
        res.status(400).send({ msg: "couldn't login" })
    }
})
module.exports = router;