const Ticket=require("../../models/Ticket");

const getTicketPage=(req,res)=>{
    if(req.isAuthenticated()){
        res.status(200).send({message:"Volunteering/donation request page"});
    }else{
        res.redirect("/login");
    }
};

const postTicketPage=async(req,res)=>{
    let request={};

    if(req.body.category=="Donation"){
        request={
            donation:{
                item:req.body.item,
                minCount:req.body.minCount,
                note:req.body.note,
            }
        }
    }else{
        request={
            volunteering:{
                service:req.body.service,
                minHours:req.body.minHours,
                details:req.body.details,
            }
        }
    }
    try{
        const ticket=await new Ticket({
            orgId:req.user._id,
            requestType:request,
            status:false,
        }).save();

        res.status(200).send({message:"Request raised successfully"})
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal server error"});
    }
};

const deleteTicket=async (req,res)=>{
    try{
        await Ticket.findByIdAndDelete(req.params.req_id);
        res.status(200).send({message:"Ticket deleted successfully"});
    }catch(err){
        res.status(500).send({message:"Internal server error"});
    }
};

module.exports={getTicketPage,postTicketPage,deleteTicket};