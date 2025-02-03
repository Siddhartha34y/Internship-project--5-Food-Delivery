import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // Extract cart items and food list from the context
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);

  // Check if the cart has any items
  const hasItems = Object.keys(cartItems).some((id) => cartItems[id] > 0);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-item">
        {/* Header for the cart items */}
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        
        {/* Check if there are items in the cart */}
        {hasItems ? (
          food_list.map((item) => {
            // Only display items that are in the cart
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-items-title cart-items-item">
                  {/* Item image */}
                  <img src={ url+"/images/"+item.image} alt={item.name} />
                  {/* Item name */}
                  <p>{item.name}</p>
                  {/* Item price with Rs. symbol */}
                  <p>$ {item.price}</p>
                  {/* Item quantity */}
                  <p>{cartItems[item._id]}</p>
                  {/* Total price for the item (price * quantity) */}
                  <p>$ {item.price * cartItems[item._id]}</p>
                  {/* Button to remove item from cart */}
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
              );
            }
            return null;
          })
        ) : (
          // Display message if the cart is empty
          <p className="empty-cart">Your cart is empty.</p>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
             <p>Subtotal</p>
             <p>${getTotalCartAmount()}</p>

            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:5}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter your promo code here to enjoy exclusive discounts!</p>
            <div className="cart-promocode-input">
              <input type="text"  placeholder='Promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
