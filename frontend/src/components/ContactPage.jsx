import { useState } from "react"
import axios from "axios"
import {
  FiPhone,
  FiMessageCircle,
  FiInstagram,
  FiFacebook,
  FiMail
} from "react-icons/fi"

function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const submitMessage = async () => {
    if (!name.trim()) {
      alert("Please enter your name")
      return
    }

    if (!email.trim()) {
      alert("Please enter your email")
      return
    }

    if (!message.trim()) {
      alert("Please enter your message")
      return
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/contact/", {
        name,
        email,
        phone,
        message
      })

      alert(response.data.message)

      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
    } catch (error) {
      console.log(error)
      alert("Message sending failed")
    }
  }

  return (
    <div className="bg-white text-black min-h-screen px-10 pt-32 pb-20">
      <h1 className="text-5xl font-black mb-4">
        Contact Us
      </h1>

      <p className="text-gray-600 max-w-3xl mb-10">
        Need help with your order, delivery, product sizes, or custom QR
        printed T-shirt? Send us a message and our team will contact you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border border-gray-200 rounded-lg shadow-sm p-8 space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black p-4 outline-none rounded"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black p-4 outline-none rounded"
          />

          <input
            type="text"
            placeholder="Phone Number Optional"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-black p-4 outline-none rounded"
          />

          <textarea
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-black p-4 outline-none rounded h-40"
          />

          <button
            onClick={submitMessage}
            className="bg-black text-white px-10 py-4 font-bold rounded hover:bg-gray-800 transition"
          >
            SUBMIT MESSAGE
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-black">
            REBELLEN Support
          </h2>

          <p className="text-gray-600">
            Delivery takes 4 - 5 working days. For quick support, contact us
            through WhatsApp or social media.
          </p>

          <p className="flex items-center gap-3 text-lg">
            <FiPhone />
            070 313 1319
          </p>

          <a
            href="https://wa.me/94702323233"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 underline"
          >
            <FiMessageCircle />
            WhatsApp
          </a>

          <a
            href="mailto:rebellen@gmail.com"
            className="flex items-center gap-3 underline"
          >
            <FiMail />
            rebellen@gmail.com
          </a>

          <a
            href="https://www.instagram.com/re_bellen?igsh=MXhjMDN3bGJ1cW10dQ=="
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 underline"
          >
            <FiInstagram />
            Instagram
          </a>

          <a
            href="https://www.facebook.com/share/1CWSuStZif/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 underline"
          >
            <FiFacebook />
            Facebook
          </a>

          <a
            href="https://www.tiktok.com/@re_bellen?_r=1&_t=ZS-96tUWq18PUF"
            target="_blank"
            rel="noreferrer"
            className="underline block"
          >
            TikTok
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactPage