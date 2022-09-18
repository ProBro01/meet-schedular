import mongoose from "mongoose";


export async function createDatabaseConnection() {
    try{
        await mongoose.connect("mongodb://localhost:27017/meetdb")
    }
    catch(err){
        console.log(err)
    }
}