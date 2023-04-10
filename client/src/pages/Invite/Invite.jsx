import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/logo/logo.svg"
import Contacts from "./Contacts"

const Invite = () => {
  const [totalContacts, setTotalContacts] = useState(0)
  return (
    <div>
      <div className="w-[80%] mx-auto">
        <div className="flex justify-between items-center w-full h-16 px-4 bg-white border-b border-gray-200">
          <Link to="/dashboard">
            <div>&lt; Go Back </div>
          </Link>
          <div>
            <Link to="/" className="flex rounded outline-none">
              <Logo />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            Share with people you know on Gmail
          </h3>
          <p className="text-[#64748B]">
            We found {totalContacts} people you know on gmail, Select the people
            you’d like to share
          </p>
        </div>
        <Contacts setTotalContacts={setTotalContacts} />
      </div>
    </div>
  )
}

export default Invite
