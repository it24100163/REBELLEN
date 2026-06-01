import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function WishlistPage() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
  }, [])

  const removeWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id)
    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-10">
      <Link to="/" className="text-gray-600 hover:text-black">
        ← Back to Home
      </Link>

      <h1 className="text-5xl font-black my-10">
        WISHLIST
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-5"
          >
            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-600">
              {product.color}
            </p>

            <p className="font-bold mt-3">
              LKR {product.price}
            </p>

            <button
              onClick={() => removeWishlist(product.id)}
              className="mt-5 border border-black text-black px-5 py-2 hover:bg-black hover:text-white transition"
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage