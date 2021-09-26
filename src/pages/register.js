import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { auth } from '../Firebase'
import { selectUser } from '../slices/userSlice'

function register() {

    const user = useSelector(selectUser)
    const router = useRouter()

    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = () => {
        if(firstName && surname && password===confirmPassword && password){
            auth.createUserWithEmailAndPassword(
                email,
                password
            )
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: firstName + " " + surname
                })
                auth.signOut();
                alert("User created")
            })
            .catch(err => alert(err))
        }
    }

    if(user.user){
        router.push("/")
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
        
        <Header />
        {
            user.user?
            null
            :
            <main className="max-w-screen-2xl h-[80vh] mx-auto grid place-items-center">

            <motion.div 
                className="bg-white shadow-2xl p-6 w-96"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1 },
                }}
            >
                <h3 className="font-semibold text-2xl mb-6">Sign-Up</h3>

                <p className="font-semibold my-2">First name</p>
                <input className="textbox" type="text" onChange={e => setFirstName(e.target.value)}/>

                <p className="font-semibold my-2">Surname</p>
                <input className="textbox" type="text" onChange={e => setSurname(e.target.value)}/>

                <p className="font-semibold my-2">Email</p>
                <input className="textbox" type="email" onChange={e => setEmail(e.target.value)}/>

                <p className="font-semibold my-2">Password</p>
                <input className="textbox" type="password" onChange={e => setPassword(e.target.value)}/>

                <p className="font-semibold my-2">Confirm Password</p>
                <input className="textbox" type="password" onChange={e => setConfirmPassword(e.target.value)}/>

                <button className="button mt-5 w-full" onClick={register}>Register</button>
                <p className="link mt-4 text-center text-blue-400" onClick={() => router.push("/login")}>Already have an account? Click here to sign in</p>
            </motion.div>

            </main>
        }

        <Footer />
        </div>
    )
}

export default register
