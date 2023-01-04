import React from 'react'

const ExchangeCoins = () => {
    return (
        <>
            <div className='mx-3 my-3 rounded-lg border border-gray-300 shadow-lg'>
                <h2 className='text-xl font-bold mx-3 my-3'>Exchange Coins</h2>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-row w-4 justify-between align-middle'>
                        <p className='text-red-700 font-bold mx-2 my-2'>Sell</p>
                        <select name="coinSelectorSelling" className='mx-2 my-2 text-gray-500 font-bold'>
                            <option value="BTC">Bitcoin</option>
                            <option value="ETH">Ethereum</option>
                            <option value="DOGE">Dogecoin</option>
                            <option value="ADA">Cardano</option>
                        </select>
                        <input type="number" className="rounded-md border border-gray-300" name="enterAmount" ></input>
                    </div>
                    <div className='flex flex-row w-4 justify-between'>
                        <p className='text-green-700 font-bold mx-2 my-2'>Buy</p>
                        <select name="coinSelectorBuying" className='mx-2 my-2 text-gray-500 font-bold'>
                            <option value="ETH">Ethereum</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="DOGE">Dogecoin</option>
                            <option value="ADA">Cardano</option>
                        </select>
                        <div className='text-green-600 font-bold mx-2 my-2'>1000</div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <button className='bg-blue-700 text-white font-bold p-2.5 rounded-lg my-3 shadow-lg shadow-blue-700'>
                        Exchange
                    </button>
                </div>
            </div>

        </>
    )
}

export default ExchangeCoins