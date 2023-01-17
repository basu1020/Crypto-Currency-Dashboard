import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    status: 'idle',
    error: null
}

export const fetchCoinData = createAsyncThunk('currencyChartData/fetchCoinData', async (info) => {
    console.log(info)
    const [cryptoID, baseCurr, timeFrame] = info
    let interval;

    if (timeFrame < 7){
        interval = "&interval=hourly"
    }
    else if (7 <= timeFrame <= 180){
        interval = "&interval=daily"
    }
    else {
        interval = ""
    }
    console.log(interval)
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=${timeFrame}${interval}`)
    const data = response.json()
    return data.prices

    // if (timeFrame === "1D") {
    //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=1&interval=hourly`)
    //     const data = await response.json()
    //     return data.prices
    // }
    // else if (timeFrame === "1W") {
    //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=7&interval=daily`)
    //     const data = await response.json()
    //     return data.prices
    // }
    // else if (timeFrame === "1M") {
    //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=30&interval=daily`)
    //     const data = await response.json()
    //     return data.prices
    // }
    // else if (timeFrame === "6M") {
    //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=180&interval=monthly`)
    //     const data = await response.json()
    //     return data.prices
    // }
    // else if (timeFrame === "1Y") {
    //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=365`)
    //     const data = await response.json()
    //     return data.prices
    // }
    // else{
    //     return []
    // }
})

const currencyChartDataSlice = createSlice({
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
            .addCase(fetchCoinData.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
                console.log(state.list)
            })
            .addCase(fetchCoinData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase('baseCurrency/baseCurrencyChanged', (state, action) => {
                state.status = 'idle'
                state.list = []
            })
    }
})

export const selectChartList = (state) => state.currencyChartData.list;
export const selectChartListStatus = (state) => state.currencyChartData.status;

export const {reFetch} = currencyChartDataSlice.actions

export default currencyChartDataSlice.reducer