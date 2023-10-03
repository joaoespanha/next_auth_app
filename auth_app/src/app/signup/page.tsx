"use client";

import React, { useEffect } from "react";
import { useState } from 'react'
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toast } from "react-hot-toast";
import { log } from "console";
import toast from "react-hot-toast/headless";

export default function SignUpPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: '',
        password: '',
        password2: '',
        username: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const [isButtonDisabled, setisButtonDisabled] = useState(true)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        console.log(name, value)

    };


    const onSignUp = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup error", error);
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const areFieldsFilled = (): Boolean => {
        return user.email.length > 0 && user.email.length > 0 && user.password.length > 0
    }

    const arePasswordsEqual = (): Boolean => {
        return user.password === user.password2

    }

    useEffect(() => {

        if (areFieldsFilled() && arePasswordsEqual()) {
            setisButtonDisabled(false)
        }

    }, [user])



    return (
        <div>
            <h1 className="text-center text-white text-2xl">{isLoading ? "Processing" : "Sign Up"}</h1>
            <label htmlFor="username">username
                <input name="username" className="text-black p-2 border-gray-300 rounded-lg mb-4" id="username" type="text" value={user.username} onChange={handleInputChange} />
            </label>

            <label htmlFor="email">email
                <input name="email" className="text-black p-2 border-gray-300 rounded-lg mb-4" id="email" type="text" value={user.email} onChange={handleInputChange} />
            </label>

            <label htmlFor="password1">Password
                <input name="password" className="text-black p-2 border-gray-300 rounded-lg mb-4" id="password" type="password" value={user.password} onChange={handleInputChange} />
            </label>

            <label htmlFor="password2">Repeat password
                <input name="password2" className="text-black p-2 border-gray-300 rounded-lg mb-4" id="password2" type="password" value={user.password2} onChange={handleInputChange} />
            </label>

            <button disabled={isButtonDisabled} onClick={onSignUp} >Sign Up</button>

        </div>
    )
}
