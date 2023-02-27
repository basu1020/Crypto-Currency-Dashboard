# **src** Directory Overview

This directory contains the source code for the project. This is a standard React src directory with some additional folder which were created to make it succinct. 

By default it has an `index.js`, `index.css`, `App.css`, `reportWebVitals.js` and `App.js`. 

## Overview folders created in **src**

- `components` -  It has all the different **JSX components**. 
- `globalStates` - It has **Redux slices** for different redux states used throughout various components.  
- `redux-store` - It has `store.js` file  with **Redux store** logic. 
- `tests` - As the name suggests, It contains test cases of various components which can be initiated by executing `npm run build` 

## Structure of **components** folder 

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

And, this is how these components look like on the website 

 `CoinsList.js` and `CoinsListItem.js`
 
![Screenshot_20230227_125558](https://user-images.githubusercontent.com/106004070/221503658-ba718ead-d4e5-4ada-8fa8-86e1fd380159.png)

![CoinsList](https://user-images.githubusercontent.com/106004070/221507157-c341f6e7-3885-487e-a8b3-b62909c1a114.png)
    
 `ExchangeCoins.js`
 
![Screenshot_20230227_130006](https://user-images.githubusercontent.com/106004070/221505948-3e464342-6450-4481-871d-c0ada6d422a3.png)

 `Portfolio.js`
 
![Screenshot_20230227_130032](https://user-images.githubusercontent.com/106004070/221506473-cd907bac-11b4-4716-bd01-cf8a53c081ef.png)

 `BaseCurrencyOptions.js`
 
![Screenshot_20230227_125829](https://user-images.githubusercontent.com/106004070/221506540-478c440c-b289-45d2-942f-84e24638af94.png)

 `SearchBar.js`
 
![Screenshot_20230227_125919](https://user-images.githubusercontent.com/106004070/221506753-064fac17-f071-4fa4-b681-ae43da9b8451.png)

 `PriceChart.js`

![Screenshot_20230227_125945](https://user-images.githubusercontent.com/106004070/221506788-9ab806df-d6f1-448d-ad1d-dfaf4457c037.png)

 `Navbar.js` 

![Screenshot_20230227_130536](https://user-images.githubusercontent.com/106004070/221506807-3b222ef4-971b-41c8-a5b2-44e1a3586bd7.png)


## Overview of globalStates folder and redux logic

As soon as I began using redux I was warned that the current way of defining redux logic is depreceated and I must use new `@reduxjs/toolkit` :(

![redux-rtk](https://user-images.githubusercontent.com/106004070/221509222-454a6178-2854-41d7-ad57-8acad945329e.png)

After digging up their documentations and tutorials on Youtube. I was able to understand how to configure reduxjs logic using it and these were the steps recommended by them :-

- Step 1 -> **Create slices** - we can define actions and reducers using `createAction` and `createReducer` but It is recommended we use `createSlice` for each redux state and define 'actions' and 'reducers' inside it like this 

 ```javascript
 import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    current: "current state"
}

const stateOneSlice = createSlice({
    name: 'stateOneSlice', 
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
    name: 'stateOneSlice', 
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

export const { reFetch } = currencyChartDataSlice.actions // actions to be dispatched from components using 'useDispatch'

export default currencyChartDataSlice.reducer // reducers for store
```

- Step 4 -> creating redux store - use `configureStore` to create a store like this 

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
 - Step 5 -> configuring store in `index.js` using `Provider`
 
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
 
### Contents of the globalStates folder 

globalStates folder has four slices representing four states in redux. 

- `baseCurrencySlice.js` - state for current `baseCurrency` selected in the project, by default it is "USD"
- `currentCoinSlice.js` - state depicting 'currentCoin', by default it is "Bitcoin"
- `currencyChartDataSlice.js` - its a state representation of chart data needed for `Charts.js` according to time horizons (1 Day, 1 Week, 1 Month, 6 Months, 1 Year)
- `coinsList` - this state depicts the list of coins according to their market cap and `baseCurrency`

Alright, I have provided additional details in the Reamde file inside the `globalStates` folder. 
