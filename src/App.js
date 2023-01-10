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
      <div className="bg-gray-200 my-0 py-0 flex flex-row flex-wrap md:no-scrollbar h-auto">
        <div className='md:w-2/3 w-screen'>
          <PriceChart />
          <div className="flex flex-row justify-evenly">
            <Portfolio />
            <ExchangeCoins />
          </div>
        </div>
        <div className='md:h-screen md:w-1/3 w-screen'>
          <PriceList />
        </div>
      </div>
    </>
  );
}

export default App;
