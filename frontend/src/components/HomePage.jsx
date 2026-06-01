import { useEffect, useState } from "react"
import axios from "axios"
import {FiUser,FiHeart,FiShoppingBag,FiMenu} from "react-icons/fi"
import HeroSection from "./HeroSection"
import { Link, useNavigate } from "react-router-dom"

function HomePage() {
  const heroImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b"
]
const navigate = useNavigate()
const [currentHero, setCurrentHero] = useState(0)
  const [products, setProducts] = useState([])

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [wishlist, setWishlist] = useState(() => {

  const savedWishlist = localStorage.getItem("wishlist")

  return savedWishlist
    ? JSON.parse(savedWishlist)
    : []

})

  const [search, setSearch] = useState("")

  const user = sessionStorage.getItem("user")

  const logout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  useEffect(() => {
  const role = sessionStorage.getItem("role")

  if (role === "admin") {
    navigate("/admin")
  }
}, [])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentHero((prev) => (prev + 1) % heroImages.length)
  }, 4000)

  return () => clearInterval(interval)
}, [])

  const addToCart = (product) => {
    const updatedCart = [...cart, product]
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("navbarUpdate"))
  }

  const toggleWishlist = (product) => {

  const exists = wishlist.find(
    (item) => item.id === product.id
  )

  let updatedWishlist

  if (exists) {

    updatedWishlist = wishlist.filter(
      (item) => item.id !== product.id
    )

  } else {

    updatedWishlist = [...wishlist, product]

  }

  setWishlist(updatedWishlist)

  localStorage.setItem("wishlist",JSON.stringify(updatedWishlist))
  window.dispatchEvent(new Event("navbarUpdate"))
}

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase()) ||
  product.color.toLowerCase().includes(search.toLowerCase())
)

  

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white flex items-center justify-between px-8 py-8">
  <Link to="/" className="text-2xl font-bold tracking-[8px]">
    REBELLEN
  </Link>

  

  <div className="flex items-center gap-6">

    <Link
  to={user ? "/account" : "/login"}
  className="hover:text-gray-300 transition"
>
  <FiUser size={28} />
</Link>

  {user && (
  <Link
    to="/account"
    className="text-sm font-semibold tracking-[3px] uppercase hover:text-gray-300 transition"
  >
    {user}
  </Link>
)}
    <Link to="/cart" className="relative hover:text-gray-300 transition">
  <FiShoppingBag size={28} />
      <span className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
        {cart.length}
      </span>
    </Link>

    <Link to="/wishlist" className="relative hover:text-gray-300 transition">
  <FiHeart size={28} />
      <span className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
        {wishlist.length}
      </span>
    </Link>

    <button className="hover:text-gray-300 transition">
  <FiMenu size={28} />
</button>

    {user && (
      <button
        onClick={logout}
        className="text-sm uppercase border border-white px-4 py-2 hover:bg-white hover:text-black transition"
      >
        Logout
      </button>
    )}
  </div>
</nav>

        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 min-h-[650px] overflow-hidden">

  <img
    src={heroImages[currentHero]}
    alt="REBELLEN Hero"
    className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
  />

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 text-white flex flex-col items-center">

    <div className="flex justify-center mb-12 w-full px-8 -mt-20">
  <input
    type="text"
    placeholder="Search REBELLEN products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-6xl bg-white text-black border border-gray-300 rounded-full px-8 py-1 outline-none shadow-lg"
  />
</div>

    <p className="uppercase tracking-[6px] text-gray-200 mb-6">
      Unisex Streetwear
    </p>

    <h1 className="text-6xl md:text-8xl font-black leading-none max-w-5xl">
      AWAKEN THE REBEL
      <br />
      WITHIN YOU
    </h1>

  </div>
</section>
      
<br />
<br />
      <section className="px-6 pb-24">
        <h2 className="text-3xl md:text-3xl font-black mb-10">
           __NEW ARRIVALS
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300">

  <Link to={`/product/${product.id}`} className="block">

    <div className="h-80 mb-5 overflow-hidden bg-white/10">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Product Image
        </div>
      )}
    </div>

    <h3 className="text-2xl font-black leading-tight">
      {product.name}
    </h3>

    <p className="text-gray-400 mt-2">
      {product.color}
    </p>

    <p className="mt-5 text-xl font-black">
      LKR {product.price}
    </p>

  </Link>

              <button
                onClick={() => toggleWishlist(product)}
                className="mt-6 w-full border border-black py-3 text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition"
              >
                {wishlist.find((item) => item.id === product.id)
                  ? "♥ Wishlisted"
                  : "♡ Add to Wishlist"}
              </button>
            
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage