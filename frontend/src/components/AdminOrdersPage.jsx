import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/orders/")
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

 const updateStatus = async (id) => {

  try {

    await axios.put(
      `http://127.0.0.1:8000/orders/${id}`
    )

    const response = await axios.get(
      "http://127.0.0.1:8000/orders/"
    )

    setOrders(response.data)

  } catch (error) {

    console.log(error)

  }

}
const deleteOrder = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/orders/${id}`)

    const response = await axios.get("http://127.0.0.1:8000/orders/")
    setOrders(response.data)

    alert("Order Deleted")
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <Link to="/admin" className="text-gray-400 hover:text-white">
        ← Back to Admin
      </Link>

      <h1 className="text-5xl font-black my-10">
        ORDERS
      </h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-white/10 p-5"
          >
            <h2 className="text-2xl font-bold">
              Order #{order.id}
            </h2>

            <p className="text-gray-400 mt-2">
              Customer: {order.customer_name}
            </p>

            <p className="text-gray-600">
              Phone: {order.phone}
            </p>

            <p className="text-gray-600">
              Address: {order.address}
            </p>

            {order.social_link && (
            <p className="text-gray-600 mt-2">
              Custom QR Link: {order.social_link}
            </p>
            )}

            <p className="text-gray-600">
              Payment Method: {order.payment_method}
            </p>

            <p className="font-bold mt-3">
              Total: LKR {order.total}
            </p>

            <p className="mt-2">
              Status: {order.status}
            </p>

            <div className="mt-5 border-t border-white/10 pt-4">
              <h3 className="font-bold mb-3">
                Ordered Items
              </h3>
{order.items ? (
  Object.values(
  JSON.parse(order.items).reduce((acc, item) => {

    const key = `${item.id}-${item.selectedSize}`

    if (acc[key]) {
      acc[key].quantity += 1
    } else {
      acc[key] = {
        ...item,
        quantity: 1
      }
    }

    return acc

  }, {})
).map((item) => (
    <div
      key={item.id}
      className="flex justify-between border border-gray-200 rounded p-3 mb-2"
    >
      <div>
        <p className="font-medium">
          {item.name}
        </p>

        {item.wantQR && (
  <>
    <p className="text-sm text-gray-500">
      QR Print: Yes
    </p>

    <p className="text-sm text-gray-500">
      QR Link: {item.socialLink}
    </p>
  </>
)}

        <p className="text-sm text-gray-500">
          Size: {item.selectedSize}
        </p>

        <p className="text-sm text-gray-500">
          Quantity: {item.quantity}
        </p>
      </div>

      <span className="font-bold">
        LKR {item.price}
      </span>
    </div>
  ))
) : (
              <p className="text-gray-500">
                No items
              </p>
            )}
            </div>

            <button
              onClick={() => updateStatus(order.id)}
              className="mt-5 border border-white px-5 py-2 hover:bg-white hover:text-black transition"
           >
              UPDATE STATUS
            </button>

            {order.status === "Delivered" && (
              <button
                onClick={() => deleteOrder(order.id)}
                className="mt-5 ml-3 border border-red-500 text-red-500 px-5 py-2 hover:bg-red-500 hover:text-white transition"
              >
                DELETE ORDER
              </button>
            )}

          </div>
          
        ))}
      </div>
    </div>
  )
}

export default AdminOrdersPage