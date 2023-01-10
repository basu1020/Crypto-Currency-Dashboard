import React, { useEffect, useState } from 'react'
import PriceListItem from './PriceListItem'

const PriceList = () => {
    const [coinsList, setcoinsList] = useState([])
    
    const fetchCoins = async () => {
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        let data = await response.json()
        setcoinsList(data)
    }
    
    useEffect(() => {
        fetchCoins()
    }, [])
    return (
        <>
            <div className='bg-white mx-2 my-2 rounded-lg md:h-[91vh] overflow-y-auto no-scrollbar'>
                <h1 className='text-xl font-bold text-gray-700 bg-white mx-4 my-2 px-1 py-1 rounded-lg'>Cryptocurrencies by market cap</h1>
                {coinsList && 
                <div className='flex flex-col'>
                    {coinsList.map(elem => {
                        return <PriceListItem 
                        key={elem.symbol} coinName={elem.name} 
                        coinMarketCap ={elem.market_cap} percentageChange ={elem.market_cap_change_percentage_24h} image={elem.image}/>
                    })}
                </div>}
            </div>
        </>
    )
}

export default PriceList