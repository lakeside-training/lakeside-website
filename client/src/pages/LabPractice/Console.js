import React from "react"

// ** import svg icons
import { ReactComponent as ClipboardIco } from "../../assets/svg/clipboard.svg"

// ** import toast
import { toast } from "react-hot-toast"

const Console = ({ consoleLink, userName, password }) => {
  const handleOpenConsol = () => {
    window.open(consoleLink, "_blank")
  }

  const handleCopy = ({ val, type }) => {
    navigator.clipboard.writeText(val)
    toast.success(`Copied ${type}`)
  }

  return (
    <div className="my-5 flex flex-col gap-5 w-full px-6 py-4 rounded-md shadow-md">
      <div className="flex">
        <p>
          <span className=" text-lg font-normal">Caution: </span>Lorem ipsum
          dolor sit amet consectetur. In imperdiet montes egestas tincidunt
          gravida facilisis. Sit vitae suspendisse imperdiet nunc. Sit phasellus
          ultrices urna sit vivamus tellus.
        </p>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="active:scale-95 hover:scale-[1.02] transition-all duration-200 lg:flex w-auto px-12 py-3 text-sm font-medium rounded-lg group bg-[#fff] text-[#4F46E5] border-2 border-[#4F46E5] mr-3"
          onClick={handleOpenConsol}
        >
          Open Console
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="">Username</label>
          <div className="rounded-md mt-1 w-full flex items-center border-2 border-[#e2e2e3] overflow-hidden">
            <input
              type="text"
              value={userName}
              className="w-full border-transparent focus:border-transparent focus:ring-0"
            />
            <div
              className="px-3 border-l-2 py-3 border-[#e2e2e3] cursor-pointer"
              onClick={() => handleCopy({ val: userName, type: "Username" })}
            >
              <ClipboardIco />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <div className="rounded-md mt-1 w-full flex items-center border-2 border-[#e2e2e3] overflow-hidden">
            <input
              type="text"
              value={password}
              className="w-full border-transparent focus:border-transparent focus:ring-0"
            />
            <div
              className="px-3 border-l-2 py-3 border-[#e2e2e3] cursor-pointer"
              onClick={() => handleCopy({ val: password, type: "Password" })}
            >
              <ClipboardIco />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Console
