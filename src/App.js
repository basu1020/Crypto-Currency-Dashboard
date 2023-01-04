import './App.css';
import PriceList from './components/coin-prices-list/PriceList';
import ExchangeCoins from './components/Exhange-Rates/ExchangeCoins';
import Portfolio from './components/Portfolio/Portfolio';
import PriceChart from './components/price-chart/PriceChart';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
      <div className="bg-gray-200 my-0 py-0 flex flex-row flex-wrap">
        <div className='w-2/3'>
          <PriceChart />
          <div className="flex flex-row justify-evenly">
            <Portfolio />
            <ExchangeCoins />
          </div>
        </div>
        <div className='overflow-y-auto w-1/3'>
        <PriceList />
        </div>
      </div>
    </>
  );
}

export default App;
