import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function MyOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const email = sessionStorage.getItem("email")

    if (!email) {
      return
    }

    axios.get(`http://127.0.0.1:8000/orders/customer/${email}`)
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-6 md:px-10">
      <Link to="/" className="text-gray-600 hover:text-black">
        ← Back to Home
      </Link>

      <h1 className="text-5xl font-black mt-8 mb-10">
        MY ORDERS
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const items = JSON.parse(order.items || "[]")

            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "Date not available"}
                    </p>
                  </div>

                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border-t pt-4"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded border"
                        />
                      )}

                      <div>
                        <h3 className="font-bold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-gray-600">
                          Size: {item.selectedSize}
                        </p>

                        <p className="text-gray-600">
                          Color: {item.color}
                        </p>

                        <p className="font-bold mt-1">
                          LKR {item.price}
                        </p>

                        {item.wantQR && (
                          <p className="text-sm text-gray-500 mt-1">
                            QR Link: {item.socialLink}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4 text-gray-700">
                  <p>Payment Method: {order.payment_method}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Address: {order.address}</p>

                  <h3 className="text-2xl font-black text-black mt-3">
                    Total: LKR {order.total}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyOrdersPage