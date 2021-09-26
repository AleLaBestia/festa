import Image from "next/image";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid"
import Currency from "react-currency-formatter";
import QuickView from "./QuickView";
import { motion } from "framer-motion";

export default function Product({id, title, price, description, category, image}) {
    
    const [visible, setVisible] = useState(false)

    const [rating] = useState(
        Math.floor(
            Math.random()*5 + 1
        )
    ) 

   

    const [hasPrime] = useState(
        Math.random() > 0.5 ?
        true
        : false
    )

    return (
        <motion.div 
            className={`relative shadow-lg flex flex-col m-5 bg-white p-10 rounded-2xl ${!visible?"z-30":null}`}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 },
            }}
        >
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

            <Image src={image} height={200} width={200} objectFit="contain" />

            <h4 className="my-3">{title}</h4>
            
            <div className="flex">
            {
                Array(rating)
                .fill()
                .map((_, i) => 
                    <StarIcon className="h-5 text-yellow-500" />
                )
            }
            </div>

            <p className="text-xs my-2 line-clamp-2">{description}</p>
            
            <div className="mb-5">
                <Currency quantity={price} currency="INR" />
            </div>

            {
                hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )
            }

            <button 
                className="mt-auto button"
                onClick={() => setVisible(true)}
            >View Item</button>

            {
                visible?
                <QuickView 
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating}
                    close={() => setVisible(false)}
                />
                :null
            }
            
        </motion.div>
    )
}