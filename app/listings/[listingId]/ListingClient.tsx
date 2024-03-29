"use client"

import Container from "@/app/components/Container"
import { categories } from "@/app/components/NavBar/Categories"
import { Listing, Reservation, User } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import ListingHead from "@/app/components/Listings/ListingHead"
import ListingInfo from "@/app/components/Listings/ListingInfo"
import useLoginModal from "@/app/hooks/useLoginModal"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import ListingReservation from "@/app/components/Listings/ListingReservation"
import { Range } from "react-date-range"

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    listing: Listing & {
        user: User
    },
    reservations?: Reservation[],
    currentUser: User | null
}

const ListingClient:React.FC<ListingClientProps> = ({
    listing,reservations = [],currentUser
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category)
    },[listing.category])

    const disabledDates = useMemo(() => {
        let dates:Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [ ...dates, ...range]

        })
        return dates;
    },[reservations])

    const [isLoading,setIsLoading] = useState(false)
    const [totalPrice,setTotalPrice] = useState(listing.price)
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if(!currentUser) return loginModal.onOpen();
        setIsLoading(true);
        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        }).then(() => {
            toast.success('Listing reserved')
            setDateRange(initialDateRange);
            router.refresh();
        }).catch(() => {
            toast.error('Something went wrong!')
        }).finally(() => {
            setIsLoading(false)
        })
    },[totalPrice,dateRange,listing?.id,currentUser,router,loginModal])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate)
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }
            else setTotalPrice(listing.price)
        }
    },[dateRange,listing.price])
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead 
                title={listing.title}
                imagesSrc={listing.imagesSrc}
                locationValue={listing.locationValue}
                city={listing.city || listing.state}
                id={listing.id}
                currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo 
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    bathroomCount={listing.bathroomCount}
                    guestCount={listing.guestCount}
                    coordinates={listing.coordinates}
                    />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation 
                        price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setDateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient