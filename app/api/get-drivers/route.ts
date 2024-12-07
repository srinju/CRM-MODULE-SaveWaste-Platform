import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const presentDrivers = await prisma.user.findMany({
            where : {
                role : 'DRIVER'
            }
        });
        if(!presentDrivers){
            throw new Error("error while gettting present drivers!!")
        }
        return NextResponse.json({
            message : "driver fetched successfully!!",
            drivers : presentDrivers
        }, {
            status : 200
        })
    } catch(error){
        console.error("there was an error while getting the present drivers!!" , error);
        return NextResponse.json({
            message : "internal server error"
        },{
            status : 500
        })
    }
}