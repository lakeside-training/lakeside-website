import DoughnutChart from "../../components/Chart/DoughnutChart"
import AddCourse from "../../pages/AddCourse"
import Courses from "../../pages/Courses"
import Dashboard from "../../pages/Dashboard"
import EditCourse from "../../pages/EditCourse"
import EditLab from "../../pages/editLab"

import Lab from "../../pages/Lab/Lab"
import Resources from "../../pages/Resources"
import UserPayment from "../../pages/UserPayment/UserPayment"
import UsersManagement from "../../pages/UsersManagement/UsersManagement"
import AddLab from '../../pages/AddLab'

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: {
      // isNotSidebar: true,
    }
  },
  {
    path: "/courses",
    element: <Courses />,
    meta: {}
  },
  {
    path: "/lab",
    element: <Lab />,
    meta: {}
  },
  {
    path: "/add-new-course",
    element: <AddCourse />,
    meta: {}
  },
  {
    path: "/add-new-lab",
    element: <AddLab />,
    meta: {}
  },
  {
    path: "/course-details",
    element: <EditCourse />,
    meta: {}
  },
  {
    path: "/lab-details",
    element: <EditLab />,
    meta: {}
  },
  {
    path: "/payments",
    element: <UserPayment />,
    meta: {}
  },
  {
    path: "/users",
    element: <UsersManagement />,
    meta: {}
  },
  {
    path: "/test",
    element: <DoughnutChart />,
    meta: {}
  },
  {
    path: "/resources",
    element: <Resources />,
    meta: {}
  }
]

export default dashboardRoutes
