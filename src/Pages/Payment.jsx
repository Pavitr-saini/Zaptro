import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Building2, ShieldCheck, ArrowRight } from "lucide-react";

function PaymentMethod() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setLoader(true);
        setTimeout(() => {
            navigate('/order');
        }, 3000); 
    };

    const banks = [
        "State Bank of India",
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "Punjab National Bank",
    ];

    const paymentOptions = [
        { id: "card", title: "Credit / Debit Card", icon: CreditCard },
        { id: "upi", title: "UPI Transfer", icon: Smartphone },
        { id: "net", title: "Net Banking", icon: Building2 },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                <div className="bg-indigo-50 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Secure Payment</h1>
                    <p className="text-slate-500">Choose your preferred payment method below.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Select Payment Method</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {paymentOptions.map((option) => (
                        <div 
                            key={option.id}
                            onClick={() => setPaymentMethod(option.id)}
                            className={`relative cursor-pointer rounded-2xl border-2 p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                                paymentMethod === option.id 
                                ? 'border-indigo-500 bg-indigo-50/50 shadow-md transform scale-[1.02]' 
                                : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'
                            }`}
                        >
                            <option.icon className={`w-8 h-8 ${paymentMethod === option.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <span className={`font-semibold text-center ${paymentMethod === option.id ? 'text-indigo-900' : 'text-slate-600'}`}>
                                {option.title}
                            </span>
                            
                            {/* Selection Indicator */}
                            {paymentMethod === option.id && (
                                <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-1 rounded-full border-2 border-white">
                                    <ShieldCheck className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handlePlaceOrder} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Card Details Details */}
                    {paymentMethod === "card" && (
                        <div className="space-y-5 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Card Number</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    maxLength="16"
                                    className="w-full bg-white border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none tracking-widest text-slate-700 font-medium"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Expiry Date</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className="w-full bg-white border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700 font-medium text-center"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">CVV</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="•••"
                                        maxLength="3"
                                        className="w-full bg-white border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700 font-medium text-center tracking-widest"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* UPI Input */}
                    {paymentMethod === "upi" && (
                        <div className="space-y-5 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">UPI ID / VPA</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="username@bank"
                                    className="w-full bg-white border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700 font-medium"
                                />
                                <p className="text-xs text-slate-500 mt-2">Open your UPI app after clicking 'Place Order' to approve the payment.</p>
                            </div>
                        </div>
                    )} 

                    {/* Net Banking */}
                    {paymentMethod === "net" && (
                        <div className="space-y-5 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Select Bank</label>
                                <select className="w-full bg-white border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700 font-medium cursor-pointer" required>
                                    <option value="" disabled selected>Select from popular banks</option>
                                    {banks.map((bank, index) => (
                                        <option key={index} value={bank}>
                                            {bank}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}   

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>100% Encrypted Checkout</span>
                        </div>
                        <button 
                            type="submit"
                            className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-4 flex items-center gap-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Place Secure Order
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div> 
                </form>
            </div>

            {/* Loading Modal */}
            {loader && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white px-10 py-12 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-4 transform scale-100 transition-transform animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Processing Payment
                        </h2>
                        <p className="text-slate-500">
                            Please do not close or refresh this window...
                        </p>
                    </div>
                </div>
            )}     
        </div>       
    )
}

export default PaymentMethod;