import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    status: "idle",
    error: null
}

/**
 * fetchCoinsList - An async thunk that fetches a list of coins with their information from the Coingecko API.
 *
 * @param {string} currBaseCurrency - The current base currency to compare against (e.g. "USD", "EUR", "INR").
 * @returns {Array} - An array of objects representing the coins, with properties such as "id", "symbol", "name", etc.
 */

export const fetchCoinsList = createAsyncThunk('coinsList/fetchCoinsList', async (currBaseCurrency) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currBaseCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const data = await response.json()
    return data
})

export const coinsListSLice = createSlice({
    name: 'coinsList',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // handling state conditions during each three stages of the promise of `fetchCoinsList`
            .addCase(fetchCoinsList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCoinsList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
            })
            .addCase(fetchCoinsList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // It is also listening to change in baseCurrency.
            .addCase('baseCurrency/baseCurrencyChanged', (state, action) => {
                state.status= 'idle'
                state.list = []
            })
    }
})


//exporting reducer by default and selectors
export const selectCoinsList = (state) => state.coinsList.list;
export const selectCoinsListStatus = (state) => state.coinsList.status;
export default coinsListSLice.reducer



