import { useState } from "react"
import { ArrowLeft, ArrowRight } from "react-feather"

export default function CarouselBtn({ next, previous }) {
  const [lastClick, setLastClick] = useState(true)

  // true -> next
  // false -> previous

  const handleClick = (id) => {
    if (id === "next") {
      next()
      setLastClick(true)
    } else {
      previous()
      setLastClick(false)
    }
  }

  return (
    <div className="flex absolute -top-2 right-20  z-30" sx={{ width: "100%" }}>
      <div className="container">
        <div style={styles.buttonGroup} className="flex justify-center">
          <button
            aria-label="Previous"
            className={` ${
              !lastClick && "!text-white"
            } mt-4 bg-transparent text-[#636363]  active:text-white text-5xl px-2`}
           
            onClick={() => handleClick("prev")}
          >
            <ArrowLeft size={20} />
          </button>
          <button
           
            aria-label="Next"
            // className="mt-4 bg-transparent text-[#636363] active:text-white text-5xl px-2"
            className={` ${
              lastClick && "!text-white"
            } mt-4 bg-transparent text-[#636363]  active:text-white text-5xl px-2`}
            onClick={() => handleClick("next")}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    mb: -14,
    button: {
      bg: "transparent",
      border: "0px solid",
      fontSize: 40,
      cursor: "pointer",
      px: "2px",
      color: "#fff",
      transition: "all 0.25s",
      "&:hover": {
        color: "text"
      },
      "&:focus": {
        outline: 0
      }
    }
  }
}
