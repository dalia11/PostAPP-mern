const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const Posts = require('../../models/Posts')

router.get('/',async  (req, res) => {
    try {
        const tok =  req.headers.authorization
        const posts = await Posts.find({token: tok}); //.limit
         res.json(posts)

    } catch (error) {
        res.status(400).send({ msg: 'Network error' })
    }
})

router.post('/', (req, res) => {
    const newPost = new Posts({
        title: req.body.title,
        token: req.headers.authorization
    })

    if (!req.body.title) {
        res.status(400).send({ msg: 'please insert a title' })
    } else {
        newPost.save()
            .then(data => {
                res.json(data)
            })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.updateOne(
            {_id: req.params.id},
            {$set:{title: req.body.title}})
            const posts = await Posts.find();
            res.json(posts)
    } catch (error) {
        res.status(400).json({ msg: `no post with id = ${req.params.id}` }) //bad request 400
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.remove({_id:  req.params.id});
        const posts = await Posts.find();
        res.json(posts)

    } catch (error) {
        res.status(400).json({ msg: `no post with id = ${req.params.id}` }) //bad request 400
    }

})

module.exports = router;