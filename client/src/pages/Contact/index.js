/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react"
import toast from "react-hot-toast"

import leftImg from "../../assets/images/connect/leftSlideImage.png"
import { motion } from "framer-motion"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"
import axios from "../../axios"

const Contact = () => {
    const [information, setInformation] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll(".form input")
        var re = /\S+@\S+\.\S+/
        const checkEmail = re.test(information.email)
        console.log(checkEmail)
        if (
            information.firstName.trim() === "" ||
            information.lastName.trim() === "" ||
            information.phoneNumber.trim() === "" ||
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
        } else {
            const { data } = await axios.post("/contact-us", {
                ...information,
                phone: "+" + information.phoneNumber
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
        // <div className="!mx-auto w-[95%]  max-w-7xl">
        <motion.section
            className="py-10  sm:py-16 lg:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="px-4 flex flex-col justify-center sm:px-6 lg:px-8 m-auto w-[100%] lg:w-[auto] max-w-7xl">
                <div className="max-w-5xl w-[100%] mx-auto flex bg-white lg:bg-inherit rounded-xl">
                    <div className="mt-0 w-[100%] overflow-hidden">
                        <div className="w-[100%] mx-auto px-6 py-12 sm:p-12">
                            <h3 className="text-3xl font-semibold text-gray-900">Get in Touch</h3>
                            <p className="text-sm text-[#667085] mt-5">
                                Our Team would love to hear from you and answer any questions for you.
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

                                    <div className="w-full">
                                        <label className="text-base font-medium text-gray-900">Phone number</label>
                                        <div className="mt-2.5 relative form">
                                            <PhoneInput
                                                inputStyle={{
                                                    color: "gray",
                                                    width: "100%",
                                                    height: "100%",
                                                    borderColor: "#E5E7EB"
                                                }}
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

                                    <div>
                                        <label className="text-base font-medium text-gray-900">Email Address</label>
                                        <div className="mt-2.5 relative form">
                                            <input
                                                type="text"
                                                name="email"
                                                id=""
                                                onChange={handleChange}
                                                value={information.email}
                                                placeholder="you@company.com"
                                                className="!ring-0 !outline-0 block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-700 caret-gray-700"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
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
                                                className="font-normal text-gray-900 font-pj"
                                            >
                                                I agree with{" "}
                                                <a
                                                    href="/privacy-policy"
                                                    title=""
                                                    className="font-bold rounded focus:outline-none hover:underline duration-200"
                                                >
                                                    Terms & Conditions
                                                </a>
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
                    <div>
                        <img
                            src={leftImg}
                            className="mt-24 hidden lg:block w-[100%]"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </motion.section>
        // </div>
    )
}

export default Contact
