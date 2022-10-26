const transporter=require("../../global_config/mailer");
require("dotenv").config();

const verifyUser=async(user)=>{
    try{
        const verificationToken=user.generateVerificationToken();
        const url=`http://localhost:3000/signup/verify/${user._id}/${verificationToken}`;

        await transporter.sendMail({
            from:process.env.FROM,
            to:user.username,
            subject:"Verify Account",
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })
        return true;
    }catch(err){
        return false;
    }
}
module.exports=verifyUser;