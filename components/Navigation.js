import Link from "next/link"

export default function Navigation() {
    return (<nav className='m-4 flex items-center'>
      <Link href="/"><h3 className='text-4xl cursor-pointer'><span className='text-yellow-600 font-bold'>Sun</span>Shop</h3></Link>
      <div className='flex items-center text-lg ml-auto'>
        <Link href="/#about"><a className='m-3'>
          ABOUT
        </a></Link>
        <Link href="/#reviews" scroll={false}><a className='m-3'>
          REVIEWS
        </a></Link>
        <Link href="/offer"><button className='bg-yellow-600 p-2 shadow-lg px-4 rounded-lg text-white font-bold m-3'>
          OFFER
        </button></Link>
      </div>
    </nav>)
  }