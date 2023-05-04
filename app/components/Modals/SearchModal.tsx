"use client"

import React, { useState,useMemo, useCallback } from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect'
import qs from "query-string"
import { ICity, IState } from 'country-state-city'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import StateSelect from '../Inputs/StateSelect'
import CitySelect from '../Inputs/CitySelect'
import Calendar from '../Inputs/Calendar'
import Counter from '../Inputs/Counter'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location,setLocation] = useState<CountrySelectValue>()
  const [state,setState] = useState<IState>()
  const [city,setCity] = useState<ICity>()
  const [step,setStep] = useState(STEPS.LOCATION)
  const [guestCount,setGuestCount] = useState(1)
  const [bathroomCount,setBathroomCount] = useState(1)
  const [roomCount,setRoomCount] = useState(1)
  const [dateRange,setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const Map = useMemo(() => dynamic(() => import('../Map'),{
    ssr: false
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [location,state,city])

  const onBack = useCallback(() => {
    setStep(value => value - 1)
  },[])

  const onNext = useCallback(() => {
    setStep(value => value + 1)
  },[])

  const onSubmit = useCallback(async () => {
    if(step !== STEPS.INFO) return onNext();
    let currentQuery = {};
    if(params){
        currentQuery = qs.parse(params.toString())
    }
    const updatedQuery:any = {
        ...currentQuery,
        country: location?.value,
        state: state?.isoCode,
        city: city?.name,
        guestCount,
        roomCount,
        bathroomCount
    }

    if(dateRange.startDate){
        updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if(dateRange.endDate){
        updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
    },{
        skipNull: true
    })
    setStep(STEPS.LOCATION)
    searchModal.onClose();
    router.push(url)
  },[step,searchModal,location,router,guestCount,roomCount,bathroomCount,dateRange,onNext,params,state,city])

  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO){
        return 'Search'
    }
    return 'Next'
  },[step])

  const secondaryActionLabel = useMemo(() =>{
    if(step === STEPS.LOCATION){
        return undefined
    }
    return 'Back'
  },[step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
        <Heading 
        title='Where do you want to go'
        subTitle='find the perfect location'
        />
        <CountrySelect 
        value={location}
        onChange={(value) => {
            setLocation(value as CountrySelectValue)
            setState(undefined)
            setCity(undefined)
        }}
        />
        <StateSelect 
        value={state}
        country={location}
        onChange={(value) => {
            setState(value as IState)
            setCity(undefined)
        }}
        />
        <CitySelect 
        country={location}
        value={city}
        state={state}
        onChange={(value) => setCity(value as ICity)}
        />
        <hr />
        <Map 
          center={city ? [Number(city.latitude),Number(city.longitude)] : (state ? [Number(state.latitude),Number(state.longitude)] : location?.latlng)}
          cityZoom={city ? true : false }
          stateZoom={state ? true : false}
          />
    </div>
  )

  if(step === STEPS.DATE){
    bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
            title='When do you plan to go'
            subTitle='make sure everyone is free'
            />
            <Calendar 
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
            />
        </div>
    )
  }
  if(step === STEPS.INFO){
    bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
            title='More information'
            subTitle='Find your perfect place'
            />
            <Counter 
            title='Guests'
            subtitle='How many guests are coming'
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
            />
            <Counter 
            title='Rooms'
            subtitle='How many rooms do you need'
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
            />
            <Counter 
            title='Bathrooms'
            subtitle='How many bathrooms do you need'
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
            />
        </div>
    )
  }
    return (
    <Modal 
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    title='Filters'
    actionLabel={actionLabel}
    body={bodyContent}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  )
}

export default SearchModal