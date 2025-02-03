import React, { useContext, useEffect } from 'react'
import './Verify.css' // Importing the CSS file for styling
import { useNavigate, useSearchParams } from 'react-router-dom' // Importing necessary hooks for routing
import { StoreContext } from '../../context/StoreContext'; // Importing context for global state management
import axios from 'axios'; // Importing axios for API calls

const Verify = () => {
  // Using useSearchParams to get the query parameters from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extracting the success and orderId query parameters from the URL
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // Destructuring 'url' from the context to make API calls
  const { url } = useContext(StoreContext);
  // Using useNavigate hook for navigating programmatically
  const navigate = useNavigate();

  // Function to verify payment by sending data to the backend
  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      // If the payment verification is successful, navigate to 'myorders' page
      if (response.data.success) {
        navigate("/myorders");
      } else {
        // If verification fails, navigate back to the homepage
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/"); // Navigate to homepage in case of error
    }
  }

  // Running the verifyPayment function when the component is mounted
  useEffect(() => {
    verifyPayment();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className='verify'>
      {/* Placeholder for a spinner animation */}
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
