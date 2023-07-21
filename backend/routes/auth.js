const express = require("express")

const router = express.Router();

const User = require('../models/User')

const {body, validationResult}=require("express-validator");

const jwt = require("jsonwebtoken");

const fetchUser = require("../middleware/fetchUser")

const bcrypt = require('bcryptjs')
const JWT_SECRET = "mynotebookisbestbookintheworld"
router.get('/',(req,res)=>{
   console.log(req.body)
   res.send(req.body); 
})

// create a user using POST /api/auth : no authentication required
router.post('/createUser',[
     body('name').isLength({min:4}),
     body('email').isEmail(),
     body('password').isLength({min:4})
    ]
    ,async(req,res)=>{
    const errors = validationResult(req);
    let success=false
    if(!errors.isEmpty()){
        return res.status(400).json({success,message:errors.array()});
    }
   
    
    
    try{

        let oldUser =await User.findOne({email:req.body.email});
        if(oldUser){
            return res.status(400).json({success,message:"email already exist"});
        }
    
        let salt = await bcrypt.genSalt(10);
    
        const pass = req.body.password;
        const secPass = await  bcrypt.hash(pass,salt);
        let user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
    
        // .then(user=>res.json(user))
        // .catch(err=> res.json({"json":"email"}));
        success=true
        res.json({success,message:"created user"});
    }
    catch(err){
        console.log(err)
    }
    
})

router.post('/login',[body('email').isEmail()],async(req,res)=>{
   
    const errors = validationResult(req);
    let success=false;
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:"error"})
    }
    try{

        let user = await User.findOne({email:req.body.email});
        if(! user){
           return res.status(400).json({success,message:"incorrect credentials"})
        }
        const passwordCompare = await bcrypt.compare(req.body.password,user.password);
        if(!passwordCompare){
           return res.status(400).json({success,message:"incorrect credentials"})
        }
        // const payload =user;
        console.log(user);
        const data = {
            
            user:{
                id:user._id
            }
        }
        success=true;
        const authToken = jwt.sign(data,JWT_SECRET);
        return res.json({success,"authToken":authToken});
    }
    catch(err){
        success=false
        res.json({success,msg:"error"})
    }
  })
  //get user details

  router.post('/getUser', fetchUser,async(req,res)=>{
    let user = await User.findOne({_id:req.user.id})
    res.send(user);
  })




module.exports = router;