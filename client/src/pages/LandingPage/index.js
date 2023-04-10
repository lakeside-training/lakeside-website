/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
// ** import custom components
import Brands from "../../components/Brands"
import RegisterCard from "../../components/RegisterCard"
import Courses from "../../components/Courses"
import axios from "../../axios"
import toast from "react-hot-toast"
import { Hub, Auth } from "aws-amplify"

// ** page content
import Hero from "./Hero"
import Features from "./Features"
// import Advatages from "./Advatages";
import Testimonial from "./Testimonial"
import Pricing from "./Pricing/Pricing"
import Faq from "./Faq"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { stepClear } from "../../redux/slices/steps"
import { login } from "../../redux/slices/auth"

// ** Motion Imports
import { motion } from "framer-motion"
import { getTokens } from "../../firebase"

// Run this after the sign-in

const LandingPage = () => {
    const [token, setToken] = useState("")

    const getToken = async () => {
        const tok = await getTokens()
        setToken(tok)
    }

    useEffect(() => {
        getToken()
        localStorage.setItem("courseStatus", false)
    }, [])

    useEffect(() => {
        if (token) {
            if (token !== "No registration token available. Request permission to generate one.") {
                console.log(token)
                const userToken = JSON.parse(localStorage.getItem("userInfo"))
                if (userToken !== null) {
                    const id = userToken[0].id
                    axios
                        .post("/save-token", { id, token })
                        .then((data) => {
                            console.log("Saved successfully")
                        })
                        .catch((err) => {
                            toast.error("Please check your internet connection")
                        })
                }
            }
        }
    }, [token])

    useEffect(() => {
        localStorage.removeItem("EMAILS")
    }, [])

    const { steps } = useSelector((state) => state.steps)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const planDetails = localStorage.getItem("PLANDETAILS")
    const logins = localStorage.getItem("LOGINDETAILS")

    async function getUser() {
        try {
            const userData = await Auth.currentAuthenticatedUser()

            const getuserLogin = async () => {
                const { data } = await axios.post("/user/login", {
                    email: userData?.attributes?.email
                })

                console.log(data)
                if (data.data) {
                    dispatch(login(data.data))
                    localStorage.setItem("userInfo", JSON.stringify(data.data))
                }
                return data
            }

            const data = async () => {
                try {
                    const { data } = await axios.post("/user/signup", {
                        firstName: "",
                        lastName: "",
                        email: `${userData?.attributes.email}`,
                        bio: "",
                        userName: `${userData?.attributes.name} `,
                        profileType: "",
                        country: "",
                        referalCode: "",
                        ispromotion: "",
                        iscourse: "",
                        issecurity: "",
                        ismentor: "",
                        isShowProfile: false,
                        area_of_interest: `${steps.study}`,
                        youself: `${steps.role}`,
                        interest_level: `${steps.stage}`,
                        archive_lakeside_learn: `${steps.archive}`,
                        profilePic: `${userData?.attributes.picture}`
                    })

                    if (data.user) {
                        localStorage.setItem("userInfo", JSON.stringify(data.user))
                        dispatch(login(data.user))
                    }

                    localStorage.removeItem("PLANDETAILS")
                    dispatch(stepClear())

                    if (logins === "on") {
                        navigate("/dashboard")
                        return
                    }

                    if (data?.success) {
                        toast.success(data?.msg)
                        return
                    } else {
                        toast.error(data?.msg || data?.error || data?.message)
                    }
                    navigate("/payment/plan")
                    // navigate("/")
                } catch (error) {
                    toast.error(error.message)
                }
            }
            if (planDetails === "on") {
                data()
            }
        } catch (err) {
            console.error(err)
        }
    }
    //listen for sign in + out events, if neither are happening check if user exists
    useEffect(() => {
        Hub.listen("auth", ({ payload }) => {
            if (payload.event === "signIn") {
                return getUser()
            }
            if (payload.event === "signOut") {
                dispatch(login(null))
                return
            }
        })
    }, [])

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Hero />
            <Brands />
            <Features />
            <Courses />
            {/* <Advatages /> */}
            <Testimonial />
            {/* <Pricing /> */}
            <RegisterCard
                title={"Unlock the best interactive learning platform"}
                status={"home"}
            />
            <Faq />
        </motion.div>
    )
}
export default LandingPage
