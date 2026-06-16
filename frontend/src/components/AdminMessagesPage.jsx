import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function AdminMessagesPage() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/contact/")
      .then((response) => {
        setMessages(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <Link to="/admin" className="text-gray-400 hover:text-white">
        ← Back to Admin
      </Link>

      <h1 className="text-5xl font-black my-10">
        CUSTOMER MESSAGES
      </h1>

      <div className="space-y-5">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="border border-white/10 bg-zinc-900 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {msg.name}
              </h2>

              <p className="text-gray-400 mt-2">
                Email: {msg.email}
              </p>

              <p className="text-gray-400">
                Phone: {msg.phone || "Not provided"}
              </p>

              <p className="mt-5 text-gray-200">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminMessagesPage