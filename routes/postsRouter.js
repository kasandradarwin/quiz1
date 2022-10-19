const express = require('express');
const knex = require('../db/client');
const cookieParser = require('cookie-parser');

const router = express.Router()

router.get('/', (req,res) => {
    knex('posts')
    .orderBy('created_at', 'desc')
    .then(posts => {
      let username=req.cookies.username;
      res.render('posts/', {posts: posts, username:username})
    })
  })


  // render new post page
router.get('/new',(req,res) => {
  let username=req.cookies.username;
    res.render('posts/new',{username:username})
  })


 

  //create new post
  router.post('/new', (req,res) => {
    let username=req.cookies.username;
    knex('posts')
      .insert({
        username: req.body.username,
        image_url: req.body.image_url,
        content: req.body.content,
        created_at: req.body.created_at,
       
      })
      .returning('*')
      .then(posts => {
        const post = posts[0]
        res.redirect('/posts/')
      })
  })

 

    module.exports = router;