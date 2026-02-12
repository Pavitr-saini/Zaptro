import React from 'react'
import { getData } from '../Context/DataContext.jsx';
export default function FilterSection({search ,setSearch,category,setCategory,priceRange,setPriceRange ,handleCaTegoryChange}) {
     const {categoryOnlyData } = getData()
  return (
      <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
          <input type="text" placeholder='Search..' onChange={(e)=>setSearch(e.target.value)} value={search} className='bg-white p-2 rounded-md border-gray-400 border-2' />
          <h1 className='mt-5 font-semibold text-xl'>Category</h1>
          <div className='flex flex-col gap-2 mt-3'>
              {
                  categoryOnlyData?.map((item, index) => {
                      return <div key={index} className='flex gap-2'>
                          <input type="checkbox" name={item} checked={category === item} value={item} onChange={handleCaTegoryChange}/>
                          <button className='cursor-pointer uppercase'>{item}</button>
                      </div>
                  })
              }
          </div>
          <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
          <div className='flex flex-col gap-2'>
              <label htmlFor="">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <input type="range" min="0" max="1000" name="" id="" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className='transition-all' />
            
          </div>
          <button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'
              onClick={() => { setSearch(''); setCategory('All'); setPriceRange([0, 1000]) }}
          >Reset Filters</button>
    </div>
  )
}
