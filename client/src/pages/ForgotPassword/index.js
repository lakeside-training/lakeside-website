import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PuffLoader } from "react-spinners";
import logo from "../../assets/logo/logo.svg";
import OtpInput from "react-otp-input";
import successImg from "../../assets/success.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import FadeIn from "react-fade-in/lib/FadeIn";

const ForgotPassword = () => {
  const [visible, setVisible] = useState(false);
  const [visibleCon, setVisibleCon] = useState(false);
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(0);
  // const [resendStatus, setResendStatus] = useState(false);
  // const [date, setDate] = useState(Date.now() + 60000);
  const navigate = useNavigate();

  //email
  const [email, setEmail] = useState("");

  //otp
  const [otp, setOtp] = useState("");

  const [resetPass, setPass] = useState({
    newPass: "",
    confirmPass: "",
  });

  const hadleEmail = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { data } = await axios.post("/forgot", { email });
    if (data.success === true) {
      setLoader(false);
      toast.success(`${data.message}`);
      setStep(1);
      return;
    } else {
      setLoader(false);
      toast.error("Email-id not found");
      return
    }
  };

  //handle otp changes
  const handleChange = (otp) => setOtp(otp);

  //count render
  // const countRender = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     // Render a completed state
  //     setResendStatus(true);
  //   } else {
  //     // Render a countdown
  //     return (
  //       <span>
  //         {minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  const handleOtp = (e) => {
    e.preventDefault();

    if (otp.length !== 0) {
      // axios.post('/verify', { email, code: otp })
      //     .then(data => {
      //         console.log(data.data)
      //     })
      //     .catch(err => {
      //         toast.error('Something went wrong')
      //     })
      setStep(2);
    } else {
      toast.error("Enter OTP");
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (resetPass.newPass === resetPass.confirmPass) {
      const { data } = await axios.post("/resetPassword", {
        otp: otp,
        password: resetPass.newPass,
        email: email,
      });

      if (data.success === true) {
        setStep(3);
        toast.success(`${data.message}`);
      } else {
        toast.error("Invalid OTP");
      }
    } else {
      toast.error("Password not Match");
    }
  };

  return (
    <div className="max-h-[100vh] h-screen w-full overflow-hidden py-20">
      <div className="fixed bottom-0 left-0 w-full border-b-[10px] border-[#4F46E5] z-50"></div>
      <div
        style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)" }}
        className="py-5 w-full !z-50 absolute top-0"
      >
        <img className="w-[175px] block mx-auto" src={logo} alt="" />
      </div>
      <FadeIn>
        <section className="bg-[#FAFAFA] !mt-[80px] w-full">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative max-w-md mx-auto lg:max-w-lg">
              <div
                style={{ boxShadow: "0px 0px 61.3082px rgba(0, 0, 0, 0.15)" }}
                className="bg-[white] relative overflow-hidden rounded-[16px]"
              >
                {step === 0 && (
                  <div className="px-4 py-6 sm:px-8">
                    <h1 className="font-bold font-pj text-center text-[#18181B] text-[21px]">
                      Forgot Password
                    </h1>

                    <p className="w-[70%] text-center mx-auto mt-3 text-[#52525B] text-[15px]">
                      Please enter your email address to receive a verification
                      code
                    </p>

                    <form action="" onSubmit={hadleEmail}>
                      <div className="space-y-5 mt-[30px]">
                        <div>
                          <label
                            for=""
                            className="text-[15px] text-[#18181B] font-semibold font-pj"
                          >
                            {" "}
                            Email{" "}
                          </label>
                          <div className="mt-1 flex items-center relative">
                            <input
                              type={"email"}
                              name="email"
                              placeholder="E.g.vignesh@gmail.com"
                              className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-[#A1A1AA] rounded-[10px] focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {!loader ? (
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-8 h-[50px] max-h-[50px] mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-white hover:text-[#1E1E1E] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={`flex items-center justify-center overflow-hidden h-[50px] max-h-[50px] w-full px-8 mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-[#1E1E1E] hover:text-[white] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray`}
                        >
                          <PuffLoader size={60} color="white" className="" />
                        </button>
                      )}
                      <Link
                        to="/login"
                        className="back underline flex items-center justify-center mt-3"
                      >
                        Go back
                      </Link>
                    </form>
                  </div>
                )}

                {step === 1 && (
                  <div className="px-4 py-6 sm:px-8">
                    <h1 className="font-bold font-pj text-center text-[#18181B] text-[21px]">
                      Verify Code
                    </h1>

                    <p className="w-[70%] text-center mx-auto mt-3 text-[#52525B] text-[15px]">
                      Please enter the 6 digit code sent to {email}
                    </p>

                    <form action="">
                      <div className="space-y-5 mt-[30px]">
                        <div>
                          <div className="mb-3 mt-1 flex items-center justify-center relative">
                            <OtpInput
                              value={otp}
                              onChange={handleChange}
                              numInputs={6}
                              inputStyle={"otpInput"}
                            />
                          </div>
                        </div>
                        {/* <p className='text-[14px] text-[#4F46E5] text-center'>Resend code:
                                                    {
                                                        resendStatus ? (
                                                            <a className="underline" onClick={resend} href=""> resend</a>
                                                        ) : (
                                                            (<Countdown
                                                                renderer={countRender}
                                                                date={date}
                                                            />)
                                                        )
                                                    }
                                                </p> */}
                      </div>
                      {!loader ? (
                        <button
                          onClick={handleOtp}
                          type="submit"
                          className="flex items-center justify-center w-full px-8 h-[50px] max-h-[50px] mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-white hover:text-[#1E1E1E] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={`flex items-center justify-center overflow-hidden h-[50px] max-h-[50px] w-full px-8 mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-[#1E1E1E] hover:text-[white] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray`}
                        >
                          <PuffLoader size={60} color="white" className="" />
                        </button>
                      )}
                      <p
                        onClick={() => setStep(0)}
                        className="back underline flex items-center justify-center mt-3 cursor-pointer"
                      >
                        Go back
                      </p>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div className="px-4 py-6 sm:px-8">
                    <h1 className="font-bold font-pj text-center text-[#18181B] text-[21px]">
                      Reset Password
                    </h1>

                    <p className="w-[70%] text-center mx-auto mt-3 text-[#52525B] text-[15px]">
                      Your new password must be different from previously used
                      password{" "}
                    </p>

                    <form onSubmit={handlePassword} action="">
                      <div className="space-y-5 mt-[30px]">
                        <div>
                          <label
                            for=""
                            className="text-[15px] text-[#18181B] font-semibold  font-pj"
                          >
                            {" "}
                            New Password{" "}
                          </label>
                          <div className="mt-1 flex items-center relative">
                            <input
                              required
                              type={visible === false ? "password" : "text"}
                              name="password"
                              placeholder="8 character or more"
                              className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-[#A1A1AA] rounded-[10px] focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              value={resetPass.newPass}
                              onChange={(e) =>
                                setPass({
                                  ...resetPass,
                                  newPass: e.target.value,
                                })
                              }
                            />
                            <p className=" absolute z-50 right-3 ">
                              {visible === false ? (
                                <>
                                  <AiFillEyeInvisible
                                    size={26}
                                    color="gray"
                                    className="cursor-pointer"
                                    onClick={() => setVisible(true)}
                                  />
                                </>
                              ) : (
                                <>
                                  <AiFillEye
                                    size={26}
                                    color="gray"
                                    className="cursor-pointer"
                                    onClick={() => setVisible(false)}
                                  />
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label
                            for=""
                            className="text-[15px] text-[#18181B] font-semibold  font-pj"
                          >
                            {" "}
                            Confirm Password{" "}
                          </label>
                          <div className="mt-1 flex items-center relative">
                            <input
                              required
                              type={visibleCon === false ? "password" : "text"}
                              name="password"
                              placeholder="8 character or more"
                              className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-[#A1A1AA] rounded-[10px] focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              value={resetPass.confirmPass}
                              onChange={(e) =>
                                setPass({
                                  ...resetPass,
                                  confirmPass: e.target.value,
                                })
                              }
                            />
                            <p className=" absolute z-50 right-3 ">
                              {visibleCon === false ? (
                                <>
                                  <AiFillEyeInvisible
                                    size={26}
                                    color="gray"
                                    className="cursor-pointer"
                                    onClick={() => setVisibleCon(true)}
                                  />
                                </>
                              ) : (
                                <>
                                  <AiFillEye
                                    size={26}
                                    color="gray"
                                    className="cursor-pointer"
                                    onClick={() => setVisibleCon(false)}
                                  />
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      {!loader ? (
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-8 h-[50px] max-h-[50px] mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-white hover:text-[#1E1E1E] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
                        >
                          Reset Password
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={`flex items-center justify-center overflow-hidden h-[50px] max-h-[50px] w-full px-8 mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-[#1E1E1E] hover:text-[white] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray`}
                        >
                          <PuffLoader size={60} color="white" className="" />
                        </button>
                      )}
                    </form>
                  </div>
                )}
                {step === 3 && (
                  <div className="px-4 py-6 sm:px-8">
                    <img
                      src={successImg}
                      className="block mx-auto my-5"
                      alt=""
                    />
                    <h1 className="font-bold font-pj text-center text-[#18181B] text-[21px]">
                      Password Updated
                    </h1>

                    <p className="w-[70%] text-center mx-auto mt-3 text-[#52525B] text-[15px]">
                      Your Password has been updated successfully.
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                      }}
                      className="flex items-center justify-center w-full px-8 py-4 mt-5 text-base font-bold text-white transition-all duration-200 bg-[#1E1E1E] border border-transparent hover:border-[#1E1E1E] hover:!bg-white hover:text-[#1E1E1E] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
};

export default ForgotPassword;
