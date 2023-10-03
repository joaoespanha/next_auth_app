import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/database/dbConfig";
import bcrypt from 'bcryptjs';


connect()

export async function POST(request: NextRequest) {


    try {

        const { username, password, email } = await request.json();


        const user = await User.findOne({ email })

        if (user) {

            return NextResponse.json({ message: 'User already exists!', status: 500 })

        }

        // hash password 

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user wth hashed password
        const newUser = await User.create({ username, email, password: hashedPassword })

        // save new user to database
        await newUser.save()

        // return response with 201 code and creation messsage

        return NextResponse.json({ status: 201, message: 'User created successfuly!' })

    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }

}