import { toast } from "react-toastify";
import { useCartContext } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useUser } from '@clerk/clerk-react';
import { Trash2, ShoppingCart, HeartCrack } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCartContext();
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {user ? `${user.firstName}'s ` : ""}Wishlist
                    <span className="ml-3 text-lg font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                    </span>
                </h1>
            </div>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="bg-rose-50 p-6 rounded-full mb-6">
                        <HeartCrack className="w-16 h-16 text-rose-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
                    <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added anything to your wishlist yet. Explore our products and find something you love!</p>
                    <button 
                        onClick={() => navigate('/products')}
                        className="bg-slate-900 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                            {/* Remove Button */}
                            <button
                                onClick={() => {
                                    removeFromWishlist(item.id);
                                    toast.success("Removed from Wishlist");
                                }}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm hover:bg-rose-100 hover:text-rose-600 text-slate-400 rounded-full transition-colors duration-200 shadow-sm"
                                title="Remove from wishlist"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                            {/* Image Container */}
                            <div className="relative w-full h-64 p-6 bg-white overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                <img 
                                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                                    src={item.image} 
                                    alt={item.title} 
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow p-5 bg-slate-50/50 border-t border-slate-50">
                                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase mb-2">
                                    {item.category}
                                </span>
                                <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 flex-grow hover:text-rose-600 transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                    {item.title}
                                </h3>
                                <div className="flex items-end justify-between mt-4">
                                    <p className="font-extrabold text-2xl text-slate-900">
                                        ${item.price}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => {
                                        addToCart(item);
                                        removeFromWishlist(item.id);
                                    }} 
                                    className="mt-5 flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;