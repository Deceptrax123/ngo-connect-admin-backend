const router=require("express").Router();
const bodyParser=require("body-parser");
const {getSignUp,postSignUp,verify,getLogin,postLogin}=require("../controllers/admin_routes");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/signup",getSignUp);
router.post("/signup",postSignUp);
router.get("/signup/verify/:id/:token",verify);
router.get("/login",getLogin);
router.post("/login",postLogin);

module.exports=router;