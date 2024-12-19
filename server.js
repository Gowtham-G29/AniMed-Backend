const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'.env'});


const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection is establised !");
}).catch((err)=>{
    console.log('Err',err);
})



const app=require('./app');

const port=process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`App running on the ${port}`);
})