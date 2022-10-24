const express=require("express");
const mongoose=require("mongoose");


const app=express();

require("./config/db")(mongoose);

app.listen(3000,function(){
    console.log("Server running on port 3000");
})