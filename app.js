const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride=require('method-override')
const logger = require('morgan');


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 
// app.set('views','views')

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(logger('dev'));


const userRouter = require('./routes/user')
app.use('/user',userRouter);

const postsRouter = require('./routes/postsRouter')
app.use('/posts',postsRouter);

app.get('/', (req,res) => {

    res.redirect('posts')
  })


const ADDRESS = 'localhost';
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});
