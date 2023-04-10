import React, { useEffect, useState } from "react"

// ** import components
import CourseCard from "../../components/CourseCard"
import Spinner from "../../components/spinner/Spinner"
// import RegisterCard from "../../components/RegisterCard"

/// ** import axios
import axios from "../../axios"

const LabsPage = () => {
    const [category, setCategory] = useState([])

    const [allCourseData, setAllCourseData] = useState([])

    const [courseByCategory, setCourseByCategory] = useState({})
    //   const [toggle, setToggle] = useState(true)

    //   const handleToggle = () => {
    //     setToggle(!toggle)
    //     setType(() => {
    //       if (type === "Course") return "Lab"
    //       return "Course"
    //     })
    //   }

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const { data } = await axios.get("/courseTrack/all")

                setCategory(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllCategory()
        localStorage.setItem("courseStatus", false)
    }, [])

    // useEffect(() => {
    //   const getAllCourse = async () => {
    //     try {
    //       const { data } = await axios.get("/course/all")
    //       console.log("all - courses", data.data)
    //       setAllCourseData(data.data)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   getAllCourse()
    // }, [])

    // ** Loading all courses | Labs
    useEffect(() => {
        setAllCourseData([])
        const getAllCourse = async () => {
            try {
                const { data } = await axios.get(`/lab/all`)
                console.log("data", data.data)
                const filter = data.data.filter((i) => i.lab_enable === "true")

                setAllCourseData(() => {
                    return filter
                })
            } catch (error) {
                console.log(error)
            }
        }
        getAllCourse()
    }, [])

    useEffect(() => {
        const courseByCategory = category.reduce((acc, category) => {
            console.log("dhum-dhum", allCourseData, category)
            const courseData = allCourseData.filter((course) => course.lab_track === category.track_name)
            acc[category.track_name] = courseData
            return acc
        }, {})

        setCourseByCategory(courseByCategory)
    }, [category, allCourseData])

    return (
        // max-w-[90%]
        <div className="!mx-auto w-[95%] max-w-7xl">
            {/* title */}
            <div className=" mx-auto max-w-[60rem] flex flex-col justify-center items-center text-center my-20">
                <h2 className="text-xl mb-5 font-bold leading-tight text-black sm:text-4xl max-w-[1080px] lg:text-[3rem] lg:!leading-[3.5rem]">
                    Test everything you've learned in a secure playground, with direct access to AWS/GCP/IXer resources.
                </h2>
                <p className="text-sm md:text-lg lg:text-xl max-w-[40rem]">
                    Practice and learn in a fully managed environment without worrying about setting up your own
                    resources.
                </p>
            </div>

            <div className="mx-auto mt-10">
                {/* <div className="flex gap-3  items-center my-8 justify-center">
          <span class="mr-3 text-2xl font-semibold text-[#4F46E5] dark:text-gray-300">
            Courses
          </span>
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              id="flexSwitchCheckDefault"
              onChange={handleToggle}
            />
            <div class="w-11 h-6 bg-[#4F46E5] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
          </label>
          <span class="ml-3 text-2xl font-semibold text-gray-900 dark:text-gray-300">
            Labs
          </span>
        </div> */}

                {Object.keys(courseByCategory).map((category) => {
                    return (
                        <>
                            {courseByCategory[category].length > 0 && (
                                <div className=" flex max-ms:pl-5 justify-center sm:justify-start flex-col mb-8 w-full ">
                                    <div className="text-center max-w-[278px] sm:max-w-[100%] min-w-[278px] mx-auto  sm:mx-[0] flex items-center gap-5 mb-10">
                                        <div className="grow-0  w-fit">
                                            <h2 className="text-xl whitespace-nowrap font-bold leading-tight text-gray-900 sm:text-xl lg:text-3xl">
                                                {category}
                                            </h2>
                                        </div>
                                        <div className="w-full flex-grow  h-[.8px] bg-black"></div>
                                    </div>
                                    <CourseCard
                                        data={courseByCategory[category]}
                                        hide="hide"
                                        status="lab"
                                    />
                                </div>
                            )}
                        </>
                    )
                })}
            </div>
            <section className="py-10 sm:px-14 max-w-7xl  sm:py-16 lg:py-24  overflow-hidden mx-auto ">
                {allCourseData.length === 0 ? (
                    <>
                        <div className="w-full h-[60vh] justify-center flex items-center">
                            <Spinner />
                        </div>
                    </>
                ) : (
                    <>{/* px-4 sm:px-6 lg:px-8  max-x-7xl md:max-w-[90%] 3xl:w-[60%] */}</>
                )}
            </section>
            {/* <RegisterCard
        title={"Unlock the key to the best interactive learning tool"}
      /> */}
        </div>
    )
}

export default LabsPage
