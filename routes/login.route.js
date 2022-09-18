import express from "express"
// controller
import { logincontroller, registercontroller } from "../controller/auth.controller.js"

export const loginroute = express.Router()

loginroute.route("/login").post(logincontroller)
loginroute.route("/signin").post(registercontroller)
// loginroute.route("/dashboard").get(renderdashboard)