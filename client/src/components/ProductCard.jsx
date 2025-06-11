import React from 'react'; 
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';


const ProductCard = ({product}) => {
    
    const {currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

     if (!product) return null;

    return product && (
        <div
            onClick={() => {
                navigate(`/products/${product.category?.toLowerCase()}/${product._id}`);
                scrollTo(0, 0);
            }}
            className="border border-gray-500/20 rounded-md px-2 py-2 bg-white w-full max-w-[160px] min-w-[140px] mx-auto
                       flex flex-col items-center transition hover:shadow-md
                       md:px-4 md:py-2 md:max-w-56 md:min-w-56"
        >
            <div className="group cursor-pointer flex items-center justify-center w-full">
                <img
                    className="group-hover:scale-105 transition w-20 h-20 object-contain md:w-36 md:h-36"
                    src={product.image[0]}
                    alt={product.name}
                />
            </div>
            <div className="text-gray-500/60 text-xs md:text-sm w-full mt-2">
                <p className="truncate">{product.category}</p>
                <p className="text-gray-700 font-medium text-base md:text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className='w-3 md:w-3.5' />
                    ))}
                    <p className="text-xs md:text-sm">(4)</p>
                </div>
                <div className="flex items-end justify-between mt-2 md:mt-3">
                    <p className="text-base md:text-xl font-medium text-primary">
                        {currency}{product.offerPrice}{" "}
                        <span className="text-gray-500/60 text-xs md:text-sm line-through">
                            {currency}{product.price}
                        </span>
                    </p>
                    <div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[56px] h-[28px] md:w-[80px] md:h-[34px] rounded cursor-pointer text-xs md:text-base"
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.cart_icon} alt="cart_icon" className="w-4 md:w-5" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 w-14 h-[28px] md:w-20 md:h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => { removeFromCart(product._id) }} className="cursor-pointer text-md px-2 h-full">-</button>
                                <span className="w-4 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => { addToCart(product._id) }} className="cursor-pointer text-md px-2 h-full">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;