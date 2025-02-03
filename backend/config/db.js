import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb://localhost:27017/foodhub').then(()=>console.log("DB Connected"));
}