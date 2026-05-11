import React from 'react'
import { useCartContext } from '../Context/CartContext'
import { Trash2, NotebookText, Truck, Tag, ShoppingBag, Minus, Plus, CreditCard } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"

function Cart() {
    const { cartItem, updateQuantity, deleteItem } = useCartContext()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [address, setAddress] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm()

    async function onSubmit(data) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submit", data);
        setAddress(data);
        setIsSubmitted(true)
        setMessage("Delivery address confirmed")
    }

    const handleChange = () => {
        setIsSubmitted(false)
    }

    const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)

    const { user } = useUser()
    const navigate = useNavigate()
    const [promo, setPromo] = useState("")
    const [error, setError] = useState("")
    const [promoMsg, setPromoMsg] = useState(true)
    const [message, setMessage] = useState("")
    const [promoApplies, setPromoApplies] = useState(false)
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState("")

    const applyPromo = () => {
        if (promo === "WELCOME20") {
            setPromoMsg(false)
            setError("")
            setPromoApplies(true)
            toast.success("Promo code applied!")
        } else {
            setPromoMsg(true)
            setPromoApplies(false)
            setError("Invalid promo code")
        }
    };

    const redirect = () => {
        if (user) {
            setLoading(true);
            setTimeout(() => {
                navigate("/payment");
            }, 3000);
        } else {
            setLogin("Please log in to continue to checkout")
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {cartItem.length > 0 ? (
                <div>
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Shopping Cart
                            <span className="ml-3 text-lg font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                {cartItem.length} {cartItem.length === 1 ? 'item' : 'items'}
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        {/* Left Column: Items and Delivery Form */}
                        <div className="w-full lg:w-2/3 space-y-8">
                            
                            {/* Cart Items */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-indigo-500" />
                                    Your Items
                                </h2>
                                <div className="space-y-6">
                                    {cartItem.map((item, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white border border-slate-200 rounded-xl p-2 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                            </div>
                                            
                                            {/* Details & Controls */}
                                            <div className="flex-1 flex flex-col justify-between w-full">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs font-bold tracking-wider text-rose-500 uppercase mb-1 block">
                                                            {item.category}
                                                        </span>
                                                        <h3 className="font-bold text-slate-800 line-clamp-2 hover:text-rose-600 transition-colors cursor-pointer pr-4" onClick={() => navigate(`/product/${item.id}`)}>
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                    <button 
                                                        onClick={() => { deleteItem(item.id); toast.success("Item removed from cart") }} 
                                                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="flex items-end justify-between mt-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, "decrease")} 
                                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm rounded-md transition-all cursor-pointer"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-10 text-center font-semibold text-slate-900">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, "increase")} 
                                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm rounded-md transition-all cursor-pointer"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-slate-500 mb-1">${item.price} each</p>
                                                        <p className="font-extrabold text-2xl text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Information Form */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-indigo-500" />
                                    Delivery Details
                                </h2>
                                
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input type="text" disabled={isSubmitted} placeholder="Enter your name" className="w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500" defaultValue={user?.fullName || ''} />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Address</label>
                                        <input 
                                            type="text" 
                                            disabled={isSubmitted} 
                                            placeholder="Street address or P.O. Box" 
                                            {...register("address", { required: 'This field is required', minLength: { value: 10, message: 'Enter complete address.' } })} 
                                            className={`w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 ${errors.address ? 'border-rose-500 focus:ring-rose-500' : ''}`}
                                        />
                                        {errors.address && <p className="text-rose-500 font-medium text-sm mt-1">{errors.address.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">State / Province</label>
                                            <input 
                                                type="text" 
                                                disabled={isSubmitted} 
                                                placeholder="State" 
                                                {...register("state", { required: 'This field is required', pattern: { value: /^[A-Za-z\s]+$/, message: 'Only characters allowed' } })} 
                                                className={`w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 ${errors.state ? 'border-rose-500 focus:ring-rose-500' : ''}`}
                                            />
                                            {errors.state && <p className="text-rose-500 font-medium text-sm mt-1">{errors.state.message}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">ZIP / PostCode</label>
                                            <input 
                                                type="text" 
                                                disabled={isSubmitted} 
                                                placeholder="Postcode" 
                                                {...register("postCode", { required: 'This field is required', minLength: { value: 4, message: 'Invalid Postcode' } })} 
                                                className={`w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 ${errors.postCode ? 'border-rose-500 focus:ring-rose-500' : ''}`}
                                            />
                                            {errors.postCode && <p className="text-rose-500 font-medium text-sm mt-1">{errors.postCode.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Country</label>
                                            <input 
                                                type="text" 
                                                disabled={isSubmitted} 
                                                placeholder="Country" 
                                                {...register("country", { required: 'This field is required', pattern: { value: /^[A-Za-z\s]+$/, message: 'Only characters allowed' } })} 
                                                className={`w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 ${errors.country ? 'border-rose-500 focus:ring-rose-500' : ''}`}
                                            />
                                            {errors.country && <p className="text-rose-500 font-medium text-sm mt-1">{errors.country.message}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Phone</label>
                                            <input 
                                                type="text" 
                                                disabled={isSubmitted} 
                                                placeholder="Phone Number" 
                                                {...register("phone", { required: 'This field is required', minLength: { value: 10, message: 'Invalid Phone Number' } })} 
                                                className={`w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 ${errors.phone ? 'border-rose-500 focus:ring-rose-500' : ''}`}
                                            />
                                            {errors.phone && <p className="text-rose-500 font-medium text-sm mt-1">{errors.phone.message}</p>}
                                        </div>
                                    </div>

                                    {!isSubmitted ? (
                                        <button type="submit" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 mt-4 shadow-sm">
                                            Save Address
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-4 mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                            <div className="flex-1">
                                                <p className="font-bold text-emerald-800">{message}</p>
                                                <p className="text-sm text-emerald-600">Your order will be shipped here.</p>
                                            </div>
                                            <button type="button" onClick={handleChange} className="bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Order Summary (Sticky) */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 sticky top-24">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <NotebookText className="w-5 h-5 text-indigo-500" />
                                    Order Summary
                                </h2>

                                <div className="space-y-4 text-slate-600 mb-6 border-b border-slate-100 pb-6">
                                    <div className="flex justify-between items-center">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-slate-900">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Delivery</span>
                                        <span className="font-semibold text-emerald-500 flex items-center gap-2">
                                            <span className="text-slate-400 line-through text-sm">$25.00</span> 
                                            Free
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Handling Fee</span>
                                        <span className="font-semibold text-slate-900">$5.00</span>
                                    </div>
                                    {promoApplies && (
                                        <div className="flex justify-between items-center text-emerald-600">
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-4 h-4" />
                                                Promo Discount
                                            </span>
                                            <span className="font-semibold">-$20.00</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold text-slate-900">Total</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-extrabold text-slate-900">
                                            ${Math.max(totalPrice + 5 - (promoApplies ? 20 : 0), 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Promo Code Section */}
                                <div className="mb-8">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Promo code" 
                                            value={promo} 
                                            onChange={(e) => setPromo(e.target.value.toUpperCase())} 
                                            className="w-full bg-slate-50 uppercase text-sm" 
                                            disabled={promoApplies}
                                        />
                                        <button 
                                            onClick={applyPromo} 
                                            disabled={promoApplies || !promo}
                                            className="bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-semibold transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {error && <p className="text-rose-500 text-sm mt-2 font-medium">{error}</p>}
                                    {promoMsg && !promoApplies && (
                                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                            <Tag className="w-3 h-3 text-emerald-500" />
                                            Use <span className="font-bold text-slate-700">WELCOME20</span> for $20 off
                                        </p>
                                    )}
                                </div>

                                <button 
                                    onClick={redirect} 
                                    disabled={loading || !isSubmitted}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
                                        (!isSubmitted) 
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-white'
                                    }`}
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Proceed to Checkout
                                </button>
                                
                                {!isSubmitted && (
                                    <p className="text-center text-xs text-slate-500 mt-3">
                                        Please save your delivery address first
                                    </p>
                                )}
                                
                                {login && <p className="text-rose-500 font-medium text-center mt-3 text-sm">{login}</p>}
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto">
                    <img src={emptyCart} alt="Empty Cart" className="w-64 h-auto mb-8 opacity-90 transition-transform duration-700 hover:scale-105" />
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Your cart is empty</h2>
                    <p className="text-slate-500 mb-10 max-w-md text-lg">Looks like you haven't made your choice yet. Browse our collections to find something you'll love!</p>
                    <button 
                        onClick={() => navigate('/products')} 
                        className="bg-slate-900 hover:bg-rose-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Explore Products
                    </button>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white px-10 py-12 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-4 transform scale-100 transition-transform animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Secure Checkout
                        </h2>
                        <p className="text-slate-500">
                            Redirecting to payment gateway...
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart