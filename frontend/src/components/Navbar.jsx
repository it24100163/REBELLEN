import { useEffect, useState, useRef } from "react"
import { FiUser, FiHeart, FiShoppingBag, FiMenu } from "react-icons/fi"
import { useLocation, Link } from "react-router-dom"
import logo from "../assets/logo.png"

function Navbar() {
  const location = useLocation()

  const [user, setUser] = useState(sessionStorage.getItem("user"))
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const menuRef = useRef(null)

  const role = sessionStorage.getItem("role")

  const authPage =
    location.pathname === "/login" ||
    location.pathname === "/register"

  const updateNavbar = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false)
      setCategoryOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    )
  }
}, [])

  useEffect(() => {
    updateNavbar()
    setMenuOpen(false)
    setCategoryOpen(false)
  }, [location.pathname])

  const closeMenu = () => {
  setMenuOpen(false)
  setCategoryOpen(false)
}

  const logout = () => {
    sessionStorage.clear()
    window.dispatchEvent(new Event("navbarUpdate"))
    window.location.replace("/login")
  }

  if (role === "admin") {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white px-8 py-4">
      {authPage ? (
  <div className="flex items-center justify-between">
    <Link to="/">
      <img
        src={logo}
        alt="REBELLEN"
        className="h-12 md:h-18 w-72 object-fill -ml-3"
      />
    </Link>
  </div>
) : (
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="REBELLEN"
              className="h-12 md:h-18 w-72 object-fill -ml-3"
            />
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

            
            <div 
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hover:text-gray-300 transition"
              >
                <FiMenu size={28} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white text-black shadow-xl border z-50">
                  <button
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="w-full text-left px-5 py-3 font-semibold hover:bg-gray-100"
                  >
                    Category
                  </button>

                  {categoryOpen && (
                    <div className="bg-gray-50">
                      <Link
                        to="/?category=street-legends"
                        onClick={closeMenu}
                        className="block px-8 py-3 hover:bg-gray-100"
                      >
                        Unisex Oversized Street Legends Tee
                      </Link>

                      <Link
                        to="/?category=cartoons"
                        onClick={closeMenu}
                        className="block px-8 py-3 hover:bg-gray-100"
                      >
                        Unisex Oversized Cartoons Tee
                      </Link>

                      <Link
                        to="/?category=anime"
                        onClick={closeMenu}
                        className="block px-8 py-3 hover:bg-gray-100"
                      >
                        Unisex Oversized Anime Tee
                      </Link>

                      <Link
                        to="/?category=bottom-pants"
                        onClick={closeMenu}
                        className="block px-8 py-3 hover:bg-gray-100"
                      >
                        Unisex Bottom Pants
                      </Link>
                    </div>
                  )}

                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="block px-5 py-3 font-semibold hover:bg-gray-100"
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className="block px-5 py-3 font-semibold hover:bg-gray-100"
                  >
                    About
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={closeMenu}
                    className="block px-5 py-3 font-semibold hover:bg-gray-100"
                  >
                    Wishlist
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={closeMenu}
                    className="block px-5 py-3 font-semibold hover:bg-gray-100"
                  >
                    My Orders
                  </Link>


                </div>
              )}
            </div>

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