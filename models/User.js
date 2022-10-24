const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");

const ngoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    verified:{
        type:String,
    }
});

ngoSchema.plugin(passportLocalMongoose);
const User=mongoose.model("User",ngoSchema);

module.exports=User;