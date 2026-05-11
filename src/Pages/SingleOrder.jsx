import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ChevronLeft, Package, CheckCircle2, Clock, Info, HelpCircle, XCircle } from 'lucide-react'
import { useCartContext } from '../Context/CartContext'
import { toast } from "react-toastify"
import Loader from "/src/assets/Loader.json"
import Lottie from "lottie-react"

function SingleOrder() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    
    const { deleteItem } = useCartContext()
    const navigate = useNavigate()
    const param = useParams()
    const [singleOrder, setSingleOrder] = useState("")

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/${param.id}`)
            
            setSingleOrder(res.data)
        } catch (error) {
            console.log(error);
        }
    }
   
    useEffect(() => {
        getSingleProduct()
        window.scrollTo(0, 0)
    }, [])

    const steps = [
        `Order placed at ${formattedDate}`,
        "Packed",
        "Shipped",
        "Out for delivery",
        `Delivered by Tomorrow 8 am - 9 pm `
    ];

    const cancelOrder = () => {
        deleteItem(singleOrder.id)
        navigate('/order')
        toast.success("Order Cancelled Successfully")
    }
    
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button 
                onClick={() => navigate('/order')} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors mb-8 px-2 py-1 rounded-lg hover:bg-slate-100 w-fit"
            >
                <ChevronLeft className="w-5 h-5" /> 
                Back to Orders
            </button>

            {singleOrder ? (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Column - Product & Timeline */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* Product Hero Card */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
                            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-slate-50 rounded-xl p-4 flex-shrink-0 flex items-center justify-center">
                                <img 
                                    className="max-h-full max-w-full object-contain" 
                                    src={singleOrder.image ? singleOrder.image : singleOrder.image} 
                                    alt={singleOrder.title} 
                                />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-sm font-bold tracking-wider text-rose-500 uppercase mb-2">
                                    {singleOrder.category}
                                </p>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">
                                    {singleOrder.title}
                                </h1>
                                <p className="text-3xl font-extrabold text-slate-800">
                                    ${singleOrder.price}
                                </p>
                            </div>
                        </div>

                        {/* Order Status Timeline */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <Package className="w-6 h-6 text-indigo-500" />
                                Order Status
                            </h2>
                            <div className="ml-2">
                                {steps.map((title, index) => {
                                    // Simulation: first step completed
                                    const isCompleted = index === 0;
                                    const isNext = index === 1;

                                    return (
                                        <div key={index} className="flex gap-6 relative">
                                            {/* Line */}
                                            {index !== steps.length - 1 && (
                                                <div className={`absolute left-[15px] top-8 bottom-[-16px] w-[2px] ${isCompleted ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                                            )}
                                            
                                            {/* Circle */}
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                                    isCompleted 
                                                        ? 'bg-indigo-500 border-indigo-500 text-white' 
                                                        : isNext 
                                                            ? 'bg-white border-indigo-500 text-indigo-500' 
                                                            : 'bg-white border-slate-200 text-slate-300'
                                                }`}>
                                                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="w-2.5 h-2.5 rounded-full bg-current" />}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="pb-8 pt-1">
                                                <p className={`font-semibold ${isCompleted ? 'text-slate-900' : isNext ? 'text-indigo-600' : 'text-slate-500'}`}>
                                                    {title}
                                                </p>
                                                {isCompleted && index === 0 && (
                                                    <p className="text-sm text-slate-500 mt-1">We have received your order.</p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-100">
                                <button 
                                    onClick={() => navigate('/help')}
                                    className="flex items-center justify-center gap-2 flex-1 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all shadow-sm"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                    Need Help?
                                </button>
                                <button 
                                    onClick={cancelOrder}
                                    className="flex items-center justify-center gap-2 flex-1 bg-white border border-rose-200 hover:border-rose-300 hover:bg-rose-50 text-rose-600 px-6 py-3 rounded-xl font-medium transition-all shadow-sm"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Price Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 sticky top-24">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                                Order Summary
                            </h2>
                            
                            <div className="space-y-4 text-slate-600 mb-6">
                                <div className="flex justify-between items-center">
                                    <span>Item Price</span>
                                    <span className="font-semibold text-slate-900">${singleOrder.price}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Delivery Charges</span>
                                    <span className="font-semibold text-emerald-500">Free</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1">
                                        Convenience Fee
                                        <Info className="w-4 h-4 text-slate-400" />
                                    </span>
                                    <span className="font-semibold text-slate-900">$0</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 border-dashed py-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-slate-900">Total Amount</span>
                                    <span className="text-2xl font-extrabold text-slate-900">
                                        ${singleOrder.price}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Payment Method</span>
                                    <span className="font-bold text-slate-900">Prepaid</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <Lottie
                        animationData={Loader}
                        loop={true}
                        className="w-40 h-40"
                    />
                    <p className="mt-4 text-lg font-medium text-slate-500">Loading your order details...</p>
                </div>
            )}
        </div>
    )
}

export default SingleOrder