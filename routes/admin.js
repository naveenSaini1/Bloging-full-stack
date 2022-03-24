const express=require('express');
const router=express.Router();
const Blog=require('../db/models/articals');
const app=express();
app.use(express.static('public'));
app.use('/uploads',express.static(__dirname+'../public/uploads'))

router.get('/read-more/:link',async(req,res)=>{
    try{
        const user =await Blog.findOne({link:req.params.link});
    res.render('read-more',{data:user});
    }catch(e){
        res.redirect('/');
    }
    
})
router.get('/del/:link',async(req,res)=>{
    const user=await Blog.findOneAndDelete({link:req.params.link});
    res.redirect('/new');
})
router.get('/edit/:link',async(req,res)=>{

    const user=await Blog.findOne({link:req.params.link});

    res.render('edit',{data:user});
})
router.post('/edit/:link',async (req,res)=>{
    
    const updateUser=await Blog.updateOne({link:req.params.link},{img:req.body.img,title:req.body.title,content:req.body.content});
    res.redirect('/new');
})









module.exports=router;