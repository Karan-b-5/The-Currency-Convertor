// import './input.css';

import CurrencyConverter from "./components/CurrencyConverter"

function App() {
  
  return (
    <>
      <h1 className="relative bg-[url('https://winiesstudentworld.com/wp-content/uploads/2023/03/image.jpeg')] min-h-screen flex items-center justify-center">
        <div className="absolute bg-black/40 inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold text-white w-11/12 lg:w-7/12 text-center shadow-2xl font-mono">Convert Currency with Ease: Fast, Accurate, and Reliable</h1>
          <p className="text-white font-mono w-11/12 lg:w-7/12 mt-3 hidden sm:block text-justify shadow-md p-2">Welcome to our Currency Converter! This user-friendly application, built with React.jsand Tailwind CSS, allows you to effortlessly convert between different currencies. Enjoy real-time conversion rates, mark your favorite currencies for quick access & to keep your preferences saved. Whether you need to convert currency for travel, business, or personal use, our tool ensures fast and accurate results. Explore the simplicity and efficiency of currency conversion with us!</p>
          <div className="container">
            <CurrencyConverter />
          </div>
        </div>
      </h1>
    </>
  )
}

export default App
