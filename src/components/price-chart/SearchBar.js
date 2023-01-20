import React from 'react'

const SearchBar = () => {
    const onClickSearch = () => {
        
    }

    return (
        <>
            <div className='flex flex-row w-full mx-3'>
                
                <input type="text" className="w-full my-2 mx-2 rounded-lg py-2 px-4" placeholder="Search by coin name" />
                <button className='bg-blue-600 text-white font-bold shadow-md shadow-blue-600 my-2 py-1 px-2 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700'>
                    Search
                </button>
            </div>
        </>
    )
}

export default SearchBar