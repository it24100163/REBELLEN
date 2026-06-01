import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState("")
  const [wantQR, setWantQR] = useState(false)
  const [socialLink, setSocialLink] = useState("")

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
    return
  }
  if (wantQR && !socialLink) {
  alert("Please enter your social media link")
  return
}

  const savedCart = localStorage.getItem("cart")
  const cart = savedCart ? JSON.parse(savedCart) : []

  const productWithSize = {
    ...product,
    selectedSize,
    wantQR,
    socialLink: wantQR ? socialLink : ""
  }

  const updatedCart = [...cart, productWithSize]

  localStorage.setItem("cart", JSON.stringify(updatedCart))
  window.dispatchEvent(new Event("navbarUpdate"))

  alert("Product added to cart")
}

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black pt-32 px-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-10">
      <Link to="/" className="text-gray-600 hover:text-black">
        ← Back to Home
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div className="h-[500px] bg-gray-100 overflow-hidden border border-gray-200 rounded-lg">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-5xl font-black mb-5">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-5">
            {product.description}
          </p>

          <p className="text-xl mb-3">
            Color: {product.color}
          </p>

          <div className="mb-6">
  <p className="font-bold mb-3">
    Select Size
  </p>

  <div className="flex gap-3">
    {["M", "L", "XL"].map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={
          selectedSize === size
            ? "bg-black text-white border border-black px-6 py-3 font-bold"
            : "bg-white text-black border border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition"
        }
      >
        {size}
      </button>
    ))}
  </div>

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

          <button
            onClick={addToCart}
            className="bg-black text-white px-10 py-4 font-bold rounded hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-4xl font-black mb-10">
          RELATED PRODUCTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
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