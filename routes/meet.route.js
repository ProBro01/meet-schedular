import { createmeet, getmeetdetails } from "../controller/meet.controller.js";
import express from "express"
import { authenticateJWT } from "../middleware/authjwt.middleware.js"

export const meetroute = express.Router()

meetroute.route('/createmeet').post(authenticateJWT, createmeet)
meetroute.route("/detail/:id").get(getmeetdetails)
// meetroute.route("/getmeets").get(authenticateJWT, showmeetbyid)