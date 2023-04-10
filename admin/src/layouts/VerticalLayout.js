/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

// ** import third party
import { Outlet, useLocation } from "react-router-dom";
// ** import components
import Sidebar from "../components/Sidebar";
// ** import routes meta data
import { Routes as metaData } from "../router/routes";
// import MenuIcon from "../../src/assets/icons/menu.svg";

const VerticalLayout = () => {
  // ** get location
  let location = useLocation(); // it's really important for get updated metaData

  // ** States
  const [meta, setMeta] = useState(null);

  const handleSetMeta = () => {
    const { meta } = metaData.filter((item) => {
      if (location.pathname === item.path) {
        return item.meta;
      }
    })[0];
    setMeta(meta);
  };

  //** ComponentDidMount
  useEffect(() => {
    handleSetMeta();
  }, [location]);

  return (
    <div>
      {(meta?.layout !== "blank" || meta?.layout === undefined) && meta && (
        <div className="flex flex-1 bg-gray-50 h-[100vh]">
          {meta?.isNotSidebar ? null : <Sidebar />}
          <div className="flex flex-col w-full">
            <main>
              <div className="py-5 bg-[#F4F4F5] ">
                
                {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8"> */}
                <div className="px-3 mx-auto md:px-6 ">
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalLayout;
