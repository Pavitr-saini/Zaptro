import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums.jsx'
import { IoCartOutline } from 'react-icons/io5'
import { useCartContext } from '../Context/CartContext.jsx';
import Loader from "/src/assets/Loader.json"
import Lottie from "lottie-react"
import { useWishlist } from '../Context/WishlistContext.jsx'
import { FaHeart } from 'react-icons/fa'


function SingleProduct() {
    const param = useParams()
    const [singleProduct, setSingleProduct] = useState("")
     const {addToCart} = useCartContext()
      const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
         
         const handleWishlist = () => {
             if (isInWishlist(singleProduct.id)) {
                 removeFromWishlist(singleProduct.id);
             } else {
                 addToWishlist(singleProduct);
             }
         };

  
    const getSingleProduct = async ()=>{
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/${param.id}`)
         
            const product =res.data;
            setSingleProduct(product)    
         
          

             
              
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        getSingleProduct()
    }, [])
  return (
    <>
     {
       singleProduct ? <div className='px-4 pb-4 md:px-0'>
                <Breadcrums title={singleProduct.title} />
          <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Product image */}
<div className='w-full'>
              <img src={singleProduct.image} alt={singleProduct.title} className='rounded-2xl w-full object-cover' />
              
</div>
{/* Product details */}
            <div className='flex flex-col gap-6'>
            
            
              <h1 className='text-2xl font-bold text-gray-800'>{singleProduct.title}</h1>
              <div className='text-grey-700'>{singleProduct.category.toUpperCase()}</div>
              <p className='text-xl text-red-500 font-bold'>${singleProduct.price}</p>
              <p className='text-gray-600'> {singleProduct.description}</p>
              {/* <div className='text-grey-700'> Rating {singleProduct.rating.rate}</div> */}
             <div>
                <h1 className='text-2xl font-bold '>Customer Rating</h1>
                <p className='mx-2'>{singleProduct.rating.rate} out of 5 <span>({singleProduct.rating.count} )</span></p>
             </div>
              
            
              {/* Quantity selector */}
              <div className='flex item-centre gap-4'>
                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                <input type="number" defaultValue={1} min={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500' />
              </div>
              <div className='flex gap-4 mt-4'>
                <button onClick={()=>addToCart(singleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'><IoCartOutline className='w-6 h-6' /> Add to Cart</button>
              </div>
</div>
                </div>
              </div>
               :
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <Lottie
              animationData={Loader}
              loop={true}
              className="w-32 h-32"
            />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
     }
    </>
  )
}

export default SingleProduct