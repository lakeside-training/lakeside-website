import React from 'react'
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const useAuth = () => useContext(AuthContext)

export default useAuth
export const useTimer = ({duration}) => {
  console.log(duration)
  const [seconds, setSeconds] = React.useState(duration)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    let intervalId
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          clearInterval(intervalId)
        }
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, seconds])

  const start = () => setIsRunning(true)
  const stop = () => setIsRunning(false)
  const reset = () => setSeconds(duration)

  return { seconds, start, stop, reset }
}
