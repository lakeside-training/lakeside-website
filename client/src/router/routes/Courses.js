import CourseDetails from "../../pages/CourseDetails"
import CourseProgress from '../../pages/CourseProgress'
import CourseCertification from "../../pages/Dashboard/CourseCertification";
import LabCertification from "../../pages/Dashboard/LabCertification";
import LabKnowledge from "../../pages/Dashboard/LabKnowledge";
import Invite from "../../pages/Invite/Invite";
import LabPractice from "../../pages/LabPractice";


const courseRoutes = [
	{
		path: "/course-details",
		element: <CourseDetails />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: "/course-progress",
		element: <CourseProgress />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: "/invite",
		element: <Invite />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: "/lab",
		element: <LabPractice />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: '/lab-knowledge',
		element: <LabKnowledge />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: '/course/certification',
		element: <CourseCertification />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: '/labs/certification',
		element: <LabCertification />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	}
];


export default courseRoutes
