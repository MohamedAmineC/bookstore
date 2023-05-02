import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"

export async function POST(req:Request){
    const body = await req.json();
    const {
        name,
        email,
        password
    } = body;
    
    const userExists = await prisma.user.findUnique({
        where:{
            email,
        }
    })

    if(userExists){
        return NextResponse.error();
    }

    const hashedPassword = await bcrypt.hash(password,12);


    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    })
    return NextResponse.json(user)
}