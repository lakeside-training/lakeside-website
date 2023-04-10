import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Switch from "react-switch"
import toast from "react-hot-toast"
// import lab1 from "../../assets/images/courses/lap-1.png"
import axios from "../../axios"

const CourseCard = ({ data, img, label }) => {
    const userToken = localStorage.getItem("userToken")

    const handelLab = async (id, value) => {
        const { data } = await axios.post(
            "/lab/status/update",
            {
                id,
                value
            },
            {
                headers: {
                    Authorization: userToken
                }
            }
        )
        toast.success(data.status)
    }

    const handelCourse = async (id, value) => {
        const { data } = await axios.post(
            "/course/status/update",
            {
                id,
                value
            },
            {
                headers: {
                    Authorization: userToken
                }
            }
        )
        toast.success(data.status)
    }

    return (
        <div
            className="flex flex-wrap justify-start gap-6 
      "
        >
            {/* -mx-3  sm:-mx-5 md:-mx-4 lg:-mx-4 xl:-mx-3 */}
            {data.map((item) => (
                <div
                    key={item.id}
                    // className="flex flex-col p-5 items-center gap-4   mx-auto sm:mx-0  bg-white rounded-lg shadow-lg"
                    className=" flex flex-col gap-2 py-3 md:py-5 bg-white border border-gray-200 rounded-lg shadow-xl shadow-[rgba(0, 0, 0, 0.1)] my-3 px-3 mx-auto sm:mx-0 min-w-[310px] max-w-[310px] max-h-[380px] min-h-[380px] justify-between overflow-hidden sm:my-5 sm:px-5 md:my-4 md:px-4"
                >
                    <div className="flex items-center justify-end w-full relative">
                        <div className="bg-[#EDF2F7] py-4 px-4 absolute -top-6 -right-4 rounded-bl-lg">
                            {label === "lab" ? (
                                <>
                                    <Switch
                                        id={item.id}
                                        checked={item.lab_enable === "true" ? true : false}
                                        className="react-switch"
                                        onColor="#4F46E5"
                                        onHandleColor="#fff"
                                        height={18}
                                        width={45}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        onChange={() => {
                                            handelLab(item.id, item.lab_enable === true ? false : true)
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Switch
                                        id={item.id}
                                        checked={item.course_enable === "true" ? true : false}
                                        className="react-switch"
                                        onColor="#4F46E5"
                                        onHandleColor="#fff"
                                        height={18}
                                        width={45}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        onChange={() => {
                                            handelCourse(item.id, item.course_enable === true ? false : true)
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {console.log(item.lab_enable)}
                    {item.lab_icon ? (
                        <img
                            src={item.lab_icon}
                            alt=""
                            className="w-32 h-32 mx-auto"
                        />
                    ) : (
                        <img
                            src={item.course_icon}
                            alt=""
                            className="w-32 h-32 mx-auto"
                        />
                    )}

                    {/* h-full max-h-[60px] */}
                    {/* <div className="flex items-center justify-between "> */}
                    <h3 className="text-xl font-bold w-[100%] whitespace-normal break-words text-gray-900">
                        {item.name}
                    </h3>

                    {/* </div> */}
                    <div className=" h-[100%] max-h-[75px] w-[100%]">
                        <div className="text-gray-500 line-clamp-3">{item.description}</div>
                    </div>
                    {/* NOTE: Price Section */}
                    {/* <div className="w-full">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${item.discount_price}
              </span>
              <span className="text-md line-through text-gray-500">
                ${item.price}
              </span>
            </div>
          </div> */}
                    {label === "lab" ? (
                        <Link
                            to={"/lab-details?id=" + item.id}
                            className="w-full"
                        >
                            <button className="active:scale-95 hover:scale-[1.02] duration-200 px-4 mt-3 w-full py-2 text-sm font-semibold text-white bg-black rounded-lg">
                                {`View` || "Enter"}
                            </button>
                        </Link>
                    ) : (
                        <Link
                            to={"/course-details?id=" + item.id}
                            className="w-full"
                        >
                            <button className="active:scale-95 hover:scale-[1.02] duration-200 px-4 mt-3 w-full py-2 text-sm font-semibold text-white bg-black rounded-lg">
                                {`View` || "Enter"}
                            </button>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CourseCard
