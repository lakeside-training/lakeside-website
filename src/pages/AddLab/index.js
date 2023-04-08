/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// import icons
import { ChevronDown, ChevronLeft, File, Upload, X } from "react-feather";

// import third party
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import date from "date-and-time";
import { TagsInput } from "react-tag-input-component";
import { trackPromise } from "react-promise-tracker";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
// import component
import ImgUpload from "../../components/ImgUpload";

// import axios
import axios from "../../axios";
import LinkIcon from "../../components/Shared/LinkIcon";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  removeModule,
  removeQuestion,
  setModuleValue,
  insertValues,
  insertAnswerValues,
  correctAnswers,
  addModuleHeading,
  addModuleDescription,
  questionEmpty,
  addModuleResourse,
} from "../../redux/slices/lab";
import Spinner from "../../components/spinner/Spinner";

//  cutome accordion icon
function AccordionIcon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const AddLabs = () => {
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const Name = searchParams.get("name");
  const [courseInfoData, setCourseInfoData] = useState({
    name: "",
    lab_type: Name,
    lab_track: "",
    description: "",
    lab_tags: [],
    price: "",
    price_tag: "$",
    discount_price: "",
    duration: "",
    modules: [],
    labUrl: "",
    labIamPolicy: "",
    labServiceRole: "",
    lab_enable: "true",
  });
  const [courseImage, setCourseImage] = useState([]);
  const [courseIcon, SetCourseIcon] = useState([]);
  const { modules } = useSelector((state) => state.lab);
  const [addQuestions, setAddQuestions] = useState([]);
  const [lablink, setLablink] = useState("");
  const [labDiscription, setLabDiscription] = useState("");
  const dispatch = useDispatch();

  // ** track state
  const [showTrack, setShowTrack] = useState(false);
  const [categories, setCategories] = useState([]); // **  accordion state
  const [accordionOpen, setAccordionOpen] = useState(0);
  const [accordionOpen1, setAccordionOpen1] = useState(0);
  const [resource, setResource] = useState([]);
  const [inSideInput, setInSideInput] = useState(false);
  const [inSideInput1, setInSideInput1] = useState(false);
  const [inSideInput2, setInSideInput2] = useState(false);
  const [inSideInput3, setInSideInput3] = useState(false);
  const [loadder, setLoadder] = useState(false);

  console.log(modules);
  useEffect(() => {
    const getAllResources = async () => {
      try {
        let { data } = await axios.get("/resources/get-all", {
          headers: {
            Authorization: userToken,
          },
        });

        data = data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });

        setResource(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllResources();
  }, []);

  useEffect(() => {
    setAddQuestions(modules);
  }, [modules]);

  const handleResourseChnage = (e, id) => {
    dispatch(
      addModuleResourse({
        moduleId: id,
        resourse: e.target.value,
      })
    );
  };

  //lab Question Add

  const removeModules = (i) => {
    dispatch(removeModule({ id: i }));
  };
  const removeQuestions = (mod, ques) => {
    dispatch(removeQuestion({ moduleId: mod, questionId: ques }));
  };

  const insertValue = (mod, ques, value) => {
    dispatch(insertValues({ moduleId: mod, questionId: ques, value: value }));
  };

  const insertAnswerValue = (mod, ques, ans, value) => {
    dispatch(
      insertAnswerValues({
        moduleId: mod,
        questionId: ques,
        answerId: ans,
        value: value,
      })
    );
  };

  const correctAnswer = (mod, ques, ans, value) => {
    dispatch(
      correctAnswers({
        moduleId: mod,
        questionId: ques,
        answerId: ans,
        value: value,
      })
    );
  };

  const addModuleHeadings = (mod, value) => {
    dispatch(
      addModuleHeading({
        moduleId: mod,
        value: value,
      })
    );
  };

  const addModuleDescriptions = (mod, value) => {
    dispatch(
      addModuleDescription({
        moduleId: mod,
        value: value,
      })
    );
  };

  const addValue = () => {
    if (modules.length > 0) {
      const addValues = modules.slice(-1)[0].id;
      let newValue = Number(addValues) + 1;
      return dispatch(
        setModuleValue({
          id: newValue.toString(),
          moduleHeading: "",
          moduleDiscription: "",
          resourse: "",
          questions: [
            {
              id: "1",
              question: "",
              choice: [
                { id: "1", value: "", correct: true },
                { id: "2", value: "", correct: false },
                { id: "3", value: "", correct: false },
                { id: "4", value: "", correct: false },
              ],
            },
          ],
        })
      );
    }
    const addValues = modules?.length;
    let newValue = addValues + 1;
    return dispatch(
      setModuleValue({
        id: newValue.toString(),
        moduleHeading: "",
        moduleDiscription: "",
        resourse: "",
        questions: [
          {
            id: "1",
            question: "",
            choice: [
              { id: "1", value: "", correct: true },
              { id: "2", value: "", correct: false },
              { id: "3", value: "", correct: false },
              { id: "4", value: "", correct: false },
            ],
          },
        ],
      })
    );
  };

  useEffect(() => {
    dispatch(
      setModuleValue({
        id: "1",
        moduleHeading: "",
        moduleDiscription: "",
        resourse: "",
        questions: [
          {
            id: "1",
            question: "",
            choice: [
              { id: "1", value: "", correct: true },
              { id: "2", value: "", correct: false },
              { id: "3", value: "", correct: false },
              { id: "4", value: "", correct: false },
            ],
          },
        ],
      })
    );
  }, []);

  const addQuestion = (i) => {
    const filter = addQuestions.filter((item) => item.id === i);
    const add = filter.map((i) => {
      let count = Number(i.questions.length) + 1;
      return {
        ...i,
        questions: [
          ...i.questions,
          {
            id: count.toString(),
            question: "",
            choice: [
              { id: "1", value: "", correct: true },
              { id: "2", value: "", correct: false },
              { id: "3", value: "", correct: false },
              { id: "4", value: "", correct: false },
            ],
          },
        ],
      };
    });
    return dispatch(
      setModuleValue({
        id: add[0].id,
        moduleHeading: add[0].moduleDiscription,
        moduleDiscription: add[0].moduleHeading,
        questions: add[0].questions,
      })
    );
  };

  // ** tag state
  const [selectTags, setSelectTags] = useState([]);
  // ** module information
  // ** module data
  const [moduleData1, setModuleData1] = useState([
    {
      id: "",
      module_heading: "",
      module_description: "",
      module_question: [],
      resourse: "",
    },
  ]);

  console.log(moduleData1);

  useEffect(() => {
    const data = modules;
    setModuleData1(data);
  }, [modules]);

  useEffect(() => {
    setCourseInfoData({ ...courseInfoData, lab_tags: selectTags });
  }, [selectTags]);

  useEffect(() => {
    const getAllTrack = async () => {
      const { data } = await axios.get("/courseTrack/all", {
        headers: {
          Authorization: userToken,
        },
      });
      setCategories(data.data); // FIXME: uncomment this
    };
    getAllTrack();
  }, [showTrack]);

  // **   handle accordion functions
  const handleAcconOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? -1 : value);
  };
  const handleAcconOpen1 = (value) => {
    setAccordionOpen1(accordionOpen1 === value ? -1 : value);
  };

  // ** handle chapter change (event, chapter index, module index,)

  // handle clear all data
  const handleClear = () => {
    setCourseImage([]);
    SetCourseIcon([]);
    setCourseInfoData({
      name: "",
      lab_type: "",
      lab_track: "",
      description: "",
      lab_tags: [],
      price: "",
      price_tag: "",
      discount_price: "",
      duration: "",
      modules: [],
      labUrl: "",
      labIamPolicy: "",
      labServiceRole: "",
      lab_enable: "",
    });
    setModuleData1([
      {
        id: "",
        module_heading: "",
        module_description: "",
        module_question: [],
        resourse: "",
      },
    ]);

    setSelectTags([]);
    dispatch(questionEmpty());
  };

  const handleSubmit = async () => {
    setLoadder(true);

    let labData;

    if (courseImage.length !== 0 && courseIcon !== 0) {
      labData = {
        ...courseInfoData,
        lab_link: " ",
        lab_description: labDiscription,
        lab_image: {
          data_url: courseImage[0]?.data_url,
          type: courseImage[0]?.file.type.split("/")[1],
        },
        lab_icon: {
          data_url: courseIcon[0]?.data_url,
          type: courseIcon[0]?.file.type.split("/")[1],
        },
        lab_modules: moduleData1,

        pk: `${courseInfoData.name}_${courseInfoData.lab_track}`,
      };
    }

    if (modules.length === 0) {
      toast("Please add one module", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    }

    if (courseImage.length === 0) {
      toast("Please upload Lab image", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else if (courseIcon.length === 0) {
      toast("Please upload Lab icon", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else if (courseInfoData.lab_track.length === 0) {
      toast("Please select Lab track", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else if (selectTags.length === 0) {
      toast("Please select Lab tags", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else {
      for (const singalObject in courseInfoData) {
        if (!courseInfoData[singalObject]) {
          toast(`Please select ${singalObject}`, {
            icon: "⚠️",
          });
          setLoadder(false);

          return 0;
        }
      }
      const { data } = await axios.post(
        "/lab/add",
        {
          labData,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.status);
        axios
          .post("/sendNotificationToMultipleUser", {
            tittle: `Added ${courseInfoData.name} new Lab`,
            body: `Added a Lab. Go ahead and check the Lab details.`,
            text: "If you have any further questions or concerns, please don't hesitate to contact our customer support team",
            link: "https://lakeside-client.vercel.app/contact-us",
          })
          .then((data) => {});
        handleClear();
        setLoadder(false);

        navigate("/lab");
        return;
      } else {
        setLoadder(false);

        toast.error(data.status);
        return;
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        trackPromise(handleSubmit());
      }}
      className="sm:flex-col justify-center col ml-auto mx-auto items-center px-[20px] ms:px-[50px]"
    >
      <div>
        <div>
          <Link to="/lab" className="lg:block hidden">
            <button className="active:scale-95 hover:scale-[1.02] transition-all duration-200 flex items-center px-4 py-3 text-sm font-medium rounded-lg group bg-gray-100 text-black absolute top-[0px] lg:top-[0] left-[50px] lg:left-[auto] lg:sticky">
              <div className="transition-all duration-200 transform group-hover:-translate-x-1 ">
                <ChevronLeft size={16} />
              </div>
              Back to Lab
            </button>
          </Link>
          <h2 className="block lg:hidden text:xl lg:text-2xl font-bold absolute top-[10px] lg:top-[0] left-[60px] lg:left-[auto] lg:sticky">
            Add New Labs
          </h2>
          <h2 className="lg:block hidden mt-[35px] text:xl lg:text-2xl font-bold ">
            Add New Labs
          </h2>

          <div className=" w-[100%] lg:w-[60%] mt-10 border-b pb-10">
            <div className="w-[100%] xs:flex justify-between items-center">
              <div>
                <p className="text-md font-medium">Lab Image</p>
              </div>
              <div className="w-[100%] xs:w-[60%] flex items-center xs:mt-0 mt-4 space-x-6">
                <ImgUpload
                  images={courseImage}
                  setImages={setCourseImage}
                  size={12}
                />
              </div>
            </div>

            <div className="w-[100%] xs:flex justify-between mt-8 items-center">
              <div>
                <p className="text-md font-medium">Lab Icon</p>
              </div>
              <div className="w-[100%] xs:w-[60%] flex items-center xs:mt-0 mt-4 space-x-6">
                <ImgUpload
                  images={courseIcon}
                  setImages={SetCourseIcon}
                  size={12}
                />
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="text-md font-medium">Title</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <input
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Title"
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
            </div>

            {/* <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Type</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <div className="flex px-4 py-3 w-[100%] items-center border rounded-lg bg-white">
                  <div className="d-flex justify-center items-center">
                    <input
                      onChange={(e) => {
                        setCourseInfoData({
                          ...courseInfoData,
                          lab_type: e.target.value,
                        });
                      }}
                      value="Lab"
                      checked={courseInfoData?.lab_type === "Lab"}
                      name="type"
                      type="radio"
                    />
                    <label className="ml-2" htmlFor="">
                      Lab
                    </label>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="text-md font-medium">labUrl</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <input
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      labUrl: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="labUrl"
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="text-md font-medium">Lab Iam Policy</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <input
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      labIamPolicy: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Lab Iam Policy"
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="text-md font-medium">Lab ServiceRole</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <input
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      labServiceRole: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Course Name"
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Track</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <div className="relative">
                  <button
                    className="flex justify-between border !bg-white px-4 py-3 rounded-lg cursor-pointer transition ease-in-out w-[100%] hover:bg-gray-100 focus:border-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTrack(!showTrack);
                    }}
                  >
                    <span>
                      {courseInfoData.lab_track === ""
                        ? "Select Lab Track"
                        : courseInfoData.lab_track}
                    </span>
                    <span>
                      <ChevronDown />
                    </span>
                  </button>
                  {/* Options */}
                  <div
                    className={`border rounded mt-2 absolute w-[100%] bg-white overflow-hidden transition-all ease-in-out shadow-lg focus:ring-indigo-600 ${
                      !showTrack ? "hidden h-0" : "block h-auto"
                    }`}
                  >
                    {categories?.map((track, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setCourseInfoData({
                            ...courseInfoData,
                            lab_track: track.track_name,
                          });
                          setShowTrack(false);
                        }}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {track.track_name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Description</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <textarea
                    name=""
                    id=""
                    required
                    placeholder="Add Lab Description"
                    onChange={(e) => {
                      setCourseInfoData({
                        ...courseInfoData,
                        description: e.target.value,
                      });
                    }}
                    rows="4"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    spellCheck="false"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Tag</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2">
                <TagsInput
                  value={selectTags}
                  onChange={setSelectTags}
                  required
                  name="fruits"
                  placeHolder="add tag"
                />
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Original Price</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2 relative ">
                <input
                  type="text"
                  required
                  name=""
                  id=""
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      price: e.target.value,
                    });
                    setInSideInput2(true);
                  }}
                  min={0}
                  placeholder="Original Price"
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
                {inSideInput2 && (
                  <p className=" absolute right-6 top-[11px]">$</p>
                )}
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Discount Price</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2 relative">
                <input
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      discount_price: e.target.value,
                    });
                    setInSideInput1(true);
                  }}
                  type="text"
                  required
                  name=""
                  id=""
                  min={0}
                  placeholder="Discount Price"
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  value={
                    courseInfoData.discount_price === null ||
                    courseInfoData.discount_price === 0
                      ? ""
                      : courseInfoData.discount_price
                  }
                />
                {inSideInput1 && (
                  <p className=" absolute right-6 top-[11px]">$</p>
                )}
              </div>
            </div>

            <div className="w-[100%] md:flex md:justify-between mt-8">
              <div>
                <p className="mt-2 text-md font-medium">Duration</p>
              </div>
              <div className="w-full md:w-[60%] md:mt-0 mt-2 relative">
                <input
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      duration: e.target.value,
                    });
                    setInSideInput3(true);
                  }}
                  type="time"
                  name=""
                  id=""
                  min={0}
                  placeholder="12 hours"
                  required
                  className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  value={
                    courseInfoData.duration === null ||
                    courseInfoData.duration === 0
                      ? ""
                      : courseInfoData.duration
                  }
                />
                {inSideInput3 && (
                  <p className="absolute right-12 top-[11px]">hours</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add module */}

        <div className=" w-[100%] lg:w-[60%] mt-10">
          <div className="w-[100%] flex items-center justify-between mt-8">
            <p className="text-md font-medium">Lab Modules</p>
            <p
              onClick={() => {
                addValue();
              }}
              className="px-4 py-2  text-[#4F46E5] text-md font-bold flex gap-2 items-center cursor-pointer"
            >
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0001 18.8332V11.4998M11.0001 11.4998V4.1665M11.0001 11.4998H18.3334M11.0001 11.4998H3.66675"
                  stroke="#4F46E5"
                  stroke-width="2"
                  strokeLinecap="round"
                />
              </svg>
              Add Module
            </p>
          </div>
          <div className="!z-10 w-[100%] flex flex-col items-center justify-between mt-5 border rounded-lg py-2 px-5">
            {/* Module */}
            <Fragment>
              <div className="w-full">
                {courseInfoData.lab_type === "Lab" && (
                  <div className="w-[98%] mx-auto mt-3  block ">
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col w-full">
                        {/* <label className="text-sm font-semibold" htmlFor="">
                          Console Link
                        </label>

                        <input
                          onChange={(e) => {
                            setLablink(e.target.value);
                          }}
                          type="url"
                          name="lab_link"
                          id=""
                          placeholder="Enter Lab Link"
                          required
                          className="border mt-2 block w-full px-4 py-3 text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                        /> */}

                        {/* <div className="w-full mt-5">
                          <div>
                            <label className="text-sm font-semibold" htmlFor="">
                              Introduction
                            </label>

                            <textarea
                              name="introduction"
                              id=""
                              placeholder="Enter lab introduction"
                              rows="4"
                              className="mt-2 border font-normal text-md block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                              spellCheck="false"
                              onChange={(e) => {
                                setLabDiscription(e.target.value);
                              }}
                              required
                            ></textarea>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {modules?.map((i, index) => (
                <Accordion
                  key={i.id}
                  open={accordionOpen === i.id}
                  icon={<AccordionIcon id={i.id} open={accordionOpen} />}
                >
                  <AccordionHeader
                    onClick={() => handleAcconOpen(i.id)}
                    className="text-md"
                  >
                    <div className="flex justify-between w-full">
                      <div className="flex items-center ">
                        <span>Module {index + 1} </span>
                      </div>
                      <div>
                        <a
                          className="text-[#FF4F4F] text-sm mr-6"
                          onClick={(e) => {
                            e.preventDefault();
                            removeModules(i.id);
                          }}
                          href="AddLab"
                        >
                          Delete Module {index + 1}
                        </a>
                      </div>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className=" overflow-y-auto h-[500px]">
                    <div className="w-[98%] mx-auto mt-3  block ">
                      <div className="mt-4">
                        <label className=" font-semibold">Resourse</label>

                        <div className="relative mx-1 mt-2">
                          <ReactSelect
                            name="resource"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                color: state.isSelected ? "#FC916A" : "black",
                                background: state.isSelected
                                  ? "#fc916a3a"
                                  : "white",
                                padding: 6,
                                paddingLeft: 30,
                                borderRadius: "7px",
                              }),
                            }}
                            options={resource}
                            placeholder="Select Search"
                            onChange={(e) => {
                              e = {
                                target: {
                                  value: e.value,
                                  name: "resource",
                                },
                              };
                              handleResourseChnage(e, i.id);
                            }}
                            // defaultValue={() => {
                            //   return resource.find((data) => {
                            //     return data.value === id.resource;
                            //   });
                            // }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 absolute top-[15px] text-gray-500 left-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="w-full mt-5">
                        <div>
                          <div className="flex items-center justify-between ">
                            <label className="text-sm font-semibold" htmlFor="">
                              Module {index + 1} heading
                            </label>
                          </div>
                          <input
                            onChange={(e) => {
                              addModuleHeadings(i.id, e.target.value);
                            }}
                            type="text"
                            name="lab_link"
                            id=""
                            placeholder={`Entet Module ${index + 1} Heading`}
                            required
                            className="border mt-2 block w-full px-4 py-3 text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                          />
                        </div>
                      </div>

                      <div className="w-full mt-5">
                        <div>
                          <label className="text-sm font-semibold" htmlFor="">
                            Description
                          </label>

                          <textarea
                            name="description"
                            id=""
                            placeholder={`Enter Module ${
                              index + 1
                            } Description`}
                            rows="4"
                            className="mt-2 border font-normal text-md block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                            spellCheck="false"
                            onChange={(e) => {
                              addModuleDescriptions(i.id, e.target.value);
                            }}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className=" flex items-center justify-between mt-6">
                        <div>
                          <p className=" font-semibold text-base">Questions</p>
                        </div>

                        <div>
                          <a
                            className="flex items-center ml-8 text-[#4F46E5] text-base font-bold cursor-pointer"
                            onClick={() => addQuestion(i.id)}
                          >
                            <svg
                              className="mx-2"
                              width="22"
                              height="23"
                              viewBox="0 0 22 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.0001 18.8332V11.4998M11.0001 11.4998V4.1665M11.0001 11.4998H18.3334M11.0001 11.4998H3.66675"
                                stroke="#4F46E5"
                                stroke-width="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            Add Question
                          </a>
                        </div>
                      </div>

                      {i.questions !== undefined &&
                        i?.questions.map((item, index) => {
                          return (
                            <>
                              <Accordion
                                key={item.id}
                                open={accordionOpen1 === item.id}
                                icon={
                                  <AccordionIcon
                                    id={item.id}
                                    open={accordionOpen1}
                                  />
                                }
                              >
                                <AccordionHeader
                                  onClick={() => handleAcconOpen1(item.id)}
                                  className="text-md flex items-center mt-5"
                                >
                                  <div className="w-full">
                                    <div className="flex justify-between items-center">
                                      <label
                                        className="text-sm font-semibold"
                                        htmlFor=""
                                      >
                                        Question {index + 1}
                                      </label>
                                      <a
                                        className="text-[#FF4F4F] text-sm font-bold mr-6"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeQuestions(i.id, item.id);
                                        }}
                                        href="AddLab"
                                      >
                                        Delete Question {index + 1}
                                      </a>
                                    </div>
                                  </div>
                                </AccordionHeader>
                                <AccordionBody
                                  style={{
                                    height: "280px",
                                  }}
                                  className="h-[300px] overflow-auto"
                                >
                                  <input
                                    onChange={(e) => {
                                      insertValue(
                                        i.id,
                                        item.id,
                                        e.target.value
                                      );
                                    }}
                                    value={item.question}
                                    type="text"
                                    name="question"
                                    id=""
                                    placeholder={`Enter your question ${
                                      index + 1
                                    }`}
                                    required
                                    className="border block w-full px-4 py-3 mt-6 text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                                  />

                                  <div className="mt-5">
                                    <div className=" grid grid-cols-2 gap-6 mx-6 ">
                                      {item?.choice.map((choice) => (
                                        <div
                                          key={choice.id}
                                          className="w-[100%] border-2 flex items-center cursor-pointer border-gray-200 py-1 pl-3 pr-1 rounded-lg mx-3"
                                        >
                                          <input
                                            onClick={() => {
                                              correctAnswer(
                                                i.id,
                                                item.id,
                                                choice.id,
                                                choice.correct === true
                                                  ? false
                                                  : true
                                              );
                                            }}
                                            checked={choice.correct}
                                            type="checkbox"
                                            className="mx-3 w-[25px] h-[25px] rounded-lg"
                                          />

                                          <input
                                            onChange={(e) =>
                                              insertAnswerValue(
                                                i.id,
                                                item.id,
                                                choice.id,
                                                e.target.value
                                              )
                                            }
                                            placeholder={`Option`}
                                            value={choice.value}
                                            className=" outline-none border-none py-3 w-full text-base"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </AccordionBody>
                              </Accordion>
                            </>
                          );
                        })}
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
            </Fragment>
          </div>
        </div>

        <div className="w-full lg:w-[80%] flex items-center justify-between  mt-14 ">
          <div className="w-full items-center flex ">
            <div className="-mt-2">
              <label className="mx-3 font-semibold text-lg">Lab Status :</label>
            </div>
            <div>
              <Switch
                // id={item.id}
                checked={courseInfoData.lab_enable === "true" ? true : false}
                className="react-switch"
                onColor="#4F46E5"
                onHandleColor="#fff"
                height={20}
                width={47}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onChange={() => {
                  setCourseInfoData({
                    ...courseInfoData,
                    lab_enable:
                      courseInfoData.lab_enable === "true" ? "false" : "true",
                  });
                }}
              />
            </div>
            <div className="-mt-2">
              <label
                className={`text-lg font-semibold mx-3 ${
                  courseInfoData.lab_enable === "true"
                    ? "text-[#24B263]"
                    : "text-[#E73D3E]"
                }`}
              >
                {courseInfoData.lab_enable === "true" ? "Enable" : "Disable"}
              </label>
            </div>
          </div>
          <div className="flex gap-5 w-full ms:mb-0 mb-[50px]">
            <button
              onClick={() => navigate("/lab")}
              type="button"
              className="border-2 text-md font-medium px-5 xs:px-10 py-2 border-gray-400 rounded-md active:scale-95 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 xs:px-10 py-1 text-md font-medium rounded-md text-white bg-[#4F46E5] active:scale-95 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
            >
              Save Course
            </button>
          </div>
        </div>
      </div>
      {loadder && (
        <div className="fixed flex items-center justify-center top-[40%] left-[50%]">
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default AddLabs;
