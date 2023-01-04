import React from 'react'

const BaseCurrencyOptions = () => {
  return (
    <div className='mx-3 my-2'>
    <select className='p-2 text-bold rounded-lg'>
        <option value="USD"> USD </option>
        <option value="INR"> INR </option>
        <option value="YEN"> YEN </option>
        <option value="EUR"> EUR </option>
        <option value="GBP"> GBP </option>
    </select>
    </div>
  )
}

export default BaseCurrencyOptions