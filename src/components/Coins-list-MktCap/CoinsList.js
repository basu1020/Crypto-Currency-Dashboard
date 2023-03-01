import React, { useEffect, useRef } from 'react'
import CoinsListItem from './CoinsListItem'
import { fetchCoinsList, selectCoinsListStatus } from '../../globalStates/coinsListSlice'
import { selectCoinsList } from '../../globalStates/coinsListSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'

const CoinsList = () => {
    // Creating a ref to check whether the useEffect hook has run before
    const effectRan = useRef(false)
    const dispatch = useDispatch()
    // Getting the current base currency, current status of the coinsList and current coins list from the Redux store
    const baseCurrency = useSelector(selectBaseCurrency)
    const coinsListStatus = useSelector(selectCoinsListStatus)
    const coinsList = useSelector(selectCoinsList)

    useEffect(() => {
        // If the effect has not run before
        if (!effectRan.current) {
            // dispatching the async thunk `fetchCoinsList` if the status property of coinsList is idle 
            if (coinsListStatus === "idle") {
                dispatch(fetchCoinsList(baseCurrency.currency.toLowerCase())) 
            }
        }
        return () => {}
    }, [coinsListStatus])

    return (
        <>
            <div className='bg-white mx-2 my-2 rounded-lg h-[85.5vh] md:h-auto overflow-y-auto no-scrollbar'>
                <h1 className='text-xl font-bold text-gray-700 bg-white mx-4 my-2 px-1 py-1 rounded-lg'>Cryptocurrencies by market cap</h1>
                {/* If coinsList is not null or undefined, map each item in coinsList to a CoinsListItem component */}
                {coinsList ?        
                    <div className='flex flex-col'>
                        {/* for each item in 'coinsList' we are returning CoinsListItem component with required props */}
                        {coinsList.map(elem => {
                            return <CoinsListItem
                                key={elem.symbol} coinName={elem.name}
                                coinMarketCap={elem.market_cap} percentageChange={elem.market_cap_change_percentage_24h} image={elem.image} />
                        })}
                    </div> : null}
            </div>
        </>
    )
}

export default CoinsList