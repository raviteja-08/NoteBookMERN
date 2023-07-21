const jwt = require("jsonwebtoken")
const JWT_SECRET = "mynotebookisbestbookintheworld"

const fetchUser=(req,res,next)=>{
    // get user id from token
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"invalid token"});

    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;

    }
    catch(err){
        res.send({err:"err"})
    }
    next();
}

module.exports=fetchUser;