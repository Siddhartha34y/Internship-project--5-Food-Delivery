import jwt from "jsonwebtoken";

// Middleware to authenticate users using JWT
const authMiddleware = async (req, res, next) => {
  // Extract the token from the request headers
  const { token } = req.headers;

  // If no token is provided, respond with an error
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Please log in again." });
  }

  try {
    // Verify the token using the secret key from environment variables
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the userId from the decoded token to the request body for further use
    req.body.userId = token_decode.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error and respond with a generic error message
    console.log(error);
    res.json({ success: false, message: "Error occurred while verifying the token." });
  }
};

export default authMiddleware;
