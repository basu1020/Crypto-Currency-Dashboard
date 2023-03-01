# baseCurrencySlice.js 

- This slice defines an initial state object that contains a single property, `currency`, which is set to "USD".
  ```javascript
    export const initialState = {
    currency: "USD"
    }
    ```

- It creates a `baseCurrencySlice` using the `createSlice` function provided by the `@reduxjs/toolkit` library.
- The `createSlice` function takes an object with several properties as its argument, including a name for the slice, the initialState, and a reducers object that defines one or more functions that can modify the state.
- In this case, the reducers object contains a single function, `baseCurrencyChanged`, which takes the current state and an action object as arguments, and sets the currency property of the state to the value of the payload property of the action.

    ```javascript
    export const baseCurrencySlice = createSlice({
        name: 'baseCurrency',
        initialState,
        reducers: {
            baseCurrencyChanged: (state, action) => {
                state.currency = action.payload
            }
        },
    })
    ```
- The slice also exports a selector function, `selectBaseCurrency`, which takes the whole state object as an argument and returns the baseCurrency slice of the state.
- Finally, the slice exports the `baseCurrencyChanged` action creator function, which creates an action object with a type property set to the name of the action and a payload property containing the new currency value.
- The default export of the module is the `reducer` function returned by the `createSlice` function, which handles the state updates based on the dispatched actions.

    ```javascript
    export const selectBaseCurrency = (state) => state.baseCurrency
    export const { baseCurrencyChanged } = baseCurrencySlice.actions
    export default baseCurrencySlice.reducer
    ```

# currentCoinSlice.js

- This slice is designed to manage the state of the currently selected cryptocurrency in a Redux store.
- Initial state is set to represent bitcoin. 

    ```javascript
    const initialState = {
        coinName: "Bitcoin",
        coinID: "bitcoin"
    }
    ```

- The `coinChange` action can be dispatched to update the `coinName` and `coinID` properties of the state.
    ```javascript
    export const currentCoinSlice = createSlice({
        name: "currentCoin",
        initialState,
        reducers: {
            coinChange: (state, action) => {
                state.coinName = action.payload.coinName
                state.coinID = action.payload.coinID
            }
        }
    })
    ```
- The `selectCurrentCoin` selector function can be used to retrieve the currentCoin slice of the state from a Redux store.

    ```javascript
    export default currentCoinSlice.reducer
    export const { coinChange } = currentCoinSlice.actions
    export const selectCurrentCoin = (state) => state.currentCoin
    ```

# currencyChartDataSlice.js

- It imports `createSlice` and `createAsyncThunk` from the `@reduxjs/toolkit` package. 
- The `initialState` object defines the initial state for the currency chart data, including an empty array `list`, `status` set to `idle`, and `error` set to `null`.

    ```javascript
    const initialState = {
        list: [],
    status: 'idle',
    error: null
    }
    ```

- The `fetchCoinData` function is a Redux async thunk that fetches coin data from the **CoinGecko API** based on the provided `info` parameter.
- Depending on the `timeFrame` value provided, it fetches data for a specific time period and returns an array of data points with **formatted date and price values**. If timeFrame is not provided, it returns an empty array.

    ```javascript
    export const fetchCoinData = createAsyncThunk('currencyChartData/fetchCoinData', async (info) => {

        // Destructuring the array to get the cryptocurrency ID, base currency, and time frame.
        const [cryptoID, baseCurr, timeFrame] = info 
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

        // fetching data and formatting it according to timeFrame 

        // For the 1-day time frame, it retrieves the "hourly" data for the last 24 hours, slices the resulting array to only include data from the past 24 hours, and formats the time stamps as local time strings.

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

        // For the 7-day time frame, the function retrieves the "daily" data for the last 7 days, slices the resulting array to only include data from the past 7 days, and formats the time stamps as the names of the days of the week.

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

        // For the 30-day time frame, the function retrieves the daily data for the last 30 days, slices the resulting array to only include data from the past 30 days, and formats the time stamps as abbreviated month and day.

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

        // For the 180-day time frame, the function retrieves the monthly data for the last 180 days, slices the resulting array to only include data from the past 180 days, filters the array to only include every 30th element (i.e., one data point per month), and formats the time stamps as abbreviated month names.

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

        // For the 365-day time frame, the function retrieves the daily data for the last 365 days, slices the resulting array to only include data from the past 365 days, filters the array to only include every 30th element (i.e., one data point per month), formats the time stamps as abbreviated month names

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
    ```

- The `currencyChartDataSlice` object uses `createSlice` to define the Redux slice for the currency chart data. It includes the slice name, the initialState, and the `reducers` and `extraReducers` properties.
- The `reducers` property defines the `reFetch` action, which clears the `list` and sets the `status` to `idle`. The `extraReducers` property handles the state changes for `fetchCoinData` and other actions. It updates the `status` and `list` based on the async thunk's outcome.

    ```javascript
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
    ```
- Finally, the code exports the `selectChartList` and `selectChartListStatus` selectors, the `reFetch` action, and the `currencyChartDataSlice.reducer` function as default.

    ```javascript
    export const selectChartList = (state) => state.currencyChartData.list;
    export const selectChartListStatus = (state) => state.currencyChartData.status;
    export const { reFetch } = currencyChartDataSlice.actions
    export default currencyChartDataSlice.reducer
    ```

# coinsListSlice.js 
- The code defines a slice for handling a list of coins.
- The initial state of the slice has a `list` array, a `status` string, and an `error` object.

    ```javascript
    const initialState = {
        list: [],
        status: "idle",
        error: null
    }
    ```

- The slice uses the `createAsyncThunk` function from `@reduxjs/toolkit` to define an async thunk called `fetchCoinsList`. This thunk fetches data from the **Coingecko API** using `fetch`, and returns the response as JSON data.

    ```javascript
    export const fetchCoinsList = createAsyncThunk('coinsList/fetchCoinsList', async (currBaseCurrency) => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currBaseCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        const data = await response.json()
        return data
    })
    ```

- The slice uses the `createSlice` function from `@reduxjs/toolkit` to define a reducer and actions for the slice. The extraReducers property of the slice definition handles the actions dispatched by the fetchCoinsList thunk.
- The fetchCoinsList thunk has three cases defined in the extraReducers property of the slice definition. When the thunk is `pending`, the status property of the state is set to `loading`. When the thunk is `fulfilled`, the status property is set to `succeeded` and the list property is set to the `payload` of the action (the data fetched from the API). When the thunk is rejected, the status property is set to `failed` and the `error` property is set to the `error message` of the action.

    ```javascript
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
    ```

- The slice also defines two selector functions, selectCoinsList and selectCoinsListStatus, which select the list and status properties of the slice from the Redux store state.
- The default export of the module is the reducer function returned by the createSlice function.

    ```javascript 
    export const selectCoinsList = (state) => state.coinsList.list;
    export const selectCoinsListStatus = (state) => state.coinsList.status;
    export default coinsListSLice.reducer
    ```

# Visualisation of how components and redux states are working. 

The different components were - 

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

Here's a visual representation of how these components work with redux states (excluded Navbar.js as it didn't interacted with redux states) 

![workingCryptoDashBoard](https://user-images.githubusercontent.com/106004070/222101910-759fe092-6ce3-4675-8edf-62bbfb6a0023.png)

