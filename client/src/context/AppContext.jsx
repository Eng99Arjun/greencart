import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;



export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    
    const [searchQuery , setSearchQuery] = useState({});
    const [cartItems, setCartItems] = useState({});

    //fetch seller status 
    const fetchSeller = async () => {
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }

        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch user auth status, User data and Cart items

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }

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
        try {
            const {data} = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
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
        fetchSeller();
        fetchUser();
    }, []);

    // Update cart items in the backend when user is logged in

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', {cartItems})
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        if(user){
            updateCart();
        }
    },[cartItems])

    const value = {axios, fetchProducts, getCartAmount, getCartCount, searchQuery, setSearchQuery, addToCart, removeFromCart, updateCartItem, currency, products, showUserLogin, setShowUserLogin, navigate, user, setUser, isSeller, setIsSeller, cartItems, setCartItems};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};