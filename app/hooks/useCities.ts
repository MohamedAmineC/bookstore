import {City,State} from "country-state-city"

const useCities = () => {
    const getStatesByCountry = (id?:string) => {
        return State.getStatesOfCountry(id);
    }
    const getCitiesOfState = (country?:string,state?:string) => {
        return City.getCitiesOfState(country as string,state as string)
    }
    const getStateByValue = (country?:string,state?:string) => {
        return State.getStateByCodeAndCountry(country as string,state as string)
    }
    return {
        getCitiesOfState,
        getStatesByCountry,
        getStateByValue
    }
}

export default useCities;