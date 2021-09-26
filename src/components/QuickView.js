import { StarIcon } from '@heroicons/react/solid'
import React from 'react'
import Currency from "react-currency-formatter"
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectItems } from '../slices/basketSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'

function QuickView({id, title, price, close, rating, description, category, image}) {

    const dispatch = useDispatch()
    const basket = useSelector(selectItems)

    return (
        <div className="absolute z-50">
            {/* Fade Background */}
            <div className="bg-black opacity-50 w-full h-full fixed top-0 left-0 z-[90000]" />

            <div className="grid items-center fixed top-0 left-0 h-screen w-full z-[100000]">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1 },
                    }}
                    className="bg-white rounded-lg mx-auto grid grid-flow-row-dense md:grid-cols-2 w-5/6 p-8 md:p-0 max-w-4xl"
                >

                    {/* Image */}
                    <div className="md:p-14 m-auto flex items-center" >
                        <img className="h-36 md:h-auto" src={image} />
                    </div>

                    {/* Description */}
                    <div className="py-8 pr-5 flex flex-col">
                        <h1 className="text-xl md:text-2xl text-yellow-500">{title}</h1>
                        <p className="text-gray-400 my-2 link">{category}</p>
                        <div className="text-yellow-300 flex items-center mb-2">
                            <p className="font-semibold text-md text-black">Rating: </p>
                            {
                                Array(rating)
                                .fill()
                                .map((_, i) => 
                                    <StarIcon className="h-5" />
                                )
                            } 
                        </div>
                        <p className="flex-1 line-clamp-2 md:line-clamp-none">{description}</p>
                        <p className="text-lg md:text-2xl mt-2">
                            <Currency currency="INR" quantity={price} />
                        </p>
                        <button 
                            className="button mt-5 w-full"
                            onClick={() => {
                                dispatch(addToBasket({
                                    id: id,
                                    title : title, 
                                    price : price, 
                                    description : description, 
                                    category : category, 
                                    image : image
                                }))

                                toast("Add to basket", {type: "success"})
                            }}
                        >Add to Basket</button>
                        <button className="button mt-3 w-full" onClick={close}>Close</button>
                    </div>
                </motion.div>
                
            <ToastContainer />
            </div>
        </div>
        
    )
}

export default QuickView
