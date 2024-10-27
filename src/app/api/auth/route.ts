import { connectMongoDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { env } from 'node:process';

export async function POST(req: Request) {
  try{
    const {phone, password} = await req.json();

    await connectMongoDB();
    
    const user = await User.findOne({ phone: phone })
    if (!user) return NextResponse.json({msg: "User does not exist. "}, {status: 400});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({msg: "Invalid credentials. "}, {status: 400});

    const token = jwt.sign({ id: user._id }, env.JWT!)

    return NextResponse.json({ token, user }, {status: 201});

} catch (err: any){
  return NextResponse.json({ error: err.message });
}
}

export async function PATCH( req: Request ) {
  try {
      const { _id, contact} = await req.json();
      
      await connectMongoDB();

      const updatedUser = await User.findByIdAndUpdate({_id: _id}, {contact: contact}, {new: true} );

      return NextResponse.json(
          { data: updatedUser },
          { status: 201 }
          );
      } 
  catch (error: unknown) {
      return NextResponse.json(
          { message: "An error occurred while updating the User" },
          { status: 500 }
      );
  }
}

export async function GET(req : any) {
  try {

    const searchParams = req.nextUrl.searchParams;
    const userID = searchParams.get('query');

    console.log("GET request userID from search params:" + userID)
  
    await connectMongoDB();

    const user = await User.findById(userID);

    let contact = user.contact

    console.log(user.contact)

    return NextResponse.json(
      { data: contact},
      { status: 200 },
    )
  }
  catch (error: unknown) {
    return NextResponse.json(
      { message: "An error occurred while getting user's contact" },
      { status: 500 }
    );
  }
}