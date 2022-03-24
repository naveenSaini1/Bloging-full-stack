const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('dataBase connected');
})
.catch((e)=>{
    console.log(e);
})