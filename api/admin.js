const router=require("express").Router();
const bodyParser=require("body-parser");
const {getSignUp,postSignUp}=require("../controllers/admin_routes");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/signup",getSignUp);
router.post("/signup",postSignUp);

module.exports=router;