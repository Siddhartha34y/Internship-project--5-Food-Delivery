import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to handle user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // Generate a JSON Web Token (JWT) for the user
        const token = createToken(user._id);

        // Return the token to the client
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Function to create a JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // Sign the token using a secret key
};

// Function to handle user registration
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if a user with the same email already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        // Validate the email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Check if the password is strong enough
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the password using bcrypt for secure storage
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save the user to the database
        const user = await newUser.save();

        // Generate a JWT for the new user
        const token = createToken(user._id);

        // Return the token to the client
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Export the login and register functions
export { loginUser, registerUser };
