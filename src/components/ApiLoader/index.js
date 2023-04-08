import React from "react"
import PuffLoader from "react-spinners/PuffLoader"
import { usePromiseTracker } from "react-promise-tracker"

const ApiLoader = () => {
  const { promiseInProgress } = usePromiseTracker()
  return (
    promiseInProgress && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <PuffLoader color={"#2033db"} loading={true} size={100} />
      </div>
    )
  )
}

export default ApiLoader
