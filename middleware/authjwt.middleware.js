import jwt from "jsonwebtoken"

export function authenticateJWT(req, res, next) {
    var token = req.cookies.token
    jwt.verify(token, process.env.PRIVATEKEY, (err, result) => {
        if(err){
            console.log(err)
            req.tokenvalid = false
        }
        else{
            req.user = result
            req.tokenvalid = true
        }
    })
    next()
}