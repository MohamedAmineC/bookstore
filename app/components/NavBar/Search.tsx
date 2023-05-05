"use client"

import useCountries from "@/app/hooks/useCountries"
import useSearchModal from "@/app/hooks/useSearchModal"
import { differenceInDays } from "date-fns"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import {BiSearch} from "react-icons/bi"



const Search:React.FC= () => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const {getByValue} = useCountries();

    const locationValue = params?.get('country');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');
    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }
        return 'Anywhere'
    },[locationValue,getByValue])
    const durationLabel = useMemo(() => {
        if(startDate && endDate){
            const start = new Date(startDate as string);
            const end = new Date(endDate as string) 
            let diff = differenceInDays(end,start)
            if(diff === 0){
                diff = 1
            } 
            return `${diff} days`;
        }
        return 'Any week'
    },[startDate,endDate])
    const guestCountLabel = useMemo(() => {
        if(guestCount){
            return `${guestCount} Guests`
        }
        return 'Add guests'
    },[guestCount])
  return (
    <div className={`border-[1px] w-full sm:block md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer`}
    onClick={searchModal.onOpen}>
        <div className="flex items-center justify-between">
            <div className="text-sm font-semibold px-6">
                {locationLabel}
            </div>
            <div className=" hidden sm:block border-x-[1px] flex-1 text-center text-sm font-semibold px-6">
                {durationLabel}
            </div>
            <div className="text-sm font-semibold pl-6 pr-2 text-gray-600 flex items-center gap-3">
                <div className="hidden sm:block">
                    {guestCountLabel}
                </div>
                <div className="p-2 bg-rose-500 rounded-full text-white">
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search