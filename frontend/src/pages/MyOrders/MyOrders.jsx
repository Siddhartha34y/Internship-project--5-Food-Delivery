import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  // Accessing the API URL and token from the StoreContext
  const { url, token } = useContext(StoreContext);

  // State to store fetched orders
  const [data, setData] = useState([]);

  // Function to fetch user orders from the API
  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data); // Storing the fetched order data in state
    console.log(response.data.data); // Logging the fetched data for debugging
  }

  // Using useEffect to fetch orders when the token is available
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      {/* Page Header */}
      <h2>My Orders</h2>

      {/* Container for order cards */}
      <div className="containers">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              {/* Parcel icon */}
              <img src={assets.parcel_icon} alt="" />

              {/* Displaying order items */}
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + "x" + item.quantity; // Last item in the list
                } else {
                  return item.name + "x" + item.quantity + ","; // Comma-separated items
                }
              })}</p>

              {/* Order amount */}
              <p>${order.amount}.00</p>

              {/* Total number of items */}
              <p>Items: {order.items.length}</p>

              {/* Order status with a colored dot */}
              <p><span>&#x25cf;</span><b>{order.status}</b></p>

              {/* Track Order button */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
