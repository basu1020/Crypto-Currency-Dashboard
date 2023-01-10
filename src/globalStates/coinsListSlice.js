import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    status :"idle",
    error: null
}


export const fetchCoinsList = createAsyncThunk('coinsList/fetchCoins', async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency.lowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    return response,json()
})

const coinsListSLice = createSlice({
    name: 'coinsList',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchCoinsList.pending, (state, action) => {
            state.coinsList.status = 'loading'
        })
        .addCase(fetchCoinsList.fulfilled, (state, action) => {
            state.coinsList.status = 'succeeded'
            state.coinsList.list = action.payload
        })
        .addCase(fetchCoinsList.rejected, (state, action) => {
            state.coinsList.status = 'failed'
            state.coinsList.error = action.payload
        })
    }
})

export const selectCoinsList = (state) => state.coinsList.list;

export default coinsListSLice.reducer

// write a redux toolkit slice whose initial state is an array and that array is populated with an api such that the api is dependent on another state which can either be "A","B", "C", the default state is "A" but if this gets changed we need to fetch api according to this state and changing our main state accordingly

