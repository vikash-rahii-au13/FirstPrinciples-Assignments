const mongoose = require('mongoose')
const NODE_ENV = process.env.NODE_ENV || "production";
require('dotenv').config({ path: '.env.'+NODE_ENV });
//connecting database
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
    });
    
    mongoose.connection.on('connected',()=>{
        console.log("database connected")
    });
    
    //(error handling ) when errors will be occur
    mongoose.connection.on('error', (err)=>{
        console.log("err connecting",err)
    });
    