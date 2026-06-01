import { useEffect, useState } from "react"
import { FiUser, FiHeart, FiShoppingBag, FiMenu } from "react-icons/fi"
import { useLocation, Link } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const [user, setUser] = useState(sessionStorage.getItem("user"))
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const role = sessionStorage.getItem("role")
  const authPage =
    location.pathname === "/login" ||
    location.pathname === "/register"

  const updateNavbar = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

    setUser(sessionStorage.getItem("user"))
    setCartCount(cart.length)
    setWishlistCount(wishlist.length)
  }

  useEffect(() => {
    updateNavbar()

    window.addEventListener("navbarUpdate", updateNavbar)

    return () => {
      window.removeEventListener("navbarUpdate", updateNavbar)
    }
  }, [])

  const logout = () => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("role")

    window.dispatchEvent(new Event("navbarUpdate"))
    window.location.href = "/login"
  }

  if (role === "admin") {
  return null
}

  return (
   <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white px-8 py-8">
      {authPage ? (
        <div className="w-full">
          <Link
            to="/"
            className="text-2xl font-bold tracking-[8px]"
          >
            REBELLEN
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold tracking-[8px]"
          >
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

            <Link
              to="/cart"
              className="relative hover:text-gray-300 transition"
            >
              <FiShoppingBag size={28} />

              <span className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            <Link
              to="/wishlist"
              className="relative hover:text-gray-300 transition"
            >
              <FiHeart size={28} />

              <span className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {wishlistCount}
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
        </div>
      )}

    </nav>
  )
}

export default Navbar