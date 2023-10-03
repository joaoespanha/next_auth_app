import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/database/dbConfig";
import bcrypt from 'bcryptjs';


connect()


export async function POST(request: NextRequest) {
    const { username, password, email } = await request.json();

    try {
        const user = await User.findOne({ email, username })

        if (!user) {
            return NextResponse.json({ message: 'User does not exist!', status: 400 })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials!', status: 500 })
        }

        return NextResponse.json({ message: 'User logged in successfully!', status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }


}