import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    status: 'idle',
    error: null
}

/**
 * An asynchronous thunk function that fetches data for a given cryptocurrency
 * and returns it in a specific format based on the specified time frame.
 *
 * @param {Array} info - An array containing the cryptocurrency ID, base currency, and time frame.
 * @returns {Array} - An array containing the formatted data for the specified time frame.
 */

export const fetchCoinData = createAsyncThunk('currencyChartData/fetchCoinData', async (info) => {

    // Destructuring the array to get the cryptocurrency ID, base currency, and time frame.
    const [cryptoID, baseCurr, timeFrame] = info 
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    // fetching data and formatting it according to timeFrame 

    // For the 1-day time frame, it retrieves the "hourly" data for the last 24 hours, 
    //slices the resulting array to only include data from the past 24 hours, and formats the time stamps as local time strings.

    if (timeFrame === "1") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=1&interval=hourly`)
        const data = await response.json()
        
        const dataArray = data.prices.slice(1, 25)

        const result = dataArray.map(element => {
            const date = new Date(element[0])
            element[0] = `${date.toLocaleTimeString()}`
            element[1] = element[1].toFixed(2)
            return [element[0], Number(element[1])]
        })
        return result
    }

    // For the 7-day time frame, the function retrieves the "daily" data for the last 7 days, 
    // slices the resulting array to only include data from the past 7 days, and formats the time stamps as the names of the days of the week.

    else if (timeFrame === "7") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=7&interval=daily`)
        const data = await response.json()
        
        const dataArray = data.prices.slice(0, 7)

        const result = dataArray.map(element => {
            const date = new Date(element[0])
            element[0] = weekDays[date.getDay()]
            element[1] = element[1].toFixed(2)
            return [element[0], Number(element[1])]
        })
        return result
    }

    // For the 30-day time frame, the function retrieves the daily data for the last 30 days, 
    // slices the resulting array to only include data from the past 30 days, and formats the time stamps as abbreviated month and day.

    else if (timeFrame === "30") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=30&interval=daily`)
        const data = await response.json()
        
        const dataArray = data.prices.slice(1, 31)

        const result = dataArray.map(element => {
            const date = new Date(element[0])
            element[0] = `${date.toDateString().split(" ")[1]}` + ` ${date.toDateString().split(" ")[2]}`
            element[1] = element[1].toFixed(2)
            return [element[0], Number(element[1])]
        })
        return result
    }

    // For the 180-day time frame, the function retrieves the monthly data for the last 180 days, 
    // slices the resulting array to only include data from the past 180 days, 
    // filters the array to only include every 30th element (i.e., one data point per month), and formats the time stamps as abbreviated month names.

    else if (timeFrame === "180") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=180&interval=monthly`)
        const data = await response.json()
        const dataArray = data.prices.slice(1, 181)

        const result = dataArray.filter((element, index) => {
            return index % 30 === 0
        }).map(element => {
            const date = new Date(element[0])
            return [months[date.getMonth()], Number(element[1].toFixed(2))]
        })

        return result
    }

    // For the 365-day time frame, the function retrieves the daily data for the last 365 days, 
    // slices the resulting array to only include data from the past 365 days, 
    // filters the array to only include every 30th element (i.e., one data point per month), formats the time stamps as abbreviated month names

    else if (timeFrame === "365") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=365`)
        const data = await response.json()
        const dataArray = data.prices.slice(1, 366)

        const result = dataArray.filter((element, index) => {
            return index % 30 === 0
        }).map(element => {
            const date = new Date(element[0])
            return [months[date.getMonth()], Number(element[1].toFixed(2))]
        })

        return result.slice(1, 13)
    }

    // Finally, if an unsupported time frame is selected, the function returns an empty array.

    else {
        return []
    }
})

export const currencyChartDataSlice = createSlice({
    name: 'currencyChartData',
    initialState,
    reducers: {
        reFetch: (state, action) => {
            state.list = []
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
            //listening to all three stages of the promise of 'fetchCoinData'
            .addCase(fetchCoinData.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
            })
            .addCase(fetchCoinData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //It is listening to change in 'baseCurrency' and 'currentCoin'. 
            .addCase('baseCurrency/baseCurrencyChanged', (state, action) => {
                state.status = 'idle'
                state.list = []
            })
            .addCase('currentCoin/coinChange', (state,action) => {
                state.status = 'idle'
                state.list = []
            })
    }
})


//exporting reducer by default, actions and selectors
export const selectChartList = (state) => state.currencyChartData.list;
export const selectChartListStatus = (state) => state.currencyChartData.status;
export const { reFetch } = currencyChartDataSlice.actions
export default currencyChartDataSlice.reducer