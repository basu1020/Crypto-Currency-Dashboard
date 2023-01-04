import React from 'react'

const Portfolio = () => {
  return (
    <>
    <div className='mx-2 my-2 w-1/2 bg-white rounded-lg px-2 py-2 shadow-lg'>

    <div className="flex flex-row justify-between font-bold">
      <h2 className="font-sans text-xl mx-2">Portfolio</h2>
      <p className='text-xl text-gray-500'>Total Value</p>
    </div>
    <div id="Portfolio-pie-chart" className='h-40'>
    </div>
    </div>
    </>
  )
}

export default Portfolio