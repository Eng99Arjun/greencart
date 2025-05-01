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

    // Function to remove or reduce product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId] > 1){
            cartData[itemId] -= 1;
        }else{
            delete cartData[itemId];
        }
        setCartItems(cartData);
        toast.success("Product removed from cart");
    }

    // Function to fetch product
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    //get cart count

    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // total cart amount

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            const itemInfo = products.find((product) => product._id === item);
            if(cartItems[item]> 0){
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = { getCartAmount, getCartCount, searchQuery, setSearchQuery, addToCart, removeFromCart, updateCartItem, currency, products, showUserLogin, setShowUserLogin, navigate, user, setUser, isSeller, setIsSeller, cartItems};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};