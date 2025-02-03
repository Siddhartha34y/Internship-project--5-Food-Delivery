import React, { useState, useEffect } from 'react';  // Importing React and necessary hooks
import './List.css';  // Importing CSS for styling
import axios from 'axios';  // Axios for making HTTP requests
import { toast } from 'react-toastify';  // For displaying toast notifications

const List = ({url}) => {
      // API base URL

    // State to store the list of food items
    const [list, setList] = useState([]);

    // Function to fetch the list of food items from the server
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);  // Send GET request to the server

        // If the request is successful, update the state with the list of food items
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");  // If the request fails, show an error toast
        }
    };

    // Function to remove a food item by its ID
    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });  // Send POST request to remove the food item
        await fetchList();  // Refresh the food list after removal

        // Display a success or error message based on the server response
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };

    // UseEffect hook to fetch the list of food items when the component mounts
    useEffect(() => {
        fetchList();
    }, []);  // Empty dependency array ensures this only runs once when the component mounts

    return (
        <div className='list add flex-col'>
            <p>All Food List</p>
            <div className="list-table">
                {/* Table header with column names */}
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                
                {/* Loop through the list of food items and display them */}
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt={item.name} />  {/* Display food image */}
                            <p>{item.name}</p>  {/* Display food name */}
                            <p>{item.category}</p>  {/* Display food category */}
                            <p>${item.price}</p>  {/* Display food price */}
                            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>  {/* On click, remove food item */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default List;
