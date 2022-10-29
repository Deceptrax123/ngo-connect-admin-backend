require("dotenv").config();
const User=require("../../models/User");
const sendVerificationMail=require("../mailer/verification");
const passport=require("passport");
const jwt=require("jsonwebtoken");

const getSignUp=(req,res)=>{
    res.json("Sign up page");
};

const postSignUp=async (req,res)=>{
    try{
        const existing=await User.findOne({username:req.body.username});
        if(existing){
            res.status(409).json({message:"Account already exists"});
        }else{
            const user=await User.register({username:req.body.username,name:req.body.name,contact:req.body.contact,verified:false},req.body.password);
            const verify=await sendVerificationMail(user);

            if(!verify){
                res.status(409).json({message:"No such email exists"});
            }
            res.status(200).json({message:"email successfully sent"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
};

const verify=async (req,res)=>{
    try{
        payload=await jwt.verify(req.params.token,process.env.USER_VERIFICATION_TOKEN);
        if(payload){
            try{
                await User.findByIdAndUpdate(req.params.id,{verified:true});
                res.status(200).json({message:"User verified"});
            }catch(err){
                res.status(500).json({message:"Internal Server Error"});
            }
        }else{
            res.status(498).json({message:"Link expired"});
        }
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

const getLogin=(req,res)=>{
    res.json("Login page");
}

const postLogin=async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user){
            res.status(409).json({message:"No user found. Try again"});
        }else if(!user.verified){
            res.status(401).json({message:"Not verified.Please verify"})
        }else{
            passport.authenticate("local",(err,user,info)=>{
                if(err){
                    res.status(500).json({message:err});
                }
                if(!user){
                    res.status(409).json({message:"Incorrect username or password"});
                }else{
                    req.login(user,(err)=>{
                        if(err){
                            res.status(500).json({message:"Internal server error"});
                        }else{
                            res.status(200).json({message:"Logged in successfully"});
                        }
                    })
                }
            })
        }
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports={getSignUp,postSignUp,verify,getLogin,postLogin};