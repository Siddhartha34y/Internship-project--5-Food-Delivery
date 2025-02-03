import React from 'react';
import './Orders.css';
import { useState } from 'react';
import { toast } from "react-toastify";  // Importing toast for showing notifications
import axios from "axios";
import { useEffect } from 'react';
import { assets } from "../../assets/assets";  // Importing assets (like images)

const Orders = ({ url }) => {
    // State to store all fetched orders
    const [orders, setOrders] = useState([]);

    // Function to fetch all orders from the API
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");  // Sending GET request to fetch orders

        if (response.data.success) {
            setOrders(response.data.data);  // If successful, update the orders state
            console.log(response.data.data);  // Log the orders for debugging
        } else {
            toast.error("Error");  // Show error toast if the fetch failed
        }
    };

    const statusHandler = async(event,orderId)=>{

         const response = await axios.post(url+"/api/order/status",{
            orderId,
            status:event.target.value
         })
         if(response.data.success){
            await fetchAllOrders();
         }

    }

    // useEffect hook to fetch orders when the component mounts
    useEffect(() => {
        fetchAllOrders();  // Fetch orders on initial render
    }, []);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {/* Mapping through orders and displaying each one */}
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="parcel" /> {/* Display parcel icon */}
                        <div>
                            <p className='order-item-food'>
                                {/* Displaying item details (name and quantity) */}
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + "x" + item.quantity;
                                    } else {
                                        return item.name + "x" + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <div className="order-item-name">
                                {/* Displaying address details */}
                                {order.address.firstName + " " + order.address.lastName}
                                <p className="order-item-address">{order.address.street + ","}</p>
                                <p>{order.address.city + "," + order.address.state + ", " + order.address.country + ", " + order}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p> {/* Display phone number */}
                        </div>
                        <p>Items : {order.items.length}</p>  {/* Display the number of items */}
                        <p>${order.amount}</p>  {/* Display the total order amount */}
                        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                            {/* Dropdown for updating order status */}
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
