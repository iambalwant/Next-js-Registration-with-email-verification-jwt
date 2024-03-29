import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';
connect()

export async function POST(request: NextRequest){
     try {
        const reqBody = await request.json()
        const {username, password, email} = reqBody;
        console.log(reqBody);

        // Check if User already exist

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User Already exist"}, {status: 400})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        //send an email  before resposnces

        await sendEmail({email, emailType: "VERIFY",userId: savedUser._id})

        return NextResponse.json({message: "user created succesfully",
        success: true,
        savedUser
    })
     } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
     }
}