import { useNavigate } from "react-router-dom"

function AccountPage() {

  const navigate = useNavigate()

  const username = localStorage.getItem("user")
  const email = localStorage.getItem("email")

  const logout = () => {

    localStorage.removeItem("user")
    localStorage.removeItem("email")

    navigate("/login")

  }

  return (

    <div className="min-h-screen bg-white text-black pt-32 px-10">

      <h1 className="text-5xl font-black mb-10">
        MY ACCOUNT
      </h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-2xl">

        <p className="mb-4 text-xl">
          <strong>Username:</strong> {username}
        </p>

        <p className="mb-6 text-xl">
          <strong>Email:</strong> {email}
        </p>

        <button
          onClick={logout}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Logout
        </button>

      </div>

    </div>

  )

}

export default AccountPage