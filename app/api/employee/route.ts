import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req : Request){
    try {
        const body = await req.json();
        const employee = await prisma.employee.create({
            data : body
        });
        return NextResponse.json({
            employee : employee,
            message : "employee created successfully"
        },{
            status : 200
        })
    }catch(error){
        console.log("an error occured while creating cutomer data");
        return NextResponse.json({
            message : "internal server error"
        },{
            status : 500
        })
    }
}

export async function GET(){
    try{
        const employees = await prisma.employee.findMany({
            orderBy : {
                salary : "asc"
            }
        });
        return NextResponse.json({
            message : "employees data fetched successfully",
            employees : employees
        },{
            status : 20
        })
    } catch(error){
        console.error("an error occured while fetching data!!");
        return NextResponse.json({
            message : "internal server error"
        },{
            status : 500
        });
    }
}