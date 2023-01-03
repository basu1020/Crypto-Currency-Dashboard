import React, { useEffect, useState } from 'react'

const PriceList = () => {
    const [coinsList, setcoinsList] = useState()
    
    const fetchCoins = async () => {
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        let data = response.json()
        setcoinsList(data)
        console.log(coinsList)
    }
    
    useEffect(() => {
        fetchCoins()
    },[] )
    return (
        <>
            <div className='bg-gray-200'>
                <h1 className='text-3xl font-bold text-gray-700 mx-4 my-4'>Cryptocurrency by market cap</h1>
                <div>

                </div>
            </div>
        </>
    )
}

export default PriceList