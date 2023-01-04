import React, { useEffect } from 'react'

const PriceListItem = (props) => {
  return (
    <>
    <div className='flex flex-row justify-between mx-1  shadow-md hover:shadow-lg'>
        <div className='mx-3 my-3'>
            <p className='font-bold text-gray-800'>{props.coinName}</p>
            <p className='font-bold text-gray-500'>Mkt.Cap: ${props.coinMarketCap}</p>
        </div>
        <div className={props.percentageChange > 0 ? 'mx-4 font-bold text-green-600':'mx-4 font-bold text-red-500'}>
            {props.percentageChange}
        </div>
    </div>
    </>
  )
}

export default PriceListItem