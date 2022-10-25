const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    description:{
        type:String,
        required:true
    },

    acceptedServices:{
        type:String,
        required:true
    },
    documents:[
        {
            data:{
                type:Buffer,
                required:true
            },
            content:{
                type:String,
                required:true
            }
        }],
    completed:{
        type:Boolean,
        required:true,
        default:false,
    }
});

const Detail=mongoose.model("Detail",profileSchema);

module.exports=Detail;