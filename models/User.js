require("dotenv").config();
const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const jwt=require("jsonwebtoken");


const ngoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
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
        type:Boolean,
        required:true,
    },
    organizationVerified:{
        type:Boolean,
        required:true,
        default:false
    },
});

ngoSchema.plugin(passportLocalMongoose);
ngoSchema.methods.generateVerificationToken=()=>{
    const payload={
        id:this._id,
        username:this.username,
        name:this.name,
        contact:this.contact,
    };

    const verificationToken=jwt.sign(
        payload,
        process.env.USER_VERIFICATION_TOKEN,
        {expiresIn:"7d"});
    return verificationToken;
};

const User=mongoose.model("User",ngoSchema);

module.exports=User;