import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  // Context provides global data like cart, token, food list, and API URL
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  // Local state for storing user input (delivery information)
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Handler for updating the form data in state dynamically
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  // Function to handle order placement
  const placeOrder = async (event) => {
    event.preventDefault(); // Prevent form reload

    // Prepare the list of items in the cart for the order
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Copy item details
        itemInfo["quantity"] = cartItems[item._id]; // Add quantity field
        orderItems.push(itemInfo); // Add to order items
      }
    });

    // Construct the order data object
    let orderData = {
      address: data, // Delivery information
      items: orderItems, // Cart items
      amount: getTotalCartAmount() + 5, // Total amount including delivery fee
    };

    // API call to place the order
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

    // Redirect to payment session if the order is successful
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error placing the order"); // Show an error message
    }
  };


  //Afther Login to the page then access the checkout 
  const navigate = useNavigate();
  useEffect(()=>{
       if (!token) {
        navigate('/cart')
        
       }

       else if(getTotalCartAmount()===0){
        navigator('/cart')
       }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        {/* Input fields for delivery information */}
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='middleName' onChange={onChangeHandler} value={data.middleName} type="text" placeholder='Middle name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            {/* Display cart totals */}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
            </div>
          </div>
          {/* Submit button to proceed to payment */}
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
