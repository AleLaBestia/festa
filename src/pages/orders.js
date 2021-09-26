import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { auth, db } from '../Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signIn, signOut } from '../slices/userSlice'
import OrderItem from '../components/OrderItem'

function orders() {

    const [orders, setOrders] = useState()
    const user = useSelector(selectUser)

    useEffect(() => {
        db
        .collection("users")
        .doc(user.user?.email)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [user])

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 min-h-screen">
            <Header />

            <main className=" max-w-screen-2xl p-8 mx-auto w-full flex-1">
                <h1 className="font-semibold text-3xl border-b pb-4 dark:text-white border-yellow-400">
                    Your Orders
                </h1>
                {
                    user.user? 
                        <h2 className="mt-2 font-semibold text-lg dark:text-white">{orders?.length} Orders </h2>
                    : <h2 className="mt-2 dark:text-white">Please sign in to see your orders</h2>
                }

                <div className="mt-5 space-y-4">
                    {
                        orders?.map(({id, data:{amount, amount_shipping, images, timestamp}}) => 
                            <OrderItem 
                                id={id}
                                amount={amount}
                                shippingPrice={amount_shipping}
                                images={images}
                                timestamp={timestamp}
                            />
                        )
                    }
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default orders