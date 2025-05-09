import axios from "axios";
import { createContext, useEffect, useState } from "react";


// Creating context to share state between components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // State to keep track of items in the cart
    const [cartItems, setCartItems] = useState({});

    const url ="http://localhost:4000";

    const [token,setToken]= useState("");

    const [food_list,setFoodList] = useState([]);
    // Function to add items to the cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            
        }
    };

    // Function to remove items from the cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            
        }
    };

    // Logging cart items whenever they change (for debugging)
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item);
                totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }


    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData)

    }



    useEffect(() => {
        // Check if a token is stored in localStorage
        
        async function loadData(){
            await fetchFoodList();
        
        if (localStorage.getItem("token")) {
            // If a token exists, update the state with the token value
            setToken(localStorage.getItem("token"));
            await  loadCartData(localStorage.getItem("token"))
        }
    }
       loadData();
        // No dependency array provided, this will run after every render
    },[]);
    
    // Providing the context value to children components
    const contextValue = {
        food_list, // List of food items
        cartItems, // Items in the cart
        setCartItems, // Function to update cart items
        addToCart, // Function to add items to the cart
        removeFromCart, // Function to remove items from the cart
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    // Returning the context provider with the value
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children} 
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
