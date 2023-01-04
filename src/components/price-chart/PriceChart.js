import React from 'react'
import BaseCurrencyOptions from './BaseCurrency'
import SearchBar from './SearchBar'

const PriceChart = () => {
  return (
    <>
    <div className='flex flex-row '>
    <BaseCurrencyOptions/>
    <SearchBar/>
    </div>
    <div className='bg-white rounded-lg h-80 mx-3 my-2'>
    </div>
    </>
  )
}

export default PriceChart