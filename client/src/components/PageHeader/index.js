import React from "react"

const PageHeader = ({ title, subtitle, image }) => {
  return (
    // <div className="absolute !w-[100vw] !-left-[0]">
    <section className="relative py-12 w-full bg-gray-900 sm:py-16 lg:py-20 xl:py-32">
      <div className="absolute inset-0">
        <img className="object-cover w-full h-full" src={image} alt={title} />
      </div>
      <div className="absolute inset-0 bg-gray-900/70 lg:bg-gray-900/50"></div>
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto   ">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-center text-white py-8">{subtitle}</p>
        </div>
      </div>
    </section>
    // </div>
  )
}

export default PageHeader
