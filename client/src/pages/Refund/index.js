import React from 'react';

const Refund = () => {
    return (
        <div>
            <div className="practiceArea-head text-gray-900 text-center lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mt-16 mb-4 text-4xl font-bold">REFUND AND CANCELLATION</h2>
                    <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">www.learnlakeside.com</a>
                    <p className="mt-2 text-[18px] font-plus_jakarta_sans font-[600]">Effective date: 1st January 2023</p>
                </div>
            </div>
            <div
                className=" pt-16 flex flex-col justify-center flex-wrap lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]"
            >
                <p className="pb-2  font-plus_jakarta_sans font-[600]">
                    Welcome to the Refund and Cancellation policy of The Lakeside L.L.C (collectively “Lakeside Training,” “we,” “us,” or “our”). This policy applies to all clients and users of our platform.
                </p>
                <h2 className="text-2xl font-bold">CANCELLATION AND REFUND POLICY</h2>
                <p className="py-2 ">
                    In the event you may wish to cancel your training, you must do so by notifying us immediately in writing at least 24 hours prior to the commencement of the training session. You will be eligible for a full refund in the event of a cancellation done at least 24 hours prior to the training session.
                </p>
                <p className="py-2 ">
                    You fully understand and agree that you shall not be eligible for ANY refund in the event of making a cancellation after the elapsed time period above mentioned. Any services that have yet to be provided at the time of cancellation will in such scenario, therefore, be deemed as having been provided.
                </p>
                <p className="py-2 ">
                    Lakeside Training may refuse a refund/cancellation request if suspects a suspicious/fraudulent behavior of the Client.
                </p>
                <h2 className="text-2xl font-bold">CONTACT US</h2>
                <p className="py-2 ">
                    For more information, please get in touch with our Customer Support team by sending an email on <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">@learnlakeside.com</a>
                </p>
            </div>
        </div>
    );
};

export default Refund;