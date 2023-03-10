const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
exports.CreateProfile = (req,res) =>{
    let reqBody = req.body;
    Profile.create(reqBody, (err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data:err})
        }else{
            res.status(201).json({status: "success", data:data})

        }
    })
}
exports.UserLogin = (req,res) =>{
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];

    Profile.find({UserName:UserName,Password: Password},(err,data)=>{
        if(err){
            res.status(401).json({status: "fail", data: err})
        }else{
            if(data.length){
                const payload = {
                    exp:Math.floor(Date.now()/1000) + (24*60*60),
                    data:data[0]
                }
                const token = jwt.sign(payload,'SecretKey')
                res.status(200).json({status:"success",token:token, data: data})
            }else{
                res.status(401).json({status:"unauthorized"})

            }
        }
    })
    
}
exports.SelectProfile = (req,res) =>{
    let UserName =req.headers["username"];

    Profile.find({UserName:UserName},(err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data:err})
        }else{
            res.status(200).json({status: "success", data:data})
        }
    })   
}

exports.UpdateProfile = (req,res) =>{
    let UserName =req.headers["username"];
    const reqBody = req.body;
Profile.updateOne({UserName: UserName}, {$set: reqBody}, {upsert:true}, (err,data)=>{
    if(err){
        res.status(400).json({status: "fail", data:err})
    }else{
        res.status(200).json({status: "success", data:data})
    }
});
}