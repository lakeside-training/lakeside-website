/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

// import icons
import { ChevronDown, ChevronLeft, X } from "react-feather";

// import third party
import toast from "react-hot-toast";
import { Modal, Button } from "flowbite-react";
import { trackPromise } from "react-promise-tracker";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { TagsInput } from "react-tag-input-component";
import Switch from "react-switch";
import "react-datepicker/dist/react-datepicker.css";

// import component
import ImgUpload from "../../components/ImgUpload";

// import utils
import { isArrOrStr } from "../../utils";

// import axios
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";

import ReactSelect from "react-select";
import {
  removeModule,
  setModuleValue,
  addModuleHeading,
  addModuleDescription,
  insertResourseValue,
  removeResourses,
  addLabs,
  removeLabs,
  setEditValue,
  clears,
} from "../../redux/slices/course";
import Popup from "../../components/popUp/Popup";
import Spinner from "../../components/spinner/Spinner";

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

const EditExistingCourse = () => {
  const userToken = localStorage.getItem("userToken");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [courseImage, setCourseImage] = useState([]);
  const [courseIcon, SetCourseIcon] = useState([]);
  // ** track state
  const [showTrack, setShowTrack] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  // **  accordion state
  const [accordionOpen, setAccordionOpen] = useState(0);
  const [open, setOpen] = useState(false);
  //  ** resource
  const [resource, setResource] = useState([]);
  const dispatch = useDispatch();
  // ** felids date
  const [courseInfoData, setCourseInfoData] = useState({
    course_image: "",
    course_image_key: "",
    course_icon: "",
    course_icon_key: "",
    name: "",
    course_type: "Course",
    course_track: "",
    description: "",
    course_tags: [],
    price: "",
    price_tag: "$",
    discount_price: "",
    duration: "12 Hours",
    modules: [],
    course_enable: "true",
  });

  console.log(courseInfoData);
  // ** tag state
  const { modules } = useSelector((state) => state.course);
  const [selectTags, setSelectTags] = useState([]);
  const [listOfLabs, setListOfLabs] = useState([]);
  const [addResourse, setAddResourse] = useState([]);
  const [addlab, setLabs] = useState([]);
  const [inSideInput, setInSideInput] = useState(false);
  const [inSideInput1, setInSideInput1] = useState(false);
  const [inSideInput2, setInSideInput2] = useState(false);
  const [loadder, setLoadder] = useState(false);

  console.log(modules);

  useEffect(() => {
    setAddResourse(modules);
    setLabs(modules);
  }, [modules]);

  useEffect(() => {
    const getCourseDetails = async () => {
      let data = await axios.post("/getParticular/data", {
        id: id,
      });
      console.log("data.data", data.data);
      data = data.data.data;

      dispatch(setEditValue(data.modules));

      setCourseInfoData({
        ...data,
        course_image_key: data.course_image,
        course_icon_key: data.course_icon,
      });

      setSelectTags(data.course_tags);
      setCourseImage([
        {
          data_url: data.course_image,
          file: null,
        },
      ]);
      SetCourseIcon([
        {
          data_url: data.course_icon,
          file: null,
        },
      ]);
    };

    trackPromise(getCourseDetails());
    return;
  }, []);

  useEffect(() => {
    const getLabList = async () => {
      const { data } = await axios.get("/lab/all");
      const enabledCourse = data.data.filter((i) => i.lab_enable === "true");
      const filter = enabledCourse.map((i) => {
        return {
          label: i.name,
          value: i.id,
        };
      });

      setListOfLabs(filter);

      // console.log(data);
    };
    getLabList();
  }, []);

  useEffect(() => {
    const getAllResources = async () => {
      try {
        let { data } = await axios.get("/resources/get-all", {
          headers: {
            Authorization: userToken,
          },
        });

        data = data.data?.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });

        data.sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });

        setResource(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllResources();
  }, []);

  useEffect(() => {
    setCourseInfoData({ ...courseInfoData, course_tags: selectTags });
  }, [selectTags]);

  useEffect(() => {
    const getAllTrack = async () => {
      const { data } = await axios.get("/courseTrack/all", {
        headers: {
          Authorization: userToken,
        },
      });

      setCategories(data.data);
    };
    getAllTrack();
  }, [showTrack]);

  // ** Delete Course

  // const handleOpen = () => setOpen(!open);

  // **   handle accordion functions
  const handleAcconOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? -1 : value);
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
          resourse: [
            {
              id: "1",
              value: "",
            },
          ],
          lab_ids: [
            {
              id: "1",
              value: "",
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
        resourse: [
          {
            id: "1",
            value: "",
          },
        ],
        lab_ids: [
          {
            id: "1",
            value: "",
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
        resourse: [
          {
            id: "1",
            value: "",
          },
        ],
        lab_ids: [
          {
            id: "1",
            value: "",
          },
        ],
      })
    );
  }, []);

  const removeModules = (i) => {
    dispatch(removeModule({ id: i }));
  };

  const addResourseValue = (mod, res, value) => {
    dispatch(
      insertResourseValue({
        moduleId: mod,
        resourseId: res,
        value: value,
      })
    );
  };

  const removeResourse = (mod, res) => {
    dispatch(removeResourses({ moduleId: mod, resourseId: res }));
  };

  const addResourses = (i) => {
    const filter = addResourse.filter((item) => item?.id === i);
    if (filter.length === 0) {
      return;
    }
    const add = filter.map((i) => {
      let count = Number(i?.resourse.length) + 1;
      return {
        ...i,
        resourse: [
          ...i?.resourse,
          {
            id: count.toString(),
            value: "",
          },
        ],
      };
    });
    return dispatch(
      setModuleValue({
        id: add?.[0]?.id,
        moduleHeading: add?.[0]?.moduleDiscription,
        moduleDiscription: add?.[0]?.moduleHeading,
        resourse: add?.[0]?.resourse,
        lab_ids: add?.[0]?.lab_ids,
      })
    );
  };

  const addLabValue = (mod, res, value) => {
    dispatch(
      addLabs({
        moduleId: mod,
        labsId: res,
        value: value,
      })
    );
  };

  const removeLab = (mod, res) => {
    dispatch(removeLabs({ moduleId: mod, labsId: res }));
  };

  const addLab = (i) => {
    const filter = addlab.filter((item) => item.id === i);
    const add = filter.map((i) => {
      let count = Number(i.lab_ids.length) + 1;
      return {
        ...i,
        lab_ids: [
          ...i.lab_ids,
          {
            id: count.toString(),
            value: "",
          },
        ],
      };
    });

    return dispatch(
      setModuleValue({
        id: add[0].id,
        moduleHeading: add[0].moduleDiscription,
        moduleDiscription: add[0].moduleHeading,
        resourse: add[0].resourse,
        lab_ids: add[0].lab_ids,
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

  // add new track
  const addTrack = async () => {
    try {
      if (trackName !== "") {
        const { data } = await axios.post(
          "/courseTrack/add",
          { track_name: trackName },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        if (data.success) {
          toast.success(data.status);
        } else {
          toast.error(data.status);
        }
      } else {
        toast.error("Please enter track name");
      }
      setTrackName("");
    } catch (error) {
      setTrackName("");
      console.error(error);
      toast.error(error.message);
    }
  };

  // handle clear all data
  const handleClear = () => {
    setCourseImage([]);
    SetCourseIcon([]);
    setCourseInfoData({
      course_image: "",
      course_image_key: "",
      course_icon: "",
      course_icon_key: "",
      name: "",
      course_type: "",
      course_track: "",
      description: "",
      course_tags: [],
      price: "",
      price_tag: "",
      discount_price: "",
      duration: "",
      modules: [],
      course_enable: "",
    });
    setSelectTags([]);
    dispatch(clears());
    navigate("/courses");
  };

  //   {
  //     id: "",
  //     module_heading: "",
  //     module_description: "",
  //     module_question: [],
  //   },
  // ]);

  // console.log(moduleData1);

  // useEffect(() => {
  //   const data = modules;
  // console.log(data);

  //   setModuleData1(data);
  // }, [modules]);

  const handleSubmit = async () => {
    setLoadder(true);
    let courseData = {
      ...courseInfoData,
      course_image: {
        data_url: isArrOrStr(courseImage)
          ? courseImage[0]?.data_url
          : courseImage,
        type:
          courseImage[0]?.file !== null
            ? courseImage[0]?.file?.type.split("/")[1]
            : null,
      },
      course_icon: {
        data_url: isArrOrStr(courseIcon) ? courseIcon[0]?.data_url : courseIcon,
        type:
          courseIcon[0]?.file !== null
            ? courseIcon[0]?.file?.type.split("/")[1]
            : null,
      },
      modules: modules,
      pk: `${courseInfoData.name}_${courseInfoData.course_track}`,
    };

    delete courseData.updatedAt;
    delete courseData.createdAt;

    if (courseImage.length === 0) {
      toast("Please upload course image", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else if (courseIcon.length === 0) {
      toast("Please upload course icon", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else if (courseInfoData.course_track.length === 0) {
      toast("Please select course track", {
        icon: "⚠️",
      });
      setLoadder(false);

      return;
    } else if (selectTags.length === 0) {
      toast("Please select course tags", {
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

      if (modules.length !== 0) {
        let status = 0;

        if (status == 0) {
          try {
            const { data } = await axios.patch(
              "/course/update",
              {
                courseData,
              },
              {
                headers: {
                  Authorization: userToken,
                },
              }
            );

            if (data.success) {
              toast.success(data.status);
              handleClear();
              setLoadder(false);

              navigate("/courses");
              return;
            } else {
              toast.error(data.status);
              setLoadder(false);
              return;
            }
          } catch (error) {
            toast.error(error.message);
            setLoadder(false);
            return;
          }
        }
      } else {
        toast(`Please add chapter`, {
          icon: "⚠️",
        });
        setLoadder(false);
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
      className=" px-[20px] ms:px-[50px]"
    >
      <div>
        <Link to="/courses" className="lg:block hidden">
          <button className="active:scale-95 hover:scale-[1.02] transition-all duration-200 flex items-center px-4 py-3 text-sm font-medium rounded-lg group bg-gray-100 text-black absolute top-[0px] lg:top-[0] left-[50px] lg:left-[auto] lg:sticky">
            <div className="transition-all duration-200 transform group-hover:-translate-x-1 ">
              <ChevronLeft size={16} />
            </div>
            Back to Courses
          </button>
        </Link>
        <h2 className="block lg:hidden text:xl lg:text-2xl font-bold absolute top-[10px] lg:top-[0] left-[60px] lg:left-[auto] lg:sticky">
          Edit Courses
        </h2>
        <h2 className="lg:block hidden mt-[35px] text:xl lg:text-2xl font-bold ">
          Edit Courses
        </h2>

        <div className=" w-[100%] lg:w-[60%] mt-8 border-b pb-8">
          <div className="w-[100%] md:flex md:justify-between items-center">
            <div>
              <p className="mt-2 text-md font-medium">Course Image</p>
            </div>
            <div className="w-full md:w-[60%] flex items-center space-x-6">
              <ImgUpload
                images={courseImage}
                setImages={setCourseImage}
                size={12}
                removeFunc={() => setCourseImage([])}
              />
              {/* <img src={courseImage} alt="courseImage" /> */}
            </div>
          </div>

          <div className="w-[100%] md:flex md:justify-between items-center">
            <div>
              <p className="mt-2 text-md font-medium">Course Icon</p>
            </div>
            <div className="w-full md:w-[60%] flex items-center space-x-6">
              <ImgUpload
                images={courseIcon}
                setImages={SetCourseIcon}
                size={12}
                removeFunc={() => SetCourseIcon([])}
              />
              {/* <img src={courseIcon} alt="courseImage" /> */}
            </div>
          </div>

          <div className="w-[100%] md:flex md:justify-between mt-8">
            <div>
              <p className="mt-2 text-md font-medium">Course Name</p>
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
                name="name"
                value={
                  courseInfoData.name === null ||
                  courseInfoData.name === undefined
                    ? ""
                    : courseInfoData.name
                }
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
                <p
                  className="flex justify-between border !bg-white px-4 py-3 rounded-lg cursor-pointer transition ease-in-out w-[100%] hover:bg-gray-100 focus:border-indigo-600"
                  onClick={() => setShowTrack(!showTrack)}
                >
                  <span>
                    {courseInfoData.course_track === ""
                      ? "Select Course Track"
                      : courseInfoData.course_track}
                  </span>
                  <span>
                    <ChevronDown />
                  </span>
                </p>
                {/* Options */}
                <div
                  className={`border rounded mt-2 absolute w-[100%] bg-white overflow-hidden transition-all ease-in-out shadow-lg focus:ring-indigo-600 ${
                    !showTrack ? "hidden h-0" : "block h-auto"
                  }`}
                >
                  {categories?.map((track, i) => (
                    <div
                      key={i}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setCourseInfoData({
                          ...courseInfoData,
                          course_track: track.track_name,
                        });
                        setShowTrack(false);
                      }}
                    >
                      {track.track_name}
                    </div>
                  ))}
                </div>
              </div>
              {/* <p
                className="px-4 py-2 block text-[#4F46E5]  text-md font-bold cursor-pointer"
                onClick={handleOpen}
              >
                Add New Track
              </p> */}
            </div>
          </div>
          {/* model */}
          {/* <Modal show={open} onClose={handleOpen}>
            <Modal.Body className=" relative">
              <button
                className="absolute z-50 -top-1 -right-1 duration-200 ease-out hover:-translate-x-1.5 hover:translate-y-1.5 transition-all p-2 bg-white rounded-md text-lg font-semibold  shadow-md"
                onClick={handleOpen}
              >
                <X size={20} />
              </button>
              <div className="space-y-6 my-1">
                <div className="w-[100%] flex mx-auto text-center mt-8 flex-col justify-center gap-4">
                  <div>
                    <p className="mt-2 text-md font-medium">Track Name</p>
                  </div>
                  <div className="w-[60%] mx-auto">
                    <input
                      onChange={(e) => {
                        setTrackName(e.target.value);
                      }}
                      type="text"
                      name=""
                      value={trackName}
                      placeholder="Track Name"
                      className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end my-2">
                <Button
                  color="gray"
                  onClick={() => {
                    handleOpen();
                    addTrack();
                  }}
                >
                  Save
                </Button>
              </div>
            </Modal.Body>
          </Modal> */}

          <div className="w-[100%] md:flex md:justify-between mt-8">
            <div>
              <p className="mt-2 text-md font-medium">Description</p>
            </div>
            <div className="w-full md:w-[60%] md:mt-0 mt-2">
              <div className="mt-2 sm:mt-0 sm:col-span-2">
                <textarea
                  name="description"
                  required
                  placeholder="Add Course Description"
                  onChange={(e) => {
                    setCourseInfoData({
                      ...courseInfoData,
                      description: e.target.value,
                    });
                  }}
                  value={
                    courseInfoData.description === null
                      ? ""
                      : courseInfoData.description
                  }
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
                name="fruits"
                placeHolder="add tag"
              />
              {/* <TagsInput
                value={[...selectTags]}
                onChange={setSelectTags}
                required
                name="fruits"
                placeHolder="add tag"
              /> */}
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
                value={
                  courseInfoData.price === null || courseInfoData.price === 0
                    ? ""
                    : courseInfoData.price
                }
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
                  setInSideInput(true);
                }}
                type="number"
                name=""
                id=""
                min={0}
                placeholder="Enter number of weeks"
                required
                className="border block w-full px-4 py-3 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                value={
                  courseInfoData.duration === null ||
                  courseInfoData.duration === ""
                    ? ""
                    : courseInfoData.duration
                }
              />
              {inSideInput && (
                <p className=" absolute right-6 top-[11px]">weeks</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add module */}

      <div className=" w-[100%] lg:w-[60%] mt-10">
        <div className="w-[100%] flex items-center justify-between mt-8">
          <p className="text-md font-medium">Course Chapter</p>

          <p
            onClick={addValue}
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
            Add Chapter
          </p>
        </div>
        <div className="w-[100%] flex flex-col items-center justify-between mt-5 border rounded-lg py-2 px-5">
          {/* Module */}
          <Fragment>
            {modules?.map((i, index) => {
              return (
                <Accordion
                  key={i?.id}
                  open={accordionOpen === i?.id}
                  icon={<AccordionIcon id={i?.id} open={accordionOpen} />}
                >
                  <AccordionHeader
                    onClick={() => handleAcconOpen(i?.id)}
                    className="text-md"
                  >
                    <div className="flex justify-between w-full">
                      <div className="flex items-center ">
                        <span>Chapter {index + 1} </span>
                      </div>
                      <div>
                        <a
                          className="text-[#FF4F4F] text-sm mr-6"
                          onClick={(e) => {
                            e.preventDefault();
                            removeModules(i?.id);
                          }}
                          href="EditCourse"
                        >
                          Delete Chapter {index + 1}
                        </a>
                      </div>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className=" overflow-y-auto h-[500px]">
                    <div className="w-[98%] mx-auto mt-3  block ">
                      <input
                        className="border block w-full px-4 py-3 text-md font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                        placeholder="Enter Chapter Name"
                        type="text"
                        name="name"
                        required
                        onChange={(e) => {
                          addModuleHeadings(i?.id, e.target.value);
                        }}
                        value={i?.moduleHeading}
                      />
                      <div className="w-full mt-5">
                        <label className="text-sm font-semibold" htmlFor="">
                          Chapter Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="Add Chapter Description"
                          rows="4"
                          required
                          onChange={(e) => {
                            addModuleDescriptions(i?.id, e.target.value);
                          }}
                          value={i?.moduleDiscription}
                          className="mt-2 border font-normal text-md block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                          spellCheck="false"
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-end w-full">
                        <p
                          onClick={() => addLab(i?.id)}
                          className="px-4 py-1 mt-6  text-[#4F46E5] text-md font-bold  flex gap-2 items-center cursor-pointer"
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
                          Add Labs
                        </p>
                        <p
                          onClick={() => addResourses(i?.id)}
                          className="px-4 py-1 mt-6  text-[#4F46E5] text-md font-bold  flex gap-2 items-center cursor-pointer"
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
                          Add Resourse
                        </p>
                      </div>

                      {i?.lab_ids !== undefined &&
                        i?.lab_ids.map((item) => (
                          <div
                            className="flex flex-col mt-8 mx-2"
                            key={item?.id}
                          >
                            <div className="flex items-center justify-between mx-1 text-sm font-semibold my-2">
                              <label className=" font-semibold">
                                Lab {item?.id}
                              </label>
                              <p
                                className=" text-[#FF4F4F] cursor-pointer"
                                onClick={() => removeLab(i?.id, item?.id)}
                              >
                                Delete Lab {item?.id}
                              </p>
                            </div>

                            <div className="w-full md:mt-0 mt-2">
                              <ReactSelect
                                name="resource"
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    color: state.isSelected
                                      ? "#FC916A"
                                      : "black",
                                    background: state.isSelected
                                      ? "#fc916a3a"
                                      : "white",
                                    padding: 3,
                                    paddingLeft: 5,
                                    borderRadius: "7px",
                                  }),
                                }}
                                value={listOfLabs.find(
                                  (data) => data?.value === item?.value
                                )}
                                options={listOfLabs}
                                placeholder="Select Search"
                                onChange={(e) => {
                                  e = {
                                    target: {
                                      value: e.value,
                                      name: e.label,
                                    },
                                  };
                                  addLabValue(i?.id, item?.id, e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        ))}

                      {i?.resourse !== undefined &&
                        i?.resourse.map((item) => (
                          <div className="mt-6 my-3">
                            <div className="flex items-center justify-between mx-1 text-sm font-semibold my-2">
                              <label className=" font-semibold">
                                Resourse {item.id}
                              </label>
                              <p
                                className=" text-[#FF4F4F] mr-12 cursor-pointer"
                                onClick={() => removeResourse(i?.id, item?.id)}
                              >
                                Delete Resourse {item?.id}
                              </p>
                            </div>

                            <div className="relative mx-1 mt-2">
                              <ReactSelect
                                name="resource"
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    color: state.isSelected
                                      ? "#FC916A"
                                      : "black",
                                    background: state.isSelected
                                      ? "#fc916a3a"
                                      : "white",
                                    padding: 6,
                                    paddingLeft: 30,
                                    borderRadius: "7px",
                                  }),
                                }}
                                options={resource}
                                value={resource.find(
                                  (data) => data?.value === item?.value
                                )}
                                placeholder="Select Search"
                                onChange={(e) => {
                                  e = {
                                    target: {
                                      value: e.value,
                                      name: "resource",
                                    },
                                  };
                                  addResourseValue(
                                    i?.id,
                                    item?.id,
                                    e.target.value
                                  );
                                }}
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
                        ))}

                      {/* Chapter */}

                      {/* {data?.chapters?.length === 0 && (
                        <div className="mx-auto text-center mt-5 font-medium text-md">
                          <p>There is no chapter ☹️</p>
                        </div>
                      )}

                      {data?.chapters?.map((id, idIndex) => {
                        return (
                          <>
                            <div className="w-full border-b pb-6 border-gray-300 pt-2">
                              <div className="w-full ms:flex justify-between items-start">
                                <div className="ms:mx-0 mx-auto w-[100%] ms:w-[48%]">
                                  <div className="w-full text-[#52525B] flex justify-between">
                                    <div className="font-semibold">
                                      Resource {idIndex + 1}
                                    </div>
                                    <div>
                                      <a
                                        className="text-[#FF4F4F] text-sm font-semibold"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          const allData = moduleData[
                                            index
                                          ].chapters.filter((data) => {
                                            return (
                                              data.chapterId !== id.chapterId
                                            );
                                          });

                                          const list = [...moduleData];
                                          list[index].chapters = allData;
                                          setModuleData(list);
                                        }}
                                        href=""
                                      >
                                        Delete Resource {idIndex + 1}
                                      </a>
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    name="name"
                                    required
                                    value={
                                      moduleData[index].chapters[idIndex].name
                                    }
                                    id=""
                                    placeholder="Enter Resource Name"
                                    className="border block w-full px-4 py-3 mt-2 text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                                    onChange={(e) =>
                                      handleChapterChange(e, idIndex, index)
                                    }
                                  />
                                </div>
                                <div className="ms:mt-0 mt-4 ms:mx-0 mx-auto w-[100%] ms:w-[48%]">
                                  <p className="text-[#52525B] mb-2 font-semibold">
                                    Choose the Resource
                                  </p>
                                  <div className="relative">
                                    <Select
                                      name="resource"
                                      styles={{
                                        control: (provided, state) => ({
                                          ...provided,
                                          color: state.isSelected
                                            ? "#FC916A"
                                            : "black",
                                          background: state.isSelected
                                            ? "#fc916a3a"
                                            : "white",
                                          padding: 6,
                                          paddingLeft: 30,
                                          borderRadius: "7px",
                                        }),
                                      }}
                                      options={resource}
                                      placeholder="Select"
                                      onChange={(e) => {
                                        e = {
                                          target: {
                                            value: e.value,
                                            name: "resource",
                                          },
                                        };
                                        handleChapterChange(e, idIndex, index);
                                      }}
                                      required
                                      defaultValue={() => {
                                        return resource.find((data) => {
                                          return data.value === id.resource;
                                        });
                                      }}
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
                              </div>
                              <div className="ms:flex justify-between mt-3">
                                <div className="ms:mx-0 mx-auto w-[100%] ms:w-[48%]">
                                  <p className="text-[#52525B] mb-1 font-semibold">
                                    Date & Time
                                  </p>
                                  <div className="relative">
                                    <DatePicker
                                      required
                                      showTimeSelect
                                      className="border block w-full pl-12 py-[12px] text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                                      selected={
                                        moduleData[index].chapters[idIndex]
                                          .date_time
                                      }
                                      value={
                                        moduleData[index].chapters[idIndex]
                                          .date_time
                                      }
                                      onChange={(date) => {
                                        let e = {
                                          target: {
                                            value: date,
                                            name: "date_time",
                                          },
                                        };
                                        handleChapterChange(e, idIndex, index);
                                      }}
                                    />
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 absolute top-3 left-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className="ms:mt-0 mt-4 ms:mx-0 mx-auto w-[100%] ms:w-[48%]">
                                  <p className="text-[#52525B] mb-1 font-semibold">
                                    Session Link
                                  </p>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="session_link"
                                      id=""
                                      placeholder="Link"
                                      className="border block w-full pl-12 py-3 text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                                      onChange={(e) =>
                                        handleChapterChange(e, idIndex, index)
                                      }
                                      required
                                      value={
                                        moduleData[index].chapters[idIndex]
                                          .session_link
                                      }
                                    />
                                    <div className=" absolute top-3 left-3">
                                      <LinkIcon />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })} */}
                    </div>
                  </AccordionBody>
                </Accordion>
              );
            })}
          </Fragment>
        </div>
      </div>

      <div className="w-full lg:w-[80%] flex lg:mt-14 mt-5">
        <div className="flex-col gap-5 sm:justify-between w-full">
          <button
            className="text-red-500 justify-start mb-5"
            type="button"
            onClick={() => setShow(true)}
          >
            Delete Course
          </button>

          <div className="w-full  flex items-center justify-between  mt-14 ">
            <div className="w-full items-center flex ">
              <div className="-mt-2">
                <label className="mx-3 font-semibold text-lg">
                  Course Status :
                </label>
              </div>
              <div>
                <Switch
                  id={id}
                  checked={
                    courseInfoData.course_enable === "true" ? true : false
                  }
                  className="react-switch"
                  onColor="#4F46E5"
                  onHandleColor="#fff"
                  height={20}
                  width={47}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  onChange={() => {
                    setCourseInfoData({
                      ...courseInfoData,
                      course_enable:
                        courseInfoData.course_enable === "true"
                          ? "false"
                          : "true",
                    });
                  }}
                />
              </div>
              <div className="-mt-2">
                <label
                  className={`text-lg font-semibold mx-3 ${
                    courseInfoData.course_enable === "true"
                      ? "text-[#24B263]"
                      : "text-[#E73D3E]"
                  }`}
                >
                  {courseInfoData.course_enable === "true"
                    ? "Enable"
                    : "Disable"}
                </label>
              </div>
            </div>
            <div className="flex gap-5 w-full ms:mb-0 mb-[50px] -mt-4">
              <button
                onClick={() => {
                  navigate("/courses");
                  handleClear();
                }}
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
      </div>
      {show && <Popup show={show} hide={setShow} id={id} label="course" />}
      {loadder && (
        <div className="fixed flex items-center justify-center top-[40%] left-[50%]">
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default EditExistingCourse;
