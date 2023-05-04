"use client"

import { IState } from "country-state-city"
import { CountrySelectValue } from "./CountrySelect"
import useCities from "@/app/hooks/useCities"
import { useMemo } from "react"
import Select from "react-select"

interface StateSelectProps {
    value?: IState,
    onChange: (value:IState) => void,
    country?: CountrySelectValue
}

const StateSelect:React.FC<StateSelectProps> = ({
    value,onChange,country
}) => {
    const {getStatesByCountry} = useCities();
    const states = useMemo(() => {
        return getStatesByCountry(country?.value)   
    },[country,getStatesByCountry]) 
    if(states.length === 0) return null;
  return (
    <div>
        <Select 
        placeholder="Anywhere"
        isClearable
        options={states}
        value={value}
        onChange={(value) => onChange(value as IState)}
        formatOptionLabel={(option:IState) => (
            <div className='flex items-center gap-3'>
                <div>
                    {country?.flag}
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

export default StateSelect