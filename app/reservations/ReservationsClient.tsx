"use client"

import { Listing,Reservation,User } from "@prisma/client"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import getCurrentUser from "../actions/getCurrentUser"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/Listings/ListingCard"

interface ReservationsClientProps{
    reservations: (Reservation & {
        Listing: Listing
    })[],
    currentUser?: User | null
}

const ReservationsClient:React.FC<ReservationsClientProps> = ({
    reservations,currentUser
}) => {
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('')
    const onCancel = useCallback((id:string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled')
            router.refresh()
        }).catch(() => {
            toast.error('Something went wrong')
        }).finally(() => {
            setDeletingId('')
        })
    },[router])
  return (
    <Container>
        <Heading 
        title="Reservations"
        subTitle="Bookings on your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {reservations.map((reservation) => (
                <ListingCard 
                key={reservation.id}
                data={reservation.Listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient