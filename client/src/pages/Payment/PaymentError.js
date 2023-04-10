import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

// ** import custom icons
import Logo from "../../assets/logo/logo.svg"
import CautionImg from "../../assets/icons/caution.png"

const PaymentError = ({ handleTable }) => {
  const { auth } = useSelector((state) => state.auth)

  return (
    <section className="py-10 bg-white mx-4 md:mx-10 ">
      {/* logo */}
      <div className="flex justify-around items-center gap-5 pb-10">
        {/* go back button */}
        <Link to="/">
          <div
            className="flex items-center justify-center width-fit cursor-pointer"
            onClick={() => handleTable(1)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                className="fill-current text-gray-500"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.41,16.09L10.83,11.5L15.41,6.91L14,5.5L8,11.5L14,17.5L15.41,16.09Z"
              />
            </svg>

            <span className="text-gray-500 font-pj font-bold text-base">
              Go Back
            </span>
          </div>
        </Link>

        <Link to="/">
          <img src={Logo} alt="logo" className="w-32" />
        </Link>
        <div className=" w-1 md:w-24"></div>
      </div>

      <div className="relative max-w-lg mx-auto  mt-10">
        <div className="absolute -inset-2">
          <div
            className="h-full w-[75%] mx-auto rounded-3xl opacity-30 blur-lg filter"
            style={{
              background:
                "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
            }}
          ></div>
        </div>

        {/* card */}
        <div className="w-[350px] h-[334px] relative rounded-[10px] mx-auto bg-white">
          {/* <Link to="/dashboard">
            <div className="w-[286px] h-10">
              <button className="w-[286px] active:scale-95 hover:scale-[1.02] duration-200 h-12 absolute left-[31.5px] top-[261.5px] rounded-[5px] bg-black" />
              <p className="absolute left-[111.38px] top-[271px] text-base font-semibold text-center text-white">
                Go to My Courses
              </p>
            </div>
          </Link> */}
          <Link to={auth ? "/dashboard" : "/"}>
            <div className="w-[286px] h-10">
              <div className="w-[286px] duration-200 h-12 absolute left-[31.5px] top-[261.5px] rounded-[5px] bg-black">
                <button
                  type="button"
                  className="active:scale-95 w-full hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 "
                >
                  {auth ? "Go to My Courses" : "Go to Home"}
                </button>
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-start items-center absolute left-[66px] top-[174px] gap-3">
            <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-[#272727]">
              Caution
            </p>
            <p className="flex-grow-0 flex-shrink-0 w-[218px] text-base text-center text-[#272727]">
              User Cancelled Payment.
            </p>
          </div>
          {/* <svg
            width={115}
            height={115}
            viewBox="0 0 115 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[116.07px] top-[32.07px]"
            preserveAspectRatio="none"
          >
            <circle cx="57.5" cy="57.5" r="57.5" fill="#F1E502" />
          </svg>
          <svg
            width={83}
            height={82}
            viewBox="0 0 83 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[132.08px] top-[48.08px]"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="41.0456"
              cy="41.0001"
              rx="41.0456"
              ry="41.0001"
              fill="#E69B00"
            />
          </svg>
          <svg
            width={50}
            height={32}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 45 32"
            className="absolute left-[160px] top-[77.48px]"
            preserveAspectRatio="none"
          >
            <path
              stroke="white"
              strokeWidth="4.1372"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg> */}

          <img
            src={CautionImg}
            className=" max-w-[100px] mt-5 flex mx-auto justify-center"
            alt="Caution"
          />
        </div>
      </div>
    </section>
  )
}

export default PaymentError
