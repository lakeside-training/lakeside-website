import React, { useState } from "react"

const Notification = () => {
  const [toogle, setToogle] = useState({
    promotion: false,
    courses: false,
    mentors: false,
    securityAlert: false
  })

  const handleClick = (value) => () => {
    setToogle({
      ...toogle,
      [value]: !toogle[value]
    })
  }

  return (
    <div className="py-8 bg-white sm:py-12 ">
      <div className="max-w-xl md:px-0">
        <h2 className="text-xl font-bold text-gray-900 font-pj">
          Manage Notifications
        </h2>
        <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
          You can enable the notifications that you wanna receive.
        </p>
      </div>

      {/* px-8 */}
      <div className="flex flex-col md:flex-row w-full justify-between mt-5   md:px-0">
        <div>
          <h2 className="text-base font-bold text-gray-900 ont-pj">
            Promotions
          </h2>
          <p className="mt-4 text-base  font-normal text-gray-600 font-pj">
            Lorem ipsum dolor sit amet, consectetur adipis.
          </p>
        </div>
        <div className="flex gap-3 mt-8 items-center">
          <span class="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">
            Learn More
          </span>
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              id="flexSwitchCheckDefault"
              onChange={handleClick("promotion")}
            />
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between mt-5   md:px-0">
        <div>
          <h2 className="text-base font-bold text-gray-900 ont-pj">Courses</h2>
          <p className="mt-4 text-base font-normal text-gray-600 font-pj">
            Lorem ipsum dolor sit amet, consectes.
          </p>
        </div>
        <div className="flex gap-3 mt-8 items-center">
          <span class="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">
            Learn More
          </span>
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              id="flexSwitchCheckDefault"
              onChange={handleClick("courses")}
            />
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>

      <div className="flex  flex-col md:flex-row w-full justify-between mt-5  md:px-0">
        <div>
          <h2 className="text-base font-bold text-gray-900 ont-pj">Mentors</h2>
          <p className="mt-4 text-lg font-normal text-gray-600 font-pj">
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="flex gap-3 mt-8 items-center">
          <span class="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">
            Learn More
          </span>
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              id="flexSwitchCheckDefault"
              onChange={handleClick("mentors")}
            />
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between mt-5  md:px-0">
        <div>
          <h2 className="text-base font-bold text-gray-900 ont-pj">
            Security Alerts
          </h2>
          <p className="mt-4 text-base font-normal text-gray-600 font-pj">
            Lorem ipsum dolor sit amet, consectetur adipis.
          </p>
        </div>

        <div className="flex gap-3 mt-8 items-center">
          <span class="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">
            Learn More
          </span>
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              id="flexSwitchCheckDefault"
              onChange={handleClick("securityAlert")}
            />
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Notification
