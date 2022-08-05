import { ObjectId } from 'mongodb'
import React from 'react'

import { connectToDatabase } from '../../lib/mongodb'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper';


import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Product({ product }) {

    return (
        <div className='w-3/4 mr-auto ml-auto mt-12'>
            <DescriptionSection product={product} />
            <PhotoSection productPhotos={product.photos} />
        </div>
    )
}

function DescriptionSection({ product }) {
    return (
        <div className='flex flex-col lg:flex-row my-8 bg-slate-200 rounded-xl'>
            <div className='w-full min-h-[512px] lg:w-1/3 p-4 lg:p-8'>
                <Image src={`/${product.img}`} layout="responsive" width="80%" height="80%" />
            </div>
            <div className='w-full lg:w-2/3 p-8'>
                <h1 className='text-7xl font-bold m-4'>{product.name}</h1>
                <h2 className='text-5xl m-4'>{product.subheading}</h2>
                <p className='text-2xl m-4 leading-8 indent-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed id semper risus in hendrerit gravida rutrum quisque. Scelerisque in dictum non consectetur a erat. Eget aliquet nibh praesent tristique magna sit. Non curabitur gravida arcu ac tortor dignissim convallis. Iaculis nunc sed augue lacus viverra vitae congue eu. Gravida rutrum quisque non tellus orci ac auctor. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Tellus id interdum velit laoreet id donec ultrices. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.</p>
                <div className='flex justify-end text-4xl font-bold items-end'>
                    <h2>Price: <span className='text-green-600'>{product.price} EUR</span></h2>
                </div>
            </div>
        </div>
    )
}

function PhotoSection({ productPhotos }) {

    const photos = productPhotos.map((photo) => <SwiperSlide>
        <div className='mr-auto ml-auto p-2 rounded-lg'>
            <Image src={`/example_photos/${photo}`} layout="fixed" width={450} height={300} />
        </div>
    </SwiperSlide>)

    return (
        <section className='p-4 rounded-xl bg-slate-200'>
            <Swiper
                spaceBetween={5}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                centeredSlides={false}
                centerInsufficientSlides={true}
                pagination={{ clickable: true }}
                navigation={true}
                breakpoints={
                    {
                        1500: {slidesPerView: 2},
                        1920: { slidesPerView: 3 },
                    }
                }
                
            >
                {photos}
            </Swiper>
        </section>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id

    const { db } = await connectToDatabase()

    const product = await db
        .collection("products")
        .findOne({ _id: ObjectId(id) })

    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}
