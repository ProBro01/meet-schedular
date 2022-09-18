import { usermodel } from "../model/user.model.js"
import jwt from "jsonwebtoken"

export function logincontroller(req, res, next) {
    try{    
        usermodel.findOne({contact : req.body.contact, password: req.body.password}, async (err, result) => {
            if(err){
                console.log(err)
                req.send("error occured")
            }
            else{
                var token_details = {
                    _id : result._id,
                    contact : result.contact,
                    username : result.username,
                    email : result.email
                }
                const token = jwt.sign(token_details, process.env.PRIVATEKEY)
                res.cookie("token", token)
                res.render('Dashboard', {emailaddress : result.email})
            }
        })
    }
    catch(err){
        console.log(err)
        res.send("error occured")
    }
}

export async function registercontroller(req, res, next){
    try{
        const user = new usermodel({
            username: req.body.username,
            password: req.body.password,
            email : req.body.email,
            contact : req.body.contact
        })
        user.save((err, data) => {
            if(err){
                console.log(err)
                res.send("error occured")
            }
            else{
                res.json(data)
            }
        })
    }
    catch(err){
        console.log(err)
    }
}