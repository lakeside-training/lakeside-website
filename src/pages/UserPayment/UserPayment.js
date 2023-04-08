import { useState } from "react"
import React, { useEffect } from "react"

import Table from "../../components/Table/Table"
import { motion } from "framer-motion"
import axios from "../../axios"

const UserPayment = () => {
    const [paymentsData, setPaymentsData] = useState([])
    const [type, setType] = useState("all")


    const headers = [
        {
            name: "Name",
            key: "name"
        },
        {
            name: "Email",
            key: "email"
        },
        {
            name: "Date & Time",
            key: "date"
        },
        {
            name: "Payment Method",
            key: "payment"
        },

        // {
        //   name: "Courses Name",
        //   key: "coursesName",
        // },
        {
            name: "Payment Structure",
            key: "structure"
        },
        {
            name: "Amount",
            key: "amount"
        }
    ]

    const getPaymentDetails = async (type) => {
        setPaymentsData([])
        const {
            data: { data }
            // } = await axios(`/getPaymentUserDetails/${type}`)
        } = await axios.get(`/getPaymentUserDetails/${type}`)

        console.log('datas', data);

        if (data === null) {
            setPaymentsData(null)
            return
        }

        const rowData = data.map((payment) => {
            return {
                name: {
                    value: {
                        first: payment?.name || "-",
                        last: "",
                        img: payment?.profilePic
                    },
                    type: "avatar"
                },
                email: { value: payment?.email, type: "text" },
                date: {
                    value: payment?.date || "-",
                    type: "text"
                },
                payment: { value: payment?.paymentMethod || "-", type: "text" },
                // courseName: {
                //   value:
                //     payment.plan === "oneTime" ||
                //     payment.plan === "subscription" ||
                //     payment.plan === "monthly_payment"
                //       ? "-"
                //       : payment.plan || "-",
                //   type: "text",
                // },
                structure: { value: "Regular", type: "text" },
                amount: { value: payment?.price, type: "text" },
                userOtherData: payment
            }
        })

        setPaymentsData(rowData)
    }
    useEffect(() => {
        try {
            getPaymentDetails(type)
        } catch (error) {
            console.log(error)
        }
    }, [type])

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="bg-[#F4F4F5] min-h-[100vh] w-[full]"
            >
                <h1 className="text-gray-900 cursor-pointer  lg:text-4xl font-bold  font-pj duration-300 mb-4 absolute top-[10px] lg:top-[auto] left-[60px] lg:left-[auto] lg:sticky">
                    User Payment
                </h1>
                <div className=" mt-[40px] lg:mt-0">
                    <Table
                        headers={headers}
                        rowData={paymentsData}
                        handleTypeChange={handleTypeChange}
                    />
                </div>
            </motion.div>
        </>
    )
}
export default UserPayment
