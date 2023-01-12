import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    data : [],
    status : 'idle',
    error : null
}

export const fetchCoinData = createAsyncThunk('currencyChartData/fetchCoinData', async (cryptoID, vsCurr, timeFrame) => {
    console.log(vsCurr)
    if(timeFrame === "1D") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${vsCurr}&days=1&interval=hourly`)
        const data = await response.json()
        console.log(data.prices)
        return data
    }
    else if(timeFrame === "1W") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${vsCurr}&days=7&interval=daily`)
        const data = await response.json()
        console.log(data.prices)
        return data
    }
    else if(timeFrame === "1M") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${vsCurr}&days=30&interval=daily`)
        const data = await response.json()
        console.log(data.prices)
        return data
    }
    else if(timeFrame === "6M") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${vsCurr}&days=180`)
        const data = await response.json()
        console.log(data.prices)
        return data
    }
    else if(timeFrame === "1Y") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${vsCurr}&days=365`)
        const data = await response.json()
        console.log(data.prices)
        return data
    }
})

const currencyDataSlice = createSlice({
    name: 'currencyChartData',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchCoinData.pending, (state, action) => {
            state.status = 'pending'
        })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.list = action.payload
            console.log("Ho gaya")
            console.log(state.list)
       })
            .addCase(fetchCoinData.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
       })
    }
})

export const selectChartList = (state) => state.currencyChartData.list 
export const selectChartListStatus = (state) => state.currencyChartData.status 

export default currencyDataSlice.reducer