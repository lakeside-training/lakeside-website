/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import axios from "../../axios"
import toast from "react-hot-toast"
import ProfileUpload from "./ProfileUpload"
import { ChevronDown } from "react-feather"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/auth"
import ax from "axios"
import Spinner from "../../components/spinner/Spinner"

const Profile = () => {
    const [popUp, setPopUp] = useState(false)
    const [profileDetails, setProfileDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        userName: "",
        profileType: ""
    })

    const [updateStatus, setUpdateStatus] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const handelPopup = () => setPopUp(!popUp)
    const dispatch = useDispatch()
    const [deleteImage, setDeleteImage] = useState("")
    const [uploadImage, setUploadImage] = useState("")
    const userID = JSON.parse(localStorage.getItem("userInfo"))
    const [uploadStatus, setUploadStatus] = useState("")
    const [profileDropDown, setProfileDropDown] = useState(false)
    const [country, setCountry] = useState([])
    const [isShowProfileType, setIsShowProfileType] = useState(userID?.[0]?.isShowProfile || false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const datas = async () => {
            const { data } = await ax.get("https://restcountries.com/v2/all")
            setCountry(data)
        }
        datas()
    }, [])

    console.log(userID)

    const userTypes = ["Beginner", "Intermediate", "Expert"]

    useEffect(() => {
        const API = async () => {
            setLoader(true)
            const { data } = await axios.post("/user/login", {
                email: userID?.[0].email
            })
            setLoader(false)
            dispatch(login(data.data))
            localStorage.setItem("userInfo", JSON.stringify(data.data))
        }
        API()
    }, [deleteImage, uploadImage, updateStatus, uploadStatus])

    const removeDP = async () => {
        const userID = JSON.parse(localStorage.getItem("userInfo"))

        const { data } = await axios.post("/delete/profile", {
            _id: userID[0].id,
            name: userID[0].profilePic
        })
        setDeleteImage(data)
    }

    const updateDetails = async () => {
        try {
            setLoader(true)
            const { data } = await axios.post("/user/update", {
                _id: userID?.[0].id,
                firstName: profileDetails.firstName,
                lastName: profileDetails.lastName,
                email: profileDetails.email,
                bio: profileDetails.bio,
                userName: profileDetails.userName,
                profileType: profileDetails.profileType,
                isShowProfile: isShowProfileType,
                country: selectedCountry
            })
            setLoader(false)
            toast.success(data)
            setUpdateStatus(data)
        } catch (error) {
            setLoader(false)
            toast.success("Something went wrong!")
        }
    }

    const handelChange = (e) => {
        const { name, value } = e.target
        setProfileDetails((pre) => {
            return { ...pre, [name]: value }
        })
    }
    return (
        <main>
            {loader && (
                <div className="fixed z-50 w-full top-0 left-0 h-[100vh] flex justify-center items-center bg-[#00000013]">
                    <Spinner />
                </div>
            )}
            <div className="mt-6">
                <p className="text-xl font-bold text-gray-900">Profile</p>
                <p className="mt-1 text-sm font-medium text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipis.
                </p>
            </div>

            <div className="max-w-3xl mt-12">
                <div className="space-y-8">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-base font-bold text-gray-900 sm:mt-px sm:pt-2">
                            Profile Photo
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center space-x-6">
                                <img
                                    className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
                                    src={
                                        userID?.[0]?.profilePic === " "
                                            ? "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/4/avatar-male.png"
                                            : userID?.[0]?.profilePic
                                    }
                                    alt=""
                                />
                                <button
                                    onClick={() => removeDP()}
                                    type="button"
                                    className="text-sm font-semibold text-black-600 transition-all duration-200 bg-white rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => handelPopup()}
                                    type="button"
                                    className="text-sm font-semibold text-indigo-600 transition-all duration-200 bg-white rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-base font-bold text-gray-900 sm:mt-px sm:pt-2">
                            First & Last Name
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id=""
                                        placeholder=""
                                        onChange={handelChange}
                                        value={
                                            profileDetails.firstName.length === 0
                                                ? userID?.[0]?.firstName
                                                : profileDetails.firstName
                                        }
                                        className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id=""
                                        placeholder=""
                                        onChange={handelChange}
                                        value={
                                            profileDetails.lastName.length === 0
                                                ? userID?.[0]?.lastName
                                                : profileDetails.lastName
                                        }
                                        className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-base font-bold text-gray-900 sm:mt-px sm:pt-2">
                            Email Address
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <input
                                type="email"
                                name="email"
                                id=""
                                disabled
                                placeholder=""
                                onChange={handelChange}
                                value={profileDetails.email.length === 0 ? userID?.[0]?.email : profileDetails.email}
                                className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-base font-bold text-gray-900 sm:mt-px sm:pt-2">
                            Write Your Bio
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <textarea
                                name="bio"
                                id=""
                                placeholder="Write about you"
                                rows="4"
                                onChange={handelChange}
                                value={profileDetails.bio.length === 0 ? userID?.[0]?.bio : profileDetails.bio}
                                className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                spellCheck="false"
                            ></textarea>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <div className="sm:mt-px sm:pt-2">
                            <label className="block text-base font-bold text-gray-900">Username</label>
                            <p className="mt-1 text-sm font-medium text-gray-500">You can change it later</p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <div className="relative flex">
                                <div className="inline-flex items-center px-3 text-gray-900 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 sm:text-sm">
                                    rareblocks.co/user/
                                </div>

                                <input
                                    type="text"
                                    name="userName"
                                    id=""
                                    placeholder="martin.janiter"
                                    onChange={handelChange}
                                    value={
                                        profileDetails.userName.length === 0
                                            ? userID?.[0]?.userName
                                            : profileDetails.userName
                                    }
                                    className="border flex-1 block w-full min-w-0 px-4 py-3 placeholder-gray-500 border-gray-300 rounded-none rounded-r-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-base font-bold text-gray-900 sm:mt-px sm:pt-2">Profile Type</label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <div className="w-[100%]">
                                <div className="relative">
                                    <button
                                        className="flex justify-between border !bg-white px-4 py-3 rounded-lg cursor-pointer transition ease-in-out w-[100%] hover:bg-gray-100 focus:border-indigo-600"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setProfileDropDown(!profileDropDown)
                                        }}
                                    >
                                        <span>
                                            {userID?.[0]?.profileType === ""
                                                ? "Select Profile Type"
                                                : profileDetails.profileType || userID?.[0]?.profileType}
                                        </span>
                                        <span>
                                            <ChevronDown />
                                        </span>
                                    </button>
                                    {/* Options */}
                                    <div
                                        className={`border rounded z-50 mt-2 absolute w-[100%] bg-white overflow-hidden transition-all ease-in-out shadow-lg focus:ring-indigo-600 ${
                                            !profileDropDown ? "hidden h-0" : "block h-auto"
                                        }`}
                                    >
                                        {userTypes?.map((name, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    handelChange({
                                                        target: {
                                                            name: "profileType",
                                                            value: name
                                                        }
                                                    })
                                                    setProfileDropDown(false)
                                                }}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex items-center mt-2">
                                <div className="flex items-center h-5">
                                    <input
                                        type="checkbox"
                                        name="profile"
                                        id="profile"
                                        className="border w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-black"
                                        onChange={(e) => {
                                            setIsShowProfileType(e.target.checked)
                                        }}
                                        checked={isShowProfileType}
                                    />
                                </div>

                                <div className="ml-3">
                                    <label
                                        htmlFor="profile"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Show this on my profile
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2">Country</label>
                        <div
                            className="mt-2 sm:mt-0 sm:col-span-2"
                            style={{
                                border: "1px solid lightgray",
                                borderRadius: "8px"
                            }}
                        >
                            {userID?.[0]?.country === "" ? (
                                <>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="block w-full py-3 pl-4 pr-10 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                    >
                                        <option value="">Select</option>
                                        {country.map((i, index) => (
                                            <option key={index}>{i.name}</option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <>
                                    <div className="block w-full py-3 pl-4 pr-10 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                        <p>{userID?.[0]?.country}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-12 flex justify-end">
                    <button
                        onClick={updateDetails}
                        type="submit"
                        className="active:scale-95 hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-igray-700"
                    >
                        Update
                    </button>
                </div>
            </div>

            {popUp && (
                <ProfileUpload
                    close={handelPopup}
                    uploads={setUploadImage}
                    uploadStatus={setUploadStatus}
                />
            )}
        </main>
    )
}

export default Profile
