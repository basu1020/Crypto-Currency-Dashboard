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



