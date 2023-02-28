## baseCurrencySlice.js 

- This slice defines an initial state object that contains a single property, `currency`, which is set to "USD".
- It creates a `baseCurrencySlice` using the createSlice function provided by the `@reduxjs/toolkit` library.
- The createSlice function takes an object with several properties as its argument, including a name for the slice, the initialState, and a reducers object that defines one or more functions that can modify the state.
- In this case, the reducers object contains a single function, `baseCurrencyChanged`, which takes the current state and an action object as arguments, and sets the currency property of the state to the value of the payload property of the action.
- The slice also exports a selector function, `selectBaseCurrency`, which takes the whole state object as an argument and returns the baseCurrency slice of the state.
- Finally, the slice exports the `baseCurrencyChanged` action creator function, which creates an action object with a type property set to the name of the action and a payload property containing the new currency value.
- The default export of the module is the `reducer` function returned by the `createSlice` function, which handles the state updates based on the dispatched actions.

## currentCoinSlice.js
- This slice is designed to manage the state of the currently selected cryptocurrency in a Redux store.
- The `coinChange` action can be dispatched to update the `coinName` and `coinID` properties of the state.
- The `selectCurrentCoin` selector function can be used to retrieve the currentCoin slice of the state from a Redux store.

## currencyChartDataSlice.js
- It imports `createSlice` and `createAsyncThunk` from the `@reduxjs/toolkit` package. 
- The `initialState` object defines the initial state for the currency chart data, including an empty array `list`, `status` set to `idle`, and `error` set to `null`.
- The `fetchCoinData` function is a Redux async thunk that fetches coin data from the **CoinGecko API** based on the provided `info` parameter.
- Depending on the `timeFrame` value provided, it fetches data for a specific time period and returns an array of data points with **formatted date and price values**. If timeFrame is not provided, it returns an empty array.
- The `currencyChartDataSlice` object uses `createSlice` to define the Redux slice for the currency chart data. It includes the slice name, the initialState, and the `reducers` and `extraReducers` properties.
- The `reducers` property defines the `reFetch` action, which clears the `list` and sets the `status` to `idle`. The `extraReducers` property handles the state changes for `fetchCoinData` and other actions. It updates the `status` and `list` based on the async thunk's outcome.
- Finally, the code exports the `selectChartList` and `selectChartListStatus` selectors, the `reFetch` action, and the `currencyChartDataSlice.reducer` function as default.

## coinsListSlice.js 
- The code defines a slice for handling a list of coins.
- The initial state of the slice has a `list` array, a `status` string, and an `error` object.
- The slice uses the `createAsyncThunk` function from `@reduxjs/toolkit` to define an async thunk called `fetchCoinsList`. This thunk fetches data from the **Coingecko API** using `fetch`, and returns the response as JSON data.
- The slice uses the `createSlice` function from `@reduxjs/toolkit` to define a reducer and actions for the slice. The extraReducers property of the slice definition handles the actions dispatched by the fetchCoinsList thunk.
- The fetchCoinsList thunk has three cases defined in the extraReducers property of the slice definition. When the thunk is pending, the status property of the state is set to 'loading'. When the thunk is fulfilled, the status property is set to 'succeeded' and the list property is set to the payload of the action (the data fetched from the API). When the thunk is rejected, the status property is set to 'failed' and the error property is set to the error message of the action.
- The slice also defines two selector functions, selectCoinsList and selectCoinsListStatus, which select the list and status properties of the slice from the Redux store state.
- The default export of the module is the reducer function returned by the createSlice function.
