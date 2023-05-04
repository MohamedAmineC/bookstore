"use client"

import { Listing,User } from "@prisma/client"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/Listings/ListingCard"

interface FavoritesClientProps{
    listings: Listing[],
    currentUser?: User | null
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({listings,currentUser}) => {
  return (
    <Container>
        <Heading 
        title="Your favorites"
        subTitle="List of your favorite listings"
        />
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
                <ListingCard 
                key={listing.id}
                currentUser={currentUser}
                data={listing}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient