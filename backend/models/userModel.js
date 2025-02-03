import mongoose from "mongoose";

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is a required field
        trim: true // Remove any leading/trailing whitespace
    },
    email: {
        type: String,
        required: true, // Email is a required field
        unique: true, // Ensure the email is unique in the collection
        lowercase: true, // Convert email to lowercase
        match: [/.+@.+\..+/, 'Please provide a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true, // Password is required
        minlength: [6, 'Password should be at least 6 characters long'] // Password length validation
    },
    cartData: {
        type: Object, // Assuming cardData can be any object
        default:{} } // Card data is optional
       
   
}, {minimize:false})

// Export the User model based on the schema
const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;
