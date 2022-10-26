const User=require("../../models/User");
const Details=require("../../models/Details");
const fs=require("fs");
const path=require("path");
const console = require("console");

const getCompleteSetup=(req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.user._id);
        res.status(200).send({message:"Complete setup and document verification"});
    }else{
        res.redirect("/login");
    }
};

const postCompleteSetup=async (req,res)=>{
    let images=[];
    req.files.map((item)=>{
        let img={
            data:fs.readFileSync(path.join("./public/uploads/"+item.filename)),
            content:"image/png",
        };
        images.push(img);
    });

    try{
        const details=await new Details({
            name:req.user._id,
            description:req.body.description,
            acceptedServices:req.body.services,
            documents:images,
        }).save();
        try{
            await Details.findOneAndUpdate({name:req.user._id},{completed:true});
        }catch(err){
            res.status(500).send({message:"Internal server error"});
        }
        res.status(200).send({message:"Documents sent for verification. Will be verified soon"});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal server error"});
    }
};

module.exports={getCompleteSetup,postCompleteSetup};