import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Check, Copy, LogOut, User } from "react-feather";
import Countdown from "react-countdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import allData from "./LabKnowledge.json";
import { toast } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";

const LabKnowledge = () => {
  const [usernameCopyed, setUsernameCopyStatus] = useState(false);
  const [passwordCopyed, setPasswordCopyStatus] = useState(false);
  const [countDownStatus, setStatus] = useState(false);
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [correctAnswerCount, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [percentage, setPercentage] = useState(60);
  const [viewAnswer, setViewAnswer] = useState(false);
  const [viewStep, setViewStep] = useState(0);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const ref = useRef();
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [countdownTime, setCountDownTime] = useState(Date.now() + 600);
  const [labLink, setLabLink] = useState(Date.now() + 600);

  useEffect(() => {
    if (time) {
      const dates = `${time}:00`;
      let timeArray = dates.split(":");
      let hour = parseInt(timeArray[0]);
      let minute = parseInt(timeArray[1]);
      let seconds = parseInt(timeArray[2]);
      console.log(
        Number(Date.now() + (hour * 60 * 60 + minute * 60 + seconds) * 1000)
      );
      return setCountDownTime(
        Date.now() + (hour * 60 * 60 + minute * 60 + seconds) * 1000
      );
    }
  }, [time]);

  useEffect(() => {
    axios
      .post("/getParticular/lab/data", {
        id,
      })
      .then((data) => {
        if (data.data.success) {
          if (data.data.data?.lab_modules) {
            setData(data.data.data);
            setTitle(data.data.data.name);
            setTime(data.data.data.duration);
            setLabLink(data.data.data.lab_link);
          } else {
            toast.error("Do not have perfect data to show");
            navigate("/dashboard");
          }
        }
      });
  }, [id, time]);

  // useEffect(() => {
  //     if (allData.success) {
  //         setData(allData.data)
  //     }
  // }, [allData])

  useEffect(() => {
    if (data) {
      let list = [];
      for (let i = 0; i < data?.lab_modules?.[0].questions.length; i++) {
        list = [
          ...list,
          {
            question: data?.lab_modules?.[0].questions[i].question,
            id: data?.lab_modules?.[0].questions[i].id,
            answer: "",
            submited: -1,
            correct: -1,
          },
        ];
      }
      setAnswer(list);
    }
  }, [data]);

  useEffect(() => {
    const answerF = document.querySelectorAll(".ansField");
    for (let i = 0; i < answerF.length; i++) {
      answerF[i].checked = false;
    }
  }, [step]);

  useEffect(() => {
    setPercentage(
      (correctAnswerCount / data?.lab_modules?.[0].questions.length) * 100
    );
  }, [correctAnswerCount]);

  //mobile navigation
  const [navigation, setNavigation] = useState("questions");
  const [screenSize, setScreenSize] = useState(window.screen.width);

  window.addEventListener("resize", () => {
    setScreenSize(window.screen.width);
  });

  return (
    <div className="w-full">
      <div
        style={{
          boxShadow:
            "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
        }}
        className="px-5 md:px-20 py-5 min-w-full"
      >
        <div className="flex justify-between">
          {viewAnswer === "viewAnswer" ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                setSubmited("viewAnswer");
              }}
              className="flex items-center"
              href="#"
            >
              <ArrowLeft size={25} />
              <p className="ml-2 font-[600] font-pj">Back to result</p>
            </a>
          ) : (
            <Link className="flex items-center" to="/dashboard">
              <ArrowLeft size={25} />
              <p className="ml-2 font-[600] font-pj">{title}</p>
            </Link>
          )}
          <div>
            <>
              {/* user Profile Name */}
              <div className="flex items-center space-x-6 sm:ml-5">
                <div className="flex items-center justify-end sm:ml-5 flex-col ">
                  <h4 className="mobileView ">{user?.[0]?.userName}</h4>
                  <p className="text-xs text-end ml-auto text-[#A676F7]">
                    {/* {user?.[0].isShowProfile ? user?.[0]?.profileType : null} */}
                  </p>
                </div>

                {/*  user dropdown menu */}
                <Menu
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  placement="left-start"
                >
                  <MenuHandler>
                    <button
                      type="button"
                      className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      <img
                        className="object-cover bg-gray-300 rounded-full w-9 h-9"
                        src={
                          user?.[0]?.profilePic === " "
                            ? "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/4/avatar-male.png"
                            : user?.[0]?.profilePic
                        }
                        alt=""
                      />
                    </button>
                  </MenuHandler>
                  <MenuList className="z-40 mt-11 ml-[20px] p-3 h-auto">
                    <Link to="/dashboard">
                      <MenuItem className="hover:bg-slate-200 duration-200 hover:text-violet-500 py-2 flex gap-2 items-center">
                        <User size={20} />
                        <p className="text-lg">My Account</p>
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}
                      className="hover:bg-slate-200 hover:text-red-500 duration-200 py-2 flex gap-2 items-center"
                    >
                      <LogOut size={20} />
                      <p className="text-lg">Log Out</p>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </>
          </div>
        </div>
        {screenSize <= 1100 && (
          <div className="flex flex-wrap gap-x-3 sm:gap-x-8">
            <li
              onClick={() => setNavigation("questions")}
              className={` ${
                navigation === "questions" &&
                "!bg-[#4F46E5] !border-0 !text-white !cursor-text"
              } cursor-pointer list-none px-4 py-1 rounded-full bg-[#4e46e51f] border border-[#0000003a] text-black text-sm sm:text-base mt-4`}
            >
              Questions
            </li>
            <li
              onClick={() => setNavigation("console")}
              className={`${
                navigation === "console" &&
                "!bg-[#4F46E5] !border-0 !text-white !cursor-text"
              } cursor-pointer list-none px-4 py-1 rounded-full bg-[#4e46e51f] border border-[#0000003a] text-black text-sm sm:text-base mt-4`}
            >
              Console
            </li>
            <li
              onClick={() => setNavigation("lab")}
              className={`${
                navigation === "lab" &&
                "!bg-[#4F46E5] !border-0 !text-white !cursor-text"
              } cursor-pointer list-none px-4 py-1 rounded-full bg-[#4e46e51f] border border-[#0000003a] text-black text-sm sm:text-base mt-4`}
            >
              Lab Module
            </li>
          </div>
        )}
      </div>
      {screenSize > 1100 ? (
        <div div className="lg:w-[95%] 2xl:w-[1700px] mx-auto">
          {/* pc view start */}

          {!submited && (
            <div className="flex px-6">
              {!viewAnswer ? (
                <>
                  <div className="w-[85%] 2xl:w-[75%] flex justify-between pt-7 rounded-lg">
                    <div className="w-[40%] 2xl:w-[30%]">
                      <div
                        style={{
                          boxShadow:
                            "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
                        }}
                        className="flex justify-between rounded-md items-center py-3 px-4"
                      >
                        {!countDownStatus ? (
                          <button
                            type="submit"
                            className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                            onClick={(e) => {
                              ref.current.start();
                              setStatus(true);
                              setStarted(true);
                            }}
                          >
                            Start Lab
                          </button>
                        ) : step === 0 ? (
                          <button
                            type="submit"
                            className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                            onClick={(e) => {
                              ref.current.stop();
                              setStatus(false);
                              setStarted(false);
                            }}
                          >
                            End Lab
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                            onClick={(e) => {
                              ref.current.pause();
                              setStatus(false);
                              setStarted(false);
                            }}
                          >
                            Pause Lab
                          </button>
                        )}
                        <p className="text-2xl">
                          <Countdown
                            date={countdownTime}
                            zeroPadTime={2}
                            autoStart={false}
                            daysInHours={true}
                            ref={ref}
                          />
                        </p>
                      </div>
                      <div
                        style={{
                          boxShadow:
                            "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
                        }}
                        className=" rounded-md py-6 px-4 mt-8"
                      >
                        <p
                          style={{ colo: "rgba(0, 0, 0, 0.9)" }}
                          className="font-pj text-[15px] leading-[20px]"
                        >
                          <span className="font-pj font-[600]">Caution:</span>{" "}
                          Lorem ipsum dolor sit amet consectetur. In imperdiet
                          montes egestas tincidunt gravida facilisis. Sit vitae
                          suspendisse imperdiet nunc. Sit phasellus ultrices
                          urna sit vivamus tellus.
                        </p>
                        <a
                            href={labLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noreferrer"
                          >
                        <button className="my-6 border-[3px] transition-all duration-300 border-[#4F46E5] px-10 hover:border-transparent hover:bg-[#4F46E5] hover:text-white text-[#4F46E5] font-pj font-[500] mx-auto py-2 rounded-md block">
                       
                            Open Console
                        </button>
                          </a>

                        <div className="block">
                          <div className="mt-3">
                            <label className="block text-[14px] !m-0 font-[500]">
                              Username
                            </label>
                            <div className="relative">
                              <input
                                value={"student-18248ktg"}
                                type="text"
                                disabled
                                className="mt-1 w-full rounded-md bg-[#F9FAFC] border-2 border-[#D4D4D8]"
                              />
                              <div className="absolute right-[4px] top-[6px] w-[50px] flex justify-center items-center bg-white border-l-2 border-[#D4D4D8] h-[86%]">
                                {usernameCopyed ? (
                                  <Check size={20} className="text-[green]" />
                                ) : (
                                  <CopyToClipboard
                                    text={"student-18248ktg"}
                                    onCopy={() => setUsernameCopyStatus(true)}
                                  >
                                    <Copy
                                      size={20}
                                      className="cursor-pointer hover:text-[#4F46E5]"
                                    />
                                  </CopyToClipboard>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="block text-[14px] !m-0 font-[500]">
                              Password
                            </label>
                            <div className="relative">
                              <input
                                value={"GGBUI5774"}
                                type="text"
                                disabled
                                className="mt-1 w-full rounded-md bg-[#F9FAFC] border-2 border-[#D4D4D8]"
                              />
                              <div className="absolute right-[4px] top-[6px] w-[50px] flex justify-center items-center bg-white border-l-2 border-[#D4D4D8] h-[85%]">
                                {passwordCopyed ? (
                                  <Check size={20} className="text-[green]" />
                                ) : (
                                  <CopyToClipboard
                                    text={"GGBUI5774"}
                                    onCopy={() => setPasswordCopyStatus(true)}
                                  >
                                    <Copy
                                      size={20}
                                      className="cursor-pointer hover:text-[#4F46E5]"
                                    />
                                  </CopyToClipboard>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[60%] 2xl:w-[70%]">
                      <div className="w-[80%] mx-auto">
                        <h1 className="text-2xl font-[500] mt-3">
                          {data?.lab_modules?.[0]?.moduleHeading}
                        </h1>
                        {step === 0 && (
                          <div className="mt-10">
                            <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                              {data?.lab_modules?.[0]?.moduleDiscription}
                            </p>
                          </div>
                        )}
                        {step != 0 && (
                          <div className="mt-8">
                            <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                              Answer the following questions to reinforce your
                              understanding of the concepts covered so far.
                            </p>
                            <div className="w-full rounded-md bg-[#F9FAFC] px-10 py-5 mt-5">
                              <h3 className="font-[500] font-pj font-lg">
                                {
                                  data?.lab_modules?.[0].questions[step - 1]
                                    .question
                                }
                              </h3>
                              <div className="mt-3">
                                {data?.lab_modules?.[0].questions[
                                  step - 1
                                ]?.choice.map((ques, i) => {
                                  return (
                                    <div className="flex mt-4 items-center">
                                      <input
                                        className="ansField"
                                        onChange={(e) => {
                                          let list = answer;
                                          list[step - 1]["answer"] =
                                            e.target.value;
                                          list[step - 1]["submited"] = i;
                                          setAnswer(list);
                                        }}
                                        value={ques?.correct}
                                        name="ques"
                                        type="radio"
                                      />
                                      <label
                                        style={{ color: "rgba(0, 0, 0, 0.75)" }}
                                        htmlFor=""
                                        className="ml-2"
                                      >
                                        {ques?.value}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                        {started && (
                          <>
                            {step ===
                            data?.lab_modules?.[0].questions.length ? (
                              <div className="flex justify-end mt-10">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();

                                    if (answer[step - 1].answer) {
                                      data?.lab_modules?.[0].questions[
                                        step - 1
                                      ]?.choice.map((data, i) => {
                                        if (data.correct === true) {
                                          let list = answer;
                                          list[step - 1]["correct"] = i;
                                          setAnswer(list);
                                        }
                                      });
                                      if (answer[step - 1].answer === "true") {
                                        setCount(correctAnswerCount + 1);
                                      }
                                      setSubmited(true);
                                    } else {
                                      toast.error(
                                        "You must answer the question!"
                                      );
                                    }
                                  }}
                                  type="submit"
                                  className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end mt-10">
                                <button
                                  type="submit"
                                  className="active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                  onClick={(e) => {
                                    if (step !== 0) {
                                      if (answer[step - 1].answer) {
                                        data?.lab_modules?.[0].questions[
                                          step - 1
                                        ]?.choice.map((data, i) => {
                                          if (data.correct === true) {
                                            let list = answer;
                                            list[step - 1]["correct"] = i;
                                            setAnswer(list);
                                          }
                                        });
                                        if (
                                          answer[step - 1].answer === "true"
                                        ) {
                                          setCount(correctAnswerCount + 1);
                                        }
                                        setStep(step + 1);
                                      } else {
                                        toast.error(
                                          "You must answer the question!"
                                        );
                                      }
                                    } else {
                                      setStep(step + 1);
                                    }
                                  }}
                                >
                                  Next
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[15%] 2xl:w-[25%] border-l-2 min-h-[90vh] pt-10 px-8">
                    <p
                      style={{ color: "rgba(0, 0, 0, 0.75)" }}
                      className={`${
                        step === 0 && "!text-[#4F46E5]"
                      } cursor-pointer`}
                    >
                      Introduction
                    </p>
                    {data?.lab_modules?.[0].questions.map((data, i) => {
                      return (
                        <p
                          style={{ color: "rgba(0, 0, 0, 0.75)" }}
                          className={`${
                            data.id == step && "!text-[#4F46E5]"
                          } mt-2 cursor-pointer`}
                        >
                          Question {i + 1}
                        </p>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[75%] flex justify-between pt-7 rounded-lg">
                    <div className="w-[30%]"></div>
                    <div className="w-[70%]">
                      <div className="w-[80%] mx-auto">
                        <h1 className="text-2xl font-[500] mt-3">
                          {data?.lab_modules?.[0]?.moduleHeading}
                        </h1>

                        <div className="mt-8">
                          <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                            Answer the following questions to reinforce your
                            understanding of the concepts covered so far.
                          </p>
                          <div className="w-full rounded-md bg-[#F9FAFC] px-10 py-5 mt-5">
                            <h3 className="font-[500] font-pj font-lg">
                              {
                                data?.lab_modules?.[0]?.questions[viewStep]
                                  ?.question
                              }
                            </h3>
                            <div className="mt-3">
                              {data?.lab_modules?.[0].questions[
                                viewStep
                              ]?.choice.map((ques, i) => {
                                return (
                                  <div className="flex mt-4 items-center">
                                    <input
                                      checked={
                                        i === answer[viewStep].submited && true
                                      }
                                      className="ansField"
                                      name="ques"
                                      type="radio"
                                    />
                                    <label
                                      htmlFor=""
                                      className={`${
                                        i === answer[viewStep].correct &&
                                        "!text-[#56BA6A]"
                                      } ${
                                        i === answer[viewStep].submited &&
                                        "text-[red]"
                                      } ml-2`}
                                    >
                                      {ques?.value}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center gap-x-20 mt-10">
                          {viewStep != 0 && (
                            <button
                              type="submit"
                              className="active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                              onClick={() => setViewStep(viewStep - 1)}
                            >
                              Back
                            </button>
                          )}
                          {data?.lab_modules?.[0].questions.length - 1 !=
                            viewStep && (
                            <button
                              type="submit"
                              className="active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                              onClick={() => setViewStep(viewStep + 1)}
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[25%] border-l-2 min-h-[90vh] pt-10 px-8">
                    {data?.lab_modules?.[0].questions.map((data, i) => {
                      return (
                        <p
                          style={{ color: "rgba(0, 0, 0, 0.75)" }}
                          className={`${
                            data.id == viewStep + 1 && "!text-[#4F46E5]"
                          } mt-2 cursor-pointer`}
                        >
                          Question {i + 1}
                        </p>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
          {submited === true && (
            <div className="w-full h-[88vh] flex justify-center items-center">
              <div className="w-[400px] flex flex-col justify-center items-center">
                <div
                  style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)" }}
                  className="w-[400px] rounded-md bg-[#F9FAFC] px-10 py-5 mt-5 flex justify-center h-[300px] items-center"
                >
                  <div>
                    <p className="text-xl font-pj font-[500]">Your Score:</p>
                    <p className="text-3xl text-center mt-2 text-[#4F46E5]">
                      {correctAnswerCount}/
                      {data?.lab_modules?.[0].questions.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    setSubmited("viewAnswer");
                  }}
                  type="submit"
                  className="w-[50%] mt-5 active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                >
                  View Result
                </button>
              </div>
            </div>
          )}
          {submited === "viewAnswer" && (
            <div className="w-full h-[88vh] flex justify-center items-center">
              <div className="w-[450px] bg-[#F9FAFC] py-2 flex flex-col items-center">
                <div
                  style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)" }}
                  className="w-[80%] mx-auto py-3 bg-white mt-5"
                >
                  <div className="px-5">
                    <p className="text-[#5E5873] font-[500] font-pj text-base ">
                      Lab Result
                    </p>
                    <div className="w-[50%] my-8 mx-auto">
                      <CircularProgressbar
                        strokeWidth={3}
                        styles={buildStyles({
                          textSize: "16px",
                          pathColor: `rgb(16, 200, 44, ${
                            !percentage ? 0 : percentage / 100
                          })`,
                          textColor: "#5E5873",
                          trailColor: "#ecf0f1",
                          backgroundColor: "#ffffff",
                        })}
                        className="w-[70%] block mx-auto"
                        value={!percentage ? 0 : percentage}
                        text={`${!percentage ? 0 : percentage}%`}
                      />
                    </div>
                  </div>
                  <div className="border-t-2 border-[#EBE9F1] flex justify-between pt-2">
                    <div className="w-[50%] flex flex-col items-center">
                      <p
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        className="text-[15px]"
                      >
                        Total Question
                      </p>
                      <p>{data?.lab_modules?.[0].questions.length}</p>
                    </div>
                    <div className="w-[50%] flex flex-col items-center">
                      <p
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        className="text-[15px]"
                      >
                        Correct Answer
                      </p>
                      <p>{correctAnswerCount}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    setViewAnswer(true);
                    setSubmited(false);
                  }}
                  type="submit"
                  className="w-[50%] my-5 active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                >
                  View Answer
                </button>
              </div>

              {/* pc view end */}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* mobile view start */}
          {navigation === "console" && (
            <div className="w-[90%] sm:w-[60%] md:w-[40%] mb-10 mx-auto">
              <div
                style={{
                  boxShadow:
                    "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
                }}
                className=" rounded-md py-6 px-4 mt-8"
              >
                <p
                  style={{ colo: "rgba(0, 0, 0, 0.9)" }}
                  className="font-pj text-[15px] leading-[20px]"
                >
                  <span className="font-pj font-[600]">Caution:</span> Lorem
                  ipsum dolor sit amet consectetur. In imperdiet montes egestas
                  tincidunt gravida facilisis. Sit vitae suspendisse imperdiet
                  nunc. Sit phasellus ultrices urna sit vivamus tellus.
                </p>
                <button className="my-6 border-[3px] transition-all duration-300 border-[#4F46E5] px-10 hover:border-transparent hover:bg-[#4F46E5] hover:text-white text-[#4F46E5] font-pj font-[500] mx-auto py-2 rounded-md block">
                  Open Console
                </button>

                <div className="block">
                  <div className="mt-3">
                    <label className="block text-[14px] !m-0 font-[500]">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        value={"student-18248ktg"}
                        type="text"
                        disabled
                        className="mt-1 w-full rounded-md bg-[#F9FAFC] border-2 border-[#D4D4D8]"
                      />
                      <div className="absolute right-[4px] top-[6px] w-[50px] flex justify-center items-center bg-white border-l-2 border-[#D4D4D8] h-[86%]">
                        {usernameCopyed ? (
                          <Check size={20} className="text-[green]" />
                        ) : (
                          <CopyToClipboard
                            text={"student-18248ktg"}
                            onCopy={() => setUsernameCopyStatus(true)}
                          >
                            <Copy
                              size={20}
                              className="cursor-pointer hover:text-[#4F46E5]"
                            />
                          </CopyToClipboard>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-[14px] !m-0 font-[500]">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        value={"GGBUI5774"}
                        type="text"
                        disabled
                        className="mt-1 w-full rounded-md bg-[#F9FAFC] border-2 border-[#D4D4D8]"
                      />
                      <div className="absolute right-[4px] top-[6px] w-[50px] flex justify-center items-center bg-white border-l-2 border-[#D4D4D8] h-[85%]">
                        {passwordCopyed ? (
                          <Check size={20} className="text-[green]" />
                        ) : (
                          <CopyToClipboard
                            text={"GGBUI5774"}
                            onCopy={() => setPasswordCopyStatus(true)}
                          >
                            <Copy
                              size={20}
                              className="cursor-pointer hover:text-[#4F46E5]"
                            />
                          </CopyToClipboard>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {navigation === "questions" && (
            <>
              {!submited && (
                <div className="flex px-6 mb-10">
                  {!viewAnswer ? (
                    <>
                      <div className="w-[100%] sm:w-[85%] md:w-[70%] mx-auto flex justify-between pt-7 rounded-lg">
                        <div className="w-[100%] mx-auto">
                          <div
                            style={{
                              boxShadow:
                                "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
                            }}
                            className="flex justify-between rounded-md items-center py-3 px-4"
                          >
                            {!countDownStatus ? (
                              <button
                                type="submit"
                                className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                onClick={(e) => {
                                  ref.current.start();
                                  setStatus(true);
                                  setStarted(true);
                                }}
                              >
                                Start Lab
                              </button>
                            ) : step === 0 ? (
                              <button
                                type="submit"
                                className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                onClick={(e) => {
                                  ref.current.stop();
                                  setStatus(false);
                                  setStarted(false);
                                }}
                              >
                                End Lab
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                onClick={(e) => {
                                  ref.current.pause();
                                  setStatus(false);
                                  setStarted(false);
                                }}
                              >
                                Pause Lab
                              </button>
                            )}
                            <p className="text-2xl">
                              <Countdown
                                date={countdownTime}
                                zeroPadTime={2}
                                autoStart={false}
                                daysInHours={true}
                                ref={ref}
                              />
                            </p>
                          </div>
                          <h1 className="text-2xl font-[500] mt-3">
                            {data?.lab_modules?.[0]?.moduleHeading}
                          </h1>
                          {step === 0 && (
                            <div className="mt-10">
                              <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                                {data?.lab_modules?.[0]?.moduleDiscription}
                              </p>
                            </div>
                          )}
                          {step != 0 && (
                            <div className="mt-8">
                              <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                                Answer the following questions to reinforce your
                                understanding of the concepts covered so far.
                              </p>
                              <div className="w-full rounded-md bg-[#F9FAFC] px-10 py-5 mt-5">
                                <h3 className="font-[500] font-pj font-lg">
                                  {
                                    data?.lab_modules?.[0].questions[step - 1]
                                      .question
                                  }
                                </h3>
                                <div className="mt-3">
                                  {data?.lab_modules?.[0].questions[
                                    step - 1
                                  ]?.choice.map((ques, i) => {
                                    return (
                                      <div className="flex mt-4 items-center">
                                        <input
                                          className="ansField"
                                          onChange={(e) => {
                                            let list = answer;
                                            list[step - 1]["answer"] =
                                              e.target.value;
                                            list[step - 1]["submited"] = i;
                                            setAnswer(list);
                                          }}
                                          value={ques?.correct}
                                          name="ques"
                                          type="radio"
                                        />
                                        <label
                                          style={{
                                            color: "rgba(0, 0, 0, 0.75)",
                                          }}
                                          htmlFor=""
                                          className="ml-2"
                                        >
                                          {ques?.value}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                          {started && (
                            <>
                              {step ===
                              data?.lab_modules?.[0].questions.length ? (
                                <div className="flex justify-end mt-10">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();

                                      if (answer[step - 1].answer) {
                                        data?.lab_modules?.[0].questions[
                                          step - 1
                                        ]?.choice.map((data, i) => {
                                          if (data.correct === true) {
                                            let list = answer;
                                            list[step - 1]["correct"] = i;
                                            setAnswer(list);
                                          }
                                        });
                                        if (
                                          answer[step - 1].answer === "true"
                                        ) {
                                          setCount(correctAnswerCount + 1);
                                        }
                                        setSubmited(true);
                                      } else {
                                        toast.error(
                                          "You must answer the question!"
                                        );
                                      }
                                    }}
                                    type="submit"
                                    className=" active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                  >
                                    Submit
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-end mt-10">
                                  <button
                                    type="submit"
                                    className="active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                    onClick={(e) => {
                                      if (step !== 0) {
                                        if (answer[step - 1].answer) {
                                          data?.lab_modules?.[0].questions[
                                            step - 1
                                          ]?.choice.map((data, i) => {
                                            if (data.correct === true) {
                                              let list = answer;
                                              list[step - 1]["correct"] = i;
                                              setAnswer(list);
                                            }
                                          });
                                          if (
                                            answer[step - 1].answer === "true"
                                          ) {
                                            setCount(correctAnswerCount + 1);
                                          }
                                          setStep(step + 1);
                                        } else {
                                          toast.error(
                                            "You must answer the question!"
                                          );
                                        }
                                      } else {
                                        setStep(step + 1);
                                      }
                                    }}
                                  >
                                    Next
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[100%] sm:w-[85%] md:w-[70%] mx-auto flex justify-between pt-7 rounded-lg">
                        <div className="w-[100%]">
                          <div className="w-[100%] mx-auto">
                            <h1 className="text-2xl font-[500] mt-3">
                              {data?.lab_modules?.[0]?.moduleHeading}
                            </h1>
                            <div className="mt-8">
                              <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                                Answer the following questions to reinforce your
                                understanding of the concepts covered so far.
                              </p>
                              <div className="w-full rounded-md bg-[#F9FAFC] px-10 py-5 mt-5">
                                <h3 className="font-[500] font-pj font-lg">
                                  {
                                    data?.lab_modules?.[0]?.questions[viewStep]
                                      ?.question
                                  }
                                </h3>
                                <div className="mt-3">
                                  {data?.lab_modules?.[0].questions[
                                    viewStep
                                  ]?.choice.map((ques, i) => {
                                    return (
                                      <div className="flex mt-4 items-center">
                                        <input
                                          checked={
                                            i === answer[viewStep].submited &&
                                            true
                                          }
                                          className="ansField"
                                          name="ques"
                                          type="radio"
                                        />
                                        <label
                                          htmlFor=""
                                          className={`${
                                            i === answer[viewStep].correct &&
                                            "!text-[#56BA6A]"
                                          } ${
                                            i === answer[viewStep].submited &&
                                            "text-[red]"
                                          } ml-2`}
                                        >
                                          {ques?.value}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end items-center gap-x-20 mt-10">
                              {viewStep != 0 && (
                                <button
                                  type="submit"
                                  className="active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                  onClick={() => setViewStep(viewStep - 1)}
                                >
                                  Back
                                </button>
                              )}
                              {data?.lab_modules?.[0].questions.length - 1 !=
                                viewStep && (
                                <button
                                  type="submit"
                                  className="active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                                  onClick={() => setViewStep(viewStep + 1)}
                                >
                                  Next
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {submited === true && (
            <div className="w-full h-[88vh] flex justify-center items-center">
              <div className="w-[90%] ms:w-[400px] flex flex-col justify-center items-center">
                <div className="w-[400px] rounded-md bg-[#F9FAFC] px-10 py-5 mt-5 flex justify-center h-[300px] items-center">
                  <div>
                    <p className="text-xl font-pj font-[500]">Your Score:</p>
                    <p className="text-3xl text-center mt-2 text-[#4F46E5]">
                      {correctAnswerCount}/
                      {data?.lab_modules?.[0].questions.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    setSubmited("viewAnswer");
                  }}
                  type="submit"
                  className="w-[50%] mt-5 active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                >
                  View Answer
                </button>
              </div>
            </div>
          )}
          {submited === "viewAnswer" && (
            <div className="w-full h-[88vh] flex justify-center items-center">
              <div className="w-[90%] ms:w-[450px] bg-[#F9FAFC] py-2 flex flex-col items-center">
                <div
                  style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)" }}
                  className="w-[80%] mx-auto py-3 bg-white mt-5"
                >
                  <div className="px-5">
                    <p className="text-[#5E5873] font-[500] font-pj text-base ">
                      Lab Result
                    </p>
                    <div className="w-[50%] my-8 mx-auto">
                      <CircularProgressbar
                        strokeWidth={3}
                        styles={buildStyles({
                          textSize: "16px",
                          pathColor: `rgb(16, 200, 44, ${
                            !percentage ? 0 : percentage / 100
                          })`,
                          textColor: "#5E5873",
                          trailColor: "#ecf0f1",
                          backgroundColor: "#ffffff",
                        })}
                        className="w-[70%] block mx-auto"
                        value={!percentage ? 0 : percentage}
                        text={`${!percentage ? 0 : percentage}%`}
                      />
                    </div>
                  </div>
                  <div className="border-t-2 border-[#EBE9F1] flex justify-between pt-2">
                    <div className="w-[50%] flex flex-col items-center">
                      <p
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        className="text-[15px]"
                      >
                        Total Question
                      </p>
                      <p>{data?.lab_modules?.[0].questions.length}</p>
                    </div>
                    <div className="w-[50%] flex flex-col items-center">
                      <p
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        className="text-[15px]"
                      >
                        Correct Answer
                      </p>
                      <p>{correctAnswerCount}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    setViewAnswer(true);
                    setSubmited(false);
                  }}
                  type="submit"
                  className="w-[50%] my-5 active:scale-95 hover:scale-[1.02] px-6 py-2 text-base text-white transition-all duration-200 bg-[#4F46E5] rounded-lg focus:outline-none font-pj font-normal"
                >
                  View Answer
                </button>
              </div>
            </div>
          )}
          {navigation === "lab" && (
            <>
              {viewAnswer ? (
                <div
                  style={{
                    boxShadow:
                      "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
                  }}
                  className="w-[90%] md:w-[40%] mx-auto !shadow-none md:!shadow md:rounded-lg mb-20 md:mt-10 py-10 px-8"
                >
                  {data?.lab_modules?.[0].questions.map((data, i) => {
                    return (
                      <p
                        style={{ color: "rgba(0, 0, 0, 0.75)" }}
                        className={`${
                          data.id == viewStep + 1 && "!text-[#4F46E5]"
                        } mt-2 cursor-pointer`}
                      >
                        Question {i + 1}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    boxShadow:
                      "0px 0px 7px rgba(24, 39, 75, 0.06), 0px 2px 16px rgba(24, 39, 75, 0.1)",
                  }}
                  className="w-[40%] mx-auto rounded-lg mb-20 mt-10 py-10 px-8"
                >
                  <p
                    style={{ color: "rgba(0, 0, 0, 0.75)" }}
                    className={`${
                      step === 0 && "!text-[#4F46E5]"
                    } cursor-pointer`}
                  >
                    Introduction
                  </p>
                  {data?.lab_modules?.[0].questions.map((data, i) => {
                    return (
                      <p
                        style={{ color: "rgba(0, 0, 0, 0.75)" }}
                        className={`${
                          data.id == step && "!text-[#4F46E5]"
                        } mt-2 cursor-pointer`}
                      >
                        Question {i + 1}
                      </p>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LabKnowledge;
