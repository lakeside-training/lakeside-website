import React from "react"
import Console from "./Console"
import LabAlertCard from "./LabAlertCard"

// ** import sub components
import LabNavbar from "./Navbar"
import Timer from "./Timer"

const LabPractice = () => {
  return (
    <div>
      <LabNavbar />
      <LabAlertCard />
      <div className="flex flex-1 px-4 sm:px-6 md:px-8 my-5  min-h-full h-full">
        <div className="mx-auto sm:mx-0 flex-col gap-10 w-72">
          <Timer />
          <Console
            consoleLink={"http://localhost:3000/lab"}
            userName={"student-18248ktg"}
            password={"GGBUI5774"}
          />
        </div>
      </div>
    </div>
  )
}

export default LabPractice
