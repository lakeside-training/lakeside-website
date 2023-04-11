import React from "react"
import { Link } from "react-router-dom"

// ** import hooks
import { useTimer } from "../../hooks/hooks"

const Timer = () => {
  const { seconds, start, stop, reset } = useTimer(1000)

  //   'Start Lab, End Lab'
  const [timerStatus, setTimerStatus] = React.useState("Start Lab")
  const [time, setTime] = React.useState(new Date(null))

  React.useEffect(() => {
    const date = new Date(null)
    date.setSeconds(seconds)
    setTime(date.toISOString().substr(11, 8))
    date.toISOString().substr(11, 8)
  }, [seconds])

  const handleStart = () => {
    start()
    setTimerStatus("End Lab")
  }

  const handleStop = () => {
    stop()
    setTimerStatus("Lab Stopped")
  }

  React.useEffect(() => {
    if (seconds === 0) {
      handleStop()
    }
  }, [seconds])

  return (
    <div className="flex gap-6 items-center justify-between px-4 py-4 shadow-md rounded-md">
      <button
        className="active:scale-95 hover:scale-[1.02] transition-all duration-200 lg:flex w-auto px-3 py-3 text-sm font-medium rounded-lg group bg-[#4F46E5] text-[#fff] mr-3"
        onClick={() => {
          timerStatus === "Start Lab"
            ? handleStart()
            : timerStatus === "End Lab"
            ? handleStop()
            : reset()
        }}
      >
        <div className="transition-all duration-200 transform group-hover:translate-x-1 flex ">
          <span className="block">{timerStatus}</span>
        </div>
      </button>
      <h2>{String(time) || ""}</h2>
    </div>
  )
}

export default Timer
