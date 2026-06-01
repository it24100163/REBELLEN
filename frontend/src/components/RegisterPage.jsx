import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register",
        {
          username,
          email,
          password
        }
      )

      alert(response.data.message)

      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error)
      alert("Register failed")
    }
  }

  return (
    <div className="min-h-screen bg-white text-black p-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-black p-8 rounded-lg shadow-lg">

        <h1 className="text-4xl font-black mb-8">
          REGISTER
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white text-black border border-black p-4 mb-4 outline-none rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white text-black border border-black p-4 mb-4 outline-none rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white text-black border border-black p-4 mb-6 outline-none rounded"
        />

        <button
          onClick={registerUser}
          className="w-full bg-black text-white py-4 font-bold rounded hover:bg-gray-800 transition"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black underline font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage