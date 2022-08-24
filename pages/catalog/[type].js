import React, { useState } from 'react'
import { connectToDatabase } from '../../lib/mongodb'
import OfferCard from '../../components/OfferCard'
import Link from 'next/link'

import Head from 'next/head'

export default function Products({ offers, type }) {

    const [checkboxType, setType] = useState(type)

    const [minPrice, setMinPrice] = useState(undefined)
    const [maxPrice, setMaxPrice] = useState(undefined)

    const [name, setName] = useState("")

    const OfferComponents = offers.map((offer) => {
        return (
            <OfferCard name={offer.name} price={offer.price} img={offer.img} subheading={offer.subheading} id={offer._id} key={offer._id}/>
        )
    })


    return (
        <div className='w-5/6 mr-auto ml-auto'>
            <Head>
                <title>{type} offer</title>
            </Head>
            <h1 className='font-bold text-7xl text-yellow-600 m-4'>Our offer</h1>
            <div className='bg-slate-200 w-full min-h-[128px] rounded-t-2xl flex flex-col lg:flex-row'>
                <div className='flex flex-col p-4 m-1 lg:m-3'>
                    <h2 className='text-2xl font-bold'>Sunscreen type</h2>
                    <label className='flex items-center'>Pro<input type="checkbox" checked={checkboxType === "pro"} onChange={() => setType("pro")} className='w-5 h-5 m-2' /></label>
                    <label className='flex items-center'>Deluxe<input checked={checkboxType === "deluxe"} onChange={() => setType("deluxe")} type="checkbox" className='w-5 h-5 m-2' /></label>
                    <label className='flex items-center'>Normal<input type="checkbox" checked={checkboxType === "normal"} onChange={() => setType("normal")} className='w-5 h-5 m-2' /></label>
                </div>
                <div className='flex flex-col p-4 m-1 lg:m-3'>
                    <h2 className='text-2xl font-bold'>Price</h2>
                    <div className='flex'>
                        <label className='flex flex-col'>Min<input type="text" className='w-20 h-10 mr-2 rounded-lg p-2' value={minPrice} onInput={(e) => setMinPrice(e.target.value)} placeholder='0' /></label>
                        <label className='flex flex-col'>Max<input type="text" className='w-20 h-10 rounded-lg p-2' value={maxPrice} onInput={(e) => setMaxPrice(e.target.value)} placeholder='100' /></label>
                    </div>
                </div>
                <div className='flex flex-col p-4 m-1 lg:m-3'>
                    <h2 className='text-2xl font-bold mb-2 lg:mb-6'>Name</h2>
                    <div className='flex'>
                        <input type="text" value={name} onInput={(e) => setName(e.target.value)} className='w-48 h-10 mr-2 rounded-lg p-2' placeholder='Sunscreen name' />
                    </div>
                </div>
                <div className='min-h-full flex justify-center items-center mb-4 mr-4'>
                    <Link href={`/catalog/${checkboxType}?minprice=${minPrice ? minPrice : 0}&maxprice=${maxPrice ? maxPrice : 999}&name=${name}`}><button className='bg-yellow-600 text-4xl text-white font-bold p-2 rounded-2xl'>FILTER THE RESULTS</button></Link>
                </div>
            </div>
            <div className='flex flex-wrap bg-slate-100 w-full p-4 gap-4 justify-center xl:justify-start min-h-[2/3vh]'>
                {OfferComponents}
            </div>
        </div>
    )
}



export async function getServerSideProps(context) {
    const params = context.query

    let { db } = await connectToDatabase()

    const products = await db
        .collection("products")
        .find({ type: params.type, price: { $lte: params.maxprice ? parseInt(params.maxprice) : 999, $gte: params.minprice ? parseInt(params.minprice) : 0 }, name: { $regex: params.name ? new RegExp(params.name, "i") : "" } })
        .toArray()


    return {
        props: {
            offers: JSON.parse(JSON.stringify(products)),
            type: params.type
        }
    }
}