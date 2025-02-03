import React, { useContext } from 'react' // Importing React and the useContext hook for accessing context.
import './FoodDisplay.css' // Importing the CSS file for styling the FoodDisplay component.
import { StoreContext } from '../../context/StoreContext' // Importing the StoreContext to access shared state.
import FoodItem from '../FoodItem/FoodItem' // Importing the FoodItem component to display individual food items.

// Defining the FoodDisplay component and destructuring the 'category' prop.
const FoodDisplay = ({ category }) => { 

    // Using the useContext hook to access the food_list from the StoreContext.
    const { food_list } = useContext(StoreContext)

    return (
        // Container for the food display section with a CSS class for styling.
        <div className='food-display' id='food-display'>
            {/* Title of the section */}
            <h2>Top Flavors near you—taste the best!</h2>

            {/* Container for the list of food items */}
            <div className="food-display-list">
                {/* Mapping over the food_list to render each food item */}
                {food_list.map((item, index) => {
                    // Seprated the Category
                    if (category==="All" || category===item.category) {
                        return (
                            <FoodItem 
                                key={index} // Unique key for each list item to optimize rendering.
                                id={item._id} // Unique ID of the food item.
                                name={item.name} // Name of the food item.
                                description={item.description} // Description of the food item.
                                price={item.price} // Price of the food item.
                                image={item.image}
                                reviews={item.reviews}
                                
                                 // Image URL of the food item.
                            />
                        )
                    }
                    // Rendering the FoodItem component for each item in the food_list
                    // Passing item details (id, name, description, price, and image) as props.
                   
                })}
            </div>
        </div>
    )
}

// Exporting the FoodDisplay component for use in other parts of the application.
export default FoodDisplay
