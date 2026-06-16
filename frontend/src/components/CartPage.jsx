import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CartPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    setCart(savedCart ? JSON.parse(savedCart) : [])
  }, [])

  const getStockBySize = (item) => {
  if (item.selectedSize === "M") return item.stock_m || 0
  if (item.selectedSize === "L") return item.stock_l || 0
  if (item.selectedSize === "XL") return item.stock_xl || 0
  return 0
}

const getCurrentCartQty = (product) => {
  return cart.filter(
    (item) =>
      item.id === product.id &&
      item.selectedSize === product.selectedSize
  ).length
}

  const increaseQty = (product) => {
  const availableStock = getStockBySize(product)
  const currentQty = getCurrentCartQty(product)

  if (currentQty >= availableStock) {
    alert("No more stock available for this size")
    return
  }

  const updatedCart = [...cart, product]
  setCart(updatedCart)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  window.dispatchEvent(new Event("navbarUpdate"))
}

  const decreaseQty = (productId) => {
    const index = cart.findIndex((item) => item.id === productId)

    if (index !== -1) {
      const updatedCart = [...cart]
      updatedCart.splice(index, 1)

      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      window.dispatchEvent(new Event("navbarUpdate"))
    }
  }

  const removeAll = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId)

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("navbarUpdate"))
  }

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(
      (product) =>
        product.id === item.id &&
        product.selectedSize === item.selectedSize
    )

    if (existing) {
      existing.quantity += 1
    } else {
      acc.push({ ...item, quantity: 1 })
    }

    return acc
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-white text-black pt-28 md:pt-32 px-5 md:px-10 overflow-x-hidden">
      <Link
        to="/"
        className="inline-block mt-6 text-gray-600 hover:text-black"
      >
        ← Back to Home
      </Link>

      <h1 className="text-4xl md:text-5xl font-black my-10">
        YOUR CART
      </h1>

      {groupedCart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {groupedCart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col md:flex-row justify-between md:items-center gap-5"
            >
              <div>
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <p className="text-gray-600">Color: {item.color}</p>
                <p className="text-gray-600">Size: {item.selectedSize}</p>
                <p className="font-bold mt-2">LKR {item.price}</p>
                <p className="text-gray-600 mt-2">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Available Stock: {getStockBySize(item)}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="border border-black px-4 py-2 hover:bg-black hover:text-white transition"
                >
                  -
                </button>

                <button
                  onClick={() => increaseQty(item)}
                  disabled={item.quantity >= getStockBySize(item)}
                  className={
                    item.quantity >= getStockBySize(item)
                      ? "border border-gray-300 text-gray-400 px-4 py-2 cursor-not-allowed"
                      : "border border-black px-4 py-2 hover:bg-black hover:text-white transition"
                 }
                >
                   +
                </button>
                <button
                  onClick={() => removeAll(item.id)}
                  className="border border-black text-black px-5 py-2 hover:bg-black hover:text-white transition"
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-300 pt-6 pb-10">
            <h2 className="text-3xl font-black">
              Total: LKR {total}
            </h2>

            <Link
              to="/checkout"
              className="inline-block mt-6 mb-10 bg-black text-white px-8 md:px-10 py-4 font-bold rounded"
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage