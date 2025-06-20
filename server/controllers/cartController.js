import User from "../models/User.js";

// Update user cartData : /api/cart/update
 export const updateCart = async (req, res) => {
    try {
        const { cartItems} = req.body;
        const userId = req.userId;
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "cart updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
 }