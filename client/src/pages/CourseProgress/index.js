import React from "react"

// import components or page
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer/index"

// import third parity components
import { Link, useSearchParams } from "react-router-dom"

const CourseProgress = () => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get("name")

  const courseProgressDetails = [
    {
      id: 1,
      title: "Introduction",
      des: "Learn as you play with these scientific puzzles.",
      popUpStatus: "accordionOne",
      headingStatus: "headingOne",
      content: [
        {
          title: "Nature is a Puzzle",
          time: "04:00 PM GMT, 23 Aug 2022",
          status: "COMPLETED",
          joinStatus: "",
          sessionStatus: "Session Over"
        },
        {
          title: "Science Rules",
          time: "04:00 PM GMT, 24 Aug 2022",
          status: "ONGOING",
          joinStatus: "Restart",
          sessionStatus: "Join Session"
        },
        {
          title: "Structures",
          time: "04:00 PM GMT, 25 Aug 2022",
          status: "UPCOMING",
          joinStatus: "",
          sessionStatus: "Will be Updated"
        }
      ]
    },
    {
      id: 2,
      title: "Structure",
      des: "Break down these structures to learn how to build them.",
      popUpStatus: "accordionTwo",
      headingStatus: "headingTwo",
      content: [
        {
          title: "This is Flow",
          time: "04:00 PM GMT, 1 Aug 2022",
          status: "ONGOING",
          joinStatus: "Restart",
          sessionStatus: "Session Over"
        },
        {
          title: "Lorem Science",
          time: "04:00 PM GMT, 24 Aug 2022",
          status: "COMPLETED",
          joinStatus: "",
          sessionStatus: "Join Session"
        },
        {
          title: "Status Structures",
          time: "04:00 PM GMT, 5 Aug 2022",
          status: "UPCOMING",
          joinStatus: "",
          sessionStatus: "Will be Updated"
        }
      ]
    },
    {
      id: 3,
      title: "Flow",
      des: "Explore what happens when matter and energy are on the move.",
      popUpStatus: "accordionThree",
      headingStatus: "headingThree",
      content: [
        {
          title: "Puzzle",
          time: "04:00 PM GMT, 10 Aug 2022",
          status: "UPCOMING",
          joinStatus: "",
          sessionStatus: "Session Over"
        },
        {
          title: "Rules",
          time: "04:00 PM GMT, 10 Aug 2022",
          status: "ONGOING",
          joinStatus: "Restart",
          sessionStatus: "Join Session"
        },
        {
          title: "Going",
          time: "04:00 PM GMT, 14 Aug 2022",
          status: "UPCOMING",
          joinStatus: "",
          sessionStatus: "Will be Updated"
        }
      ]
    },
    {
      id: 4,
      title: "Light",
      des: "Illuminate your path to the quantum realm.",
      popUpStatus: "accordionFour",
      headingStatus: "headingFour",
      content: [
        {
          title: "Time",
          time: "04:00 PM GMT, 17 Aug 2022",
          status: "COMPLETED",
          joinStatus: "",
          sessionStatus: "Session Over"
        },
        {
          title: "Call Coming",
          time: "04:00 PM GMT, 7 Aug 2022",
          status: "ONGOING",
          joinStatus: "Restart",
          sessionStatus: "Join Session"
        },
        {
          title: "Do That",
          time: "04:00 PM GMT, 25 Aug 2022",
          status: "UPCOMING",
          joinStatus: "",
          sessionStatus: "Will be Updated"
        }
      ]
    },
    {
      id: 5,
      title: "Relativity",
      des: "Nature doesn't mind which way you look at it.",
      popUpStatus: "accordionFive",
      headingStatus: "headingFive",
      content: [
        {
          title: "Relativity",
          time: "04:00 PM GMT, 23 Aug 2022",
          status: "COMPLETED",
          joinStatus: "",
          sessionStatus: "Session Over"
        },
        {
          title: "Science Rules",
          time: "04:00 PM GMT, 24 Aug 2022",
          status: "ONGOING",
          joinStatus: "Restart",
          sessionStatus: "Join Session"
        },
        {
          title: "Structures",
          time: "04:00 PM GMT, 25 Aug 2022",
          status: "UPCOMING",
          joinStatus: "",
          sessionStatus: "Will be Updated"
        }
      ]
    }
  ]

  const storage = localStorage.getItem("userInfo")

  return (
    <>
      <div className="flex flex-col flex-1 xl:px-10 overflow-hidden">
        {/* Navbar */}
        {!storage && <Navbar />}

        {/* Course Progress */}
        <div className="flex sm:px-14  flex-col flex-1 mx-auto w-[95%] 2xl:w-[87%] xl:w-[95%] ">
          <Link to="/dashboard" className="flex mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-4 mr-1 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to My Courses
          </Link>
          <div className="flex mt-3 ml-3">
            <h3 className="font-bold font-manrope text-base">{name}</h3>
            {/* <div className="ml-4 border mb-5 px-2 py-1 border-[#4F46E5] bg-indigo-200 rounded-xl flex justify-center items-center">
              <p className="text-[#4F46E5] text-xs">22%</p>
            </div> */}
          </div>

          {/* Accordion */}

          <div className="overflow-x-auto pb-5 px-2">
            {courseProgressDetails.map((data) => {
              return (
                <>
                  <div className="bg-white mt-[32px] border-0">
                    <h2 className="mb-0" id={data.headingStatus}>
                      <button
                        className=" accordion-button collapsed relative flex items-center w-full py-2 px-3 text-base text-gray-800 text-left bg-white rounded transition shadow-md border "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${data.popUpStatus}`}
                      >
                        <div className="flex">
                          <div className="rounded-2xl text-xs flex justify-center items-center w-6 h-6 text-white bg-black">
                            {data.id}
                          </div>
                          <div className="ml-3">
                            <h4 className="!text-black font-bold font-manrope text-sm">
                              {data.title}
                            </h4>
                            <p className="!text-black text-xs font-manrope mt-1">
                              {data.des}
                            </p>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={data.popUpStatus}
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      {data.content.map((content) => {
                        return (
                          <div className="md:ml-10 ml-1 w-[95%] block md:flex py-2 border-b">
                            <div className="w-full font-bold md:w-1/5 text-xs font-manrope flex items-center">
                              {content.title}
                            </div>
                            <div className="w-full md:w-1/5 text-xs font-manrope flex items-center">
                              {content.time}
                            </div>
                            <div className="hidden md:block w-1/5">
                              <div
                                className={`${
                                  (content.status === "COMPLETED" &&
                                    "text-[#289B00] border-[#289B00] bg-[#EBFFE3]") ||
                                  (content.status === "ONGOING" &&
                                    "text-[#4F46E5] border-[#4F46E5] bg-[#F2F1FF]") ||
                                  (content.status === "UPCOMING" &&
                                    "text-[#CF7710] border-[#CF7710] bg-[#FFEDD9]")
                                } border w-24 py-1 rounded-xl flex justify-center items-center`}
                              >
                                <p
                                  className={`${
                                    (content.status === "COMPLETED" &&
                                      "text-[#289B00]") ||
                                    (content.status === "ONGOING" &&
                                      "text-[#4F46E5]") ||
                                    (content.status === "UPCOMING" &&
                                      "text-[#CF7710]")
                                  } text-xs`}
                                >
                                  {content.status}
                                </p>
                              </div>
                            </div>
                            <div className="w-1/5 text-[#4F46E5] text-xs font-manrope hidden md:flex items-center">
                              {content.joinStatus}
                              {content.joinStatus && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4 ml-1"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                  />
                                </svg>
                              )}
                            </div>

                            {/* In Mobile */}
                            <div className="flex justify-between items-center md:hidden items-center">
                              <div
                                className={`${
                                  (content.status === "COMPLETED" &&
                                    "text-[#289B00] border-[#289B00] bg-[#EBFFE3]") ||
                                  (content.status === "ONGOING" &&
                                    "text-[#4F46E5] border-[#4F46E5] bg-[#F2F1FF]") ||
                                  (content.status === "UPCOMING" &&
                                    "text-[#CF7710] border-[#CF7710] bg-[#FFEDD9]")
                                } mt-2 border w-24 py-1 rounded-xl flex justify-center items-center`}
                              >
                                <p className="text-xs">{content.status}</p>
                              </div>
                              <div className="ml-4 flex">
                                <p
                                  className={`${
                                    (content.status === "COMPLETED" &&
                                      "text-[#289B00]") ||
                                    (content.status === "ONGOING" &&
                                      "text-[#4F46E5]") ||
                                    (content.status === "UPCOMING" &&
                                      "text-[#8D8D8D]")
                                  } text-xs pr-3`}
                                >
                                  {content.sessionStatus}
                                </p>

                                <p
                                  className={`text-[#4F46E5] flex text-xs pl-3 ${
                                    content.joinStatus && "border-l-2"
                                  }`}
                                >
                                  {content.joinStatus}
                                  {content.joinStatus && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-4 h-4 ml-1"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                      />
                                    </svg>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="hidden md:w-1/5 flex pr-2 justify-end items-center text-[#24BD17] text-xs font-manrope ">
                              {content.sessionStatus}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default CourseProgress
