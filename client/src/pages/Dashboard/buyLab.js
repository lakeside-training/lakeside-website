/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

// import components
import Spinner from "../../components/spinner/Spinner";
import CourseCard from "../../components/CourseCard";

// import axios
import axios from "../../axios";

// import lab1 from "../../assets/images/courses/lap-1.png"
// import sci1 from "../../assets/images/courses/sci-1.png";
// import comp1 from "../../assets/images/courses/comp-1.png";
// import math1 from "../../assets/images/courses/math-1.png";

const BuyLab = () => {
  const [category, setCategory] = useState([]);

  const [allCourseData, setAllCourseData] = useState([]);

  const [courseByCategory, setCourseByCategory] = useState({});

  const [type, setType] = useState("Lab"); // Course or Lab

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/courseTrack/all");

        setCategory(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);


  useEffect(() => {
    setAllCourseData([]);
    const getAllCourse = async () => {
      try {
        const { data } = await axios.get(`/lab/all`);
        console.log("data", data.data);
        const filter = data.data.filter((i) => i.lab_enable === "true");

        setAllCourseData(() => {
          return filter;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllCourse();
  }, [type]);

  useEffect(() => {
    if (category.length > 0) {
      const courseByCategory = category.reduce((acc, category) => {
        const courseData = allCourseData.filter(
          (course) => course.lab_track === category.track_name
        );
        acc[category.track_name] = courseData;
        return acc;
      }, {});
      return setCourseByCategory(courseByCategory);
    }
  }, [category, allCourseData]);

  return (
    // max-w-[90%]
    <section className="py-10 sm:py-16 lg:py-24  overflow-hidden mx-auto">
      {allCourseData.length === 0 ? (
        <>
          <div className="w-full h-[60vh] justify-center flex items-center">
            <Spinner />
          </div>
        </>
      ) : (
        <>
          {/* px-4 sm:px-6 lg:px-8  max-w-[90%] */}
          <div className=" mx-auto max-x-7xl ">
            <div className="mx-auto">
              {Object.keys(courseByCategory).map((category) => {
                return (
                  <>
                    {courseByCategory[category].length > 0 && (
                      <div className=" flex justify-center sm:justify-start flex-col mb-8 w-full ">
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
                          status={type === "Lab" && "lab"}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BuyLab;
