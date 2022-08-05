import React, { useState } from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from 'swiper';
import * as opinions from "./api/opinions.json"


import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import Head from 'next/head';

export default function Home() {
  return (
    <div className='font-sans'>
      <Head>
        <title>SunShop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Hero />
      <StarsSection />
      <div className='bg-gradient-radial'>
        <FeatureSection reversed={false} imagePath="/woman.svg" mainCaption="Not just a sunscreen." explanation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
        <FeatureSection reversed={true} imagePath="/nature.svg" mainCaption="Sun rays are dangerous." explanation="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident." />
        <FeatureSection reversed={false} imagePath="/sunlight.svg" mainCaption="Don't let the sun interfere." explanation="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." />
      </div>
      <OpinionSection opinions={opinions.opinions} />
      <ContactForm />
      <Footer />
    </div>
  )
}
function NavigationSection() {
  return (<nav className='m-4 flex items-center'>
    <h3 className='text-4xl'><span className='text-yellow-600 font-bold'>Sun</span>Shop</h3>
    <div className='flex items-center text-lg ml-auto'>
      <h3 className='m-3'>
        ABOUT
      </h3>
      <h3 className='m-3'>
        REVIEWS
      </h3>
      <button className='bg-yellow-600 p-2 shadow-lg px-4 rounded-lg text-white font-bold m-3'>
        OFFER
      </button>
    </div>
  </nav>)
}


function Hero() {
  return (
    <section className='w-full h-screen bg-gradient-radial my-4'>
      <NavigationSection />
      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='mt-[30vh] lg:ml-32 m-16'>
          <h1 className='text-7xl font-bold'>
            Don't get <span className='text-yellow-600 font-extrabold drop-shadow-xl'>sunburnt</span> <br /> ever again
          </h1>
          <h2 className='text-5xl mt-3'>
            Check our sunscreen offer.
          </h2>
        </div>
        <div className='hidden lg:block mr-[10vh] pt-[20vh] xl:mr-[22vh] xl:pt-[10vh] 2xl:pt-0 w-2/5 h-screen items-center'>
          <Image layout="responsive" width="100%" height="100%" alt="beach day illustration" src="/beach.svg" priority/>
        </div>
      </div>
    </section>
  )
}

function StarsSection() {
  return (
    <section className='h-1/3 w-5/6 m-auto text-center my-4 mb-12'>
      <div className='ml-auto mr-auto w-1/4'>
        <Image alt="stars illustration" layout="responsive" width="100%" height="30%" src="/5stars.svg" />
      </div>
      <h1 className='text-6xl font-bold'>
        Sunscreen <span className='text-yellow-600 drop-shadow-xl'>engineered</span> to be <br /> the best on the market
      </h1>
      <h2 className='text-3xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br /> incididunt ut labore et dolore magna aliqua.
      </h2>
    </section>
  )
}

function FeatureSection({ imagePath, mainCaption, explanation, reversed }) {
  return (
    <section className='w-full h-1/3 flex justify-center flex-col ml-2 lg:flex-row my-24'>
      {reversed ? <div className='mx-auto w-2/3 lg:mx-0 lg:w-1/4 lg:mr-60 lg:hidden relative'><Image alt="illustration" layout="responsive" width="100%" height="100%" src={imagePath} /></div> : <></>}
      {reversed ? <></> : <div className='mx-auto lg:mx-0 w-2/3 lg:w-1/4 lg:mr-60 lg:block relative'><Image alt='illustration' src={imagePath} layout="responsive" width="100%" height="100%" /></div>}
      <div className='w-full lg:w-1/4'>
        <h2 className='text-4xl font-bold lg:pt-24'>
          {mainCaption}
        </h2>
        <h3 className='text-xl'>
          {explanation}
        </h3>
      </div>
      {!reversed ? <></> : <div className='mx-auto hidden lg:block lg:mx-0 w-2/3 lg:w-1/4 lg:ml-60 relative'><Image alt='illustration' layout="responsive" width="100%" height="100%" src={imagePath} /></div>}
    </section>
  )
}


function OpinionSection({ opinions }) {
  const opinionComponents = opinions.map((opinion) =>
    <SwiperSlide key={opinion.avatar}><Opinion name={opinion.name} avatar={opinion.avatar} heading={opinion.heading} paragraph={opinion.paragraph} /></SwiperSlide>
  )
  return (
    <section>
      <h1 className='text-6xl font-bold text-center'>How do our customers view us?</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        centeredSlides={false}
        centerInsufficientSlides={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="min-h-[384px]"
      >
        {
          opinionComponents
        }

      </Swiper>
    </section>
  )
}

function Opinion({ avatar, name, heading, paragraph }) {
  return (
    <div className='min-w-[384px]  min-h-[256px] w-2/5 bg-slate-50 rounded-xl grid overflow-hidden grid-lines grid-cols-6 grid-rows-3 gap-2 shadow-xl my-12 items-center mr-auto ml-auto p-3'>
      <div className="box row-start-1 row-end-3 col-start-1 col-end-3 flex justify-center items-center p-6">
        <Image width="150%" height="150%" objectFit='contain' src={avatar} alt="avatar" />
      </div>
      <div className="box row-start-1 row-end-1 col-start-3 col-end-7 font-bold text-3xl lg:text-4xl flex justify-center items-center">{heading}</div>
      <div className="box row-start-2 row-end-4 col-start-3 col-end-7 text-md  lg:text-lg">{paragraph}</div>
      <div className="box row-start-3 row-end-3 col-start-1 col-end-3 flex justify-center items-center text-xl lg:text-3xl font-bold">{name}</div>
    </div>
  )
}


function ContactForm() {
  const [text, setText] = useState("")

  return (
    <section className='w-screen h-2/5 flex flex-col lg:flex-row justify-center bg-gradient-radial my-6 py-6'>
      <div className='w-5/6 lg:w-2/5'><Image width="100%" height="100%" layout='responsive' alt="contact illustration" src="/contact.svg" /></div>
      <div className='flex flex-col justify-center lg:ml-16'>
        <h2 className='text-4xl'>Interested in our sunscreen?</h2>
        <h1 className='text-6xl font-bold'>Contact us!</h1>
        <div className='flex items-center mt-4'>
          <input className='w-full h-12 border-2 border-black rounded-xl shadow-2xl text-lg p-2' placeholder='Type your email here!' onChange={(evt) => setText(evt.target.value)} value={text} />
          <button className='w-12 h-12 bg-green-500 rounded-lg text-white ml-1'>✓</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <div className='w-screen h-24 bg-slate-700 flex items-center justify-around flex-row'>
      <h3 className='text-4xl text-white'><span className='text-yellow-600 font-bold'>Sun</span>Shop</h3>
      <h2 className='text-white'>
        EXAMPLE STORE PAGE MADE BY AVGMATHENJOYER
      </h2>
    </div>
  )
}