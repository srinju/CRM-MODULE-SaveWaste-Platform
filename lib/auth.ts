import { PrismaClient } from '@prisma/client';
import{z} from 'zod'
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs";

const signinSchema = z.object({
    name : z.string(),
    email : z.string().email("invalid email address").nonempty("email field is requried"),
    password : z.string().min(6,"password must be atleast 6 charecters long").nonempty("password field is required")
});

const prisma = new PrismaClient();

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                name : {label : "Full Name" , type : "text" , placeholder : "Your full name" , required : true},
                email : {label : "Emal Address" , type : "text" , placeholder : "Your Email address" , required  : true},
                password : {label : "password" , type : "password" , placeholder : "your password" , required : true}
            },

            async authorize(credentials : any) {
                try {
                    //zod validation>
                    const validatedcreds = signinSchema.parse(credentials);
                    const exisitingUser = await prisma.user.findFirst({
                        where : {
                            email : validatedcreds.email
                        }
                    });
                    if(exisitingUser){
                        const passwordValidation = await bcryptjs.compare(validatedcreds.password , exisitingUser.password);
                        if(passwordValidation){
                            return {
                                id : exisitingUser.id.toString(),
                                name : exisitingUser.name,
                                email : exisitingUser.email,
                                role : exisitingUser.role
                            }
                        }
                    }
                    return null;
                } catch (error) {
                    console.error("an error occured in authentication!!" , error);
                    return null;
                }
            }
        }),
    ],
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {
        async session({token , session} : any) {
            session.user.id = token.sub;
            return session;
        }
    }
}