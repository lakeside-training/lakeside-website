/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../../axios";
import toast from "react-hot-toast";
import UserPool from "../../components/UserPool/userPool";

// ** import custom icons
import Logo from "../../assets/logo/logo.svg";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const STATUS = searchParams.get("status");
  const paymentId = searchParams.get("paymentId");
  const PayerID = searchParams.get("PayerID");
  // const TokenId = searchParams.get("token");
  const steps = JSON.parse(localStorage.getItem("STEPS"));
  const getCourseID = JSON.parse(localStorage.getItem("groupId"));
  const [invoiceData, setInvoiceData] = useState([]);
  localStorage.setItem("paypalpayId", paymentId);
  localStorage.setItem("paypalpayerId", PayerID);
  const [activateButton, setActivateButton] = useState(false);
  const userID = JSON.parse(localStorage.getItem("userInfo"));
  const courseAddStatus = localStorage.getItem("courseStatus");
  const [sendNotification, setSendNotification] = useState(false);
  const registerUser = JSON.parse(localStorage.getItem("registerInfo"));
  const getEmail = localStorage.getItem("EMAILS");

  //new changes

  const Api = async () => {
    if (localStorage.getItem("paymentId") !== null) {
      const { data } = await axios.post("/invoice", {
        id: localStorage.getItem("paymentId"),
      });
      setInvoiceData(data);

      localStorage.setItem("planId", data.planDetailsId);
      let password = "TempPass@123";

      if (data) {
        if (courseAddStatus === "false" || courseAddStatus === false) {
          if (STATUS === "firstLogin") {
            try {
              UserPool.signUp(
                getEmail,
                password,
                [],
                null,
                async (err, datas) => {
                  if (err) {
                    if (err.message === "Account already exists") {
                      return toast.error("Email already exists");
                    }
                    if (
                      err.message ===
                      "Password did not conform with policy: Password not long enough"
                    ) {
                      return toast.error("Use a Strong Password");
                    }
                  }

                  // if (datas.user.username) {
                  const signup = await axios.post("/user/signup", {
                    firstName: registerUser.firstName,
                    lastName: registerUser.lastName,
                    email: getEmail,
                    bio: "",
                    userName: data.customerName,
                    profileType: "",
                    country: "",
                    referalCode: "",
                    phone: registerUser.phone,
                    ispromotion: "",
                    iscourse: "",
                    issecurity: "",
                    ismentor: "",
                    area_of_interest: `${steps.study}`,
                    youself: `${steps.role}`,
                    interest_level: `${steps.stage}`,
                    archive_lakeside_learn: `${steps.archive}`,
                    profilePic: " ",
                  });
                  localStorage.setItem("UserId", signup.data.id);
                  toast.success(`${signup.data.msg}`);
                  localStorage.removeItem("STEPS");
                  const addCourse = await axios.post(
                    "/userCourse/firstCourse",
                    {
                      user_id: signup.data.id,
                      payment_status: data.paymentStatus,
                      payment_id: data.paymentId,
                      groupofCourse: getCourseID,
                      start: "Start",
                    }
                  );
                  localStorage.removeItem("groupId");
                  toast.success(`${addCourse.data.status}`);
                  setActivateButton(true);
                  localStorage.setItem("courseStatus", true);
                  setSendNotification(true);
                  localStorage.removeItem("EMAILS");

                  return;
                }
              );
            } catch (error) {
              return toast.error(error.message);
            }
          } else {
            const courseID = await axios.post("/userCourse/add", {
              user_id:
                userID === null ? localStorage.getItem("UserId") : userID[0].id,
              course_id: localStorage.getItem("courseId"),
              payment_status: data.paymentStatus,
              payment_id: data.paymentId,
              start: "Start",
            });
            toast.success(`${courseID.data.status}`);
            setActivateButton(true);
            localStorage.setItem("courseStatus", true);
            setSendNotification(true);

            return;
          }
        }
      }
    }
  };

  const paypalPay = async () => {
    const paypalpayId = localStorage.getItem("paypalpayId");
    const price = localStorage.getItem("price");

    if (paypalpayId !== null) {
      if (courseAddStatus === "false" || courseAddStatus === false) {
        const { data } = await axios.post("/paypal/success", {
          id: paypalpayId,
          payerid: localStorage.getItem("paypalpayerId"),
          price,
        });
        console.log(data.payer.payer_info.email);

        let password = "TempPass@123";

        if (courseAddStatus === "false" || courseAddStatus === false) {
          if (STATUS === "firstLogin") {
            try {
              UserPool.signUp(
                getEmail,
                password,
                [],
                null,
                async (err, datas) => {
                  if (err) {
                    if (
                      err.message ===
                      "An account with the given email already exists."
                    ) {
                      return toast.error("Email already exists");
                    }
                    if (
                      err.message ===
                      "Password did not conform with policy: Password not long enough"
                    ) {
                      return toast.error("Use a Strong Password");
                    }
                  }

                  // if (datas.user.username) {
                  const signup = await axios.post("/user/signup", {
                    firstName: registerUser.firstName,
                    lastName: registerUser.lastName,
                    email: getEmail,
                    bio: "",
                    userName: data.payer.payer_info.last_name,
                    profileType: "",
                    country: "",
                    referalCode: "",
                    phone: registerUser.phone,
                    ispromotion: "",
                    iscourse: "",
                    issecurity: "",
                    ismentor: "",
                    area_of_interest: `${steps.study}`,
                    youself: `${steps.role}`,
                    interest_level: `${steps.stage}`,
                    archive_lakeside_learn: `${steps.archive}`,
                    profilePic: " ",
                  });
                  localStorage.setItem("UserId", signup.data.id);
                  toast.success(`${signup.data.msg}`);
                  localStorage.removeItem("STEPS");
                  const addCourse = await axios.post(
                    "/userCourse/firstCourse",
                    {
                      user_id: signup.data.id,
                      payment_status: data.state,
                      payment_id: data.id,
                      groupofCourse: getCourseID,
                      start: "Start",
                    }
                  );
                  localStorage.removeItem("groupId");
                  toast.success(`${addCourse.data.status}`);
                  setActivateButton(true);
                  localStorage.setItem("courseStatus", true);
                  setSendNotification(true);
                  localStorage.removeItem("EMAILS");

                  return;
                }
              );
            } catch (error) {
              return toast.error(error.message);
            }
          } else {
            const courseID = await axios.post("/userCourse/add", {
              user_id:
                userID === null ? localStorage.getItem("UserId") : userID[0].id,
              course_id: localStorage.getItem("courseId"),
              payment_status: data.state,
              payment_id: paymentId,
              start: "Start",
            });
            toast.success(`${courseID.data.status}`);
            setActivateButton(true);
            localStorage.setItem("courseStatus", true);
            setSendNotification(true);

            return;
          }
        }
      }
    }
  };

  useEffect(() => {
    Api();
    paypalPay();
  }, []);

  useEffect(() => {
    if (sendNotification) {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      if (userData !== null) {
        axios
          .post("/sendMessage", {
            id: userData[0].id,
            tittle: "Successfully bought the course",
            name: `Hi ${userData?.[0].userName}`,
            body: "Congrats, you have successfully bought a course. Go ahead. ",
            text: "If you have any further questions or concerns, please don't hesitate to contact our customer support team",
            link: "https://lakeside-client.vercel.app/contact-us",
          })
          .then((datas) => {
            return toast.success(`${datas.data.message}`);
          });
      } else {
        axios
          .post("/sendMessage", {
            id: localStorage.getItem("UserId"),
            tittle: "Successfully bought the course",
            name: `Hi ${registerUser.firstName} ${registerUser.lastName}`,
            body: "Congrats, you have successfully bought a course. Go ahead. ",
            text: "If you have any further questions or concerns, please don't hesitate to contact our customer support team",
            link: "https://lakeside-client.vercel.app/contact-us",
          })
          .then((datas) => {
            return toast.success(`${datas.data.message}`);
          });
      }
    }
  }, [sendNotification]);

  return (
    <section className="py-10 bg-white mx-4 md:mx-10 ">
      {/* logo */}
      <div className="flex justify-around items-center gap-5 pb-10">
        {/* go back button */}
        <Link to="/">
          <div className="flex items-center justify-center width-fit cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                className="fill-current text-gray-500"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.41,16.09L10.83,11.5L15.41,6.91L14,5.5L8,11.5L14,17.5L15.41,16.09Z"
              />
            </svg>

            <span className="text-gray-500 font-pj font-bold text-base">
              Go Back
            </span>
          </div>
        </Link>

        <Link to="/">
          <img src={Logo} alt="logo" className="w-32" />
        </Link>
        <div className=" w-1 md:w-24"></div>
      </div>

      <div className="relative max-w-lg mx-auto  mt-10">
        <div className="absolute -inset-2">
          <div
            className="h-full w-[75%] mx-auto rounded-3xl opacity-30 blur-lg filter"
            style={{
              background:
                "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
            }}
          ></div>
        </div>

        {/* card */}
        <div className="w-[350px] h-[334px] relative rounded-[10px] mx-auto bg-white">
          {/* <Link to="/dashboard">
            <div className="w-[286px] h-10">
              <button className="w-[286px] active:scale-95 hover:scale-[1.02] duration-200 h-12 absolute left-[31.5px] top-[261.5px] rounded-[5px] bg-black" />
              <p className="absolute left-[111.38px] top-[271px] text-base font-semibold text-center text-white">
                Go to My Courses
              </p>
            </div>
          </Link> */}

          {STATUS !== "firstLogin" && (
            <>
              {activateButton && (
                <Link to="/dashboard">
                  <div className="w-[286px] h-10">
                    <div className="w-[286px] duration-200 h-12 absolute left-[31.5px] top-[261.5px] rounded-[5px] bg-black">
                      <button
                        type="button"
                        className={` active:scale-95 w-full hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900`}
                      >
                        Go to My Courses
                      </button>
                    </div>
                  </div>
                </Link>
              )}
            </>
          )}

          <div className="flex flex-col justify-start items-center absolute left-[66px] top-[174px] gap-3">
            <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-[#272727]">
              Payment Successful
            </p>

            {STATUS === "firstLogin" && (
              <p className="flex-grow-0 flex-shrink-0 w-[218px] text-base text-center text-[#27272799]">
                Please check your Email for more details
              </p>
            )}
          </div>
          <svg
            width={115}
            height={115}
            viewBox="0 0 115 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[116.07px] top-[32.07px]"
            preserveAspectRatio="none"
          >
            <circle cx="57.5" cy="57.5" r="57.5" fill="#BAFEC1" />
          </svg>
          <svg
            width={83}
            height={82}
            viewBox="0 0 83 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[132.08px] top-[48.08px]"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="41.0456"
              cy="41.0001"
              rx="41.0456"
              ry="41.0001"
              fill="#4AB955"
            />
          </svg>
          <svg
            width={45}
            height={32}
            viewBox="0 0 45 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[152.92px] top-[73.48px]"
            preserveAspectRatio="none"
          >
            <path
              d="M2.49121 16.3027L15.7617 29.5585L42.3027 3.04688"
              stroke="white"
              strokeWidth="4.1372"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
