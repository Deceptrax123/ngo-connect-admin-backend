const router=require("express").Router();
const bodyParser = require("body-parser");
const upload=require("../config/upload");
const {getCompleteSetup,postCompleteSetup} = require("../controllers/setup_routes");

router.use(bodyParser.urlencoded({extended:true}));

router.get("/complete-set-up",getCompleteSetup);
router.post("/complete-set-up",upload.array('image'),postCompleteSetup);

module.exports=router;