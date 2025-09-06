import React from 'react'
import { getData } from '../context/DataContext'

const FilterSection = ({ search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategoty, handleCategoryChange, handleBrandChange }) => {
  const { categoryOnlyData, brandOnlyData } = getData();

  return (
    <div className='bg-gray-100 mt-8 p-4 rounded-md h-max'>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text" placeholder='Search..' className='bg-white p-2 rounded-md border-gray-400 border-2' />

      {/* category only data */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {
          categoryOnlyData?.map((item, index) => {
            return <div key={index} className='flex gap-2'>
              <input type="checkbox"
                name={item}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
                className='cursor-pointer' />
              <button className='cursor-pointer uppercase'>{item}</button>
            </div>
          })
        }
      </div>

      {/* brand-only data */}
      <h1 className='mt-5 font-semibold text-xl mb-3'>Brands</h1>
      <select name="" id=""
        value={brand}
        onChange={handleBrandChange}
        className='bg-white w-full border-gray-200 border-2 rounded-md'>
        {
          brandOnlyData?.map((item, index) => {
            return <option key={index} value={item}>{item?.toUpperCase()}</option>
          })
        }
      </select>

      {/* price range */}
      <h1 className='mt-3 font-semibold text-xl mb-2'>Price Range</h1>
      <div className='flex flex-col gap-2'>
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        />
      </div>
      <button
        onClick={() => { setSearch(""), setCategoty("All"), setBrand("All"), setPriceRange([0, 5000]) }}
        className='bg-red-500 text-white rounded-md mt-2 px-3 py-1 cursor-pointer '>Reset Filters</button>

    </div>
  )
}

export default FilterSection
