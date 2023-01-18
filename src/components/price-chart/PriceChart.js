import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseCurrencyOptions from './BaseCurrency'
import SearchBar from './SearchBar'
import { Line, Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { CurrencyData } from "./CurrencyData"
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'
import { selectCoinsList } from '../../globalStates/coinsListSlice'
import { selectChartList, selectChartListStatus, fetchCoinData, reFetch } from '../../globalStates/currencyChartDataSlice'

const PriceChart = () => {
  const baseCurrency = useSelector(selectBaseCurrency)
  const coinsList = useSelector(selectCoinsList)
  const chartList = useSelector(selectChartList)
  const chartListStatus = useSelector(selectChartListStatus)
  const [crypto, setCrypto] = useState('bitcoin')

  const dispatch = useDispatch()

  const [timehorizon, setTimeHorizon] = useState("1")
  const [chartType, setChartType] = useState("Line Chart")

  const onClickChangeTimeHorizon = (e) => {
    setTimeHorizon(e.target.value)
    dispatch(reFetch())
  }

  const onChangeCrypto = (e) => {
    setCrypto(e.target.value)
    dispatch(reFetch())
  }

  useEffect(() => {
    if (chartListStatus === 'idle') {
      dispatch(fetchCoinData([crypto.toString(), baseCurrency.currency.toLowerCase(), timehorizon.toString()]))
    }

    return () => {}
  }, [chartListStatus, timehorizon])

  const [currencyData, setCurrencyData] = useState({ 
    labels: chartList.map((data) => data[0]),
    datasets: [
      {
        label: "Price Action",
        data: chartList.map((data) => data[1]),
        backgroundColor: [
          "blue",
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

            {[["1D",1], ["1W", 7], ["1M", 30], ["6M", 180], ["1Y", 365]].map((element, index) => {
              return <button key={index}
                className={timehorizon === String(element[1]) ? 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1 border-blue-500 text-blue-500' : 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1'}
                onClick={onClickChangeTimeHorizon} value={element[1]}>
                {element[0]}
              </button>
            })}

          </div>
          <div className="flex flex-row  justify-center">
            <select name="" id="coinSelector" className='px-2 mx-1 my-1 font-semibold text-sm bg-gray-100 rounded-md no-scrollbar' onChange={onChangeCrypto}>

              {coinsList.map((element, index) => {
                return <option key={index} className="bg-gray-100 text-gray-500 font-semibold my-1 hover:bg-gray-200" value={element.id}>{element.name}</option>
              })}

            </select>
            <select name="" id="chartSelector" className='px-2 mx-1 my-1 font-semibold text-sm bg-gray-100 rounded-md' onChange={(e) => { setChartType(e.target.value) }}>

              {["Line Chart", "Bar Chart Vertical", "Bar Chart Horizontal"].map((element, index) => {
                return <option key={index} className="bg-gray-100 text-gray-500 font-semibold my-1 hover:bg-gray-200" value={element}>{element}</option>
              })}

            </select>
          </div>

        </div>

        <div className="flex flex-row justify-between">
          <p className='mx-3 font-semibold'>{baseCurrency.currency}</p>
          <p className='mx-3 font-semibold'>{crypto}</p>
        </div>

        <div className='py-1 px-1 h-5/6 flex flex-col justify-center'>
          {chartType === "Line Chart" && <Line data={currencyData} />}
          {chartType === "Bar Chart Vertical" && <Bar data={currencyData} />}
        </div>
      </div>
    </>
  )
}

export default PriceChart