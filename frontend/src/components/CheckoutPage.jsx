import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function CheckoutPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [cart, setCart] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  
  const navigate = useNavigate()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    setCart(savedCart ? JSON.parse(savedCart) : [])
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const hasQRProduct = cart.some((item) => item.wantQR)
  const deliveryCharge = 400
  const grandTotal = total + deliveryCharge

  const placeOrder = async () => {
  if (!paymentMethod) {
    alert("Please select a payment method")
    return
  }

  if (!name.trim()) {
    alert("Please enter your full name")
    return
  }

  if (!phone.trim()) {
    alert("Please enter your phone number")
    return
  }

  if (!address.trim()) {
    alert("Please enter your delivery address")
    return
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/orders/", {
      customer_name: name,
      phone,
      address,
      total: grandTotal,
      items: JSON.stringify(cart),
      payment_method: paymentMethod,
      customer_email: sessionStorage.getItem("email"),
    })

    for (const item of cart) {
      await axios.put(`http://127.0.0.1:8000/products/${item.id}/reduce-stock`, {
        size: item.selectedSize,
        quantity: item.quantity || 1,
      })
    }

    alert(response.data.message)

    localStorage.removeItem("cart")
    setCart([])
    window.dispatchEvent(new Event("navbarUpdate"))

    navigate("/")
  } catch (error) {
    console.log(error)
    alert(error.response?.data?.detail || "Order failed")
  }
}
  return (
    <div className="min-h-screen bg-white text-black pt-16 px-10">

  <Link
    to="/cart"
    className="text-gray-600 hover:text-black"
  >
    ← Back to Cart
  </Link>
      <h1 className="text-5xl font-black mt-6 mb-8">
        CHECKOUT
      </h1>

      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white text-black border border-black p-4 outline-none rounded"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white text-black border border-black p-4 outline-none rounded"
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-white text-black border border-black p-4 outline-none rounded h-40"
        />
        
        <div>
  <label className="block font-bold mb-2">
    Payment Method
  </label>

  <select
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
    className="w-full bg-white text-black border border-black p-4 outline-none rounded"
  >
    <option value="">Select Payment Method</option>

    {!hasQRProduct && (
      <option value="Cash on Delivery">Cash on Delivery</option>
    )}

    <option value="Card Payment">Card Payment</option>
  </select>

  {hasQRProduct && (
    <p className="text-sm text-gray-500 mt-2">
      QR printed orders cannot use Cash on Delivery.
    </p>
  )}

  {paymentMethod === "Card Payment" && (
  <div className="border border-gray-200 rounded-lg p-5 space-y-4">
    <h3 className="text-xl font-bold">
      Card Details
    </h3>

    <input
      type="text"
      placeholder="Cardholder Name"
      className="w-full bg-white text-black border border-black p-4 outline-none rounded"
    />

    <input
      type="text"
      placeholder="Card Number"
      maxLength="19"
      className="w-full bg-white text-black border border-black p-4 outline-none rounded"
    />

    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="MM/YY"
        maxLength="5"
        className="w-full bg-white text-black border border-black p-4 outline-none rounded"
      />

      <input
        type="password"
        placeholder="CVV"
        maxLength="3"
        className="w-full bg-white text-black border border-black p-4 outline-none rounded"
      />
    </div>

    <p className="text-sm text-gray-500">
      Demo only. Real card payments will be processed securely through a payment gateway later.
    </p>
  </div>
)}

</div>

        <div className="border-t border-gray-300 pt-4">
          <p className="text-lg mb-2">
            Subtotal: LKR {total}
          </p>

          <p className="text-lg mb-2">
            Delivery Charge: LKR {deliveryCharge}
          </p>

          <h2 className="text-3xl font-black">
            Total: LKR {grandTotal}
         </h2>
        </div>

        <button
          onClick={placeOrder}
          className="bg-black text-white px-10 py-4 font-bold rounded hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>

      </div>
    </div>
  )
}

export default CheckoutPage