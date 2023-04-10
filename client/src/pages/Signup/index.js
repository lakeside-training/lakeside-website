/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** import custom icons
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { ReactComponent as Facebook } from "../../assets/icons/facebook.svg";
import Google from "../../assets/icons/google.png";

// ** import images
import register_avatar from "../../assets/images/Testimonial/register-1.svg";

// ** import third-party libraries
import toast from "react-hot-toast";
// import PasswordStrengthBar from "react-password-strength-bar";
import { trackPromise } from "react-promise-tracker";
import { Modal, Button } from "flowbite-react";

// ** import axios
import axios from "../../axios";
// ** import amplify
import { Auth } from "aws-amplify";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
// import { stepClear } from "../../redux/slices/steps";

const Signup = () => {
  localStorage.setItem("planStatus", "false");
  localStorage.setItem("defaultStatus", "false");
  const getEmail = localStorage.getItem("EMAILS");
  localStorage.setItem("courseStatus", false);



  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [show, setShow] = useState(false);
  const { amount } = useSelector((state) => state.amount);
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    if (amount?.length !== 0) {
      let getCourseId = amount.map((i) => i.id)
      localStorage.setItem('groupId', JSON.stringify(getCourseId))
    }

  }, [amount])


  useEffect(() => {
    if (getEmail?.length !== 0 & getEmail !== null) {
      setEmail(getEmail);
    }
  }, []);
  // toggle
  const toggle = () => setShow(!show);

  const plan = () => {
    localStorage.setItem("PLANDETAILS", "on");
  };

  const handleRegister = async (e) => {
    setLoader(true)
    const { data } = await axios.post("/user/email", {
      email,
    });
    setLoader(false)
    if (data.data >= 1) {
      return toast.error("Email already exists");
    }

    if (amount.length === 0) {
      return toast.error("Please Select Any one Course");
    }

    const totalPrice = amount.reduce((sum, item) => sum + parseInt(item.price), 0);

    const datas = await axios.post("/firstPayment", {
      amount: totalPrice,
      name: "First payment",
    });
    if (datas) {
      localStorage.setItem("paymentId", datas.data.id);
      return (window.location = datas.data.url);
    }
  };

  return (
    <section>
      {
        loader && (
          <div className="fixed z-50 w-full top-0 left-0 h-[100vh] flex justify-center items-center bg-[#00000013]">
            <Spinner />
          </div>
        )
      }
      <Modal show={show} onClose={toggle}>
        <Modal.Header>
          <h1 className="text-lg font-medium">Welcome to Lakeside🤗</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-center">
            <h1 className=" font-extrabold text-4xl">⚠️</h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Account created Successfully ✅
              <br />
              Please verify your email address to continue.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full space-x-3 md:space-x-5">
            <Button onClick={toggle}>OK</Button>
          </div>
        </Modal.Footer>
      </Modal>
      <div className="min-h-full  lg:flex  lg:justify-between">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 bg-white sm:px-6 lg:px-20 xl:px-24">
          <div className="flex-1 max-w-sm mx-auto lg:max-w-md">
            <Link to="/" className="flex justify-center lg:justify-start">
              <Logo />
            </Link>
            <h1 className="mt-10 text-3xl font-bold text-center text-gray-900 lg:mt-20 xl:mt-32 sm:text-4xl xl:text-5xl font-pj lg:text-left">
              Get started your 14 days free trial now
            </h1>


            <div className="space-y-4">
              <div>
                <label className="sr-only"> FirstName </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-8 h-8 text-gray-400 -mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M9.23166 3.59668C7.76399 3.59668 6.57422 4.78645 6.57422 6.25412C6.57422 7.72178 7.76399 8.91156 9.23166 8.91156C10.6993 8.91156 11.8891 7.72178 11.8891 6.25412C11.8891 4.78645 10.6993 3.59668 9.23166 3.59668Z"
                        fill="#A1A1AA"
                      />
                      <path
                        d="M6.39767 10.3286C4.93001 10.3286 3.74023 11.5184 3.74023 12.9861V13.8281C3.74023 14.3619 4.12707 14.817 4.65388 14.903C7.68607 15.3981 10.7785 15.3981 13.8107 14.903C14.3375 14.817 14.7243 14.3619 14.7243 13.8281V12.9861C14.7243 11.5184 13.5346 10.3286 12.0669 10.3286H11.8253C11.6946 10.3286 11.5647 10.3493 11.4404 10.3898L10.827 10.5902C9.79076 10.9285 8.67379 10.9285 7.63752 10.5902L7.02417 10.3898C6.89989 10.3493 6.76997 10.3286 6.63923 10.3286H6.39767Z"
                        fill="#A1A1AA"
                      />
                    </svg>
                  </div>

                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    required
                    placeholder="FirstName"
                    className=" block w-full py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only"> LastName </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-8 h-8 text-gray-400 -mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M9.23166 3.59668C7.76399 3.59668 6.57422 4.78645 6.57422 6.25412C6.57422 7.72178 7.76399 8.91156 9.23166 8.91156C10.6993 8.91156 11.8891 7.72178 11.8891 6.25412C11.8891 4.78645 10.6993 3.59668 9.23166 3.59668Z"
                        fill="#A1A1AA"
                      />
                      <path
                        d="M6.39767 10.3286C4.93001 10.3286 3.74023 11.5184 3.74023 12.9861V13.8281C3.74023 14.3619 4.12707 14.817 4.65388 14.903C7.68607 15.3981 10.7785 15.3981 13.8107 14.903C14.3375 14.817 14.7243 14.3619 14.7243 13.8281V12.9861C14.7243 11.5184 13.5346 10.3286 12.0669 10.3286H11.8253C11.6946 10.3286 11.5647 10.3493 11.4404 10.3898L10.827 10.5902C9.79076 10.9285 8.67379 10.9285 7.63752 10.5902L7.02417 10.3898C6.89989 10.3493 6.76997 10.3286 6.63923 10.3286H6.39767Z"
                        fill="#A1A1AA"
                      />
                    </svg>
                  </div>

                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    required
                    placeholder="LastName"
                    className=" block w-full py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only"> Email </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    placeholder="Email"
                    className=" block w-full py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                  />
                </div>
              </div>
              {/* 
                <div>
                  <label className="sr-only">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>

                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name=""
                      id=""
                      title="Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      placeholder="Password (min. 8 characters)"
                      className="block w-full py-4 pl-12 pr-4 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
                    />
                  </div>
                </div> */}
              {/* <PasswordStrengthBar minLength={8} password={password} /> */}
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
                  <Link
                    to="/privacy-policy"
                    className="font-bold rounded focus:outline-none hover:underline duration-200"
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="absolute -inset-2">
                <div
                  className="w-full h-full mx-auto opacity-30 blur-lg filter"
                  style={{
                    background:
                      "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                  }}
                ></div>
              </div>

              <button
                onClick={handleRegister}
                type="submit"
                className="active:scale-95 hover:scale-[1.02]  relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj"
              >
                Register
              </button>
            </div>


            <div className="relative mt-9">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-base font-normal text-gray-400 font-pj bg-gray-50">
                  OR SIGN UP WITH
                </span>
              </div>
            </div>

            {/* <div className="flex gap-x-5 flex-col xs:flex-row content-center">
              <a
                className="active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 font-pj"
                role="button"
                onClick={() =>
                  Auth.federatedSignIn({ provider: "Google" }).then(() => {
                    plan();
                  })
                }
              >
                <img src={Google} alt="google" className="w-7 h-7" />
                &nbsp;Google
              </a>
              <a
                className=" active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 font-pj"
                onClick={() =>
                  Auth.federatedSignIn({ provider: "Facebook" }).then(() => {
                    plan();
                  })
                }
                role="button"
              >
                <Facebook />
                &nbsp;Facebook
              </a>
            </div> */}

            {/* <div className="relative flex justify-center mt-8">
              <a className="px-2 text-base font-normal text-gray-400 font-pj cursor-pointer">
                Sign in with SSO
              </a>
            </div> */}

            <Link to="/login">
              <p className="mt-10 text-base font-normal text-center text-gray-900 lg:mt-20 xl:mt-11 font-pj lg:text-left">
                Already have an account?{"  "}
                <a className="font-bold rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:underline">
                  Login now
                </a>
              </p>
            </Link>
          </div>
        </div>

        <div className="relative grid flex-1 w-full px-4 py-12 overflow-hidden bg-gray-900 lg:max-w-2xl lg:px-20 xl:px-24 sm:px-6 place-items-center">
          <div className="absolute inset-0">
            {/* <img
              className="object-cover object-top w-full h-full scale-150 -rotate-90 opacity-10"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/4/background-pattern.png"
              alt=""
            /> */}
          </div>

          <div className="relative max-w-sm mx-auto -mt-20">
            {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-xl">
              <svg
                className="w-auto h-5 text-white"
                viewBox="0 0 33 23"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M32.0011 4.7203L30.9745 0C23.5828 0.33861 18.459 3.41404 18.459 12.4583V22.8687H31.3725V9.78438H26.4818C26.4819 6.88236 28.3027 5.17551 32.0011 4.7203Z" />
                <path d="M13.5421 4.7203L12.5155 0C5.12386 0.33861 0 3.41413 0 12.4584V22.8687H12.914V9.78438H8.02029C8.02029 6.88236 9.84111 5.17551 13.5421 4.7203Z" />
              </svg>
            </div> */}

            <blockquote className="mt-14">
              <p className="text-2xl font-medium leading-relaxed text-white lg:text-3xl font-pj">
                “Lake Side Learn made my life so simple. After completing a
                course, I upgraded my skills, and I got a new job, which is so
                much better to work with than my old job. I surely recommend
                Lake Side Learn.”
              </p>
            </blockquote>

            <div className="flex items-center mt-12">
              <img
                src={register_avatar}
                alt="Director of Technology, CreativeGIG"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
