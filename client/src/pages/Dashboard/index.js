import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuyCourse from "./buyCourse";
import Courses from "./Courses";
import Labs from "./Labs";

import axios from "../../axios";

// ** import dashbord Pages
import Navbar from "./Navbar";
import Navigator from "./Navigator";
import Notification from "./Notification";
import Password from "./Password";
import Profile from "./Profile";
import Refer from "./Refer";
import { getTokens, messaging } from "../../firebase";
import { onMessage } from "firebase/messaging";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { toast } from "react-hot-toast";
import { notification } from "../../redux/slices/notification";
import BuyLab from "./buyLab";
import {useAuth} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {
	const [token, setToken] = useState('')
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useAuth()
	const navigate = useNavigate()
	const { currentPage } = useSelector((state) => state.layout);
	const [planDetails, setPlanDetails] = useState("");
	console.log('The user: ', user)

	const sendNotification = (title, message, icon) => {
		NotificationManager.info(message, title, 4000, {}, true)
	}

	if (!isAuthenticated) {
		navigate("/")
	}

	// const getToken = async () => {
	// 	const tok = await getTokens()
	// 	setToken(tok)
	// 	await onMessage(messaging, (payload) => {
	// 		sendNotification(payload.notification.title, payload.notification.body, payload.notification.icon)
	// 		const userData = JSON.parse(localStorage.getItem('userInfo'))
	// 		if (userData !== null) {
	// 			axios.post('/getNotifications', { id: userData[0].id })
	// 				.then(data => {
	// 					if (data.data.success) {
	// 						dispatch(notification(data.data.data))
	// 					}
	// 				})
	// 		}
	// 	});
	// }
	//
	// useEffect(() => {
	// 	getToken()
	// 	localStorage.setItem('courseStatus',false)
	// }, [])
	//
	// useEffect(() => {
	// 	if (token) {
	// 		if (token !== 'No registration token available. Request permission to generate one.') {
	// 			console.log(token)
	// 			const userToken = JSON.parse(localStorage.getItem('userInfo'))
	// 			if (userToken !== null) {
	// 				const id = userToken[0].id
	// 				axios.post('/save-token', { id, token })
	// 					.then(data => {
	// 						console.log('Saved successfully')
	// 					})
	// 					.catch(err => {
	// 						toast.error("Please check your internet connection")
	// 					})
	// 			}
	// 		}
	// 	}
	// }, [token])

	useEffect(() => {
		// const userID = JSON.parse(localStorage.getItem("userInfo"));
		// const API = async () => {
		// 	const { data } = await axios.post(
		// 		"/user/getParticular/planDetails",
		// 		{
		// 			userId: userID[0].id,
		// 		}
		// 	);
		// 	setPlanDetails(data);
		// };
		// API();
	}, []);

	console.log(planDetails)

	const pageComponentList = {
		courses: <Courses planName={planDetails} />,
		labs: <Labs planName={planDetails} />,
		profile: <Profile />,
		refer: <Refer />,
		notification: <Notification />,
		password: <Password />,
		course: <BuyCourse />,
		lab: <BuyLab />

	};

	return (
		<div>
			<div className="flex flex-col flex-1 xl:px-10 ">
				<div className="!mx-auto w-full max-w-7xl sm:px-4 mt-2">
					{/* <div className="sm:px-14"> */}
					<Navbar />
					<Navigator
						pageComponent={
							pageComponentList[currentPage] ||
							pageComponentList.profile
						}
						currentPage={currentPage}
					/>
					{/* </div> */}
				</div>
			</div>
			<NotificationContainer/>
		</div>
	);
};
export default Dashboard;
