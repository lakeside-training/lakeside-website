import React from "react"

const Advatages = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Our Advantages
          </h2>
          <p className="max-w-md mx-auto mt-5 text-base font-normal text-gray-600 font-pj">
            Learn by the best, learn with us!
          </p>
        </div>
      </div>

      <div className="relative mt-12 md:mt-16">
        <div className="absolute -inset-4 lg:-inset-y-6 lg:-inset-x-8">
          <div
            className="w-full h-full max-w-4xl mx-auto opacity-20 blur-lg filter"
            style={{
              background:
                "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
            }}
          ></div>
        </div>

        <div className="relative max-w-3xl mx-auto sm:flex sm:items-center sm:space-x-8 sm:justify-center">
          <div className="bg-white rounded-xl">
            <div className="px-6 py-8">
              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 w-6 h-6 mt-0.5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900 font-pj">
                    Widely Known Certificates
                  </h3>
                  <p className="mt-3 text-base text-gray-900 font-pj">
                    Lorem ipsum dolor sit amet, consectetur adipis elit.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-xl sm:mt-0">
            <div className="px-6 py-8">
              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 w-6 h-6 mt-0.5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900 font-pj">
                    Interactive Learning System
                  </h3>
                  <p className="mt-3 text-base text-gray-900 font-pj">
                    Lorem ipsum dolor sit amet, consectetur adipis elit.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Advatages
