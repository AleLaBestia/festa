import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Header from '../components/Header';


function success() {

    const router = useRouter()

    toast("Successfully purchased", {type: "success"})

    return (
        <>
            <ToastContainer />
            <main className="bg-gray-100 min-h-screen flex flex-col">
                
                <Header />
                <div className="flex-1 dark:bg-gray-700 min-h-[60vh]"> 
                    <main className="max-w-screen-lg bg-white mx-auto mt-20">
                        <div className="flex flex-col p-10">
                            <div className="flex items-center space-x-2 mb-5">
                                <CheckCircleIcon className="text-green-500 h-10 "/>
                                <h1 className="text-3xl">
                                    Thank you, your order has been confirmed!
                                </h1>
                            </div>
                            <p>Thank you for shopping with us, We'll send a confirmation email once the item(s) has been shipped, if you would like to check the status of the order(s), please click the link below.</p>
                            <button className="button mt-8" onClick={() => router.push("/orders")}>Go to my orders</button>
                        </div>
                    </main>
                </div>
                <Footer />
            </main>
        </>
    )
}

export default success
