import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function PaymentMethod() {
   
    const navigate =useNavigate()
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loader, setLoader] = useState(false)
    const handlePlaceOrder = () => {
        
        setLoader(true)
        setTimeout(() => {

            navigate('/Order')
        }, 5000); // 5 seconds
    
    };
    const banks = [
        "State Bank of India",
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "Punjab National Bank",
    ];
    

    return (
        <>
        <h3 className="text-xl font-semibold mx-5 mt-8 mb-4">Payment Method</h3>

          <div className="space-y-3 mx-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit / Debit Card
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI
            </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={paymentMethod === "net"}
                        onChange={() => setPaymentMethod("net")}
                    />
                    Net Banking
                </label>

           
          </div>

          {/* Card Details */ }
    {
        paymentMethod === "card" && (
            <div className="mt-6 mx-5 space-y-4">
                <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border p-3 rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Expiry Date"
                        className="border p-3 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        className="border p-3 rounded-lg"
                    />
                </div>
            </div>
        )
    }

    {/* UPI Input */ }
    {
        paymentMethod === "upi" && (
            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Enter UPI ID"
                    className="w-full border p-3 rounded-lg"
                />
            </div>
        )
    } 
    {
        paymentMethod === "net" && (
                    <select
                        
                        
                        className=" m-3 p-3 border rounded-lg mb-4"
                    >
                        <option value="">Select Your Bank</option>

                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>
                                {bank}
                            </option>
                        ))}
                    </select>
        )
    }   
            <div className="flex justify-center mt-8">
                <button onClick={handlePlaceOrder}
                    className="bg-red-500 hover:bg-red-700 text-white px-10 py-3 my-5 rounded-lg font-semibold transition duration-300 shadow-md"
                >Place Order</button>
            </div> 
            {
                loader && <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                    <div className="bg-white px-10 py-8 rounded-2xl shadow-2xl text-center">

                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                        <h2 className="text-xl font-semibold">
                            Placing Order...
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Please wait while we Place your Order.
                        </p>

                    </div>

                </div>
            }     
 </>       
)
}

export default PaymentMethod;