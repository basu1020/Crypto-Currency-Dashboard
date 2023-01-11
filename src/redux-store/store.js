import { configureStore } from "@reduxjs/toolkit";
import baseCurrenyReducer from '../globalStates/baseCurrencySlice'
import coinsListReducer from '../globalStates/coinsListSlice'

export const store = configureStore({
    reducer: {
        baseCurrency: baseCurrenyReducer,
        coinsList: coinsListReducer
    }
})