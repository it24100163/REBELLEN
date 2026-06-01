import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import HomePage from "./components/HomePage"
import AdminPage from "./components/AdminPage"
import CartPage from "./components/CartPage"
import CheckoutPage from "./components/CheckoutPage"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import AdminOrdersPage from "./components/AdminOrdersPage"
import WishlistPage from "./components/WishlistPage"
import ProductDetailsPage from "./components/ProductDetailsPage"
import AccountPage from "./components/AccountPage"
import Navbar from "./components/Navbar"

function AppContent() {

  const location = useLocation()

  const hideNavbar =
  location.pathname === "/admin" ||
  location.pathname === "/admin/orders"

  return (
    <>
      {!hideNavbar && <Navbar />}

     <div className={!hideNavbar ? "pt-1" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App