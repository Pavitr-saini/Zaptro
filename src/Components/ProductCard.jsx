import React from 'react'
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext.jsx';
import { useWishlist } from "../Context/WishlistContext";
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const { addToCart } = useCartContext()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    
    const isWished = isInWishlist(product.id);

    const handleWishlist = (e) => {
        e.stopPropagation();
        if (isWished) {
            removeFromWishlist(product.id);
            toast.success("Removed from Wishlist");
        } else {
            addToWishlist(product);
            toast.success("Added to Wishlist");
        }
    };

    return (
        <div 
            className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            {/* Wishlist Button */}
            <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all duration-200"
                title={isWished ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart
                    className={`w-5 h-5 transition-colors duration-200 ${
                        isWished ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-400"
                    }`}
                />
            </button>

            {/* Image Section */}
            <div className="relative w-full aspect-square bg-white overflow-hidden flex items-center justify-center p-6">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-5 bg-slate-50/50 border-t border-slate-50">
                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase mb-2 block">
                    {product.category || "General"}
                </span>
                
                <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 flex-grow group-hover:text-rose-600 transition-colors">
                    {product.title}
                </h3>
                
                <div className="flex items-end justify-between mt-auto pt-2">
                    <p className="font-extrabold text-2xl text-slate-900">
                        ${product.price}
                    </p>
                </div>

                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        toast.success("Added to Cart");
                    }} 
                    className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-rose-600 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    )
}

export default ProductCard
