import React from 'react'
import SignIn from "./sign-in"
const Landingpage = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6">Welcome to Email Builder</h1>
            <p className="text-xl mb-8">Create beautiful emails with ease</p>

            <SignIn />
        </div>
    )
}

export default Landingpage