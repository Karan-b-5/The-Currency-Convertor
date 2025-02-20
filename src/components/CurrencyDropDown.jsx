import React from 'react'
import { HiOutlineStar, HiStar } from "react-icons/hi2";


const CurrencyDropDown = ({currenciesList, currency, setCurrency, favouriteList, handleFavourite, title}) => {

    const isFavourite = (curr) => favouriteList.includes(curr)

  return (
    <div>
        <label htmlFor={title} className="block text-sm font-medium text-gray-700">{title}</label>

        <div className='mt-1 relative'>
            <select value={currency} className='w-full p-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                onChange={(e) => setCurrency(e.target.value)}
            >
                {favouriteList?.map((favourite) => (
                    <option className='bg-gray-200' value={favourite} key={favourite}>
                        {favourite}
                    </option>
                ))}
                <hr />
                {currenciesList?.map((curr) => (
                    <option value={curr} key={curr}>
                        {curr}
                    </option>
                ))}
            </select>
            <button onClick={() => {handleFavourite(currency)}} className='absolute inset-y-0 right-0 pr-5 flex justify-center items-center leading-5'>
                {isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}
            </button>
        </div>
    </div>
  )
}

export default CurrencyDropDown