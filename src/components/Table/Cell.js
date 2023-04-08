import React, { useEffect } from "react"
import { useState } from "react"
import UserWalkTroughModal from "../Modal/UserWalkTroughModal"
import avatar from "../../assets/images/avatar.png"
import Courses from "../Modal/Courses"
import { toast } from "react-hot-toast"
import axios from "../../axios"
import Switch from "react-switch"
const AWS = require("aws-sdk")

//he

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESSTOKEN,
    secretAccessKey: process.env.REACT_APP_AWS_SCRETTOKEN,
    region: process.env.REACT_APP_AWS_REGION
})

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18"
})

const Cell = ({ type, text, userData }) => {
    const [show, setShow] = useState(false)
    const [checked, setChecked] = useState(false)

    const params = {
        UserPoolId: "ap-south-1_rSmTWsYuY",
        Username: userData.email
    }

    const getUserData = async () => {
        await cognitoidentityserviceprovider.adminGetUser(params, (err, data) => {
            if (err == null) {
                if (data?.Enabled) {
                    setChecked(false)
                } else {
                    setChecked(true)
                }
            }
        })
    }
    useEffect(() => {
        getUserData()
    }, [])

    const disableUser = async () => {
        await cognitoidentityserviceprovider.adminDisableUser(params, (err, data) => {
            if (err == null) {
                toast.success("User disabled")
                axios.post("/disable-mail", {
                    email: userData.email,
                    name: userData.userName
                })
                axios
                    .post("/sendMessage", {
                        id: userData.id,
                        tittle: "Account Disabled",
                        name: `Hi ${userData.userName}`,
                        body: "Your account has beed disabled temporarily.",
                        text: "please contact customer support to unlock you account!",
                        link: "https://lakeside-client.vercel.app/contact-us"
                    })
                    .then((data) => {
                        console.log(data)
                    })
            } else {
                toast.error("Something went wrong!")
            }
        })
    }

    const enableUser = async () => {
        await cognitoidentityserviceprovider.adminEnableUser(params, (err, data) => {
            if (err == null) {
                toast.success("User enabled")
                axios.post("/enable-mail", {
                    email: userData.email,
                    name: userData.userName
                })
                axios
                    .post("/sendMessage", {
                        id: userData.id,
                        tittle: "Account Enabled",
                        name: `Hi ${userData.userName}`,
                        body: "Your account has beed Enabled.",
                        text: "If you have any further questions or concerns, please don't hesitate to contact our customer support team",
                        link: "https://lakeside-client.vercel.app/contact-us"
                    })
                    .then((data) => {
                        console.log(data)
                    })
            } else {
                toast.error("Something went wrong!")
            }
        })
    }

    const userStatus = () => {
        if (checked) {
            enableUser()
        } else {
            disableUser()
        }
    }

    const returnCell = () => {
        switch (type) {
            case "text":
                return text
            case "switch":
                return (
                    <Switch
                        checked={checked}
                        className="react-switch"
                        onColor="#4F46E5"
                        onHandleColor="#fff"
                        height={18}
                        width={45}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        onChange={() => {
                            setChecked(!checked)
                            userStatus()
                        }}
                    />
                )
            case "chip":
                return (
                    <div className="px-3  py-1 text-xs font-medium leading-4 text-indigo-1 bg-indigo-200  rounded-full border border-indigo-1 ">
                        {text}
                    </div>
                )
            case "avatar":
                return (
                    <div className="flex items-center">
                        <img
                            className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
                            src={text.img || avatar}
                            alt=""
                        />
                        {`${text.first} ${text.last}`}
                    </div>
                )
            case "button":
                return (
                    <div>
                        <button
                            className="px-3 py-1 text-xs font-medium leading-4 text-indigo-800 bg-indigo-200  rounded-full border border-indigo-800 cursor-pointer "
                            onClick={() => setShow(true)}
                        >
                            {text}
                        </button>
                        <UserWalkTroughModal
                            show={show}
                            setShow={setShow}
                            userData={userData}
                        />
                    </div>
                )
            case "courses":
                return (
                    <div>
                        <button
                            className="px-3 py-1 text-xs font-medium leading-4 text-indigo-800 bg-indigo-200  rounded-full border border-indigo-800 cursor-pointer "
                            onClick={() => setShow(true)}
                        >
                            {text}
                        </button>
                        <Courses
                            show={show}
                            setShow={setShow}
                            user={userData}
                        />
                    </div>
                )
            default:
                return text
        }
    }
    return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{returnCell()}</td>
}

export default Cell
