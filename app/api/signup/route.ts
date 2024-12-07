import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import {z} from "zod"
import bcryptjs from "bcryptjs";

const signupsSchema = z.object({
    name : z.string(),
    email : z.string().email().nonempty("this email field is required!!"),
    password : z.string().min(6,"password shold be minimum of 6 charecters").nonempty("password field should not be empty"),
    role : z.enum(["ADMIN" , "USER" , "DRIVER"])
});

export async function POST(req : Request){
    try {
        const body = await req.json();
        const validatedcreds = signupsSchema.parse(body);
        //check for exisiting users >
        const exisitingUser = await prisma.user.findUnique({
            where : {
                email : validatedcreds.email
            }
        });
        if(exisitingUser){
            return NextResponse.json({
                message : "this user already exisits!"
            },{
                status : 400
            });
        }
        const hashedPassword = await bcryptjs.hash(validatedcreds.password,10);
        //create new user >>
        const newUser = await prisma.user.create({
            data : {
                name : validatedcreds.name,
                email : validatedcreds.email,
                password : hashedPassword,
                role : validatedcreds.role
            }
        });
        if(!newUser){
            return NextResponse.json({
                message : "theere was an error while creating the user"
            });
        }
        return NextResponse.json({
            user : newUser,
            message : "user created successfully"
        },{
            status : 200
        })
    } catch(error) {
        console.error("an error occured in the signyp route " , error);
        return NextResponse.json({
            message : "error occured in the signup route"
        },{
            status : 500
        });
    }
}