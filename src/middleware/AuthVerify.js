const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const token = req.headers['token-key'];
    jwt.verify(token,"SecretKey",(err,decoded)=>{
        if(err){
            res.status(401).json({status: "unauthorized"})
        }else{
            const username = decoded["data"]["UserName"];
            req.headers.username = username;
            next();
        }
    });
}