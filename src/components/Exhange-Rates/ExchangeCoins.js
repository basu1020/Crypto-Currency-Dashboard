import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCoinsList, selectCoinsListStatus } from '../../globalStates/coinsListSlice'

const ExchangeCoins = () => {
    // Using useSelector hook to access the coins list and its status from the store
    const coinsList = useSelector(selectCoinsList)
    const coinListStatus = useSelector(selectCoinsListStatus)

    // Defining the state variables for the exchange rate, buying and selling coin, and amount
    const [exRate, setExRate] = useState(0)
    const [buyCoin, setBuyCoin] = useState()
    const [sellCoin, setSellCoin] = useState()
    const [amt, setAmt] = useState(0)

    // onChange event handler for the amount input field
    const onChangeAmt = (e) => {
        setAmt(e.target.value)
    }

    // onChange event handler for the selling coin select field
    const onChangeSellCoin = (e) => {
        setSellCoin(e.target.value)
    }

    // onChange event handler for the buying coin select field
    const onChangeBuyCoin = (e) => {
        setBuyCoin(e.target.value)
    }

    // onClick event handler for the exchange button
    const onClickExchange = () => {

        if (coinListStatus) {
            setExRate(((Number(sellCoin) / Number(buyCoin)) * Number(amt)).toFixed(2))
        }
    }

    return (
        <>
            <div className='mx-2 my-2 w-1/2 rounded-lg md:w-full bg-white shadow-lg'>
                <h2 className='text-xl font-bold mx-2 my-2'>Exchange Coins</h2>
                <div className='flex flex-col justify-center align-middle'>
                    <div className='mx-auto'>
                        <div className='flex flex-row w-80 justify-center'>
                            <p className='text-red-700 font-bold mx-2 my-2'>Sell</p>

                            {/* Rendering the selling coin select field */}
                            <select name="coinSelectorSelling" defaultValue="Select a coin" className='bg-gray-100 rounded-sm mx-2 my-2 text-gray-800 font-semibold'
                                onChange={onChangeSellCoin}>

                                {/* Rendering the options in the selling coin select field with value being their current price, key being their id*/}
                                <option disabled>Select a coin</option>
                                {coinListStatus && coinsList.map(element => {
                                    return <option value={element.current_price} key={element.id}>{element.name}</option>
                                })}
                            </select>

                            {/* Rendering the input field for amount */}
                            <input type="number" className="rounded-md border w-full border-gray-300" name="enterAmount" value={amt} onChange={onChangeAmt} />
                        </div>
                        <div className='flex flex-row w-80 justify-between'>
                            <p className='text-green-700 font-bold mx-2 my-2'> Buy </p>

                            {/* Rendering the buying coin select field */}
                            <select name="coinSelectorBuying" defaultValue="Select a coin" className='bg-gray-100 rounded-sm mx-2 my-2 text-gray-800 font-semibold'
                                onChange={onChangeBuyCoin}>

                                {/* Rendering the options in the buying coin select field with value being their current price, key being their id */}
                                <option disabled >Select a coin</option>
                                {coinListStatus && coinsList.map(element => {
                                    return <option value={element.current_price} key={element.id}>{element.name}</option>
                                })}
                            </select>
                            <div name='exchangeRate' className='text-green-600 font-bold mx-2 my-2 w-full'>{exRate}</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>

                    {/* Rendering the Exchange button, it is disabled if one of the buy coin or sell coin is not selected. */}
                    <button name='Exchange' className='bg-blue-600 text-white font-bold p-2.5 rounded-lg my-3 shadow-sm shadow-blue-700 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-700' onClick={onClickExchange} disabled={!buyCoin || !sellCoin} >
                        Exchange
                    </button>
                </div>
            </div>
        </>
    )
}

export default ExchangeCoins