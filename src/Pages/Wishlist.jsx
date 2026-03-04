import { toast } from "react-toastify";
import { useCartContext } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useUser } from '@clerk/clerk-react';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
 const {addToCart} = useCartContext()
    const { user } = useUser()
   
    return (
        <div className="p-5">
            {<h1 className="text-2xl mb-4 font-bold px-2">{user?user.firstName:""} Wishlist ({wishlist.length})</h1>}

            {wishlist.length === 0 ? (
                <div className="flex items-center justify-center flex-col">
                <img className="sm:h-190" src="/src/assets/wishlist.png" alt="" />
                </div>
            ) : (
                wishlist.map((item) => (
                    <div key={item.id} className="bg-slate-100 h-120 w- sm:h-60  flex flex-col sm:flex-row items-center">
                        <div className="">
                            <img className="h-50 px-5 py-6" src={item.image} alt="" />
                        </div>
                        <div className="px-4" >
                            <p className="font-bold line-clamp-2">{item.title}</p>
                            <p className="font-semibold">{item.category.toUpperCase()}</p>
                            <p className="font-bold text-red-500">${item.price}</p>
                            <button onClick={()=>{addToCart(item),removeFromWishlist(item.id)}} className=" bg-red-500 hover:bg-red-700 text-white px-6 sm:px-10 py-3 mr-6 mb-4 mt-2 rounded-lg font-semibold transition duration-300 shadow-md">Move to Cart</button> 
                        <button
                            onClick={() => {removeFromWishlist(item.id),toast.success("Product remove from Wishlist")}}
                                className=" bg-red-500 hover:bg-red-700 text-white px-10 py-3  rounded-lg font-semibold transition duration-300 shadow-md"
                        >
                            Remove
                        </button>
                        </div>
                        
                    </div>
                ))
            )}
        </div>
    );
};

export default Wishlist;