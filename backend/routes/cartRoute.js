import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router(); // Create a router for cart-related routes

// Route to add an item to the cart
// Protected by authMiddleware to ensure the user is authenticated
cartRouter.post("/add", authMiddleware, addToCart);

// Route to remove an item from the cart
// Protected by authMiddleware to ensure the user is authenticated
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Route to fetch the user's cart data
// Protected by authMiddleware to ensure the user is authenticated
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter; // Export the router for use in the main app
