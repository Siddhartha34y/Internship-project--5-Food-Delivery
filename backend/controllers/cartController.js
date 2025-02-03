import userModel from "../models/userModel.js";

// Add items to the user cart
const addToCart = async (req, res) => {
  try {
    // Fetch user data using the userId from the request body
    let userData = await userModel.findById(req.body.userId);

    // Access the user's cart data
    let cartData = await userData.cartData;

    // Check if the item already exists in the cart
    if (!cartData[req.body.itemId]) {
      // If not, add the item with a quantity of 1
      cartData[req.body.itemId] = 1;
    } else {
      // If the item exists, increment its quantity by 1
      cartData[req.body.itemId] += 1;
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Respond with success message
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    // Log and respond with error message
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from the user cart
const removeFromCart = async (req, res) => {
  try {
    // Fetch user data using the userId from the request body
    let userData = await userModel.findById(req.body.userId);

    // Access the user's cart data
    let cartData = await userData.cartData;

    // Check if the item exists in the cart and has a quantity greater than 0
    if (cartData[req.body.itemId] > 0) {
      // Decrement the item's quantity by 1
      cartData[req.body.itemId] -= 1;
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Respond with success message
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    // Log and respond with error message
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    // Fetch user data using the userId from the request body
    let userData = await userModel.findById(req.body.userId);

    // Access the user's cart data
    let cartData = await userData.cartData;

    // Respond with the cart data
    res.json({ success: true, cartData });
  } catch (error) {
    // Log and respond with error message
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
