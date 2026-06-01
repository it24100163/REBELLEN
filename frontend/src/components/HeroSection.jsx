import { useEffect, useState } from "react"

function HeroSection() {
  const images = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b"
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[700px] overflow-hidden">

      <img
        src={images[current]}
        alt="Hero"
        className="w-full h-full object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">

        <h1 className="text-7xl font-black tracking-[10px] mb-4">
          REBELLEN
        </h1>

        <p className="text-xl tracking-[6px] mb-8">
          PREMIUM OVERSIZED STREETWEAR
        </p>

        <button className="border border-white px-8 py-4 hover:bg-white hover:text-black transition">
          SHOP NOW
        </button>

      </div>

    </div>
  )
}

export default HeroSection