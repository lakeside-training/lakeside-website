import Dashboard from "../../pages/Dashboard"
import InviteSuccess from "../../pages/Invite/InviteSuccess"

const dashboradRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: {
      isNotNavbar: true,
      isNotFooter: true
    }
  },
  {
    path: "/invite-success",
    element: <InviteSuccess />,
    meta: {
      isNotNavbar: true,
      isNotFooter: true,
    }
  }
]

export default dashboradRoutes
