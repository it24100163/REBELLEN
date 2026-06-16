import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/login", {
        username: "none",
        email,
        password
      })

      alert(response.data.message)

      if (response.data.message === "Login successful") {

        sessionStorage.setItem("user", response.data.username)
        sessionStorage.setItem("email", response.data.email)
        sessionStorage.setItem("role", response.data.role)
       if (response.data.role === "admin") {
       navigate("/admin")
       } else {
      navigate("/")
    }
  }
    } catch (error) {
      console.log(error)
      alert("Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-10 pb-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-black p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-black mb-8">
          LOGIN
        </h1>

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
          onClick={loginUser}
          className="w-full bg-black text-white py-4 font-bold rounded hover:bg-gray-800 transition"
        >
          LOGIN
        </button>

        <p className="text-gray-600 mt-6">
          No account?{" "}
          <Link to="/register" className="text-black underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage