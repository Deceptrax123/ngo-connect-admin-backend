const router=require("express").Router();
const bodyParser=require("body-parser");
const {getTicketPage,postTicketPage,deleteTicket}=require("../controllers/raise_ticket_routes");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/raise-request",getTicketPage);
router.post("/raise-request",postTicketPage);
router.post("/raise-request/delete/:req_id",deleteTicket);
//router.post("/raise-request/update/:req_id");

module.exports=router;