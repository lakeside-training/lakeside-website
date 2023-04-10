/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../../axios";
import toast  from "react-hot-toast";

// ** import custom icons
import Logo from "../../assets/logo/logo.svg";

const InviteSuccess = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const paymentId = searchParams.get("paymentId");
  const PayerID = searchParams.get("PayerID");
  const TokenId = searchParams.get("token");

  console.log(TokenId);

  localStorage.setItem("paypalpayId", paymentId);
  localStorage.setItem("paypalpayerId", PayerID);

  const userID = JSON.parse(localStorage.getItem("userInfo"));
  // const planStatus = localStorage.getItem("planStatus");

  useEffect(() => {
    const Api = async () => {
      if (localStorage.getItem("paymentId") !== null) {
        const { data } = await axios.post("/invoice", {
          id: localStorage.getItem("paymentId"),
        });
        localStorage.setItem("planId", data.planDetailsId);
        await axios.post("/getPaymentDetails", {
          id: data.paymentId,
          userId:
            userID === null ? localStorage.getItem("UserId") : userID[0].id,
          planId: data.planDetailsId,
          planName: data.planName,
        });

        if (
          data.planName !== "oneTime" &&
          data.planName !== "monthly_payment"
        ) {
          const courseID = await axios.post("/userCourse/add", {
            user_id:
              userID === null ? localStorage.getItem("UserId") : userID[0].id,
            course_id: localStorage.getItem("courseId"),
            payment_status: data.paymentStatus,
            payment_id: data.paymentId,
          });
          return toast.success(`${courseID.data.status}`);
        }
        const datas = await axios.post("/userPlan/one", {
          id: userID === null ? localStorage.getItem("UserId") : userID[0].id,
        });

        if (datas.data.data.length === 0) {
          const datas = await axios.post("/userPlan/add", {
            planName: localStorage.getItem("plan"),
            userId:
              userID === null ? localStorage.getItem("UserId") : userID[0].id,
            payment_status: data.paymentStatus,
            payment_id: data.paymentId,
          });

          return toast.success(`${datas.data}`);
        } else {
          const datas = await axios.post("userPlan/Update", {
            planName: localStorage.getItem("plan"),
            userId:
              userID === null ? localStorage.getItem("UserId") : userID[0].id,
            payment_status: data.paymentStatus,
            payment_id: data.paymentId,
          });

          return toast.success(`${datas.data}`);
        }
      }
    };

    Api();
  }, []);

  useEffect(() => {
    const paypalPay = async () => {
      const paypalpayId = localStorage.getItem("paypalpayId");
      const price = localStorage.getItem("price");
      const planName = localStorage.getItem("planName");

      if (paypalpayId) {
        if (planName === "oneTime") {
          const { data } = await axios.post("/paypal/success", {
            id: paypalpayId,
            payerid: localStorage.getItem("paypalpayerId"),
            price,
          });

          const datas = await axios.post("/userPlan/one", {
            id: userID === null ? localStorage.getItem("UserId") : userID[0].id,
          });
          if (datas.data.data.length === 0) {
            const datas = await axios.post("/userPlan/add", {
              planName: planName,
              userId:
                userID === null ? localStorage.getItem("UserId") : userID[0].id,
              payment_status: data,
              payment_id: paymentId,
            });

            return toast.success(`${datas.data}`);
          } else {
            const datas = await axios.post("userPlan/Update", {
              planName: planName,
              userId:
                userID === null ? localStorage.getItem("UserId") : userID[0].id,
              payment_status: data.paymentStatus,
              payment_id: paymentId,
            });

            return toast.success(`${datas.data}`);
          }
        }

        if (planName === "Subscription") {
          if (TokenId) {
            const { data } = await axios.post("/billingDetails", {
              token: TokenId,
            });
            // return console.log("billingDetails", data);
            const datas = await axios.post("/userPlan/one", {
              id:
                userID === null ? localStorage.getItem("UserId") : userID[0].id,
            });
            if (datas.data.data.length === 0) {
              const datas = await axios.post("/userPlan/add", {
                planName: planName,
                userId:
                  userID === null
                    ? localStorage.getItem("UserId")
                    : userID[0].id,
                payment_status: data.state,
                payment_id: data.id,
              });

              return toast.success(`${datas.data}`);
            } else {
              const datas = await axios.post("userPlan/Update", {
                planName: planName,
                userId:
                  userID === null
                    ? localStorage.getItem("UserId")
                    : userID[0].id,
                payment_status: data.state,
                payment_id: data.id,
              });

              return toast.success(`${datas.data}`);
            }
          }
        }
        const { data } = await axios.post("/paypal/success", {
          id: paypalpayId,
          payerid: localStorage.getItem("paypalpayerId"),
          price,
        });

        const courseID = await axios.post("/userCourse/add", {
          user_id:
            userID === null ? localStorage.getItem("UserId") : userID[0].id,
          course_id: localStorage.getItem("courseId"),
          payment_status: data,
          payment_id: paymentId,
        });
        return toast.success(`${courseID.data.status}`);
      }
    };
    paypalPay();
  }, []);

  return (
    <section className="py-10 bg-white mx-4 md:mx-10 ">
      {/* logo */}
      <div className="flex justify-around items-center gap-5 pb-10">
        {/* go back button */}
        <Link to="/dashboard">
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
          <Link to={name === "subscription" ? "/" : "/dashboard"}>
            <div className="w-[286px] h-10">
              <div className="w-[286px] duration-200 h-12 absolute left-[31.5px] top-[261.5px] rounded-[5px] bg-black">
                <button
                  type="button"
                  className="active:scale-95 w-full hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 "
                >
                 Go to My Account
                </button>
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-start items-center absolute left-[66px] top-[174px] gap-3">
            <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-[#272727]">
            Referral Successful
            </p>
            <p className="flex-grow-0 flex-shrink-0 w-[228px] text-base text-center text-[#272727]">
            Thanks for referring your friend.
            </p>
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

export default InviteSuccess;
