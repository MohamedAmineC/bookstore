"use client"

import {ICity} from "country-state-city/lib/interface"
import { CountrySelectValue } from "./CountrySelect"
import useCities from "@/app/hooks/useCities"
import { useMemo } from "react"
import Select from "react-select"

interface CitySelectProps {
    country: CountrySelectValue
    value?: ICity,
    onChange: (value:ICity) => void
}

const CitySelect:React.FC<CitySelectProps> = ({
    value,onChange,country
}) => {
    const {getCitiesByCountry} = useCities();
    const cities = useMemo(() => {
        return getCitiesByCountry(country?.value);
    },[country,getCitiesByCountry]) 
    if(cities?.length === 0) return null;
  return (
    <div>
        <Select
        placeholder='Anywhere'
        isClearable
        options={cities} 
        value={value}
        onChange={(value) => onChange(value as ICity)}
        formatOptionLabel={(option:ICity) => (
            <div className='flex items-center gap-3'>
                <div>
                    {country.flag}
                </div>
                <div>
                    {option.name}
                </div>
            </div>
        )}
        classNames={{
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg'
        }}
        theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors:{
                ...theme.colors,
                primary: 'black',
                primary25: '#ffe4e6'
            }
        })}
        />
    </div>
  )
}

export default CitySelect
