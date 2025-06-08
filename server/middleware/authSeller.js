import jwt from 'jsonwebtoken';

const authSeller = async(req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        res.json({
            success: false, message: "Please login first"})
    }
    try{
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            res.json({
                success: false, message: "Unauthorized access"
            });
        }
        
    }catch(err) {
        res.json({
            success: false, message: err.message}) 
        }
}

export default authSeller;