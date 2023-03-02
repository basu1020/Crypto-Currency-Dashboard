import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Importing other components used within this component
import BaseCurrencyOptions from './BaseCurrencyOptions'
import SearchBar from './SearchBar'
import { Line, Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

// Importing necessary global state variables from redux
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'
import { selectCoinsList } from '../../globalStates/coinsListSlice'
import { selectChartList, selectChartListStatus, fetchCoinData, reFetch } from '../../globalStates/currencyChartDataSlice'
import { coinChange, selectCurrentCoin } from '../../globalStates/currentCoinSlice'

const PriceChart = () => {
  // Retrieving necessary global state variables from redux store using useSelector
  const baseCurrency = useSelector(selectBaseCurrency)
  const coinsList = useSelector(selectCoinsList)
  const chartList = useSelector(selectChartList)
  const chartListStatus = useSelector(selectChartListStatus)
  const currentCrypto = useSelector(selectCurrentCoin)

  // Defining dispatch function using useDispatch
  const dispatch = useDispatch()

  // Defining state variables using useState hook
  const [timehorizon, setTimeHorizon] = useState("1")
  const [chartType, setChartType] = useState("Line Chart")

  // Function to handle button clicks for time horizon selection
  const onClickChangeTimeHorizon = (e) => {
    setTimeHorizon(e.target.value)
    dispatch(reFetch())
  }

  // useEffect hook to handle fetching data using fetchCoinData action when chartListStatus is 'idle'
  useEffect(() => {
    if (chartListStatus === 'idle') {
      dispatch(fetchCoinData([currentCrypto.coinID, baseCurrency.currency.toLowerCase(), timehorizon.toString()]))
    }

    return () => { }
  }, [chartListStatus, timehorizon])

  // Data object to be used for rendering chart using Line or Bar component
  const currencyData = {
    labels: chartList.map((data) => data[0]),
    datasets: [{
      label: `Price in ${baseCurrency.currency}`,
      data: chartList.map((data) => data[1]),
      backGroundColor: 'rgb(33, 76, 194)',
      tension: 0.1,
      pointStyle: false,
    }],
  }

  // configuring option such as if this component is being rendered in test environment then we have additional aspect 'responsive: false' in options
  let option

  if (process.env.NODE_ENV == 'test') {
    option = { 
      maintainAspectRatio: false,
      responsive: false 
    }
  }
  else {
    option = {
      maintainAspectRatio: false,
    }
  }

  return (
    <>
      <div className='flex flex-row '>
        {/* Rendering BaseCurrencyOptions and SearchBar components */}
        <BaseCurrencyOptions />
        <SearchBar />
      </div>
      <div className="bg-white rounded-lg h-96 md:h-auto mx-3 my-2">
        <div className="flex flex-row md:flex-col-reverse">
          <div className="flex flex-row w-4/6 md:w-full justify-center">

            {/* rendering time frames in such a way that for each array below the display value will be the first element and the value will be the second, this will make it easier when we have to timeFrame in the `fetchCoinData` function*/}
            {[["1D", 1], ["1W", 7], ["1M", 30], ["6M", 180], ["1Y", 365]].map((element, index) => {
              return <button key={index}

                // className is according to the current state of 'timeHorizon'
                // lets say timeHorizon is 7, so button with "1W" will have blue borders and text.  

                className={timehorizon === String(element[1]) ? 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1 border-blue-500 text-blue-500' : 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1'}
                onClick={onClickChangeTimeHorizon} value={element[1]}>
                {element[0]}
              </button>
            })}

          </div>
          <div className="flex flex-row 2sm:flex-col justify-center">

            {/* Rendering coins for choosing to view prices */}
            <select id="coinSelector"
              data-testid="coinSelector"
              className='px-2 mx-1 my-1 font-semibold text-sm bg-gray-100 rounded-md no-scrollbar'
              onChange={(e) => {
                const data = e.target.value.split("+")
                dispatch(coinChange({ coinName: data[1], coinID: data[0] }))
              }}>

              {/* Rendering options for choosing to view prices */}

              {coinsList.map((element, index) => {
                return <option key={index}
                  className="bg-gray-100 text-gray-500 font-semibold my-1"
                  value={`${element.id}+${element.name}`}
                >
                  {element.name}
                </option>
              })}

            </select>
            {/* Rendering chart options */}
            <select id="chartSelector" data-testid="chartSelector" className='px-2 mx-1 my-1 font-semibold text-sm bg-gray-100 rounded-md' onChange={(e) => { setChartType(e.target.value) }}>
              {["Line Chart", "Bar Chart Vertical", "Bar Chart Horizontal"].map((element, index) => {
                return <option key={index} className="bg-gray-100 text-gray-500 font-semibold my-1 hover:bg-gray-200" value={element}>{element}</option>
              })}
            </select>
          </div>

        </div>

        {/* rendering baseCurrency and current crypto right above charts */}
        <div className="flex flex-row justify-between">
          <p className='mx-3 font-semibold'>{baseCurrency.currency}</p>
          <p className='mx-3 font-semibold'>{currentCrypto.coinName}</p>
        </div>

        {/* Rendering charts, they will render according to the current state of 'chartType' */}
        <div className='py-1 px-1 h-5/6 flex flex-col justify-center w-auto' data-testid="thediv">
          {chartType === "Line Chart" && <Line 
          options={option} 
          data={currencyData} data-testid="line-chart" />}

          {chartType === "Bar Chart Vertical" && <Bar options={option} 
          data={currencyData} 
          data-testid="bar-chart" />}

          {chartType === "Bar Chart Horizontal" && <Bar options={{
              ...option,
              indexAxis: 'y'
            }} data={currencyData} data-testid="bar-chart-horizontal" />}
        </div>
      </div>
    </>
  )
}

export default PriceChart