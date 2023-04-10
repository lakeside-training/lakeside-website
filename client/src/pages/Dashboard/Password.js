import React, { useState } from "react"
import UserPool from "../../components/UserPool/userPool"
import toast from "react-hot-toast"

// ** import custom icons
import { ReactComponent as Lock } from "../../assets/icons/lock.svg"
import Spinner from "../../components/spinner/Spinner"
import { Eye, EyeOff } from "react-feather"

const Password = () => {
    const [show, setShow] = useState("password")
    const [show1, setShow1] = useState("password")
    const [show2, setShow2] = useState("password")

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [loader, setLoader] = useState(false)

    const newPass = () => {
        if (password === newPassword) {
            return password
        }
    }

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser()
            if (user) {
                user.getSession(async (err, session) => {
                    setLoader(false)
                    if (err) {
                        toast.error(err.message)
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    const result = {}
                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute
                                        result[Name] = Value
                                    }
                                    resolve(result)
                                }
                            })
                        })
                        resolve({ user, ...session, ...attributes })
                    }
                })
            } else {
                setLoader(false)
                reject()
            }
        })
    }

    const submit = () => {
        getSession().then(({ user }) => {
            user.changePassword(currentPassword, newPass(), (err, result) => {
                if (err) {
                    toast.error("Something went wrong")
                } else {
                    if (result === "SUCCESS") {
                        toast.success("Password updated")
                    }
                }
            })
        })
    }

    const change = () => {
        if (show === "password") {
            return setShow("text")
        } else {
            return setShow("password")
        }
    }

    const change1 = () => {
        if (show1 === "password") {
            return setShow1("text")
        } else {
            return setShow1("password")
        }
    }

    const change2 = () => {
        if (show2 === "password") {
            return setShow2("text")
        } else {
            return setShow2("password")
        }
    }
    return (
        <div className="py-8 bg-white sm:py-12">
            {loader && (
                <div className="fixed z-50 w-full top-0 left-0 h-[100vh] flex justify-center items-center bg-[#00000013]">
                    <Spinner />
                </div>
            )}
            <div className="max-w-xl  md:px-0 pb-10">
                <h2 className="text-lg font-bold text-gray-900 font-pj">Change Password</h2>
                <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                    Fill the details below to change your password
                </p>
            </div>

            <div className="w-full ms:w-[auto] flex justify-start items-start ms:px-8 md:px-0 mt-5 flex-col sm:flex-row gap-4">
                <h2 className="w-[auto] sm:w-[45%] md:w-[25%] text-base font-bold text-gray-900 font-pj">
                    Current Password
                </h2>

                <div className="relative w-full">
                    <div className="w-full">
                        <div className="absolute inset-y-0 right-0 lg:right-[50%] flex items-center pr-4">
                            {show === "password" ? (
                                <Eye
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={change}
                                />
                            ) : (
                                <EyeOff
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={change}
                                />
                            )}
                        </div>

                        <input
                            type={show}
                            name=""
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                            className=" block md:min-w-[400px] w-full lg:w-[50%] py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full ms:w-[auto] flex justify-start items-start ms:px-8 md:px-0 mt-5 flex-col sm:flex-row gap-4 ">
                <h2 className="w-[auto] sm:w-[45%] md:w-[25%] text-base font-bold text-gray-900 font-pj">
                    New Password
                </h2>

                <div className="w-full">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 right-0 lg:right-[50%] flex items-center pr-4 ">
                            {show1 === "password" ? (
                                <Eye
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={change1}
                                />
                            ) : (
                                <EyeOff
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={change1}
                                />
                            )}
                        </div>

                        <input
                            type={show1}
                            name=""
                            id=""
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            className=" block md:min-w-[400px] w-full lg:w-[50%] py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full ms:w-[auto] flex justify-start items-start ms:px-8 md:px-0 mt-5 flex-col sm:flex-row gap-4 ">
                <h2 className="w-[auto] sm:w-[45%] md:w-[25%] text-base font-bold text-gray-900 font-pj">
                    Repeat New Password
                </h2>

                <div className="w-full">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 right-0 lg:right-[50%] flex items-center pr-4">
                            {show2 === "password" ? (
                                <Eye
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={change2}
                                />
                            ) : (
                                <EyeOff
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={change2}
                                />
                            )}
                        </div>

                        <input
                            type={show2}
                            name=""
                            id=""
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Repeat New  Password"
                            className=" block md:min-w-[400px] w-full lg:w-[50%] py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={() => submit()}
                type="button"
                className="active:scale-95 hover:scale-[1.02] px-10 inline-flex mt-5 mx-8 md:mx-0 items-center justify-center  py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
            >
                Save
            </button>
        </div>
    )
}

export default Password
