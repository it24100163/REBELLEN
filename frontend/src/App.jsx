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
import Footer from "./components/Footer"
import AdminMessagesPage from "./components/AdminMessagesPage"
import TermsPage from "./components/TermsPage"
import FAQPage from "./components/FAQPage"
import ReturnsPage from "./components/ReturnsPage"
import ShippingPage from "./components/ShippingPage"
import ContactPage from "./components/ContactPage"
import AboutPage from "./components/AboutPage"
import MyOrdersPage from "./components/MyOrdersPage"

function AppContent() {
  const location = useLocation()

  const hideNavbar =
    location.pathname === "/admin" ||
    location.pathname === "/admin/orders" ||
    location.pathname === "/admin/messages"

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin" ||
    location.pathname === "/admin/orders" ||
    location.pathname === "/admin/messages"

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
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Routes>

        {!hideFooter && <Footer />}
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