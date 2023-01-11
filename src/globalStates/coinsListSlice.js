import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import selectBaseCurrency from "./baseCurrencySlice"

const initialState = {
    list: [],
    status: "idle",
    error: null
}

export const fetchCoinsList = createAsyncThunk('coinsList/fetchCoinsList', async (baseCurrency) => {
    // console.log(baseCurrency.currency)
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const data = await response.json()
    return data
})

const coinsListSLice = createSlice({
    name: 'coinsList',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCoinsList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCoinsList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
                console.log(state.list)
            })
            .addCase(fetchCoinsList.rejected, (state, action) => {
                console.log(state, action)
                console.log("shit")
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.coinsList.error)
            })
            .addCase('baseCurrency/baseCurrencyChanged', (state, action) => {
                state.status= 'idle'
                state.data = []
            })
    }
})

export const selectCoinsList = (state) => state.coinsList.list;
export const selectCoinsListStatus = (state) => state.coinsList.status

export default coinsListSLice.reducer



