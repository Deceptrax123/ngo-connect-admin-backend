const User=require("../models/User");

const getSignUp=(req,res)=>{
    res.send("Sign up page");
}

const postSignUp=async (req,res)=>{
    try{
        await User.register({username:req.body.email,name:req.body.name,contact:req.body.contact},req.body.password);

        console.log("Successfully registered");
    }catch(err){
        console.log(err);
    }
}

module.exports={getSignUp,postSignUp}