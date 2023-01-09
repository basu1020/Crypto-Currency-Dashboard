import React, {useState} from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto";
import {data as coinsData} from "./Data"

const Portfolio = () => {
  
  const [chartData, setChartData] = useState({
    labels: coinsData.map((data) => data.name),
    datasets:[
      {
        label: "Portfolio",
        data: coinsData.map((data) => data.amount_invested),
        backgroundColor : [
          "#5360ed",
          "#ed5372",
          "#53c271"
        ]
      }
    ]
  })


  return (
    <>
      <div className='mx-2 my-2 w-1/2 bg-white rounded-lg px-2 py-2 shadow-lg'>

        <div className="flex flex-row justify-between font-bold">
          <h2 className="font-sans text-xl mx-2">Portfolio</h2>
          <p className='text-xl text-gray-500'>Total Value</p>
        </div>
        <div id="Portfolio-pie-chart" className='h-40 flex flex-col'>
          <Pie data={chartData}/>
        </div>
      </div>
    </>
  )
}

export default Portfolio