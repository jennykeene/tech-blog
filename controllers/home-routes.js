//this file will contain all of the user-facing routes such as the homepage & login
// import models
const { User, Post, Comment } = require('../models');
//create router as an Express module
const router = require('express').Router();
//connect to sequelize
const sequelize = require('../config/connection');

// homepage rendering (user not logged in)
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post-text',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                } 
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        res.status(500).json(err);
    })
})
// after login page

// signing up page

// see post up close page


// export router module to be loaded by controllers/index.js
module.exports = router;