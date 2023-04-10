/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react"

// ** import third party
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

// ** import custom icons
import { ReactComponent as Logo } from "../../assets/logo/logo.svg"

// ** import axios
import axios from "../../axios"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/admin/forget-password", { email })
      if (data.success) {
        toast.success(data.status)
      } else {
        toast.error(data.status)
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        icon: "🚨"
      })
    }
  }

  return (
    <section className="py-12 sm:py-16">
      <Link
        to="/"
        className="w-auto flex justify-center h-8 mx-auto lg:mx-0 mb-10 md:mb-16"
      >
        <Logo />
      </Link>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative max-w-[478px]  mx-auto ">
          <div className="absolute -inset-2">
            <div
              className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
              style={{
                background:
                  "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
              }}
            ></div>
          </div>

          <div className="relative overflow-hidden bg-white shadow-xl rounded-xl">
            <div className="px-4 py-10 sm:px-8">
              <div className="flex items-center justify-center flex-col xs:flex-row gap-2 xs:justify-between">
                <h1 className="text-xl mx-auto font-bold text-gray-700 font-pj">
                  Admin Forget Password
                </h1>
              </div>

              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-900 font-pj">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name=""
                        id=""
                        required
                        placeholder="Email address"
                        className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
