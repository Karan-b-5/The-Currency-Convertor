import { useState } from "react";
import { useEffect } from "react";
import CurrencyDropDown from "./CurrencyDropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";


const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1)

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false)

    // Get the favourites from the local storage
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favouriteCurrencies")) || ["INR", "EUR"])
        // parse is used to convert the result received as a string from local storage and convert it to array

    const fetchCurriencies = async () => {
        const data = await fetch('https://api.frankfurter.dev/v1/currencies')

        const json = await data.json();

        // setCurriencies(json);
        setCurrencies(Object.keys(json))   // the result is in a form of Object, so convert it to an array
    }

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency)
    }

    const convertCurrency = async () => {
        if(!amount)
            return
        setConverting(true);
        try {
            const data = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`)

            const json = await data.json();

            setConvertedAmount(json.rates[toCurrency] + " " + toCurrency)
        } catch (error) {
            alert("An Error Occured");  
        }
        finally{
            setConverting(false)
        }
    }

    // We make this function here only as it is same for CurrencyDropDown component no matter how many times it is rendered. So to make different copies of same function every time CurrencyDropDown is rendered, we make it once here only and then pass it as a prop to CurrencyDropDown component 
    const handleFavourite = (curr) => {
        let updatedFavourites = [...favourites];

        if(favourites.includes(curr)){
            updatedFavourites = updatedFavourites.filter((fav) => fav!==curr)
        }
        else{
            updatedFavourites.push(curr)
        }

        setFavourites(updatedFavourites);
        localStorage.setItem("favouriteCurrencies", JSON.stringify(updatedFavourites))
        // Stringify is used to convert it to a string before saving in local storage
    }

    useEffect(() => {
        fetchCurriencies();
    }, [])

    return (
        <div className="max-w-xl mx-5 sm:mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropDown currenciesList={currencies} currency={fromCurrency} setCurrency={setFromCurrency} title="From :" favouriteList={favourites} handleFavourite={handleFavourite}/>
                <div className="flex justify-center -mb-5 sm:mb-1">
                    <button onClick={handleSwapCurrencies} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
                        <HiArrowsRightLeft className="text-xl text-gray-600"/>
                    </button>
                </div>
                <CurrencyDropDown currenciesList={currencies} currency={toCurrency} setCurrency={setToCurrency} title="To :" favouriteList={favourites} handleFavourite={handleFavourite}/>
            </div>
            
            <div className="mt-5">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700"> Amount :</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 p-2 w-full"/>
            </div>

            <div className="mt-6 flex justify-end">
                <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-bounce transition-all" : ""}`}>
                    Convert
                </button>
            </div>

            {convertedAmount && (
                <div className="mt-4 text-lg font-medium text-right text-green-600">
                    Converted Amount : {convertedAmount}
                </div>
            )}
        </div>


    )
}


export default CurrencyConverter;



// Curriencies API - https://api.frankfurter.dev/v1/currencies
// Conversion API - https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}