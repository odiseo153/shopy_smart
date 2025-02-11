import Image from "next/image"

const platformss = [
  { name: "eBay", logo: "/placeholder.svg?height=60&width=120" },
  { name: "AliExpress", logo: "/placeholder.svg?height=60&width=120" },
  { name: "GearBest", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Amazon", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Walmart", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Wish", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Newegg", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Overstock", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Etsy", logo: "/placeholder.svg?height=60&width=120" },
]


const platforms = [
  {
    name: "Aliexpress",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBU3kyz2Kg8olONdae65964Mf9ceLDbjsGA&s",
  },
  {
    name: "Ebay",
    logo: "https://static-00.iconduck.com/assets.00/ebay-icon-2048x2048-2vonydav.png",
  },
  {
    name: "Gearbest",
    logo: "https://www.gearbest.ma/wp-content/uploads/2023/12/favicon-gearbest-100x100.ico",
  },
  {
    name: "Romwe",
    logo: "https://play-lh.googleusercontent.com/ioRftbQYaiyt5Igo7TjkP7huMuBzC7T4FVV40HTul3E_RaBy1O5wn5cO0It6BKzHOw",
  },
  {
    name: "Walmart",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9LaTgDi9X1-c9FhL9mQi2S3g6SkAEDny2-a3Wi_i9_gAl8Fz_jHfJp8BJVNLSZvK6Ack",
  },
  {
    name: "Asos",
    logo: "https://e7.pngegg.com/pngimages/510/48/png-clipart-asos-com-fashion-brand-clothing-online-shopping-others-fashion-logo-thumbnail.png",
  },
  {
    name: "BestBuy",
    logo: "https://cdn.dribbble.com/users/1399110/screenshots/15908208/best_buy_refresh.png",
  },
  {
    name: "Patagonia",
    logo: "https://i.pinimg.com/736x/5e/5d/f8/5e5df87c306b242fc92186f2dabc892b.jpg",
  },
  {
    name: "Nike",
    logo: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/nike-512.png",
  },
];

export default function Platforms() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Plataformas disponibles</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8 items-center">
          {platforms.map((platform, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={platform.logo || "/placeholder.svg"}
                alt={`Logo de ${platform.name}`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

