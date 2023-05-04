"use client"

import useCities from "@/app/hooks/useCities";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react";
import {format} from "date-fns"
import Image from "next/image";
import ImageCarousel from "../ImageCarousel";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps{
    currentUser?: User | null,
    data: Listing,
    reservation?: Reservation,
    onAction?: (id:string) => void,
    disabled?:boolean,
    actionLabel?: string,
    actionId?: string,
}

const ListingCard:React.FC<ListingCardProps> = ({
    data,reservation,onAction,disabled,actionId = "",actionLabel,currentUser
}) => {
    const router = useRouter();
    const {getByValue} = useCountries();
    const {getStateByValue} = useCities();

    const country = getByValue(data.locationValue);

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(disabled) return;
        onAction?.(actionId);
    },[onAction,disabled,actionId])

    const price = useMemo(() => {
        if(reservation){
            return reservation.totalPrice
        }
        return data.price
    },[reservation,data])

    const reservationDate = useMemo(() => {
        if(!reservation){
            return null
        }
        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)
        return `${format(start,'PP')} - ${format(end,'PP')}`
    },[reservation])
  return (
    <div className="col-span-1 cursor-pointer group"
    onClick={() => router.push(`/listings/${data.id}`)}>
        <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <ImageCarousel 
                images={data.imagesSrc}
                />
                <div className="absolute top-3 right-3">
                    <HeartButton 
                    listingId={data.id}
                    currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {country?.region},{country?.label}
            </div>
            <div className="text-md">
                {data.city}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex items-center gap-1">
                <div className="font-semibold">
                    $ {price}
                </div>
                {!reservation && (
                    <div className="font-light">
                        night
                    </div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button 
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                />
            )}
        </div>
    </div>
  )
}

export default ListingCard