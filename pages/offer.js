import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper';
import { connectToDatabase } from '../lib/mongodb';

import Nav from '../components/Navigation';
import OfferCard from '../components/OfferCard';

import Head from 'next/head'
import Link from 'next/link';

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Offer(props) {

  return (
    <div className='w-screen min-h-screen bg-gradient-radial'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <title>Offer</title>
      </Head>
      <Nav />
      <section className='py-16'>
        <h1 className='text-6xl font-bold text-center'>Our <span className='text-yellow-600'>sunscreen</span> offer</h1>
        <h2 className='text-4xl text-center'>Engineered in laboratories to protect your skin.</h2>
      </section>
      <OfferShowcase heading="Sunscreen Pro" subheading="Best for sensitive skin." possibleOffers={props["pro"]} type="pro"/>
      <OfferShowcase heading="Sunscreen Deluxe" subheading="Above average experience." possibleOffers={props["deluxe"]} type="deluxe"/>
      <OfferShowcase heading="Sunscreen Normal" subheading="The usual standard." possibleOffers={props["normal"]} type="normal"/>
    </div>
  )
}

function OfferShowcase({ heading, subheading, possibleOffers, type }) {

  const offers = possibleOffers.map((offer) => <SwiperSlide key={offer._id}>
    <OfferCard name={offer.name} price={offer.price} id={offer._id} img={offer.img} subheading={offer.subheading} />
  </SwiperSlide>)

  return (
    <section className='w-screen'>
      <div className='mb-12 text-center'>
        <h3 className='text-7xl font-bold'>{heading}</h3>
        <h4 className='text-4xl'>{subheading}</h4>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        centeredSlides={false}
        centerInsufficientSlides={true}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={
          {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1368: { slidesPerView: 4 },
            1560: { slidesPerView: 5 }

          }
        }
        className="w-5/6 h-96"
      >
        {offers}
      </Swiper>
      <div className='text-center mb-16'>
        <Link href={`/catalog/${type}`}><h1 className='text-4xl text-blue-500 cursor-pointer'>See more of these offers + </h1></Link>
      </div>
    </section>
  )
}

export async function getStaticProps() {
  let { db } = await connectToDatabase()

  const offersPro = await db
    .collection("products")
    .find({ type: "pro" })
    .limit(5)
    .toArray()

  const offersDeluxe = await db
    .collection("products")
    .find({ type: "deluxe" })
    .limit(5)
    .toArray()

  const offersNormal = await db
    .collection("products")
    .find({ type: "normal" })
    .limit(5)
    .toArray()

  return {
    props: {
      pro: JSON.parse(JSON.stringify(offersPro)),
      deluxe: JSON.parse(JSON.stringify(offersDeluxe)),
      normal: JSON.parse(JSON.stringify(offersNormal))
    }
  }
}
