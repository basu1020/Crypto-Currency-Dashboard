import React, { useState } from 'react'
import BaseCurrencyOptions from './BaseCurrency'
import SearchBar from './SearchBar'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { CurrencyData } from "./CurrencyData"

const PriceChart = () => {
  const [timehorizon, setTimeHorizon] = useState('1D')
  const [crypto, setCrypto] = useState('Bitcoin')

  const onClickChangeTimeHorizon = (e) => {
    setTimeHorizon(e.target.value)
  }

  const [currencyData, setCurrencyData] = useState({
    labels: CurrencyData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: CurrencyData.map((data) => data.userGain),
        backgroundColor: [
          "red",
        ],
      },
    ],
  })

  return (
    <>
      <div className='flex flex-row '>
        <BaseCurrencyOptions />
        <SearchBar />
      </div>
      <div className='bg-white rounded-lg h-96 mx-3 my-2'>
        <div className="flex flex-row w-full">
          <div className="flex flex-row w-4/6 justify-center">

            {["1D", "1W", "1M", "6M", "1Y"].map(element => {
              return <button
                className={timehorizon === element ? 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1 border-blue-500 text-blue-500' : 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1'}
                onClick={onClickChangeTimeHorizon} value={element}>
                {element}
              </button>
            })}

          </div>

          <div className="flex flex-row w-2/6 justify-center">
            <select name="" id="coinSelector" className='px-2 mx-1 my-1 font-semibold bg-gray-100 rounded-md'>
              <option value="">Bitcoin</option>
            </select>
            <select name="" id="chartSelector" className='px-2 mx-1 my-1 font-semibold bg-gray-100 rounded-md'>
              <option value="">Line Chart</option>
            </select>
          </div>

        </div>

        <div className="flex flex-row justify-between">
          <p className='mx-3 font-semibold'>USD</p>
          <p className='mx-3 font-semibold'>{crypto}</p>
        </div>

        <div className='py-1 px-1 h-5/6 flex flex-col justify-center'>
          <Line data={currencyData} />
        </div>
      </div>
    </>
  )
}

export default PriceChart