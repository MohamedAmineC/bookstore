"use client"

import useCountries from "@/app/hooks/useCountries"
import { User } from "@prisma/client"
import Heading from "../Heading";
import ImageCarousel from "../ImageCarousel";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    id: string,
    title: string,
    imagesSrc: string[],
    locationValue: string,
    city: string,
    currentUser?: User | null,
}

const ListingHead:React.FC<ListingHeadProps> = ({
    id,title,locationValue,imagesSrc,city,currentUser
}) => {
    const {getByValue} = useCountries();
    const country = getByValue(locationValue);

  return (
    <>
        <Heading 
        title={title}
        subTitle={`${country?.region}, ${country?.label}`}
        />
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <ImageCarousel 
            images={imagesSrc}
            controls
            />
            <div className="absolute top-5 right-5">
                <HeartButton 
                listingId={id}
                currentUser={currentUser}
                />
            </div>
        </div>
    </>
  )
}

export default ListingHead