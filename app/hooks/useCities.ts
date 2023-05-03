import {City} from "country-state-city"

const useCities = () => {
    const getCitiesByCountry = (id?:string) => {
        return City.getCitiesOfCountry(id as string)
    }
    return {
        getCitiesByCountry
    }
}

export default useCities;