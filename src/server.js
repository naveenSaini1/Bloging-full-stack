require('dotenv').config();
const express=require('express');

const path=require('path')
// router es =====
const router=require('../routes/articals');
require('../db/main');
const Login=require('../db/models/login')
const expressSession=require('express-session');
const passport=require("passport")
const {initializingPassport ,isAuth}=require('../passportconfig');
const Blog=require('../db/models/articals')
const fileUpload=require('express-fileupload');
const app=express();
app.use(fileUpload({
    useTempFiles:true,
}))
app.use(express.urlencoded({extended:false}));
app.use(express.json())
const port=process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'../public')));
app.use('/uploads',express.static(__dirname+'../public/uploads'))
app.set('view engine','ejs');app.use(expressSession({
    secret:process.env.SEC,
    resave:false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',router);
app.use('/new',isAuth,require('../routes/admin'));
app.get('*',(rea,res)=>{
    res.redirect('/');
})


app.listen(port,()=>{
    console.log('port listning on 3000');
})