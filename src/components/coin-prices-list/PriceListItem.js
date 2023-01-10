import React, { useEffect } from 'react'

const PriceListItem = (props) => {
  return (
    <>
      <div className='flex flex-row justify-between mx-1  shadow-lg hover:shadow-xl bg-white rounded-lg my-1'>
        <div className="flex justify-start">
          <div className="mx-2 my-2 flex flex-col justify-center">
            <img src={props.image} alt={`${props.coinName}-photo`} srcset="" className='h-10' />
          </div>
          <div className='mx-3 my-3'>
            <p className='font-bold text-gray-800'>{props.coinName}</p>
            <p className='text-gray-400'>Mkt.Cap: {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.coinMarketCap)}</p>
          </div>
        </div>
        <div className={
          props.percentageChange > 0 ? 'mx-4 flex flex-col justify-center font-bold text-green-600' : 'mx-4 flex flex-col justify-center font-bold text-red-500'}>
          {props.percentageChange} %
        </div>
      </div>
    </>
  )
}

export default PriceListItem