import mongoose from "mongoose";

const meetparticipentsSchema = mongoose.Schema({
    email : String
})

const meetschema = mongoose.Schema({
    meet_title : String,
    start_date : Date,
    end_date: Date,
    start_time : String,
    end_time: String,
    creater_id: mongoose.ObjectId,
    meet_participent : [meetparticipentsSchema],
    meet_link : String,
    meet_description : String,
    meet_topic: String,
})

export const meetmodel = mongoose.model("meeting", meetschema)
