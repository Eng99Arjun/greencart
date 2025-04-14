import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    
    const [searchQuery , setSearchQuery] = useState({});
    const [cartItems, setCartItems] = useState({});
    // Function to add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId]+= 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Product added to cart");
    }
    
    // Function to update product from cart
    const updateCartItem =(itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Product quantity updated");
    }

    // Function to remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] = -1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Product removed from cart");
        setCartItems(cartData);
    }

    // Function to fetch product
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {searchQuery, setSearchQuery, addToCart, removeFromCart, updateCartItem, currency, products, showUserLogin, setShowUserLogin, navigate, user, setUser, isSeller, setIsSeller, cartItems};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};