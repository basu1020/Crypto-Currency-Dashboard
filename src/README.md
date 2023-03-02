# **src** Directory Overview

This directory contains the source code for the project. This is a standard React src directory with some additional folder which were created to make it succinct. 

By default it has an `index.js`, `index.css`, `App.css`, `reportWebVitals.js` and `App.js`. 

# Folders created in **src**

- `components` -  It has all the different **JSX components**. 
- `globalStates` - It has **Redux slices** for different redux states used throughout various components.  
- `redux-store` - It has `store.js` file  with **Redux store** logic. 
- `tests` - As the name suggests, It contains test cases of various components amd redux states.

# Structure of **components** folder 

- Coin-prices-list
    - `CoinsList.js`
    - `CoinsListItem.js`
- Exhange-Rates
    - `ExchangeCoins.js`
- Portfolio
    - `Data.js` - data for plotting chart in Portfolio.js 
    - `Portfolio.js`
- Price-chart
    - `BaseCurrencyOptions.js`
    - `SearchBar.js`
    - `PriceChart.js`
 - Navbar.js 

# App.js code details

After chucking out default `App.js` code, this is how I setted it up 

```javascript
import './App.css';
import PriceList from './components/Coin-prices-list/PriceList';
import ExchangeCoins from './components/Exhange-Rates/ExchangeCoins';
import Portfolio from './components/Portfolio/Portfolio';
import PriceChart from './components/Price-chart/PriceChart';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 my-0 py-0 flex flex-row flex-wrap md:no-scrollbar h-[95vh]">
        <div className='w-2/3 md:w-screen'>
          <PriceChart />
          <div className="flex flex-row justify-evenly md:flex-wrap">
            <Portfolio />
            <ExchangeCoins />
          </div>
        </div>
        <div className='md:h-screen w-1/3 md:w-screen'>
          <PriceList />
        </div>
      </div>
    </>
  );
}

export default App;

```

This is the architecture App.js is following 

