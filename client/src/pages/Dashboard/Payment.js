import React, { useEffect, useState } from "react"
// ** import custom components
import Pricing from "./Pricing"
import axios from "../../axios"

// ** import custom icons
import { ReactComponent as Star } from "../../assets/icons/star.svg"

const Payment = () => {
  // const [planName, setPlanName] = useState('')
  const [currentPlanName, setCurrentPlanName] = useState("")
  const [isNoPlan, setIsNoPlan] = useState(false)

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("userInfo"))

    const API = async () => {
      const { data } = await axios.post("/user/getParticular/planDetails", {
        userId: userID[0].id
      })
      setCurrentPlanName(data)
      console.log("sad",data !== "oneTime" && data !== "Subscription")
      if (data !== "oneTime" && data !== "Subscription") {

        setIsNoPlan(true)
      }
    }
    API()
  }, [])

  const PricingTitle = (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold text-gray-900 font-pj">Current Plan</h2>
      <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
        You can cancel or update your membership from here
      </p>
      <br />

        {
          isNoPlan ? (
            <p>
              <span className="text-lg font-normal text-gray-600 font-pj">
                You have no plan ⚠️
              </span>
            </p>
          ) : null
        }
    </div>
  )

  return (
    <div className="-ml-4">
      <Pricing Title={PricingTitle} Star={Star} Plan={currentPlanName} />
      <div className="flex gap-5 px-4 justify-end md:justify-end max-w-7xl sm:px-6 lg:px-8">
        {/* <button
          type="button"
          onClick={() => {
            process()
          }}
          className="active:scale-95 hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
        >
          Change Plan
        </button> */}
        {/* 
        <button
          type="button"
          className="active:scale-95 hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-gray-900 transition-all duration-200 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 hover:bg-gray-200"
        >
          Cancel Subscription
        </button> */}
      </div>
    </div>
  )
}

export default Payment
