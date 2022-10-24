require("dotenv").config();
const User=require("../models/User");
const sendVerificationMail=require("../mailer/verification");
const jwt=require("jsonwebtoken");

const getSignUp=(req,res)=>{
    res.send("Sign up page");
};

const postSignUp=async (req,res)=>{
    try{
        const existing=await User.findOne({username:req.body.username});
        if(existing){
            res.status(409).send({message:"Account already exists"});
        }else{
            const user=await User.register({username:req.body.username,name:req.body.name,contact:req.body.contact,verified:false},req.body.password);
            const verify=await sendVerificationMail(user);

            if(!verify){
                res.status(409).send({message:"No such email exists"});
            }
            res.status(200).send({message:"email successfully sent"})
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
};

const verify=async (req,res)=>{
    try{
        payload=await jwt.verify(req.params.token,process.env.USER_VERIFICATION_TOKEN);
        if(payload){
            try{
                await User.findByIdAndUpdate(req.params.id,{verified:true});
                res.status(200).send({message:"User verified"});
            }catch(err){
                res.status.send({message:"Internal Server Error"});
            }
        }else{
            res.status(409).send({message:"Link expired"});
        }
    }catch(err){
        res.status(500).send({message:"Internal server error"});
    }
}
module.exports={getSignUp,postSignUp,verify};