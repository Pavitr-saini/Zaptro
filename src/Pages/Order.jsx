import React, { useEffect } from 'react'
import { useCartContext } from '../Context/CartContext'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { PackageOpen, ChevronRight, Truck } from 'lucide-react'
import orderImg from "../assets/order.png"

const Order = () => {
    const { user } = useUser()
    const { cartItem } = useCartContext()
    const navigate = useNavigate()
  
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {cartItem.length > 0 ? (
                <div>
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {user?.firstName}'s Orders
                            <span className="ml-3 text-lg font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                {cartItem.length} {cartItem.length === 1 ? 'order' : 'orders'}
                            </span>
                        </h1>
                    </div>
                    
                    <div className="space-y-6">
                        {cartItem.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row gap-6 relative group">
                                
                                {/* Image Container */}
                                <div className="w-full md:w-48 h-48 bg-slate-50 rounded-xl p-4 flex-shrink-0 flex items-center justify-center cursor-pointer overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                
                                {/* Order Details */}
                                <div className="flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h2 
                                                className="font-bold text-lg md:text-xl text-slate-800 line-clamp-2 hover:text-rose-600 transition-colors cursor-pointer mb-2 pr-8"
                                                onClick={() => navigate(`/product/${item.id}`)}
                                            >
                                                {item.title}
                                            </h2>
                                        </div>
                                        <p className="font-extrabold text-2xl text-slate-900 mb-4">${item.price}</p>
                                        
                                        <div className="bg-slate-50 p-4 rounded-xl space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Truck className="w-4 h-4 text-emerald-500" />
                                                <span>FREE delivery <span className="font-semibold text-slate-900">By Zaptro</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 pl-6">
                                                <span>Estimated delivery by <span className="font-semibold text-slate-900">Tomorrow 8 am - 9 pm</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 pl-6 border-t border-slate-200 pt-2 mt-2">
                                                <span>Deliver to: <span className="font-semibold text-slate-900">{user?.fullName}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex md:justify-end">
                                        <button 
                                            onClick={() => navigate(`/order/${item.id}`)}
                                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            View Order Details
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto">
                    <div className="bg-indigo-50 p-6 rounded-full mb-6">
                        <PackageOpen className="w-16 h-16 text-indigo-400" />
                    </div>
                    <img src={orderImg} alt="No Orders" className="w-48 h-auto opacity-80 mb-6 hidden" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">No active orders</h2>
                    <p className="text-slate-500 mb-8 max-w-md">Looks like you don't have any orders yet. Discover our latest products and treat yourself!</p>
                    <button 
                        onClick={() => navigate('/products')} 
                        className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    )
}

export default Order