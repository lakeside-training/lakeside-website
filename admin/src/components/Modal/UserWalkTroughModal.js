import React, { useState, useEffect } from "react"
import { Modal } from "flowbite-react"
import { Briefcase, Code, Compass, Star } from "react-feather"
import { motion } from "framer-motion"

const walkThroughData = [
  {
    icon: <Code />,
    title: "AWS Certified",
    description: "Which area of study interests you the most?",
    key: "area_of_interest"
  },
  {
    icon: <Briefcase />,
    title: "Professional",
    description: "Tell us about yourself?",
    key: "youself"
  },
  {
    icon: <Star />,
    title: "I’m a beginner",
    description: "How well do you know Cloud Computing ?",
    key: "interest_level"
  },
  {
    icon: <Compass />,
    title: "Exploring new topics I'm interested in",
    description: "What do you want to archive with Lake Side Learn?",
    key: "archive_lakeside_learn"
  }
]

const UserWalkTroughModal = ({ show, setShow, userData }) => {
  const [walkThrough, setWalkThrough] = useState([])

  const onClose = () => {
    setShow(!show)
  }

  useEffect(() => {
    if (userData) {
      const result = []
      for (let i = 0; i < walkThroughData.length; i++) {
        if (userData[walkThroughData[i].key]?.length >= 5) {
          if (userData[walkThroughData[i].key] !== "undefined") {
            result.push(walkThroughData[i])
          }
        }
      }
      setWalkThrough(result)
    }
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
        <Modal.Header>User Walk Through Data</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            {walkThrough.length === 0 && (
              <div className="text-center">
                <h1 className="text-2xl font-medium">No Data</h1>
              </div>
            )}
            {walkThrough.map((item, index) => (
              <div className="flex items-center flex-wrap" key={`walkThrough-${index}`}>
                <div className="w-full sm:w-6/12">{item.description}</div>
                <div className=" flex items-center border-2 border-indigo-600 py-2 px-2 w-full sm:w-5/12 rounded-md gap-2">
                  <span className="text-gray-400 ">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  )
}

export default UserWalkTroughModal
