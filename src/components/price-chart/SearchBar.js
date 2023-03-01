import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { coinChange } from '../../globalStates/currentCoinSlice'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [inpValue, setInpValue] = useState("")
    const [showSearchedModal, setShowSearchModal] = useState(false)
    const [searchedCoins, setSearchedCoins] = useState([])

    // on click function for the 'Search' button, it will fetch the coins and show a maximum of 10 coins matching the query. 
    const onClickSearch = async () => {
        if (inpValue) {
            setShowSearchModal(true)
            const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${inpValue}`)
            const data = await response.json()
            setSearchedCoins(data.coins.slice(0, 10))
            document.body.style.overflow = 'hidden'
        }
    }

    // This is an useEffect hook that executes when the 'showSearchedModal' dependency changes.
    useEffect(() => {

    }, [showSearchedModal])

    return (
        <>
            <div className='flex flex-row w-full mx-3'>
                {/* This is an input element with its value set as the inpValue state and on change the value of the state is changing to the current value. */}
                <input type="text"
                    className="w-full my-2 mx-2 rounded-lg py-2 px-4"
                    value={inpValue}
                    placeholder="Search by coin name"
                    onChange={(e) => {
                        setInpValue(e.target.value)
                    }} />

                {/* button element with onClick method set to onClickSearch */}
                <button
                    className='bg-blue-600 text-white font-bold shadow-md shadow-blue-600 my-2 py-1 px-2 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700'
                    onClick={onClickSearch}>
                    Search
                </button>
            </div>

            {/* Modal that will appear when user searches for a coin, it will show "Nothing Found" if there's isn't any match */}

            {showSearchedModal ? <div className='absolute left-0 bottom-0 h-[100vh] w-[100%] bg-[rgb(0,0,0,0.5)] flex flex-col justify-center'
                name='searchModal'
                onClick={() => {
                    setShowSearchModal(false)
                    document.body.style.overflow = 'auto'
                }}>
                <div className="h-[60vh] overflow-x-auto border border-blue-400 w-[70%] mx-auto rounded-md bg-white p-1">
                    <p className='mx-2 my-2 text-lg font-bold'
                        data-testid="search-results-heading">Search Results
                    </p>
                    {searchedCoins.length > 0 ?
                        <div className='flex flex-col justify-center flex-wrap'>
                            {searchedCoins.map((element, index) => {
                                return (<div className='h-auto p-1 hover:bg-blue-500 hover:text-white'
                                    key={index}

                                    // on clicking the particular coin, it will dispatch  the `coinChange` action and make the body's overflow property 'auto'
                                    onClick={() => {
                                        dispatch(coinChange({ coinName: element.name, coinID: element.id }))
                                        setShowSearchModal(false)
                                        document.body.style.overflow = 'auto'
                                    }}>
                                    <div className='flex'>
                                        <img src={element.large}
                                            alt={`(${element.name}-image)`}
                                            className='h-10 rounded-2xl'
                                        />
                                        <p className='mx-2 font-semibold'>
                                            {element.name}
                                        </p>
                                    </div>
                                </div>)
                            })}
                        </div> : <p className='font-bold text-lg'>Nothing Found <span> 😅 </span></p>}
                </div>
            </div> : null}
        </>
    )
}

export default SearchBar