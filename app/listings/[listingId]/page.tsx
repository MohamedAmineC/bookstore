import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getReservations"
import { Metadata } from "next"

interface IParams{
    listingId?: string,
}

export async function generateMetadata({ params }:{params:IParams}): Promise<Metadata> {
  const listing = await getListingById(params);
  return { 
    title: listing?.title,
    description: listing?.description 
  }
}

const ListingPage = async ({params}:{params:IParams}) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser();
    if(!listing){
        return (
            <EmptyState />
        )
    }
  return (
    <ListingClient 
    listing={listing}
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}

export default ListingPage