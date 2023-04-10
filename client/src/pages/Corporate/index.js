import React, { useState } from "react"

// ** import svg icons
import checkIco from "../../assets/icons/check-mark.svg"

// ** import gallery images
import galleryImg1 from "../../assets/images/corporate/1.png"
import galleryImg2 from "../../assets/images/corporate/2.png"
import galleryImg3 from "../../assets/images/corporate/3.png"
import galleryImg4 from "../../assets/images/corporate/4.png"
import galleryImg5 from "../../assets/images/corporate/5.png"
import manImg from "../../assets/images/corporate/man-1.png"
import card1 from "../../assets/images/corporate/card-1.png"
import card2 from "../../assets/images/corporate/card-2.png"
import sub_card1 from "../../assets/images/corporate/card1.png"
import sub_card2 from "../../assets/images/corporate/card2.png"
import leftImg from "../../assets/images/corporate/bussines-image.png"
import { Link } from "react-scroll"

// ** import components
import Brands from "../../components/Brands"
// import RegisterCard from "../../components/RegisterCard"
import CorporateCourse from "../../components/CorporateCourse"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"
import axios from "../../axios"

const Corporate = () => {
    // const selectIco = (title) => {
    //   return {
    //     "AWS Certification": code,
    //     "Cloud Computing": cloud,
    //     "Project Management": multiFiles,
    //     "Code Management": layers
    //   }[title]
    // }

    // const courseList = [
    //   {
    //     title: "AWS Certification",
    //     link: "#",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis."
    //   },
    //   {
    //     title: "Cloud Computing",
    //     link: "#",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis."
    //   },
    //   {
    //     title: "Project Management",
    //     link: "#",
    //     content:
    //       "Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis. Norem ipsum dolor sit amet, consectetur adipiscing elit. "
    //   },
    //   {
    //     title: "Code Management",
    //     link: "#",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis."
    //   }
    // ]

    // const [currCourse, setCurrCourse] = useState(0)

    // console.log(currCourse)

    const [information, setInformation] = useState({
        firstName: "",
        lastName: "",
        orgName: "",
        orgLink: "",
        email: "",
        phoneNumber: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll(".form input")
        var re = /\S+@\S+\.\S+/
        const checkEmail = re.test(information.email)
        // regex for url
        var re2 = /^(ftp|http|https):\/\/[^ "]+$/
        const checkUrl = re2.test(information.orgLink)
        // regex for phone number with coutry code
        var re3 = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/
        const checkPhone = re3.test("+" + information.phoneNumber)

        if (
            information.firstName.trim() === "" ||
            information.lastName.trim() === "" ||
            information.phoneNumber.trim() === "" ||
            information.orgName.trim() === "" ||
            information.orgLink.trim() === "" ||
            information.email.trim() === "" ||
            information.message.trim() === ""
        ) {
            for (let i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) {
                    inputs[i].style.borderColor = "red"
                    inputs[i].style.color = "red"
                    inputs[i].classList.add("plsadd")
                } else {
                    inputs[i].style.borderColor = "black"
                    inputs[i].style.color = "black"
                    inputs[i].classList.remove("plsadd")
                }
            }

            const textarea = document.querySelector(".form textarea")
            if (!textarea.value) {
                textarea.style.borderColor = "red"
                textarea.style.color = "red"
                textarea.classList.add("plsadd")
            } else {
                textarea.style.borderColor = "black"
                textarea.style.color = "black"
                textarea.classList.remove("plsadd")
            }
        } else if (!checkEmail) {
            if (inputs[4].name === "email") {
                inputs[4].style.borderColor = "red"
                inputs[4].style.color = "red"
                inputs[4].classList.add("plsadd")
            } else {
                inputs[4].style.borderColor = "black"
                inputs[4].style.color = "black"
                inputs[4].classList.remove("plsadd")
            }
        }
        // else if (!checkUrl) {
        //   if (inputs[3].name === "orgLink") {
        //     inputs[3].style.borderColor = "red"
        //     inputs[3].style.color = "red"
        //     inputs[3].classList.add("plsadd")
        //   }
        // }
        // else if (!checkPhone) {
        //   inputs[5].style.borderColor = "red"
        //   inputs[5].style.color = "red"
        //   inputs[5].classList.add("plsadd")
        // }
        else {
            const { data } = await axios.post("/get-in-touch", {
                firstName: information.firstName,
                lastName: information.lastName,
                organization: information.orgName,
                website: information.orgLink,
                email: information.email,
                phone: "+" + information.phoneNumber,
                message: information.message
            })
            if (data.success) {
                toast.success("Message sent successfully")
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInformation({
            ...information,
            [name]: value
        })

        if (!value) {
            e.target.style.borderColor = "red"
            e.target.style.color = "red"
            e.target.classList.add("plsadd")
        } else {
            e.target.style.borderColor = "black"
            e.target.style.color = "black"
            e.target.classList.remove("plsadd")
        }
    }

    return (
        <>
            <motion.div
                className="!mx-auto w-[95%] px-5 sm:px-14 max-w-7xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <section className="py-10 sm:py-16 lg:py-24">
                    {/* px-4  sm:px-6 lg:px-8  */}
                    <div className="mx-auto max-w-7xl">
                        {/* title */}
                        <div className="sm:max-w-3xl mx-auto text-center mb-10">
                            <h2 className="text-3xl mb-5 font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                                Transform your Corporate learning experience
                            </h2>
                            <p>Improve the skills of your employees while tracking progress</p>
                        </div>

                        {/* subtitle */}
                        <div className="mx-auto flex gap-10 w-fit mb-10 flex-wrap justify-center">
                            <div className="flex justify-center flex-col xs:flex-row  gap-2">
                                <h2 className="text-3xl mb-0 xs:mb-5 font-bold text-center xs:text-start leading-tight text-[#4F46E5] sm:text-4xl lg:text-5xl">
                                    25%
                                </h2>
                                <p className="xs:w-20">More Productivity</p>
                            </div>
                            <div className="flex justify-center flex-col xs:flex-row gap-2">
                                <h2 className="text-center xs:text-start text-3xl mb-0 xs:mb-5 font-bold leading-tight text-[#4F46E5] sm:text-4xl lg:text-5xl">
                                    40%
                                </h2>
                                <p className="text-center xs:text-start xs:w-20">Higher Retention</p>
                            </div>
                            <div className="flex justify-center flex-col xs:flex-row gap-2">
                                <h2 className="text-center xs:text-start text-3xl mb-0 xs:mb-5 font-bold leading-tight text-[#4F46E5] sm:text-4xl lg:text-5xl">
                                    30%
                                </h2>
                                <p className="text-center xs:text-start xs:w-20">Smarter Work</p>
                            </div>
                        </div>

                        {/* gallery */}

                        <div className="grid grid-rows-2 grid-flow-col gap-4 sm:gap-6 md:gap-10">
                            <div className=" group row-span-1 block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl cursor-pointer">
                                <img
                                    alt="gallery"
                                    className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-105 "
                                    src={galleryImg1}
                                />
                            </div>
                            <div className=" group row-span-1 block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl cursor-pointer">
                                <img
                                    alt="gallery"
                                    className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-105 "
                                    src={galleryImg2}
                                />
                            </div>
                            <div className=" group row-span-2 block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl cursor-pointer">
                                <img
                                    alt="gallery"
                                    className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-105 "
                                    src={galleryImg3}
                                />
                            </div>
                            <div className=" group row-span-1 block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl cursor-pointer">
                                <img
                                    alt="gallery"
                                    className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-105 "
                                    src={galleryImg4}
                                />
                            </div>
                            <div className=" group row-span-1 block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl cursor-pointer">
                                <img
                                    alt="gallery"
                                    className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-105 "
                                    src={galleryImg5}
                                />
                            </div>
                        </div>

                        {/* brands */}
                        <Brands />

                        {/* courses */}
                        {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Corporate Courses
            </h2>
            <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
              Train every team at your company
            </p>
          </div> */}
                        {/* <div className="flex overflow-x-scroll pb-10 mt-10">
            <div className="flex flex-nowrap lg:-ml-[1px] gap-10 md:ml-10 px-10">
              {courseList.map((i, index) => {
                return (
                  <div
                    key={index}
                    className="relative inline-flex mt-10 group  rounded-lg shadow-xl shadow-slate-100"
                  >
                    <div className="absolute transitiona-all duration-1000 opacity-0 -inset-px bg-gradient-to-r from-[#44beff37] via-[#ff44ec3a] to-[#ff665e37] rounded-xl blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <div
                      className="transition-all relative  duration-200 min-w-[350px] max-w-[350px] bg-white border-2 border-transparent hover:border-gray-200  rounded-lg cursor-pointer z-20"
                      onClick={() => setCurrCourse(index)}
                    >
                      <div className="py-10 px-9">
                        <img src={selectIco(i.title)} alt={i.title} />
                        <h3 className="mt-8 text-lg font-semibold text-black">
                          {i.title}
                        </h3>
                        <p className="mt-4 text-base text-gray-600">
                          {i.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> */}
                        {/* </div> */}

                        <CorporateCourse />

                        {/* testimonial */}
                        <div className="flex items-center p-0 overflow-hidden justify-center mt-10 mx-auto w-full max-w-7xl">
                            <div className=" bg-[#151515] w-full max-w-7xl text-white mx-auto px-5 md:px-13 pt-5 pb-5 md:pb-0 rounded-lg flex gap-2 md:gap-10 items-center flex-col xl:flex-row sm:justify-center">
                                <div className="relative min-w-[90%] xs:min-w-[300px]">
                                    <div className="absolute transitiona-all duration-200 opacity-30 top-2 right-3 left-14 bottom-1 rounded-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter group-hover:duration-400"></div>
                                    <img
                                        src={manImg}
                                        alt="SHirley Peterts"
                                        className="relative"
                                    />
                                </div>
                                <div className="gap-5 mt-10 sm:mt-5">
                                    <h3 className="text-justify sm:text-start font-sansSerif text-base xs:text-lg sm:text-xl md:px-0 md:text-1xl lg:text-3xl sm:w-[90%] md:max-w-2xl">
                                        “Employee development and investing in our workforce are top priorities for us.
                                        We needed a learning solution that would allow our 4,000+ employees to access
                                        real-world skills and we chose Learn Lake Side over other learning solutions
                                        because of its expert global instructors, relevant course selection, and course
                                        content quality.”
                                    </h3>
                                    <div className="py-6">
                                        <p className="font-pecita text-2xl">SHirley Peterts</p>
                                        <p>Director of Technology, CreativeGIG</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* features card */}

                        <div className=" mx-auto block mt-8 md:mt-12">
                            <div className="flex justify-between md:gap-24 gap-12 flex-wrap ">
                                <div className="relative">
                                    <img
                                        className="object-cover h-auto rounded-2xl bg-slate-700 w-[484px] sm:mx-0"
                                        src={card1}
                                        alt=""
                                    />
                                    <div className="hidden sm:block overflow-hidden absolute top-10 bottom-0 -right-14 md:-right-20 h-72 w-56 bg-white shadow-xl shadow-[rgba(0, 0, 0, 0.12)] rounded-lg">
                                        <img
                                            src={sub_card1}
                                            alt=""
                                            className="w-full h-full object-cover scale-110"
                                        />
                                    </div>
                                </div>

                                <div className="my-auto lg:mr-10">
                                    <h4 className="text-3xl my-5 font-bold text-gray-900">Upskilling to Achieve</h4>
                                    <p className="text-lg text-gray-900 max-w-xs">
                                        Drive digital transformation with highly skilled employees
                                    </p>

                                    <div className="flex flex-col gap-4 my-7  max-w-md">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={checkIco}
                                                alt="check"
                                            />
                                            <p>Create a Smart, Knowledgeable team</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={checkIco}
                                                alt="check"
                                            />
                                            <p>
                                                Easily guide employees to develop the skills needed for your
                                                organization
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={checkIco}
                                                alt="check"
                                            />
                                            <p>
                                                Keep track of progress and recommend other courses based on completion
                                                and career path
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" mx-auto block mt-8 md:mt-12 mb-20">
                            <div className="flex justify-end md:gap-24 gap-12 flex-wrap flex-col-reverse md:flex-row">
                                <div className="my-auto lg:mr-10">
                                    <h4 className="text-3xl my-5 font-bold text-gray-900">Employee Growth</h4>
                                    <p className="text-lg text-gray-900 max-w-sm">
                                        Curate Course based on needs of team/org needs Increase skills proficiency and
                                        durability
                                    </p>

                                    <div className="flex flex-col gap-4 my-7 max-w-md">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={checkIco}
                                                alt="check"
                                            />
                                            <p>Help employees quickly master skills with Guided Projects</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={checkIco}
                                                alt="check"
                                            />
                                            <p>Train teams with engaging content available in multiple formats</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={checkIco}
                                                alt="check"
                                            />
                                            <p>Archive the results better than your competitor.</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="active:scale-95 hover:scale-[1.02] inline-flex items-center justify-center px-12 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                                    >
                                        <Link
                                            to="contact"
                                            smooth={true}
                                            duration={1000}
                                            className={`text-[16px] font-medium transition-all duration-200 rounded hover:text-[#004aad]`}
                                        >
                                            Ger Started
                                        </Link>
                                    </button>
                                </div>
                                <div className="relative">
                                    <img
                                        className="object-cover h-auto rounded-2xl bg-slate-700 w-[484px] sm:mx-0 sm:!ml-9"
                                        src={card2}
                                        alt=""
                                    />
                                    <div className="hidden sm:block overflow-hidden absolute top-10 bottom-0 -left-0 md:-left-0 lg:-left-10 h-72 w-56 bg-white shadow-xl shadow-[rgba(0, 0, 0, 0.12)] rounded-lg">
                                        <img
                                            src={sub_card2}
                                            alt=""
                                            className="w-full h-full object-cover scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* register card */}
                    </div>
                </section>
            </motion.div>
            {/* <RegisterCard
				title={"Upskill all your employees with Learn Lake Side!"}
				inputTitle={"Rquest a demo"}
			/> */}

            <motion.section
                className="py-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div
                    id="contact"
                    className="px-4 flex flex-col -mt-20 justify-center sm:px-6 lg:px-8 m-auto w-[100%] lg:w-[auto]  max-w-7xl"
                >
                    <div className=" w-[100%] mx-auto flex justify-between lg:bg-inherit rounded-xl">
                        <div className="mt-0 w-[100%] overflow-hidden">
                            <div className="w-[100%] mx-auto px-6 py-12 sm:p-12">
                                <h3 className="text-3xl font-semibold text-gray-900">Start your Training Now</h3>
                                <p className="text-sm text-[#667085] mt-5">
                                    Contact us to create a Smart Workforce with Lakeside Learning or create a custom
                                    training plan for your team now.
                                </p>

                                <form
                                    className="!mt-8 !m-0 w-[100%] md:w-[auto] z-30"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 connect">
                                        <div>
                                            <label className="text-base font-medium text-gray-900">First Name</label>
                                            <div className="mt-2.5 relative form">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    id=""
                                                    onChange={handleChange}
                                                    value={information.firstName}
                                                    placeholder="First Name"
                                                    className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-base font-medium text-gray-900">Last Name</label>
                                            <div className="mt-2.5 relative form">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id=""
                                                    onChange={handleChange}
                                                    value={information.lastName}
                                                    placeholder="Last name"
                                                    className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-base font-medium text-gray-900">Organization name</label>
                                        <div className="mt-2.5 relative form">
                                            <input
                                                type="text"
                                                name="orgName"
                                                id=""
                                                onChange={handleChange}
                                                value={information.orgName}
                                                placeholder="Organization name"
                                                className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-base font-medium text-gray-900">
                                            Organization website link
                                        </label>
                                        <div className="mt-2.5 relative form">
                                            <input
                                                type="url"
                                                name="orgLink"
                                                id=""
                                                onChange={handleChange}
                                                value={information.orgLink}
                                                placeholder="Organization.com"
                                                className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-base font-medium text-gray-900">Email Address</label>
                                        <div className="mt-2.5 relative form">
                                            <input
                                                type="text"
                                                name="email"
                                                id=""
                                                onChange={handleChange}
                                                value={information.email}
                                                placeholder="you@organization.com"
                                                className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-base font-medium text-gray-900">Phone number</label>
                                        <div className="mt-2.5 relative form">
                                            <PhoneInput
                                                inputStyle={{
                                                    color: "gray",
                                                    width: "100%",
                                                    maxWidth: "550px",
                                                    borderColor: "#E5E7EB"
                                                }}
                                                name="phoneNumber"
                                                inputClass="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                                country={"us"}
                                                value={information.phoneNumber}
                                                onChange={(phone) =>
                                                    setInformation({
                                                        ...information,
                                                        phoneNumber: phone
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 mt-4">
                                        <label className="text-base font-medium text-gray-900">Message</label>
                                        <div className="mt-2.5 relative form">
                                            <textarea
                                                name="message"
                                                id=""
                                                onChange={handleChange}
                                                value={information.message}
                                                placeholder=""
                                                className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-gray-700 caret-gray-700"
                                                rows="4"
                                            ></textarea>
                                        </div>

                                        <div className="relative flex items-center mt-5">
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="checkbox"
                                                    name="terms"
                                                    id="terms"
                                                    required
                                                    className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                                                />
                                            </div>

                                            <div className="ml-3 text-base">
                                                <label
                                                    htmlFor="terms"
                                                    className="font-normal text-[#667085] font-pj"
                                                >
                                                    You agree to our friendly{" "}
                                                    <a
                                                        href="/privacy-policy"
                                                        title=""
                                                        className=" font-normal rounded focus:outline-none underline hover:underline duration-200"
                                                    >
                                                        privacy policy
                                                    </a>
                                                    .
                                                </label>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <button
                                                type="submit"
                                                // onClick={handleSubmit}
                                                // className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none hover:bg-gray-900 focus:bg-gray-700"
                                                className=" active:scale-95 mt-5 w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none  font-pj "
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="hidden h-full w-[90%] lg:block my-auto">
                            <img
                                src={leftImg}
                                className="mt-24"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}

export default Corporate
