import React, {useState} from 'react'

const ExchangeCoins = () => {
    const [exRate, setExRate] = useState(0)
    const [buyCoin, setBuyCoin] = useState('')
    const [sellCoin, setSellCoin] = useState('')
    const [amt, setAmt] = useState(0)

    const onChangeSellCoin = (e) => {
        setSellCoin(e.target.value)
    }

    const onChangeBuyCoin = (e) => {
        setBuyCoin(e.target.value)
    }

    const onClickExchange = async () => {
        const response = await fetch('')
    }

    return (
        <>
            <div className='mx-2 my-2 w-1/2 rounded-lg bg-white shadow-lg'>
                <h2 className='text-xl font-bold mx-3 my-3'>Exchange Coins</h2>
                <div className='flex flex-col justify-center align-middle'>
                    <div className='mx-auto'>
                        <div className='flex flex-row w-80 justify-between'>
                            <p className='text-red-700 font-bold mx-2 my-2'>Sell</p>
                            <select name="coinSelectorSelling" className='mx-2 my-2 text-gray-500 font-bold' onChange={onChangeSellCoin}>
                                <option value="BTC">Bitcoin</option>
                                <option value="ETH">Ethereum</option>
                                <option value="DOGE">Dogecoin</option>
                                <option value="ADA">Cardano</option>
                            </select>
                            <input type="number" className="rounded-md border border-gray-300" name="enterAmount" value={amt} onChange={(e) => {setAmt(e.target.value)}}/>
                        </div>
                        <div className='flex flex-row w-4 justify-between'>
                            <p className='text-green-700 font-bold mx-2 my-2'>Buy</p>
                            <select name="coinSelectorBuying" className='mx-2 my-2 text-gray-500 font-bold' onChange={onChangeBuyCoin}>
                                <option value="ETH">Ethereum</option>
                                <option value="BTC">Bitcoin</option>
                                <option value="DOGE">Dogecoin</option>
                                <option value="ADA">Cardano</option>
                            </select>
                            <div className='text-green-600 font-bold mx-2 my-2'>{exRate}</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <button className='bg-blue-700 text-white font-bold p-2.5 rounded-lg my-3 shadow-md shadow-blue-700'>
                        Exchange
                    </button>
                </div>
            </div>

        </>
    )
}

export default ExchangeCoins