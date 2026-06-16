import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import FloatingShareButton from "./FloatingShareButton"

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState("")
  const [wantQR, setWantQR] = useState(false)
  const [socialLink, setSocialLink] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [sizeResult, setSizeResult] = useState(null)
  const [activeInfoTab, setActiveInfoTab] = useState("size")

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/products/${id}`)
      .then((response) => {
        setProduct(response.data)

        axios.get("http://127.0.0.1:8000/products/")
          .then((productsResponse) => {
            const filtered = productsResponse.data.filter(
              (item) => item.id !== response.data.id
            )

            setRelatedProducts(filtered.slice(0, 3))
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return false
    }

    if (getStockBySize(selectedSize) <= 0) {
      alert("Selected size is out of stock")
      return false
     }

    if (wantQR && !socialLink.trim()) {
      alert("Please enter your social media link")
      return false
    }

    const savedCart = localStorage.getItem("cart")
    const cart = savedCart ? JSON.parse(savedCart) : []

    const productWithSize = {
      ...product,
      selectedSize,
      wantQR,
      socialLink: wantQR ? socialLink : "",
      aiRecommendedSize: sizeResult?.recommended_size || null,
    }

    const updatedCart = [...cart, productWithSize]

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("navbarUpdate"))

    alert("Product added to cart")
    return true
  }

  const buyItNow = () => {
    const added = addToCart()

    if (added) {
      navigate("/cart")
    }
  }

  const getStockBySize = (size) => {
  if (size === "M") return product?.stock_m || 0
  if (size === "L") return product?.stock_l || 0
  if (size === "XL") return product?.stock_xl || 0
  return 0
}

  const predictSize = async () => {
    if (!height || !weight) {
      alert("Please enter height and weight")
      return
    }

    if (height < 140 || height > 220) {
      alert("Please enter a valid height")
      return
    }

    if (weight < 35 || weight > 200) {
      alert("Please enter a valid weight")
      return
    }

    const res = await fetch("http://127.0.0.1:8000/ai/predict-size", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        height: Number(height),
        weight: Number(weight),
      }),
    })

    const data = await res.json()
    setSizeResult(data)
    setSelectedSize(data.recommended_size)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black pt-28 md:pt-32 px-5 md:px-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black pt-28 md:pt-32 px-5 md:px-10 overflow-x-hidden">
      <Link to="/" className="text-gray-600 hover:text-black">
        ← Back to Home
      </Link>

      <FloatingShareButton title={product?.name || "REBELLEN Product"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div>
          <div className="h-[350px] md:h-[500px] bg-gray-100 overflow-hidden border border-gray-200 rounded-lg">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex gap-8 border-b border-gray-200">
              <button
                onClick={() => setActiveInfoTab("size")}
                className={`pb-3 text-sm font-bold uppercase tracking-[2px] ${
                  activeInfoTab === "size"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400"
                }`}
              >
                Size Chart
              </button>

              <button
                onClick={() => setActiveInfoTab("details")}
                className={`pb-3 text-sm font-bold uppercase tracking-[2px] ${
                  activeInfoTab === "details"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400"
                }`}
              >
                Product Details
              </button>
            </div>

            <div className="mt-6">
              {activeInfoTab === "size" && (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 text-center">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="p-4 border">Inches</th>
                        <th className="p-4 border">M</th>
                        <th className="p-4 border">L</th>
                        <th className="p-4 border">XL</th>
                      </tr>
                    </thead>

                    <tbody className="font-semibold">
                      <tr>
                        <td className="p-4 border">Chest</td>
                        <td className="p-4 border">45 1/2</td>
                        <td className="p-4 border">47 1/2</td>
                        <td className="p-4 border">49 1/2</td>
                      </tr>

                      <tr>
                        <td className="p-4 border">Shoulder</td>
                        <td className="p-4 border">24 1/2</td>
                        <td className="p-4 border">25 1/2</td>
                        <td className="p-4 border">26 1/2</td>
                      </tr>

                      <tr>
                        <td className="p-4 border">Sleeve</td>
                        <td className="p-4 border">11 11/16</td>
                        <td className="p-4 border">12 1/8</td>
                        <td className="p-4 border">12 1/2</td>
                      </tr>

                      <tr>
                        <td className="p-4 border">Length</td>
                        <td className="p-4 border">30 1/2</td>
                        <td className="p-4 border">31 1/2</td>
                        <td className="p-4 border">32 1/2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeInfoTab === "details" && (
                <div className="text-gray-700 leading-8 text-base max-w-3xl">
                  <p>
                    {product?.description || "No product details available."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-5">
            {product.name}
          </h1>

          <p className="text-xl mb-3">
            Color: {product.color}
          </p>

          <div className="mt-6 mb-6 border border-gray-200 p-5 rounded-lg">
            <h2 className="text-2xl font-black mb-3">Size Prediction</h2>

            <input
              type="number"
              placeholder="Height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border px-4 py-3 mb-3"
            />

            <input
              type="number"
              placeholder="Weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border px-4 py-3 mb-3"
            />

            <button
              onClick={predictSize}
              className="bg-black text-white px-6 py-3 font-bold"
            >
              PREDICT MY SIZE
            </button>

            {sizeResult && (
              <div className="mt-4 border-t pt-4">
                <p className="font-bold">
                  Recommended Size: {sizeResult.recommended_size}
                </p>
                <p>Chest: {sizeResult.measurements.chest} inches</p>
                <p>Shoulder: {sizeResult.measurements.shoulder} inches</p>
                <p>Sleeve: {sizeResult.measurements.sleeve} inches</p>
                <p>Length: {sizeResult.measurements.length} inches</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="font-bold mb-3">
              Select Size
            </p>

            <div className="flex gap-3">
              {["M", "L", "XL"].map((size) => {
                 const stock = getStockBySize(size)
                 const isOutOfStock = stock <= 0

                 return (
                  <button
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    className={
                      isOutOfStock
                        ? "bg-gray-100 text-gray-400 border border-gray-300 px-6 py-3 font-bold cursor-not-allowed line-through"
                        : selectedSize === size
                          ? "bg-black text-white border border-black px-6 py-3 font-bold"
                          : "bg-white text-black border border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition"
                   }
                  >
                   {size}
                  </button>
                  )
                 })}
              </div>

              <p className="text-sm text-gray-500 mt-3">
                 Available Stock:
                 M - {product.stock_m || 0},
                 L - {product.stock_l || 0},
                 XL - {product.stock_xl || 0}
              </p>

            <div className="mt-6 mb-6 border border-gray-200 p-5 rounded-lg">
              <label className="flex items-center gap-3 font-bold">
                <input
                  type="checkbox"
                  checked={wantQR}
                  onChange={(e) => {
                    setWantQR(e.target.checked)
                    setSocialLink("")
                  }}
                />
                Add QR code to this T-shirt
              </label>

              {wantQR && (
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Paste your Instagram / TikTok / Facebook link"
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                    className="w-full bg-white text-black border border-black p-4 outline-none rounded"
                  />

                  <p className="text-sm text-gray-500 mt-2">
                    We will generate a QR code from this link and print it on your T-shirt.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-3xl font-black mb-8">
            LKR {product.price}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addToCart}
              className="bg-black text-white px-10 py-4 font-bold rounded hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>

            <button
              onClick={buyItNow}
              className="border border-black text-black px-10 py-4 font-bold rounded hover:bg-black hover:text-white transition"
            >
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-4xl font-black mb-10">
          RELATED PRODUCTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {relatedProducts.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white text-black border border-gray-200 p-5 rounded-lg shadow-sm block hover:shadow-xl transition duration-300"
            >
              <div className="h-80 overflow-hidden bg-gray-100 mb-5 rounded">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <h3 className="text-xl font-bold hover:underline">
                {item.name}
              </h3>

              <p className="text-gray-600 mt-2">
                {item.color}
              </p>

              <p className="mt-3 font-bold">
                LKR {item.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage