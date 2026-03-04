import axios from 'axios'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCartContext } from '../Context/CartContext'
import { IoArrowBackOutline } from "react-icons/io5";

const Cancel = () => {
  const param =useParams()
 
   console.log(param.id)
   const [cancelItem, setCancelItem] = useState("")
   const getCancelItem = async()=>{
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${param.id}`)
      console.log(res.data)
      setCancelItem(res.data)
    } catch (error) {
      console.log(error);
      
    }
   }
   const cancelOrder=()=>{
          deleteItem(cancelItem.id)
          navigate('/order')
          toast.success("Order Cancel Successfully")
      }
  const { deleteItem } = useCartContext()
  const navigate = useNavigate()
  const [reason, setReason] = useState("");

  const reasons = [
    "I want to change the contact details",
    "I was hoping for a shorter delivery time",
    "I want to change the payment option",
    "I'm worried about the ratings/reviews",
    "My reasons are not listed here",
    "I want to change the delivery address",
    "Price of the product has now decreased",
  ];
   useEffect(() => {
    getCancelItem()
    window.scrollTo(0,0)
   }, [])
   
  return (
    <div className='sm:w-[70vw] sm:m-auto'>
      <h1 className='font-bold px-8 py-5 text-2xl mb-5 flex items-center justify-start gap-2 '><IoArrowBackOutline className='cursor-pointer' onClick={() => navigate(`/order/${cancelItem.id}`)}/>Request Cancellation</h1>
      <div className='flex text-xl justify-center border p-5 rounded-lg mx-4'>
      <div className='px-4 '>
      <p className='line-clamp-1 font-semibold '>{cancelItem.title}</p>
          <p className='font-bold pt-3'>{cancelItem.category}</p>
      <p className=' font-bold py-5 text-2xl'>${cancelItem.price}</p>
      </div>
      <div>
        <img className='w-70  sm:w-40 p-2' src={cancelItem.image} alt="" />
      </div>
      </div>
      {/* Reason section 2 */}
      <div className='px-4 py-8'>
      <div className="w-full  rounded-lg border bg-white p-4">
        <h2 className="mb-4 text-lg sm:text-2xl font-semibold">Reason For Cancellation</h2>

        <div className="space-y-3">
          {reasons.map((item, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center gap-3 text-lg sm:text-xl text-gray-700"
            >
              <input
                type="radio"
                name="cancel-reason"
                value={item}
                checked={reason === item}
                onChange={(e) => setReason(e.target.value)}
                className="h-4 w-4 accent-blue-600"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <button
          disabled={!reason}
          onClick={cancelOrder}
          className={`mt-6 w-full rounded-md py-3 text-lg font-medium text-white
          ${reason ? "bg-red-500 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"}
        `}
        >
          Submit Request
        </button>
      </div>
      </div>
    </div>
  )
}

export default Cancel
