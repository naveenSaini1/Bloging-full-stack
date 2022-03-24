const mongoose=require('mongoose');
const slug=require('slugify');
const bgSchema=new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
        unique:true,
    }

})

bgSchema.pre('validate',function(){
    if(this.title){
        this.link=slug(this.title,{lower:true,
        strict:true})
    }
})

const Blog=mongoose.model("BLOG",bgSchema);
module.exports=Blog;
