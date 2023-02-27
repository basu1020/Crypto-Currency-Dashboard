# **src** Directory Overview

This directory contains the source code for the project. This is a standard React src directory with some additional folder which were created to make it succinct. 

By default it has an `index.js`, `index.css`, `App.css`, `reportWebVitals.js` and `App.js`. 

## Overview folders created in **src**

- `components` -  It has all the different **JSX components**. 
- `globalStates` - It has **Redux slices** for different redux states used throughout various components.  
- `redux-store` - It has `store.js` file  with **Redux store** logic. 
- `tests` - As the name suggests, It contains test cases of various components which can be initiated by executing `npm run build` 

### Structure of **components** folder 

- Coin-prices-list
    - `PriceList.js`
    - `PriceListItem.js`

- Exhange-Rates
    - `ExchangeCoins.js`

- Portfolio
    - `Data.js`
    - `Portfolio.js`

- Price-chart
    - `BaseCurrencyOptions.js`
    - `PriceChart.js`
    - `SearchBar.js`
    
- Navbar.js 






