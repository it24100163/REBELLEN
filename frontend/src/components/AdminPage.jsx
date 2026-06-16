import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function AdminPage() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [category, setCategory] = useState("")
  const [stockM, setStockM] = useState(0)
  const [stockL, setStockL] = useState(0)
  const [stockXL, setStockXL] = useState(0)

  const fetchProducts = () => {
    axios.get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
  const role = sessionStorage.getItem("role")

  if (role !== "admin") {
    navigate("/login")
    return
  }

  fetchProducts()
}, [])

  const addProduct = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/products/", {
        name,
        description,
        price: Number(price),
        color,
        image,
        category,
      })

      alert("Product Added")

      setName("")
      setDescription("")
      setPrice("")
      setColor("")
      setImage("")
      setCategory("")
      

      fetchProducts()
    } catch (error) {
      console.log(error)
      alert("Error adding product")
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}`)

      alert("Product Deleted")
      fetchProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const editProduct = (product) => {
    setEditingId(product.id)

    setName(product.name)
    setDescription(product.description)
    setPrice(product.price)
    setColor(product.color)
    setImage(product.image)
    setCategory(product.category || "")
    setStockM(product.stock_m || 0)
    setStockL(product.stock_l || 0)
    setStockXL(product.stock_xl || 0)
  }

  const updateProduct = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/products/${editingId}`, {
        name,
        description,
        price: Number(price),
        color,
        image,
        category,
        stock_m: Number(stockM),
        stock_l: Number(stockL),
        stock_xl: Number(stockXL),
      })

      alert("Product Updated")

      setEditingId(null)

      setName("")
      setDescription("")
      setPrice("")
      setColor("")
      setImage("")
      setCategory("")
      setStockM(0)
      setStockL(0)
      setStockXL(0)

      fetchProducts()
    } catch (error) {
      console.log(error)
      alert("Error updating product")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-black mb-10">
        ADMIN PANEL
      </h1>

      <Link
        to="/admin/orders"
        className="inline-block mb-10 border border-white px-6 py-3 hover:bg-white hover:text-black transition"
      >
        VIEW ORDERS
      </Link>

      <Link
        to="/admin/messages"
        className="inline-block mb-10 ml-4 border border-black px-6 py-3 hover:bg-black hover:text-white transition"
      >
        VIEW MESSAGES
      </Link>

      <div className="max-w-2xl space-y-5 mb-20">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-white/20 p-4 outline-none"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-black border border-white/20 p-4 outline-none h-40"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-black border border-white/20 p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full bg-black border border-white/20 p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-black border border-white/20 p-4 outline-none"
        />

        <select
         value={category}
         onChange={(e) => setCategory(e.target.value)}
         className="w-full bg-black border border-white/20 p-4 outline-none"
         required
        >
         <option value="">Select Category</option>
         <option value="street-legends">Unisex Oversized Street Legends Tee</option>
         <option value="cartoons">Unisex Oversized Cartoons Tee</option>
         <option value="anime">Unisex Oversized Anime Tee</option>
         <option value="bottom-pants">Unisex Bottom Pants</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <input
    type="number"
    placeholder="M Stock"
    value={stockM}
    onChange={(e) => setStockM(e.target.value)}
    className="w-full bg-black border border-white/20 p-4 outline-none"
    min="0"
  />

  <input
    type="number"
    placeholder="L Stock"
    value={stockL}
    onChange={(e) => setStockL(e.target.value)}
    className="w-full bg-black border border-white/20 p-4 outline-none"
    min="0"
  />

  <input
    type="number"
    placeholder="XL Stock"
    value={stockXL}
    onChange={(e) => setStockXL(e.target.value)}
    className="w-full bg-black border border-white/20 p-4 outline-none"
    min="0"
  />
</div>

        <button
          onClick={editingId ? updateProduct : addProduct}
          className="bg-white text-black px-10 py-4 font-bold hover:scale-105 transition"
        >
          {editingId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-white/10 p-5"
          >
            <div className="h-80 overflow-hidden mb-5 bg-white/10">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-400 mt-2">
              {product.color}
            </p>

            <p className="mt-3 font-bold">
              LKR {product.price}
            </p>

            <button
              onClick={() => editProduct(product)}
              className="mt-5 mr-3 border border-white px-5 py-2 hover:bg-white hover:text-black transition"
            >
              EDIT
            </button>

            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-5 border border-red-500 text-red-500 px-5 py-2 hover:bg-red-500 hover:text-white transition"
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPage