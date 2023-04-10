/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = () => {
  const [orderId, setOrderId] = useState("");

  console.log("OrderId", orderId);
  // const navigate = useNavigate();
  // const paypal = useRef();
  // useEffect(() => {
  //   window.paypal
  //     .Buttons({
  //       style: {
  //         shape: "pill",
  //         color: "gold",
  //         layout: "horizontal",
  //         label: "paypal",
  //       },
  //       createSubscription: async (data, actions) => {
  //         return actions.subscription.create({
  //           /* Creates the subscription */
  //           plan_id: "P-1B966485F74964312MM3I2VQ",
  //         });
  //       },
  //       onApprove: async (data, actions) => {
  //         navigate("/payment/success");
  //         localStorage.setItem("paymentId", data.subscriptionID); // You can add optional success message for the subscriber here
  //       },
  //     })
  //     .render(paypal.current); // Renders the PayPal button;
  // }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        /* Creates the subscription */
        purchase_units: [
          {
            description: "oneTime",
            amount: {
              currency_code: "USD",
              value: 999,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
        redirect_urls: {
          return_url: `http://localhost:3000/payment/success`,
          cancel_url: `http://localhost:3000/payment/error`,
        },
      })
      .then((orderId) => {
        setOrderId(orderId);
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;

      console.log("payer", payer);
    });
  };

  return (
    <div>
      {/* <div ref={paypal} ></div> */}

      <PayPalScriptProvider
        options={{
          "client-id":
            "AbOwtUzg4tdY0qWjDXQ6HWdLeiUNqEd5-3PBVqjHW7MjbeznindISxDjyiF-StIJloXmpFTaSIIFoKqQ",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
