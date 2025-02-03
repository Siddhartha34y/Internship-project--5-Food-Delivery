import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number, 
        required:true
    },
    image:{type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    reviews: [
        {
            user: {
                type: String, // Name of the reviewer
                required: true
            },
            rating: {
                type: Number, // Rating out of 5
                required: true,
                min: 0,
                max: 5
            },
            comment: {
                type: String // Review comment
            },
            date: {
                type: Date,
                default: Date.now // Timestamp of the review
            }
        }
    ]
})

const foodModel =mongoose.models.food ||  mongoose.model("food",foodSchema)

export default foodModel;