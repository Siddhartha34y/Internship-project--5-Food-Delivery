import React, { useContext} from 'react' // Importing React to use JSX and create the component.
import './FoodItem.css' // Importing the CSS file for styling the FoodItem component.
import { assets } from '../../assets/assets' // Importing assets, such as images, from a central assets file.
import { StoreContext } from '../../context/StoreContext'

// Defining the FoodItem component, destructuring props to access id, name, price, description, and image.
const FoodItem = ({ id, name, price, description, image , reviews}) => {

   
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    // Main container for the food item, styled using a CSS class.
    <div className='food-item'>

        {/* Container for the food item's image */}
        <div className="food-item-img-container">
            {/* Displaying the food item's image */}
            <img className='food-item-image' src={url+"/images/"+image} alt="" />

            {!cartItems[id]
               ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
               :<div className='food-item-counter'>
                   <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                   <p>{cartItems[id]}</p>
                   <img onClick={()=>addToCart(id)}  src={assets.add_icon_green} alt="" />
                </div>

            }
        </div>

        {/* Container for the food item's information */}
        <div className="food-item-info">

            {/* Section for the food item's name and rating */}
            <div className="food-item-name-rating">
                {/* Displaying the food item's name */}
                <p>{name}</p>
                {/* Displaying the rating stars image */}
                <img src={assets.rating_starts} alt="" />
            </div>

            {/* Displaying the food item's description */}
            <p className="food-item-desc">{description}</p>
              

            <p className="food-item-price">${price}</p>
            {/* Displaying the food item's price */}
            {/* <p className="food-item-price"><button>Reviews</button>{reviews}</p> */}
            
        </div>

    </div>
  )
}

// Exporting the FoodItem component to use it in other parts of the application.
export default FoodItem
