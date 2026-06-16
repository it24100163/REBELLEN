import { Link } from "react-router-dom"
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiMessageCircle
} from "react-icons/fi"
import logo from "../assets/logo.png"

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="px-5 md:px-10 pt-0 pb-8">

        <div className="mb-6 flex flex-col items-start">
          <img
            src={logo}
            alt="REBELLEN"
            className="h-24 md:h-32 w-auto -ml-8"
          />

          <p className="text-gray-400 tracking-[3px] md:tracking-[4px] uppercase mt-2 ml-5 text-sm md:text-base">
            AWAKEN THE REBEL WITHIN YOU
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-12 md:pl-5">

          <div>
            <h3 className="text-gray-500 font-bold mb-6 uppercase tracking-[3px]">
              Newsletter
            </h3>

            <h4 className="text-xl font-black italic mb-4">
              Sign up now
            </h4>

            <p className="text-gray-400 mb-8 max-w-sm leading-7">
              Get updates about new arrivals, offers , and custom T-shirt designs.
            </p>

            <div className="flex border-b border-gray-600 max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent flex-1 py-3 outline-none text-white placeholder-gray-500"
              />

              <button className="font-bold hover:text-gray-300 transition">
                Sign up
              </button>
            </div>
          </div>

          <div className="md:ml-16">
            <h3 className="text-gray-500 font-bold mb-6 uppercase tracking-[3px]">
              Shop
            </h3>

            <div className="space-y-4 text-gray-300">
              <Link to="/" className="block hover:text-white transition">
                Shop
              </Link>

              <Link to="/" className="block hover:text-white transition">
                Home
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-bold mb-6 uppercase tracking-[3px]">
              Information
            </h3>

            <div className="space-y-4 text-gray-300">
              <Link to="/faq" className="block hover:text-white transition">
                FAQ
              </Link>

              <Link to="/returns" className="block hover:text-white transition">
                Returns & Exchanges
              </Link>

              <Link to="/shipping" className="block hover:text-white transition">
                Shipping Policy
              </Link>

              <Link to="/terms" className="block hover:text-white transition">
                Terms & Conditions
              </Link>

              <Link to="/contact" className="block hover:text-white transition">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-bold mb-6 uppercase tracking-[3px]">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-3">
                <FiPhone />
                070 313 1319
              </p>

              <a
                href="https://wa.me/94702323233"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <FiMessageCircle />
                WhatsApp
              </a>

              <a
                href="mailto:rebellen@gmail.com"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <FiMail />
                rebellen@gmail.com
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex gap-4 text-xl items-center">
            <a
              href="https://wa.me/94702323233"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <FiMessageCircle />
            </a>

            <a
              href="https://www.instagram.com/re_bellen?igsh=MXhjMDN3bGJ1cW10dQ=="
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <FiInstagram />
            </a>

            <a
              href="https://www.facebook.com/share/1CWSuStZif/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <FiFacebook />
            </a>

            <a
              href="https://www.tiktok.com/@re_bellen?_r=1&_t=ZS-96tUWq18PUF"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-xs font-black"
            >
              TT
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            © 2026 REBELLEN. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer