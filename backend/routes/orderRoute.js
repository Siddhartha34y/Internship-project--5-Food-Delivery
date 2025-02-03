import express from "express"

// Middleware to verify authentication
import authMiddleware from "../middleware/auth.js"

// Controller functions for handling order-related routes
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"

// Create an Express router instance
const orderRouter = express.Router();

// Route to place an order
// This route requires authentication and uses the `placeOrder` controller
orderRouter.post("/place", authMiddleware, placeOrder);

// Route to verify an order/payment
// This route does not require authentication and uses the `verifyOrder` controller
orderRouter.post("/verify", verifyOrder);

// Route to fetch user-specific orders
// This route requires authentication and uses the `userOrders` controller
orderRouter.post("/userorders", authMiddleware, userOrders);

orderRouter.get('/list',listOrders);

orderRouter.post("/status",updateStatus)

// Export the router to be used in the main app
export default orderRouter;

