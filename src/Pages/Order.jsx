import React, { useEffect } from 'react'
import { useCartContext } from '../Context/CartContext'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import order from "../assets/order.png"


const Order = () => {
    const {user} =useUser()
    const {cartItem} = useCartContext()
    const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div>
      {
        cartItem.length > 0 ? (<div>
                  <h1 className='font-bold text-2xl my-7 '>{user?.firstName} Order Summary ({cartItem.length})</h1>    
          {
            cartItem.map((item,index) =>(
                <div key={index} className='space-y-4 mt-2 rounded-md'>
                         <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
                             <img src={item.image} alt={item.title} className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' />
                             <div className='space-y-2'>
                                 <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]'>{item.title}</h1>
                                 <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{item.price}</span> </p>
                                <p className='text-sm'>FREE delivery <span className='font-semibold'>By Zaptro</span> <br />
                                Delivered by <span className='font-semibold'>Tomorrow 8 am - 9 pm</span></p>
                            <p className='text-sm'>Delivered To <span className='font-semibold'>{user?.fullName}</span></p>
                            <button onClick={() => navigate(`/order/${item.id}`)}
                                className=" bg-red-500 hover:bg-red-700 text-white px-10 py-3 my-5 rounded-lg font-semibold transition duration-300 shadow-md"
                            >
                                View Order detail
                            </button>
                             </div>
                        
                         </div>
                         
    </div>  
    
            ))
          }
        </div>):(<div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
                  <img  src={order} alt=""  className='w-90'/>
                  <button onClick={() => navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
                </div>)
        
      }
    </div>
  )
}

export default Order


// cartItem.map((item, index) => (
//     <div key={index} className='space-y-4 mt-2 rounded-md'>
//         <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
//             <img src={item.image} alt={item.title} className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' />
//             <div className='space-y-2'>
//                 <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]'>{item.title}</h1>
//                 <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{item.price}</span> </p>
//                 <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />
//                     Or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span></p>
//                 <button className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
//             </div>
//         </div>
//     </div>

// ))}
//       </div >
  