![AppjsOVerviewV2](https://user-images.githubusercontent.com/106004070/221587033-3104e8b7-cae3-427b-8973-405109ad2cde.png)

# APIs from CoinGecko used throughout the project

- To fetch Coins List according to market cap 

    ```javascript
    const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${PREFFERED_FIAT_CURRENCY}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    // PREFFERED_FIAT_CURRENCY = fiat currency as denomination, can be USD, INR, GBP etc.
    ```
 - To fetch Chart data
  
    ```javascript
    const api = `https://api.coingecko.com/api/v3/coins/${CRYPTO_ID}/market_chart?vs_currency=${FIAT_CURRENCY}&days=${NO_OF_DAYS}&interval=${INTERVAL}`
    // CRYPTO_ID - id of the crypto currency defined by coingecko 
    // FIAT_CURRENCY - fiat currency as denomination, can be USD, INR, GBP etc.
    // NO_OF_DAYS - no of days from which you want the price data
    // INTERVAL - suitable intervals, can be hourly, daily, weekly  
    ```
 

# Overview of globalStates folder and redux logic

As soon as I began using redux I was warned that the current way of defining redux logic is depreceated and I must use new `@reduxjs/toolkit` :(

![redux-rtk](https://user-images.githubusercontent.com/106004070/221509222-454a6178-2854-41d7-ad57-8acad945329e.png)

After digging up their documentations and tutorials on Youtube. I was able to understand how to configure reduxjs logic using `@reduxjs/toolkit` and these were the steps recommended by them :-

- Step 1 -> **Create slices** - we can define actions and reducers using `createAction` and `createReducer` but It is recommended we use `createSlice` for each redux state and define 'actions' and 'reducers' inside it like this 

     ```javascript
     import { createSlice } from "@reduxjs/toolkit";

    export const initialState = {
        current: "current state"
    }

    const stateOneSlice = createSlice({
        name: 'stateOne', 
        initialState,
        reducers: {
            stateOneChanged: (state, action) => {
                state.current = action.payload
            }
        },
    })
     ```
 Notice that in `stateOneChanged` reducer I am not returing new state but simply changing it, this is because `@reduxjs/toolkit` uses `Immer.js` under the hood. https://github.com/immerjs/immer
 
- Step 2 -> **Define extraReducers if any** - `extraReducers` help to listen to other actions in other states in redux store and act according to it, lets say we want to change `stateOne` whenever `stateTwoChanged` action of `stateTwo` state is called. 

     ```javascript
     import { createSlice } from "@reduxjs/toolkit";

    export const initialState = {
        current: "current state"
    }

    const stateOneSlice = createSlice({
        name: 'stateOne', 
        initialState,
        reducers: {
            stateOneChanged: (state, action) => {
                state.current = action.payload
            }
        },
        extraReducers(builder){ // listening to change in 'stateTwo' by 'stateTwoChanged' action. 
            builder
                .addCase('stateTwo/stateTwoChanged', (state, action) => {
                    state.current = "something"
                })
        }
    })
     ```

- Step 3 -> **export Reducers, Actions and State** - below is the recommended way of exporting reducers for store, actions to call from your component and state to be used by `useSelector` hook  

    ```javascript
    export const selectStateOneCurrent = (state) => state.stateOne.current // state to be used in components using 'useSelector'

    export const { reFetch } = stateOneSlice.actions // actions to be dispatched from components using 'useDispatch'

    export default stateOneSlice.reducer // reducers for store
    ```

- Step 4 -> **creating redux store** -> use `configureStore` to create a store like this 

     ```javascript
     import stateOneReducer from "pathTo/stateOneSlice"
     import stateTwoReducer from "pathTo/stateTwoSlice"

     export const store = configureStore({
        reducer: {
            stateOne : stateOneReducer, // names should be equal to the names in respective slices. 
            stateTwo : stateTwoReducer,
        }
    })
     ```` 
 - Step 5 -> **configuring store in** `index.js` **using** `Provider`

     ```javascript
     import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';
    import reportWebVitals from './reportWebVitals';
    import { store } from "pathTo/store"
    import { Provider } from 'react-redux';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
     ```
 
 ## Creating Async logic in slices
 
 - Async logic can be configured using `createAsyncThunk`, It is a function that simplifies the process of defining async logic for Redux actions. It generates a thunk that can be dispatched to the Redux store, and it automatically dispatches the pending, fulfilled, and rejected actions based on the outcome of the async logic.
 
- for example in `coinsListSlice` in `globalStates` folder, `fetchCoinsList` is an async thunk which fetches a list of coins from the Coingecko API based on a provided `currBaseCurrency` parameter. The thunk dispatches three actions: `coinsList/fetchCoinsList/pending`, `coinsList/fetchCoinsList/fulfilled`, and `coinsList/fetchCoinsList/rejected`. 

- During each stage of the promise of fetchCoinsList, the `extraReducers` method in the slice's definition handles state updates to reflect the current status of the promise.

    ```javascript
    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

    const initialState = {
        list: [],
        status: "idle",
        error: null
    }

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
        }
    })

    export const selectCoinsList = (state) => state.coinsList.list;
    export const selectCoinsListStatus = (state) => state.coinsList.status;
    export default coinsListSLice.reducer
    ```
 
## Slices in globalStates folder 

globalStates folder has four slices representing four states. 

- `baseCurrencySlice.js` - state for current `baseCurrency` selected in the project, by default it is "USD"
- `currentCoinSlice.js` - state depicting current crypto currency selected for viewing in `PriceChart`, by default it is "Bitcoin"
- `currencyChartDataSlice.js` - its a state representation of chart data needed for charts from `Charts.js` library according to time horizons (1 Day, 1 Week, 1 Month, 6 Months, 1 Year) and current crypto currency selected. 
- `coinsList` - this state depicts the list of coins according to their market cap and `baseCurrency` 

Additional details for each slice is in the Reamde file in the `globalStates` folder. 

# Contents of redux-store folder 

redux-store folder contains `store.js` where I have created **Redux store** using `configureStore`. 

```javascript
    import { configureStore } from "@reduxjs/toolkit";

    // reducers from each slice were imported as default
    import baseCurrenyReducer from '../globalStates/baseCurrencySlice'
    import coinsListReducer from '../globalStates/coinsListSlice'
    import currencyChartDataReducer from '../globalStates/currencyChartDataSlice'
    import currentCoinReducer from "../globalStates/currentCoinSlice"

    export const store = configureStore({
        reducer: {
            baseCurrency: baseCurrenyReducer,
            coinsList: coinsListReducer,
            currencyChartData: currencyChartDataReducer,
            currentCoin: currentCoinReducer
        }
    })
```

after creating the `store`, I configured it in `index.js` just as shown in Step 5 of configuring `@reduxjs/tookit`

# tests Overview

Suitable test cases are written for components using pre-installed `@testing-library/react` in `tests` folder
