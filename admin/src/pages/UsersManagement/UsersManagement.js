import React, { useEffect } from "react";
import Table from "../../components/Table/Table";
import { motion } from "framer-motion";
import axios from "../../axios";
import { useState } from "react";


const UsersManagement = () => {
  const [usersData, setUsersData] = useState([]);
  const [allUser, setAllUser] = useState([])
  const [type, setType] = useState("year");
  const [userFilter, setUserFilter] = useState('all')


  const headers = [
    {
      key: "name",
      name: "Name",
    },
    {
      key: "username",
      name: "Username",
    },
    {
      key: "email",
      name: "Email Address",
    },
    {
      key: "country",
      name: "Country",
    },
    {
      key: "interest",
      name: "Interest",
    },
    {
      key: "courses",
      name: "Courses",
    },
    {
      key: "action",
      name: "Action",
    },
  ];


  const getUsers = async (type) => {
    console.log(type)
    setUsersData([]);
    const {
      data: { data },
    } = await axios(`/getUserDetails/${type}`);

    console.log(data)

    if (data === null) {
      setUsersData(null);
      return;
    }

    let users = data.map((user) => {
      return {
        name: {
          value: {
            first: user.name.trim(),
            last: "",
            img: user?.profilePic.trim(),
          },
          type: "avatar",
        },
        username: {
          value: user.userName,
          type: "text",
        },
        email: {
          value: user.email,
          type: "text",
        },
       
        country: {
          value: user.country || "-",
          type: "text",
        },
        interest: {
          value: "View",
          type: "button",
        },
        courses: {
          value: "View",
          type: "courses",
        },
        action: {
          value: "Edit",
          type: "switch",
        },
        userOtherData: user,
      };
    });


    if (users.length === 0) {
      setUsersData(null);
      return;
    }
    setAllUser(users)


    setUsersData(users);

    setTimeout(() => {
      users = [];
    }, 5000);
  };

  useEffect(() => {
    getUsers(type);
  }, [type]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleUserChange = (e) => {
    setUserFilter(e.target.value)
    let users
    // if (e.target.value === 'all') {
    //   users = allUser.filter((user) => {
    //     return (
    //       user.plan.value === "all"
    //     );
    //   });
    // }
    if (e.target.value === 'all') {
      users = allUser
    }
    setUsersData(users)
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#F4F4F5] min-h-[100vh]"
    >
      <h1 className="text-gray-900 cursor-pointer lg:text-4xl font-bold font-pj duration-300 mb-4  absolute top-[10px] lg:top-[auto] left-[60px] lg:left-[auto] lg:sticky">
        Users Management
      </h1>
      <div className=" mt-[40px] lg:mt-0 ">
        <Table
          headers={headers}
          rowData={usersData}
          handleTypeChange={handleTypeChange}
          handleUserChange={handleUserChange}
          userFilter={true}
        />
      </div>
    </motion.div>
  );
};

export default UsersManagement;
