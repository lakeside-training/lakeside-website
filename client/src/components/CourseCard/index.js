import React from "react"
import { Link } from "react-router-dom"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import required modules
import { Pagination, FreeMode } from "swiper"

// ** Import Motion
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { removeAmount, setAmount } from "../../redux/slices/amount"

const CourseCard = ({ data, img, className, hide, status }) => {
    const { steps } = useSelector((state) => state.steps)
    const dispatch = useDispatch()
    localStorage.setItem("STEPS", JSON.stringify(steps))

    const add = (id, name, price) => {
        dispatch(setAmount({ id: id, name: name, price: price }))
    }

    const remove = (id) => {
        dispatch(removeAmount({ id }))
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={"course-card"}
            className="block w-full"
        >
            {/* -mx-3  sm:-mx-5 md:-mx-4 lg:-mx-4 xl:-mx-3 */}
            <Swiper
                pagination={{
                    clickable: true
                }}
                scrollbar={{ draggable: true }}
                modules={[Pagination, FreeMode]}
                freeMode={true}
                className="mySwiper"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    750: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 0
                    }
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="!p-0 !m-0 !mb-10 !h-[410px] "
                    >
                        <div
                            key={`${item.id}-${index}`}
                            // className="flex flex-col gap-4 py-5 bg-white border border-gray-200 rounded-lg shadow-xl shadow-[rgba(0, 0, 0, 0.1)] my-3 px-3 w-[100vw] min-w-[278px] mx-auto sm:mx-0 max-w-[278px] overflow-hidden sm:my-5 sm:px-5 md:my-4 md:px-4"
                            className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow-lg shadow-[rgba(0, 0, 0, 0.1)] px-3 w-[100vw] h-full min-w-[278px] sm:mx-0 max-w-[298px] overflow-hidden py-7 sm:px-5 justify-between"
                        >
                            {hide === undefined && (
                                <input
                                    type="checkbox"
                                    onClick={(e) =>
                                        e.target.checked === true
                                            ? add(
                                                  item.id,
                                                  item.name,
                                                  steps.role === "Student" ? item.discount_price : item.price
                                              )
                                            : remove(item.id)
                                    }
                                />
                            )}
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
                            <h3 className="text-xl font-bold mt-[10px] max-h-[50px] overflow-hidden w-[100%] whitespace-normal break-words text-gray-900">
                                {item.name}
                            </h3>
                            <div className=" h-[100%] min-h-[45px] max-h-[45px] w-full">
                                <p className="text-gray-500 line-clamp-3 ">{item.description}</p>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center gap-2 mx-1">
                                    {hide === "hide" ? null : (
                                        <>
                                            {steps.role === "Student" ? (
                                                <span className="text-xl font-bold text-gray-900">
                                                    ${item.discount_price}
                                                </span>
                                            ) : (
                                                <span className="text-xl  text-gray-500">${item.price}</span>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {hide === "hide" ? (
                                <>
                                    {status === "lab" ? (
                                        <>
                                            <Link
                                                to={
                                                    "/course-details?id=" +
                                                    item.id +
                                                    "&hide=" +
                                                    hide +
                                                    "&status=" +
                                                    status
                                                }
                                                className="w-full"
                                            >
                                                <button className="active:scale-95 hover:scale-[1.02] duration-200 px-4 w-full py-2 text-sm font-semibold text-white bg-black rounded-lg">
                                                    {`View Lab` || "Enter"}
                                                </button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to={"/course-details?id=" + item.id + "&hide=" + hide}
                                                className="w-full"
                                            >
                                                <button className="active:scale-95 hover:scale-[1.02] duration-200 px-4 w-full py-2 text-sm font-semibold text-white bg-black rounded-lg">
                                                    {`View Course` || "Enter"}
                                                </button>
                                            </Link>{" "}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={"/course-details?id=" + item.id}
                                        className="w-full"
                                    >
                                        <button
                                            onClick={() => localStorage.setItem("step", 6)}
                                            className="active:scale-95 hover:scale-[1.02] duration-200 px-4 w-full py-2 text-sm font-semibold text-white bg-black rounded-lg"
                                        >
                                            {`View Course` || "Enter"}
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    )
}

export default CourseCard
