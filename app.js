import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { calenderroute } from "./routes/calender.route.js"
// routes
import { loginroute } from "./routes/login.route.js"
import { meetroute } from "./routes/meet.route.js"
// middlewares
import { authenticateJWT } from "./middleware/authjwt.middleware.js"

export const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/meet", meetroute)
app.use("/auth", loginroute)
app.use("/cal", calenderroute)
app.use(express.static("templates"))

app.set('views', path.join(path.resolve(), 'templates'))
app.set('view engine', 'ejs')

app.get("/", authenticateJWT ,(req, res) => {
    if(req.tokenvalid){
        console.log(req.user.email)
        var renderdata = {
            emailaddress : req.user.email
        }
        res.render("Dashboard", renderdata)
    }
    else{
        var renderdata = {
            emailaddress : ""
        }
        res.render("home", renderdata)
    }
})

app.get("/login" ,(req, res) => {
    res.render("login")
})

app.get("/signup" ,(req, res) => {
    res.render("signup")
})

app.get("/detail", authenticateJWT ,(req, res) => {
    if(req.tokenvalid){
        var renderdata = {
            emailaddress : req.user.email
        }
        res.render('detailes', renderdata)
    }
})

app.get("/asdf", (req, res) => {
    res.render("index")
})