import React from 'react'
import { useSelector } from 'react-redux'
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'

const CoinsListItem = (props) => {
  // Getting the base currency from the global store
  const baseCurrency = useSelector(selectBaseCurrency)

  return (
    <>
      <div className='flex flex-row justify-between mx-1 shadow-lg hover:shadow-xl bg-white rounded-lg my-1'>
        <div className="flex justify-start">
          <div className="mx-2 my-2 flex flex-col justify-center">
            {/* Rendering the coin image */}
            <img src={props.image} alt={`${props.coinName}-photo`} srcSet="" className='h-10 min-w-fit 2sm:h-6' />
          </div>
          <div className='mx-3 my-3'>

            {/* Rendering the coin name and market cap according to the baseCurrency's symbol*/}

            <p className='font-bold text-gray-800'>{props.coinName}</p>
            <p className='text-gray-400'> Mkt.Cap: {Intl.NumberFormat('en-US', { style: 'currency', currency: baseCurrency.currency }).format(props.coinMarketCap)} </p>
          </div>
        </div>
        <div className='flex flex-col justify-center'>

          {/* rendering green '▲' if daily change in market cap is positive  */}

          {props.percentageChange > 0 && <div className='mx-4 flex flex-row align-center font-bold text-green-600'>
            <div className="before:content-['▲'] border-green-600 mx-1">
            </div>
            <div>
              {props.percentageChange.toFixed(4)} %
            </div>
          </div>}

          {/* rendering red '▼' if daily change in market cap is negative  */}

          {props.percentageChange < 0 && <div className='mx-4 flex flex-row align-center font-bold text-red-500'>
            <div className="before:content-['▼'] border-red-500 mx-1">
            </div>
            <div>
              {props.percentageChange.toFixed(3)} %
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default CoinsListItem