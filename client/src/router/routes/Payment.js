import PaymentSuccess from "../../pages/Payment/PaymentSuccess";
import PaymentError from "../../pages/Payment/PaymentError";

const paymentRoutes = [
	
	{
		path: "/payment/success",
		element: <PaymentSuccess />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
	{
		path: "/payment/error",
		element: <PaymentError />,
		meta: {
			isNotNavbar: true,
			isNotFooter: true,
		},
	},
];

export default paymentRoutes;
