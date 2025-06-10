const express= require('express');
const cors= require('cors');
require('dotenv')

const app= express();

//Middlewares

app.use(cors());
app.use(express.json());

//Routes

app.get('/',(req,res)=>{
    res.send("StreamMap is working")
});

module.exports=app;