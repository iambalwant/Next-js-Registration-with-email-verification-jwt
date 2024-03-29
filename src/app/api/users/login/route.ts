import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest){
  try {
     const reqBody = await request.json()
     const {email, password} = reqBody;
     console.log(reqBody);
     
    //  check if user Exist 
    const user = await User.findOne({email: email})
    if(!user){
        return NextResponse.json({error: "User does not exisit"},{status: 400})
    }
    // check if password is correct 
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({error: "invalid password"}, {status: 400})
    }
    //create token data 
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    //create a token 
    const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1hr"})

    const response = NextResponse.json({
        messages: 'login succesfully',
        success: true,
    })
    response.cookies.set("token", token, {httpOnly: true})
    return response;
    

  } catch (error:any) {
      return NextResponse.json({error: error.message},{status: 500})
  }
}