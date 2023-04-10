import React from "react";

// import components or page
import CarouselBtn from "../../components/CarouselBtn";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer/index";

// import third parity components
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// import images
import cartMan from "../../assets/images/course-details/cartMan.png";
import ellipse1 from "../../assets/images/course-details/Ellipse1.png";
import ellipse2 from "../../assets/images/course-details/Ellipse2.png";
import ellipse3 from "../../assets/images/course-details/Ellipse3.png";
import ellipse4 from "../../assets/images/course-details/Ellipse4.png";

const Laps = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  const modelsDetails = [
    {
      id: 1,
      title: "Introduction",
      concepts: "3 Concepts",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis.",
    },
    {
      id: 2,
      title: "Structure",
      concepts: "2 Concepts",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis.",
    },
    {
      id: 3,
      title: "Flow",
      concepts: "2 Concepts",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis.",
    },
    {
      id: 4,
      title: "Light",
      concepts: "2 Concepts",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis.",
    },
  ];

  const data = [
    {
      data: "Computing",
    },
    {
      data: "Database",
    },
    {
      data: "Storage",
    },
    {
      data: "Testing",
    },
    {
      data: "QA",
    },
  ];
  return (
    <>
      <div className="flex flex-col flex-1">
        {/* Course Details */}
        <div className="!mx-auto sm:px-12 w-[95%] max-w-7xl">
          {/*  w-[95%] 2xl:w-[87%]  */}
        <div className="mx-auto flex flex-col flex-1">
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

          <div className="w-full flex flex-wrap">
            {/* car in mobile */}
            <div className="w-[95%] mx-auto sm:w-[70%] mt-10 md:mt-0 md:mx-0 md:w-[50%] flex md:hidden justify-end items-center">
              <div className="relative">
                <div className="absolute -inset-2">
                  <div
                    className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
                    style={{
                      background:
                        "linear-gradient(90deg, #ebff70 20%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #44ff9a -0.55%)",
                    }}
                  ></div>
                </div>
                <div className="relative flex flex-col justify-end items-start sm-[80%] lg:w-[100%] overflow-hidden h-[auto] gap-[29px] p-4 rounded-lg bg-white">
                  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[100%] h-[auto] gap-[7.559878349304199px] rounded-md">
                    <img src={cartMan} className="w-full h-full" alt="" />
                  </div>
                  <div className="flex justify-start items-center w-[100%] overflow-hidden">
                    <div className="flex justify-start items-center gap-[5px] w-[40%]">
                      <p className="flex-grow-0 flex-shrink-0 text-[base] font-bold text-left text-[#1e1e1e]">
                        $30
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#747474]">
                        $50
                      </p>
                    </div>
                    <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-[60%]">
                      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative space-x-[-16.064741134643555px]">
                        <img src={ellipse1} alt="" />
                        <img src={ellipse2} alt="" />
                        <img src={ellipse3} alt="" />
                        <img
                          className="flex-grow-0 flex-shrink-0"
                          src={ellipse4}
                          alt=""
                        />
                      </div>
                      <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-slate-500">
                        Join 523+ Learners
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start w-[100%]">
                    <div className="flex flex-col justify-start items-start">
                      <p className="flex-grow-0 text-sm flex-shrink-0 font-medium text-right text-[#242424]">
                        6 (12 Hours)
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#7c7c7c]">
                        Modules
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="flex-grow-0 text-sm flex-shrink-0 font-medium text-right text-[#242424]">
                        Scientific Thinking
                      </p>
                      <p className="flex-grow-0 text-right flex-shrink-0 text-xs font-medium text-left text-[#7c7c7c]">
                        Category
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center flex-grow-0 flex-shrink-0 w-[100%] m-auto cursor-pointer gap-1 rounded-[10px]">
                    <button
                      type="submit"
                      className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                    >
                      Enroll now
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div className="px-2 mx-auto w-[95%] text-justify sm:text-start md:mx-0 md:w-[50%] pt-10">
              <h1 className="text-3xl font-bold">Scientific Thinking</h1>
              <p className="text-[#52525B] text-sm sm:text-base mt-5 sm:mt-8">
                Every project needs a good strategy and a system to track its
                execution. This is where project manager Alessia Casillo steps
                in; with experience working for brands like Privalia and Airbnb,
                she's an expert at pinpointing a company's needs and objectives
                to design a tailored plan that delivers results.
              </p>
              <p className="text-[#52525B] mt-5 sm:mt-8">
                In this course, she teaches you how to organize and oversee a
                project, from the idea to the work schedule and expenses. Learn
                to manage people and money and effectively communicate to build
                a solid organizational system.
              </p>
              <p className="text-[#52525B] mt-5 sm:mt-8">
                Throughout his career, Stefano has collaborated with renowned
                musicians. Under his expert guidance, learn how to design a
                creative money ecosystem and effectively present your projects
                to build positive, long-lasting relationships with your clients.
              </p>
              <div className="flex flex-wrap mt-5 sm:mt-10 justify-start items-start w-[100%] gap-[7.559878349304199px]">
                {data.map((data) => {
                  return (
                    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[7.559878349304199px] px-[7.559878349304199px] py-[5.6699090003967285px] rounded-[1.89px] bg-[#f7f8f9]">
                      <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#4b5768]">
                        {data.data}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* cart in desktop */}
            <div className="w-[95%] mx-auto sm:w-[70%] mt-10 md:mt-0 md:mx-0 md:w-[50%] hidden md:flex justify-end items-center">
              <div className="relative">
                <div className="absolute -inset-2">
                  <div
                    className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
                    style={{
                      background:
                        "linear-gradient(90deg, #ebff70 20%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #44ff9a -0.55%)",
                    }}
                  ></div>
                </div>
                <div className="relative flex flex-col justify-end items-start sm-[80%] lg:w-[100%] overflow-hidden h-[auto] gap-[29px] p-4 rounded-lg bg-white">
                  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[100%] h-[auto] gap-[7.559878349304199px] rounded-md">
                    <img src={cartMan} className="w-full h-full" alt="" />
                  </div>
                  <div className="flex justify-start items-center w-[100%] overflow-hidden">
                    <div className="flex justify-start items-center gap-[5px] w-[40%]">
                      <p className="flex-grow-0 flex-shrink-0 text-[base] font-bold text-left text-[#1e1e1e]">
                        $30
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#747474]">
                        $50
                      </p>
                    </div>
                    <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-[60%]">
                      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative space-x-[-16.064741134643555px]">
                        <img src={ellipse1} alt="" />
                        <img src={ellipse2} alt="" />
                        <img src={ellipse3} alt="" />
                        <img
                          className="flex-grow-0 flex-shrink-0"
                          src={ellipse4}
                          alt=""
                        />
                      </div>
                      <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-slate-500">
                        Join 523+ Learners
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start w-[100%]">
                    <div className="flex flex-col justify-start items-start">
                      <p className="flex-grow-0 text-sm flex-shrink-0 font-medium text-right text-[#242424]">
                        6 (12 Hours)
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#7c7c7c]">
                        Modules
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="flex-grow-0 text-sm flex-shrink-0 font-medium text-right text-[#242424]">
                        Scientific Thinking
                      </p>
                      <p className="flex-grow-0 text-right flex-shrink-0 text-xs font-medium text-left text-[#7c7c7c]">
                        Category
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center flex-grow-0 flex-shrink-0 w-[100%] m-auto cursor-pointer gap-1 rounded-[10px]">
                    <button
                      type="submit"
                      className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                    >
                      Enroll now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="mt-16 py-14 w-[100%] bg-[#18181B]">
        <div className="mx-auto  sm:px-16 md:px-10 2xl:px-28 px-8 w-[95%] 2xl:w-[87%] 3xl:w-[60%] flex flex-col flex-1  relative">
          <h1 className="text-2xl mb-5 text-white font-bold">Modules</h1>
          {/* <div className="sm:px-12"> */}
          <Carousel
          customButtonGroup={<CarouselBtn />}
          renderButtonGroupOutside={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            responsive={responsive}
          >
            {modelsDetails.map((data) => {
              return (
                // <div className="mx-5 p-8 rounded bg-white">
                //   <div className="w-[40px] h-[40px] rounded-3xl bg-[#4F46E6] flex justify-center items-center text-white">
                //     {data.id}
                //   </div>
                //   <h3 className="mt-5 text-base">{data.title}</h3>
                //   <p className="text-xs my-3">{data.concept}</p>
                //   <p className="text-xs mt-3">{data.des}</p>
                // </div>
                <div className="mx-4 p-8 max-w-[340px] h-[337px] rounded bg-white">
                  <div className="w-[40px] h-[40px] rounded-3xl bg-[#4F46E6] flex justify-center items-center text-white">
                    {data.id}
                  </div>
                  <h3 className="mt-5 text-base text-[22px] font-semibold">{data.title}</h3>
                  <p className="text-xs my-3 text-[16px] font-semibold text-[#525252]">{data?.concepts}</p>
                  <p className="text-xs mt-3 text-[16px] leading-6 text-gray-600 font-plus_jakarta_sans">{data.des}</p>
                </div>
              );
            })}
          </Carousel>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Laps;
