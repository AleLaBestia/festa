import React from 'react'
import Currency from "react-currency-formatter"

function OrderItem({id, amount, shippingPrice, images, timestamp}) {
    return (
        <div className="w-full bg-white border-solid border-4 border-gray-200">
            <div className="bg-gray-200 md:flex justify-between p-4">
                <div className="mb-5">
                    <p className="font-semibold">ORDER PLACED</p>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="mb-5">
                    <p className="font-semibold">TOTAL</p>
                    <p><Currency quantity={amount} currency="INR" /> - Next Day Delivery <Currency quantity={shippingPrice} currency="INR" /></p>
                </div>
                <div className="mb-5">
                    <p className="font-semibold text-sm">ORDER ID: {id.slice(0, 20)}</p>
                    <p className="text-blue-500">{images.length} Items</p>
                </div>
            </div>
            <div className="md:flex p-4">
                {
                    images.map(image => 
                        <img className="h-36 mx-auto my-8 md:mx-6" src={image} />
                    )
                }
            </div>
        </div>
    )
}

export default OrderItem
