import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (prev.find((item) => item.id === product.id)) {
                return prev;
            }
            return [...prev, product];
        });
        toast.success("Product add to Wishlist")
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
       
    };

    const isInWishlist = (id) => {
        return wishlist.some((item) => item.id === id);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);