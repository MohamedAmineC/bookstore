import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req:Request) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const body = await req.json();
    const {
        category,
        location,
        state,
        city,
        address,
        guestCount,
        roomCount,
        bathroomCount,
        imagesSrc,
        title,
        description,
        price
    } = body

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imagesSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            coordinates: city ? [Number(city.latitude),Number(city.longitude)] : [Number(state.latitude),Number(state.longitude)],
            price: parseInt(price,10),
            address,
            state: state.isoCode,
            city: city.name,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}