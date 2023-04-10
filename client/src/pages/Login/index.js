/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserPool, { facebookLogin, googleLogin } from "../../components/UserPool/userPool"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
// ** import custom icons
import { ReactComponent as Logo } from "../../assets/logo/logo.svg"
import { ReactComponent as Facebook } from "../../assets/icons/facebook.svg"
import Google from "../../assets/icons/google.png"
import { login } from "../../redux/slices/auth"
import axios from "../../axios"
import { trackPromise } from "react-promise-tracker"
import { Modal, Button } from "flowbite-react"

// ** import amplify
import { Auth } from "aws-amplify"

/** import redux */
import { useSelector } from "react-redux"
import Spinner from "../../components/spinner/Spinner"
import { Eye, EyeOff } from "react-feather"

const Login = () => {
    let { auth } = useSelector((state) => state.auth)
    const userData = auth?.[0]

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [showPassword, setShowPassword] = useState("password")
    const [loader, setLoader] = useState(false)

    // toggle
    const toggle = () => setShow(!show)

    const socialLogin = () => {
        localStorage.setItem("LOGINDETAILS", "on")
        localStorage.setItem("PLANDETAILS", "on")
        localStorage.setItem("changePass", "false")
    }

    // const userID = JSON.parse(localStorage.getItem("userInfo"));

    const handleSubmit = async () => {
        const user = await new CognitoUser({
            Username: email,
            Pool: UserPool
        })
        const authDetails = await new AuthenticationDetails({
            Username: email,
            Password: password
        })
        user.authenticateUser(authDetails, {
            onSuccess: async (datas) => {
                if (datas?.idToken) {
                    setLoader(true)
                    const { data } = await axios.post("/user/login", {
                        email: email
                    })
                    dispatch(login(data.data))
                    localStorage.setItem("userInfo", JSON.stringify(data.data))
                    console.log(data.data[0].id)
                    const checkingPlan = await axios.post("/user/getParticularUser", {
                        id: data?.data?.[0]?.id
                        // || userData?.id || userID === null ? localStorage.getItem("UserId") : userID[0].id
                    })
                    setLoader(false)
                    if (checkingPlan.data[0].paymentPlan === "") {
                        return navigate("/payment/plan")
                    } else {
                        navigate("/dashboard")
                    }
                } else {
                    toast.error("Something went wrong!")
                }
            },
            onFailure: (err) => {
                setLoader(false)
                if (err.message === "User is not confirmed.") {
                    return toast.error("Account Verification Required")
                }
                if (err.message === "User is disabled.") {
                    return setShow(true)
                }
                return toast.error(err.message)
            }
        })
    }

    return (
        <section className="py-12 sm:py-16">
            {loader && (
                <div className="fixed z-50 w-full top-0 left-0 h-[100vh] flex justify-center items-center bg-[#00000013]">
                    <Spinner />
                </div>
            )}
            <Modal
                show={show}
                onClose={toggle}
            >
                <Modal.Header>
                    <h1 className="text-lg font-medium">Account disabled😓</h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 text-center">
                        <h1 className=" font-extrabold text-4xl">⚠️</h1>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Your account has beed disabled temporarily😞
                            <br />
                            Please contact customer support to unlock you account!
                        </p>
                        <a
                            className="text-[blue] hover:underline"
                            href="https://lakeside-client.vercel.app/contact-us"
                        >
                            customer support
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-end w-full space-x-3 md:space-x-5">
                        <Button onClick={toggle}>OK</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Link
                to="/"
                className="w-auto flex justify-center h-8 mx-auto lg:mx-0 mb-10 md:mb-16"
            >
                <Logo />
            </Link>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative max-w-md mx-auto lg:max-w-lg">
                    <div className="absolute -inset-2">
                        <div
                            className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
                            style={{
                                background:
                                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                            }}
                        ></div>
                    </div>

                    <div className="relative overflow-hidden bg-white shadow-xl rounded-xl">
                        <div className="px-4 py-6 sm:px-8">
                            <div className="sm:flex items-center justify-center flex-col xs:flex-row gap-2 xs:justify-between">
                                <h1 className="text-xl text-center sm:text-start font-bold text-gray-900 font-pj">
                                    Sign in
                                </h1>

                                <p className="text-base text-center sm:text-start font-normal text-gray-900 font-pj">
                                    Don’t have an account?{" "}
                                    <Link to="/steps">
                                        <a
                                            href="#"
                                            title=""
                                            className="sm:inline block text-center sm:text-start font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                        >
                                            Sign Up now
                                        </a>
                                    </Link>
                                </p>
                            </div>

                            <form
                                className="mt-12"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    trackPromise(handleSubmit())
                                }}
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-base font-medium text-gray-900 font-pj">Email</label>
                                        <div className="mt-2.5">
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                name=""
                                                id=""
                                                placeholder="Email address"
                                                className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-medium text-gray-900 font-pj">
                                                Password
                                            </label>

                                            <a
                                                href="/forgot"
                                                title=""
                                                className="text-base font-medium text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                            >
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <div className="mt-2.5 flex relative">
                                            <input
                                                type={showPassword}
                                                onChange={(e) => setPassword(e.target.value)}
                                                name=""
                                                id=""
                                                maxLength={40}
                                                placeholder="Password (min. 8 character)"
                                                className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                            />
                                            {showPassword === "password" ? (
                                                <Eye
                                                    className=" text-gray-500 absolute right-4 top-4 cursor-pointer"
                                                    onClick={() => setShowPassword("text")}
                                                />
                                            ) : (
                                                <EyeOff
                                                    className=" text-gray-500 absolute right-4 top-4 cursor-pointer"
                                                    onClick={() => setShowPassword("password")}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative flex items-center mt-4">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                name="terms"
                                                id="terms"
                                                className=" accent-[red] w-5 h-5  border-gray-300 rounded focus:ring-gray-900"
                                            />
                                        </div>

                                        <div className="ml-3 text-base">
                                            <label
                                                htmlFor="terms"
                                                className="font-normal text-gray-900 font-pj"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* <Link to="/dashboard"> */}
                                <button
                                    type="submit"
                                    className="active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj"
                                >
                                    Sign in
                                </button>
                                {/* </Link> */}
                            </form>

                            <div className="relative mt-9">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                {/* <div className="relative flex justify-center">
                  <span className="px-2 text-base font-normal text-gray-400 font-pj bg-gray-50">
                    OR SIGN UP WITH
                  </span>
                </div> */}
                            </div>

                            {/* <div className="flex gap-5 content-center">
                <button
                  className="active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 font-pj"
                  onClick={() => {
                    socialLogin()
                    Auth.federatedSignIn({ provider: "Google" })
                  }}
                >
                  <img src={Google} alt="google" className="w-7 h-7" />{" "}
                  &nbsp;Google
                </button>
                <button
                  className="active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 font-pj"
                  onClick={() => {
                    socialLogin()
                    Auth.federatedSignIn({ provider: "Facebook" })
                  }}
                >
                  <Facebook />
                  &nbsp;Facebook
                </button>
              </div> */}
                            {/* <div>
                <a className="text-center block mt-3 text-gray-400" href="">
                  Sign in with SS0
                </a>
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login
