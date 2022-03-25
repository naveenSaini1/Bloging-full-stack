const express=require('express');
const download =require('image-downloader');
const path=require('path');
const Blog=require('../db/models/articals');
const router=express.Router();
const Login=require('../db/models/login')
const expressSession=require('express-session');
const passport=require("passport")
const cloudnary=require('cloudinary').v2;
cloudnary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET,
  });
const {initializingPassport ,isAuth}=require('../passportconfig');
initializingPassport(passport);

router.post('/login',passport.authenticate('local',{successMessage:'/',failureRedirect:"/login" }),(req,res)=>{
    res.redirect('/')
});
router.get('/new',isAuth,async(req,res)=>{
    const user=await Blog.find()
    res.render('new',{data:user});
})

router.post('/new',isAuth,async(req,res)=>{

    const user= await Blog.findOne({title:req.body.title});
    if(user) return res.send('blog already exists')
    if(!user){
        const file=req.files.img;
        cloudnary.uploader.upload(file.tempFilePath,(err,result)=>{
            const newuser=new Blog({
                img:result.url,
                title:req.body.title,
                content:req.body.content,
            });
            newuser.save()
            .then((data)=>{
                res.redirect('/')
            })
            .catch((e)=>{
                res.send(e);
            })
        })


    }

})

router.get('/',async(req,res)=>{
    const user=await Blog.find()
    res.render('img',{data:user});
})

// login 
router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/ragi',(req,res)=>{
    res.render('ragi');
})


router.post('/ragi',(req,res)=>{
    const log= new Login(req.body);
    log.save()
    .then((data)=>{
        res.redirect('/')
    })
    .catch((e)=>{
        res.redirect('/');
    })
})

router.get('/page/:name',async(req,res)=>{
    try{
        const count=Number(req.params.name);
    let index=(count*3)-3;
    

    const user=await Blog.find().sort({"date":-1}).skip(count).limit(3)
    const lengthfor=await Blog.find()
    res.render('home',{data:user,len:lengthfor});
    }
    catch(e){
        res.redirect('/');
    }
})
router.get('/:link',async(req,res)=>{
    try{
        const user =await Blog.findOne({link:req.params.link});
    res.render('read-more',{data:user});
    }
    catch(e){
        res.redirect('/')
    }
    
})

module.exports=router;