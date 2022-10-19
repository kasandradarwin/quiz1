const express = require('express');
const router = express.Router()
// const cookieParser = require('cookie-parser');
// router.use(cookieParser())

// router.use(express.urlencoded({extended: true}))

// const methodOverride = require("method-override")

// router.use(methodOverride((req, res) => {
//     if(req.body && req.body._method) {
//         const method = req.body._method;
//         return method
//     }
// }))


router.use((req, res, next) =>  {
    const username = req.cookies.username

    res.locals.username = '';

    if(username){
        res.locals.username = username;
        console.log(`Signed in as ${username}`)
    }
    next();

})

router.get('/signin', (req, res) => {
    res.render('users/signin')

})

router.get('',(req,res)=>{
    let username=req.cookies.username
    console.log(username)
    res.render('posts/index',{username:username})
})

router.post('/signin', (req, res) => {

    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 
    const username = req.body.username
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/posts')
})

//sign out post request
router.post('/signout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/posts');
})

module.exports = router;
