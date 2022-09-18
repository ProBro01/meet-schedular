import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
    contact : String,
    past_meets : Array,
    upcoming_meets : [],
    organinzed_meet : Array
})

export const usermodel = mongoose.model("user", userschema)
