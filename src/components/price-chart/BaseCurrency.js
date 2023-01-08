import React from 'react'
import {useDispatch} from "react-redux"

const BaseCurrencyOptions = () => {
  return (
    <div className='mx-3 my-2'>
    <select className='p-2 font-bold rounded-lg'>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="USD"> USD </option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="INR"> INR </option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="EUR"> EUR </option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="GBP"> GBP </option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="YEN"> CNY </option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="YEN"> JPY </option>
    </select>
    </div>
  )
}

export default BaseCurrencyOptions