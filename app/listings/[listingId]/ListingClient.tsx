"use client"

import Container from "@/app/components/Container"
import { categories } from "@/app/components/NavBar/Categories"
import { Listing, Reservation, User } from "@prisma/client"
import { useMemo } from "react"
import ListingHead from "@/app/components/Listings/ListingHead"
import ListingInfo from "@/app/components/Listings/ListingInfo"

interface ListingClientProps {
    listing: Listing & {
        user: User
    },
    reservations?: Reservation[],
    currentUser: User | null
}

const ListingClient:React.FC<ListingClientProps> = ({
    listing,reservations,currentUser
}) => {
    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category)
    },[listing.category])
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
                <div className="grid gird-cols md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo 
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    bathroomCount={listing.bathroomCount}
                    guestCount={listing.guestCount}
                    coordinates={listing.coordinates}
                    />
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient