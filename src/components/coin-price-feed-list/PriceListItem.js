import React from 'react'

const PriceListItem = (props) => {
  return (
    <>
    <div>
        <div>
            <p className='font-bold text-gray-800'>{props.coinName}</p>
            <p className='font-bold text-gray-200'>{props.coinMarketCap}</p>
        </div>
        <div>
            {props.percentageChange}
        </div>
    </div>
    </>
  )
}

export default PriceListItem