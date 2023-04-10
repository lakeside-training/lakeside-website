import React, { useEffect, useState } from "react";

// ** import assets
// import lab1 from "../../assets/images/courses/lap-1.png"
// import sci1 from "../../assets/images/courses/sci-1.png"
// import comp1 from "../../assets/images/courses/comp-1.png"
// import math1 from "../../assets/images/courses/math-1.png"

// ** import components
import CourseCard from "../../components/CourseCard";
import Spinner from "../../components/spinner/Spinner"

// ** import axios
import axios from "../../axios";

const CoursesPage = ({ type }) => {
	const [loading, setLoading] = useState(false);
	const [track, setTrack] = useState([]);

	const [allCourseData, setAllCourseData] = useState([]);

	const [courseByTrack, setCourseByTrack] = useState({});

	// ** Loading all course Tracks
	useEffect(() => {
		const getAllTrack = async () => {
			try {
				const { data } = await axios.get(`/courseTrack/all`);

				setTrack(data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getAllTrack();
	}, []);

	// ** Loading all courses | Labs
	useEffect(() => {
		setLoading(true);
		const getAllCourse = async () => {
			try {
				const { data } = await axios.get(`/course/all/${type || ""}`);	
				
				data.data.sort((a, b) => {
					if (a.name < b.name) {
					  return -1;
					}
					if (a.name > b.name) {
					  return 1;
					}
					return 0;
				  });
				  
				setAllCourseData(() => {
					setLoading(false);
					return data.data;
				});
			} catch (error) {
				setLoading(false);
			}
		};
		getAllCourse();
	}, [type]);

	useEffect(() => {
		const courseByTrack = track.reduce((acc, track) => {
			const courseData = allCourseData.filter(
				(course) => course.course_track === track.track_name
			);
			acc[track.track_name] = courseData;
			return acc;
		}, {});

		setCourseByTrack(courseByTrack);
	}, [track, allCourseData]);

	if (loading)
		return (
			<div className="flex justify-center items-center absolute w-full h-screen">
				<Spinner />
			</div>
		);
	return (
		<section className="pt-5 overflow-hidden mx-auto">
			{allCourseData.length === 0 ? (
				// Centered content
				<div className="">
					<h1>Course Not Found</h1>
				</div>
			) : (
				<div className="mx-auto grid">
					{Object.keys(courseByTrack).map((track) => {
						return (
							<>
								{courseByTrack[track].length > 0 && (
									<div className="lg:flex justify-center sm:justify-start flex-col mb-8 w-full md:flex text-sm">
										<div className="max-w-[278px] sm:max-w-[100%] min-w-[278px] mx-auto  sm:mx-[0] flex items-center gap-5 mb-5">
											<div className="grow-0  w-fit">
												<h2 className="lg:text-xl whitespace-nowrap font-bold leading-tight text-gray-900 ">
													{track}
												</h2>
											</div>
											{/* <div className="w-full flex-grow  h-[.8px] bg-black"></div> */}
										</div>
										<CourseCard
											data={courseByTrack[track]}
										/>
									</div>
								)}
							</>
						);
					})}
				</div>
			)}
		</section>
	);
};

export default CoursesPage;
