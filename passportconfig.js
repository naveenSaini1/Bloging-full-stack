const LocalStrategy=require('passport-local').Strategy;
const Login=require('./db/models/login')
const initializingPassport=(passport)=>{
    passport.use(new LocalStrategy( async(username,password,done)=>{
   try{
    const user=await Login.findOne({username});
    if(!user) return done(null,false);

    if(user.password!==password) return done(null,false);
    // console.log(user)
    return done(null,user); 
   }
   catch(E){
    return done(E,false)
   }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })
    passport.deserializeUser(async (id,done)=>{
        try{
            const user =await Login.findById(id);
            done(null,user);
            
        }
        catch(e){
            done(e,false);
        }
    });

}

const isAuth=(req,res,next)=>{
    if(req.user) return next();
    res.redirect('/login');
}

module.exports={initializingPassport,isAuth};


