import { meetmodel } from "../model/meet.model.js";
import mongoose from "mongoose";
import { usermodel } from "../model/user.model.js";
import Meeting from 'google-meet-api';

async function generatemeetlink(date, time,summary, description) {
    var result = await Meeting.meet({
        clientId: '854950208298-881l6e0kekjn2cbj3svonp3h580u26ah.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//0gHUhjaSrblffCgYIARAAGBASNwF-L9Ir5jU4jUHhllyG3D43Rr3CL14i_v14QkJdkUuKTX3Rbqj9n8g7LV-jT9cDuedhVXvMgXA',
        date: date,
        time: time,
        summary: summary,
        description: description
    }).then(function (result) {
        return result
    })
    return result
}

export async function createmeet(req, res, next) {
    /**
     * meet name
     * meet id
     * meet admin
     * meet particient
     * meet start date
     * meet end time
     * meet link
     * meet date
     * meet topic
     * meet location
     * meet description 
     */
    if (req.tokenvalid) {
        const meet_link = await generatemeetlink(req.body.start_date, req.body.start_time, req.body.meet_name, req.body.meet_description)
        const admin = req.user._id
        const meet = new meetmodel({
            meet_title: req.body.meet_name,
            start_date: req.body.start_date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            creater_id: admin,
            // meet_participent: req.body.participent,
            meet_link: meet_link,
            meet_description: req.body.meet_description,
        })
        meet.save((err, data) => {
            if (err) {
                console.log(err)
                res.send(err)
            }
            else {
                var meetlink = `http://127.0.0.1:8000/meet/detail/${data._id}`
                res.json(meetlink)
                usermodel.findByIdAndUpdate(admin, { "$push": { "upcoming_meets": data._id } }, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    }
    else {
        console.log(req.tokenvalid)
        res.send("invalid user")
    }
}

// export function showmeetbyid(req, res, next) {
//     console.log(req.user._id)
//     meetmodel.findById(mongoose.Types.ObjectId  (req.user._id), (err, result) => {
//         if (err) {
//             res.json("error occured")
//         }
//         else {
//             res.json(result.past_meets)
//         }
//     })
// }

export function getmeetdetails(req, res, next) {
    try {
        meetmodel.findById(mongoose.Types.ObjectId(req.params.id), (err, result) => {
            if (err) {
                console.log(err)
                res.send("error occured")
            }
            else {
                res.render("textarea", {"emailaddress" : result.email, "meet_title" : result.meet_title, "start_date" : result.start_date, "start_time" : result.start_time, "end_time" : result.end_time, "creater_id": result.creater_id, "meet_link" : result.meet_link, "meet_description" : result.meet_description})
                // res.send(result)
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}