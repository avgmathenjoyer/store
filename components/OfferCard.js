export default function OfferCard({ name, price, img, subheading }) {
    return (
        <div className="grid overflow-hidden grid-cols-3 grid-rows-5 bg-slate-50 shadow-xl h-80 w-72 rounded-xl mr-auto ml-auto p-2 m-4">
            <div className="box row-start-1 row-end-4 col-start-1 col-end-4 flex justify-center items-center"><Image src={`/${img}`} alt="sunscreen picture" layout="fixed" width={230} height={153} /></div>
            <div className="box row-start-4 row-end-5 col-start-1 col-end-4 font-bold flex items-center text-3xl">{name}</div>
            <div className="box row-start-5 row-end-5 col-start-1 col-end-3 text-xl">{subheading}</div>
            <div className="box flex items-center justify-center text-3xl font-bold text-green-700">{price} EUR</div>
        </div>
    )
}