/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";

// ** import third party
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ** import custom icons
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
// ** import axios
import Spinner from "../../components/spinner/Spinner"
import { trackPromise } from "react-promise-tracker"
import {useAuth} from "../../hooks/hooks";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [show, setShow] = useState(false)
	const [loader, setLoader] = useState(false)
	const { signIn, isAuthenticated } = useAuth()
	const toggle = () => setShow(!show)

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard", { replace: true })
		}
	}, [isAuthenticated])

	// if (isAuthenticating || isAuthenticated) {
	// 	return <Spinner />
	// }

	const handleSubmit = async () => {
		try {
			const authUser = await signIn({ email: email, password: password })
			// Returns an array of groups
			setLoader(true)
			const groups = authUser.signInUserSession.accessToken.payload["cognito:groups"];
			if (authUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
				console.debug('require new password', authUser.challengeParam);
				toast('You require a new Password')
				localStorage.setItem('unAuthenticatedUser', JSON.stringify(authUser))
				navigate('/reset-password')
				setLoader(false)
			}
			if (groups.includes('lakeside_admin')) {
				navigate("/dashboard")
				setLoader(true)
			} else {
				toast.error("Unauthorized SignIn", {icon: "🚨"})
				// TODO : report metrics
			}
			setLoader(true)
		} catch (error) {
			toast.error(error.message || error.response.data.message, {
				icon: "🚨",
			});
			console.log(error)
		}
		setLoader(false)
	};

	return (
		<section className="py-12 sm:py-16">
			{loader && (
				<div className="fixed z-50 w-full top-0 left-0 h-[100vh] flex justify-center items-center bg-[#00000013]">
					<Spinner />
				</div>
			)}
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
									Admin LogIn
								</h1>
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
										<label className="text-base font-medium text-gray-900 font-pj">
											Password
										</label>

										<div className="mt-2.5">
											<input
												onChange={(e) => setPassword(e.target.value)}
												type="password"
												name=""
												id=""
												placeholder="Password"
												className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
											/>
										</div>

										<a
											href="/forgot"
											title=""
											className="text-base font-medium text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
										>
											Forgot Password?
										</a>
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
									className="flex w-full px-8 py-4 mt-5 text-base font-bold border rounded-xl justify-center placeholder-gray-600 accent-green-500"
								>
									Log In
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
	);
};
export default Login;
