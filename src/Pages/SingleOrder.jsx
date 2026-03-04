import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Divide } from 'lucide-react'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining, MdDiscount } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';

import Loader from "/src/assets/Loader.json"
import Lottie from "lottie-react"
import { ChevronLeft } from 'lucide-react'
import { useCartContext } from '../Context/CartContext'

import { toast } from "react-toastify";


function SingleOrder() {
    
    const today = new Date();


    const formattedDate = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    
    const {deleteItem  } =useCartContext()
    const navigate =useNavigate()
    
    // const add = JSON.parse(localStorage.getItem("orderData"));
    
    const param = useParams()
    const [singleOrder, setSingleOrder] = useState("")
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/${param.id}`)
            const order = res.data;
            setSingleOrder(order)

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
   const cancelOrder=()=>{
       deleteItem(singleOrder.id)
       navigate('/order')
       toast.success("Order Cancel Successfully")
   }
    
  return (
   <div>
    <button onClick={() => navigate('/order')} className='bg-gray-800 mb-5 text-white
    m-5 px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft /> Back</button>
    {
              singleOrder ? <div className='flex flex-col items-center'>
                  <div className='w-[96vw] sm:w-[50vw] border p-14 m-10 '>
               <div className='flex items-center gap-10 '>
               <div>
                <p>{singleOrder.title}</p>
               
                <p className='font-bold py-4'>{singleOrder.category.toUpperCase()}</p>
                <p className='text-red-500 font-extrabold'>${singleOrder.price}</p>                 
                </div>
                          <img className='w-[30vw] sm:w-[20vw]' src={singleOrder.image} alt={singleOrder.title}/>
                
               </div>
                      <div className="flex flex-col gap-0 py-8">

                          {steps.map((title, index) => (
                              <div key={index} className="flex items-start gap-4">

                                  {/* left side (circle + line) */}
                                  <div className="flex flex-col items-center">

                                      {/* circle */}
                                      <div
                                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${index === 0
                                                  ? "bg-blue-500 border-blue-500"
                                                  : "bg-white border-gray-300"
                                              }`}
                                      />

                                      {/* line */}
                                      {index !== steps.length - 1 && (
                                          <div className="w-[2px] h-8 bg-gray-300" />
                                      )}
                                  </div>

                                  {/* text */}
                                  <p className="text-sm pt-1 font-bold">{title}</p>
                              </div>
                          ))}

                      </div>
                      <div className='flex justify-evenly flex-col lg:flex-row'>
                      <div className='flex items-center justify-center'>
                          <button onClick={()=>{navigate('/help')}}
                              className="bg-red-500 hover:bg-red-700 text-white px-10 py-3 rounded-lg font-semibold transition duration-300 shadow-md"
                          >Need Help</button>
                      </div>
                          <div className='flex items-center justify-center '>
                              <button onClick={()=>navigate(`/cancel/${singleOrder.id}`)}
                                  className="bg-red-500 hover:bg-red-700 text-white px-10 py-3 my-5 rounded-lg font-semibold transition duration-300 shadow-md"
                              >Cancel Order</button>
                          </div>
                      </div>
               </div>
                  <div className='w-[96vw] sm:w-[50vw] border p-5 m-10'>
            <h1 className='text-gray-800 font-bold text-xl'>Price details</h1>
                            <div className='flex justify-between items-center p-1'>
                              <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items Price</h1>
                              <p className='font-bold'>${singleOrder.price}</p>
                            </div>
                      <div className='flex justify-between items-center p-1'>
                          <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery Charges</h1>
                          <p className='font-bold'>$<span className='text-red-500 font-bold'>Free</span></p>
                      </div>
                      <div className='flex justify-between items-center p-1'>
                          <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Convenience Fees</h1>
                          <p className='font-bold'>${0}</p>
                      </div>
                      <hr className='text-gray-300 mt-2' />
                      <div className='flex justify-between items-center p-1'>
                          <h1 className='flex gap-1 items-center text-gray-700'><span></span>Total Amount</h1>
                          <p className='font-bold'>${singleOrder.price}</p>
                      </div>
                      <hr className='text-gray-300 mt-2' />
                      <div className='flex justify-between items-center p-1 '>
                          <h1 className='flex gap-1 items-center text-gray-700'><span></span>Payment Method</h1>
                          <p className=''>Prepaid</p>
                      </div>
                      {/* {add && <p>{add.address}</p>} */}
                     
          </div> 
            
        </div>:<div>
                      <div className="flex flex-col items-center justify-center h-[70vh]">
                          <Lottie
                              animationData={Loader}
                              loop={true}
                              className="w-32 h-32"
                          />
                          <p className="mt-4 text-gray-600">Loading products...</p>
                      </div>
        </div>
    }
    </div>
  )
}

export default SingleOrder