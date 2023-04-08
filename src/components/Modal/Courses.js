import React, { useState, useEffect } from "react"
import { Modal } from "flowbite-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import axios from "../../axios"


const Courses = ({ show, setShow, user }) => {
  
  const onClose = () => {
    setShow(!show)
  }

  const [userData, setUsersData] = useState([])

  useEffect(() => {
    axios.post('/userCourse/getCourse', { user_id: user.id })
      .then(data => {
        setUsersData(data.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: "100vh",
      opacity: 0
    }
  }
  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Modal show={show} size="4xl" onClose={onClose}>
        <Modal.Header>Courses {userData.length !== 0 && userData.length}</Modal.Header>
        <Modal.Body className="max-h-[80vh] overflow-hidden">
          <div className="flex flex-col gap-4">
            {userData.length === 0 && (
              <div className="text-center">
                <h1 className="text-2xl font-medium">Do Not Have Course</h1>
              </div>
            )}
            <div className="w-full flex flex-wrap gap-x-3 justify-center max-h-[70vh] overflow-x-hidden overflow-y-auto ">
              {userData.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    // className="flex flex-col p-5 items-center gap-4   mx-auto sm:mx-0  bg-white rounded-lg shadow-lg"
                    className="flex flex-col gap-2 py-5 bg-white border border-gray-200 rounded-lg shadow-xl shadow-[rgba(0, 0, 0, 0.1)] my-3 px-3 mx-auto sm:mx-0 max-w-[250px] sm:my-5 sm:px-5 md:my-4 md:px-4"
                  >
                    <img src={item.course_icon} alt="" className="w-32 h-32 mx-auto" />

                    {/* h-full max-h-[60px] */}
                    <h3 className="text-xl font-bold w-[100%] whitespace-normal break-words text-gray-900">
                      {item.name}
                    </h3>
                    <div className=" h-[100%] max-h-[70px] w-[100%] overflow-hidden text-clip">
                      <div className="text-gray-500 whitespace-normal break-words">
                        {item.description}
                      </div>
                    </div>
                    <Link to={"/course-details?id=" + item.id} className="w-full">
                      <button className="active:scale-95 hover:scale-[1.02] duration-200 px-4 w-full py-2 text-sm font-semibold text-white bg-black rounded-lg">
                        {`View` || "Enter"}
                      </button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  )
}

export default Courses
