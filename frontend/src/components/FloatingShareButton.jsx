import { useState } from "react"
import { FaShareAlt, FaFacebookF, FaWhatsapp, FaLink, FaTimes } from "react-icons/fa"

function FloatingShareButton({ title = "REBELLEN" }) {
  const [open, setOpen] = useState(false)

  const getCurrentUrl = () => window.location.href

  const getShareMessage = () => {
    const currentUrl = getCurrentUrl()
    return `${title}\n\n${currentUrl}`
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: getShareMessage(),
        })
      } catch (error) {
        console.log("Share cancelled")
      }
    } else {
      setOpen(true)
    }
  }

  const shareFacebook = () => {
    const currentUrl = getCurrentUrl()

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      "_blank"
    )
  }

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(getShareMessage())}`,
      "_blank"
    )
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(getShareMessage())
    alert("Copied successfully!")
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={handleNativeShare}
        className="absolute right-6 top-[110px] z-10 bg-transparent text-gray-400 p-2 rounded-full hover:scale-110 transition"
        aria-label="Share this page"
      >
        <FaShareAlt size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-black mb-2">Share This Page</h2>

            <div className="space-y-3 mt-5">
              <button
                onClick={shareFacebook}
                className="w-full flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <FaFacebookF />
                Facebook
              </button>

              <button
                onClick={shareWhatsApp}
                className="w-full flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <FaWhatsapp />
                WhatsApp
              </button>

              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <FaLink />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingShareButton