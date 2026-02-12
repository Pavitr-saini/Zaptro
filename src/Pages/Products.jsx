import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../assets/Loading.gif'
import { getData } from '../Context/DataContext.jsx';
import ProductCard from '../Components/ProductCard.jsx';
import { Divide } from 'lucide-react'
import Pagination from '../Components/Pagination.jsx';
import FilterSection from '../Components/FilterSection.jsx'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MobileFilter from '../Components/MobileFilter.jsx';
function Products() {
  const {data,FetchAllProducts} = getData()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0,1000])
  const [page, setPage] = useState(1) 
  const [openFilter, setOpenFilter] = useState(false)
  useEffect(() => {
    FetchAllProducts();
    window.scrollTo(0, 0)
    },[]);
    const handleCaTegoryChange = (e) => {
      setCategory(e.target.value)
      setPage(1)
     setOpenFilter(false)
    }
  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0)
  }
  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]

  )
  
  const dynamicPage = Math.ceil(data?.length / 8)
  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} search={search} setSearch={setSearch} category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} handleCaTegoryChange={handleCaTegoryChange} />
        {
          data?.length > 0 ?(
            <>
           <div className='flex gap-8'>
            <FilterSection search={search} setSearch={setSearch} category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange } handleCaTegoryChange={handleCaTegoryChange}/>
            {
              filteredData?.length > 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10'>
                        {
                        filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                            return <ProductCard key={index} product={product} />
                          })
                        }
                      </div>
                      <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                </div>
              ):(
                      <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                        <DotLottieReact
                          src="https://lottie.host/5f300630-796c-4022-9545-bb585bdc3607/9okBVu2JHJ.lottie"
                          loop
                          autoplay
                        />   
                </div>
              )
            }
            {/* <div className='grid grid-cols-4 gap-7 mt-10'>
              {
                data?.slice(page * 8 - 8, page *8).map((product, index) => {
                  return <ProductCard key={index} product={product}/>
              })
              }
            </div> */}
           </div>
           {/* <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} /> */}
            </>
          ):(
              <div className='flex items-center justify-center h-[400px]'>
                {/* <video muted autoPlay loop>
                  <source src={Loading} type='video/gif' />
                </video> */}
                Finding Product....
              </div>
          )
        }
      </div>
    </div>
  )
}

export default Products