const stripe = require("stripe")("sk_test_51IuM8vSCwLBSaM61bdRM7dNfl2IKmgI0PUCU2Fgn9LKyYeeLde3AoHSK2cos5PoxbBALH4TGxEuLOTZolv8UvmdI00jrNneTK0")

export default async (req, res) => {

    const {items, email} = req.body;

    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "INR",
            unit_amount: item.price * 100,
            product_data : {
                name: item.title,
                images: [item.image]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1IuMFcSCwLBSaM611Vj1qzDJ"],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA','IN'],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: "https://amazon-clone-2-ochre.vercel.app/success",
        cancel_url: "https://amazon-clone-2-ochre.vercel.app/basket",
        metadata: {
            email, 
            images: JSON.stringify(items.map(item => item.image)),
        }
    })

    res.status(200).json({id: session.id})
}
