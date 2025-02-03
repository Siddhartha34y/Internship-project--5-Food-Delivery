import mongoose from "mongoose";

// Define the schema for orders
const orderSchema = new mongoose.Schema({
    // ID of the user placing the order
    userId: {
        type: String,
        required: true
    },
    // List of items in the order
    items: {
        type: Array,
        required: true
    },
    // Total amount for the order
    amount: {
        type: Number,
        required: true
    },
    // Delivery address for the order
    address: {
        type: Object,
        required: true
    },
    // Status of the order (e.g., processing, delivered, etc.)
    status: {
        type: String,
        default: "Food Is Processing" // Default status
    },
    // Date the order was placed
    date: {
        type: Date,
        default: Date.now() // Default to the current date
    },
    // Payment status of the order (true = paid, false = unpaid)
    payment: {
        type: Boolean,
        default: false // Default to unpaid
    }
});

// Create the order model or use an existing one if already defined
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Export the order model for use in other parts of the application
export default orderModel;
