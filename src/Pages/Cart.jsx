import React from 'react'
import { useCartContext } from '../Context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining, MdDiscount } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"



function Cart() {
  const {cartItem,updateQuantity,deleteItem} =useCartContext()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [address, setAddress] = useState("")
  
  const {
    register,
    handleSubmit,
    
    formState: { errors  },
  } = useForm()
 async function onSubmit (data){
  await new Promise((resolve) => setTimeout(resolve ,1000));
    console.log("Submit" ,data);
    setAddress(data);
    setIsSubmitted(true)
    setMessage("Address Saved")
  
   
  } 
  // localStorage.setItem("orderData", JSON.stringify(address));
  // navigate("/singleOrder");
 const handleChange= ()=>{
  setIsSubmitted(false)
  
 }
  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
 
  const {user} = useUser()
  const navigate =useNavigate()
  const [promo, setPromo] = useState("")

  const [error, setError] = useState("")
 const [promoMsg, setPromoMsg] = useState(true)
 const [message, setMessage] = useState("")
 const [promoApplies, setPromoApplies] = useState(false)
 const [loading, setLoading] = useState(false)
 const [login, setLogin] = useState("")
  const applyPromo =()=>{
    if(promo == "WELCOME20"){
         setPromoMsg(false)
      setError("") 
      setPromoApplies(true)
    } else{
      setPromoMsg(true)
      setPromoApplies(false)
     setError("Promo code not Valid")
    }
  };
  // const totalPrice = cartItem.reduce((total ,item)=> total + item.price * item.quantity ,0)
 const redirect =()=>{
  if(user){
   setLoading(true);

   setTimeout(() => {
     navigate("/payment");
   }, 3000);
  }
  else{
    setLogin("Please Login to checkout")
  }
  }


  
 
  return (
    
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
    
 {
  cartItem.length > 0 ? <div>
          <h1 className='font-bold text-2xl '>{user?.firstName} Cart ({cartItem.length})</h1>
          
          <div>
            <div className='mt-10'>
            {cartItem.map((item,index)=>{
              return <div key={index} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
              <div className='flex items-center gap-4'>
               
                <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md' />
                <div>
                    <h1 className='md:w-[300px] line-clamp-2'>{item.title}</h1>
                    <h1 className='md:w-[300px] line-clamp-2'>{item.category.toUpperCase()}</h1>
                    <p className='text-red-500 font-semibold text-lg'>${item.price *item.quantity}</p>
                    {/* <p>{totalItem}</p> */}
                </div>
              </div>
                <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
             <button onClick={()=> updateQuantity(item.id,"decrease")} className='cursor-pointer'>-</button>
             <span>{item.quantity}</span>
             <button onClick={()=> updateQuantity(item.id,"increase")} className='cursor-pointer'>+</button>
              </div>
                <span onClick={()=>{deleteItem(item.id),toast.success("Product remove from Cart")}}  className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                  <FaRegTrashAlt  className='text-red-500 text-2xl cursor-pointer' />
                </span>
             </div>
             
            })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Full Name</label>
                    <input type="text" disabled={isSubmitted} placeholder='Enter your name' className='p-2 rounded-md' value={user?.fullName}/>
                </div> 
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Address</label>
                    <input type="text" disabled={isSubmitted} placeholder='Enter your address' {...register("address", { required: 'This field is required', minLength: { value: 10, message: 'Enter Complete address.' }} )} className='p-2 rounded-md'  />
                    {errors.address && <p className='text-red-500 font-semibold text-sm'>{errors.address.message}</p>}
                </div> 
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">State</label>
                      <input type="text" disabled={isSubmitted} placeholder='Enter your state' {...register("state", { required: 'This field is required', pattern: { value: /^[A-Za-z]+$/, message: 'only Character allowed.' } })} className='p-2 rounded-md w-full'  />
                      {errors.state && <p className='text-red-500 font-semibold text-sm'>{errors.state.message}</p>}

                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">PostCode</label>
                      <input type="text" disabled={isSubmitted} placeholder='Enter your postcode' {...register("postCode", { required: 'This field is required', pattern: { value: /^[0-9]+$/, message: 'Only Numbers allowed'}, minLength: { value: 6, message: 'Enter a valid PostCode.' }, maxLength: { value: 6, message: 'Enter a Valid Postcode' } })} className='p-2 rounded-md w-full'  />
                      {errors.postCode && <p className='text-red-500 font-semibold text-sm'>{errors.postCode.message}</p>}
                  </div>
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Country</label>
                      <input type="text" disabled={isSubmitted} placeholder='Enter your country' {...register("country", { required: 'This field is required', pattern: { value: /^[A-Za-z]+$/, message: 'Only Character allowed .' } })} className='p-2 rounded-md w-full'  />
                      {errors.country && <p className='text-red-500 font-semibold text-sm'>{errors.country.message}</p>}
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Phone No</label>
                      <input type="text" disabled={isSubmitted} placeholder='Enter your Number' {...register("phone", { required: 'This field is required', pattern: { value: /^[0-9]+$/, message: 'Only Number allowed' }, minLength:{ value:10, message: 'Enter a valid Phone No..'}, maxLength: {value:10 , message:'Enter a Valid Phone No.'}  })} className='p-2 rounded-md w-full' />
                      {errors.phone && <p className='text-red-500 font-semibold text-sm'>{errors.phone.message}</p>}
                  </div>
                </div>
                  <button  hidden={isSubmitted} type='submit' className={`bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer` }>Submit</button>
                  
                  {isSubmitted ? <div>
                    <button onClick={handleChange} className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Change Address</button>
                    {message && <p className='font-bold py-2 px-3'>{message}</p>}
                  </div>:<div>
                      
                  </div>
                  }
                {/* <div className='flex items-center justify-center w-full text-gray-700'>
                  ---------OR-----------
                </div>
                <div className='flex justify-center'>
                  <button  className='bg-red-500 text-white px-3 py-2 rounded-md'>Detect Location</button>
                </div> */}
              </div>
              </form>
              <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
                <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items total</h1>
                  <p>${totalPrice}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery Charge</h1>
                  <p className='text-red-500 font-semibold'><span className='text-gray-600 line-through'>$25</span> FREE</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling Charge</h1>
                  <p className='text-red-500 font-semibold'>$5</p>
                </div>
                {/* { promoApplies && (
                  <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'><span><MdDiscount/></span>Promo Discount</h1>
                    <p className='text-red-500  font-semibold'>$20</p>
                  </div>
                )} */}
                <hr className='text-gray-200 mt-2' />
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-lg'>Grand total</h1>
                  <p className='font-semibold text-lg'>${totalPrice + 5}</p>
                </div>
                <div>
                  <hr className='text-gray-200 mt-2' />
                  {promoApplies && (
                    <div className='flex justify-between items-center'>
                      <h1 className='flex gap-1 items-center text-gray-700'><span><MdDiscount /></span>Promo Discount</h1>
                      <p className='text-red-500  font-semibold'><span className='text-black text-2xl'>-</span>$20</p>
                    </div>
                  )}
                  {promoApplies && (
                    <div className='flex justify-between items-center'>
                      <h1 className='font-semibold text-lg'>Discounted Price</h1>
                      <p className='text-red-500 font-semibold text-lg'>${Math.max(totalPrice - 15,0)}</p>
                    </div>
                  )}
                  
                  <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                  
                  <div className='flex gap-3'>
                    <input type="text" placeholder='Enter code' value={promo} onChange={(e)=>{setPromo(e.target.value)}} className='p-2 rounded-md w-full' />
                    <button onClick={applyPromo} className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
                    </div>
                  {
                    error && <p className='text-red-700'>{error}</p>
                  }
                  {promoMsg && (
                    <p className=' text-sm my-1'>Use <span className='font-bold'>"WELCOME20"</span> to get $20 OFF</p>
                  )}
                </div>
                <button onClick={redirect} className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'>Proceed to Checkout</button>
                {
                  login && <p className='font-semibold text-red-500  '>{login}</p>
                }
              </div>
              {
                loading && <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                  <div className="bg-white px-10 py-8 rounded-2xl shadow-2xl text-center">

                    {/* Spinner */}
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                    <h2 className="text-xl font-semibold">
                      Redirecting to Payment Page...
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Please wait while we prepare your checkout.
                    </p>

                  </div>

                </div>
              }
            </div>
          </div>
        </div> : <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="" className='w-[400px]' />
          <button onClick={() => navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
        </div>
 }
   
    </div>
        
  )

}

export default Cart