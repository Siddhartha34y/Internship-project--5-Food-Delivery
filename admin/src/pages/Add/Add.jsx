import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
    // API endpoint URL
  

    // State to store the uploaded image file
    const [image, setImage] = useState(false);

    // State to store form input values
    const [data, setData] = useState({
        name: "", // Product name
        description: "", // Product description
        price: "", // Product price
        category: "Salad", // Default category value
    });

    // Handler to update state on input change
    const onChangeHandler = (event) => {
        const name = event.target.name; // Input field name
        const value = event.target.value; // Input field value
        setData((data) => ({ ...data, [name]: value })); // Update state with new value
    };

    // Handler to submit the form
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Prepare form data for API submission
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price)); // Convert price to number
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            // Make POST request to API
            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                // Reset form inputs on successful submission
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad", // Reset to default
                });
                setImage(false); // Reset image state
                toast.success(response.data.message); // Show success toast notification
            } else {
                toast.error(response.data.message); // Show error toast notification
            }
        } catch (error) {
            toast.error("An error occurred while adding the product."); // Handle API errors
        }
    };

    return (
        <div className="add">
            {/* Form to add a new product */}
            <form className="flex-col" onSubmit={onSubmitHandler}>
                {/* Image upload section */}
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        {/* Display uploaded image or placeholder */}
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])} // Update image state on file selection
                        type="file"
                        id="image"
                        hidden
                        required // Mark as required
                    />
                </div>

                {/* Product name input */}
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required // Mark as required
                    />
                </div>

                {/* Product description input */}
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required // Mark as required
                    ></textarea>
                </div>

                {/* Product category and price inputs */}
                <div className="add-category-price">
                    {/* Dropdown for category */}
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            name="category"
                            value={data.category} // Bind to state
                            required // Mark as required
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    {/* Input for product price */}
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$21"
                            required // Mark as required
                        />
                    </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="add-button">ADD</button>
            </form>
        </div>
    );
};

export default Add;
