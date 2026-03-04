import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../Components/ProductListView.jsx';
import Loader from "/src/assets/Loader.json"
import Lottie from "lottie-react"


function CategoryProduct() {
    const params =useParams()
    const category = params.category
    const navigate =useNavigate()
    

    const [searchData, setSearchData] = useState([])
    
    const getFilterData = async ()=>{
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
            const data = res.data
            
            
            
            
            setSearchData(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
      getFilterData()
        window.scrollTo(0, 0)
    }, [])
    
  return (
    <div>
        {
            searchData.length > 0 ? (
                  <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
                      <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft /> Back</button>
                      {
                        searchData.map((product ,index)=>{
                            return <ProductListView key={index} product={product} />
                        })
                      }
                </div>
              ) : (<div className="flex flex-col items-center justify-center h-[70vh]">
                  <Lottie
                      animationData={Loader}
                      loop={true}
                      className="w-32 h-32"
                  />
                  <p className="mt-4 text-gray-600">Loading products...</p>
              </div>)
        }
    </div>
  )
}

export default CategoryProduct