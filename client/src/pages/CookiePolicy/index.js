import React from 'react';

const CookiePolicy = () => {
    return (
        <div>
            <div className="practiceArea-head text-gray-900 text-center lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mt-16 mb-4 text-4xl font-bold">COOKIE POLICY</h2>
                    <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">www.learnlakeside.com</a>
                    <p className="mt-2 text-[18px] font-plus_jakarta_sans font-[600]">Effective date: 1st January 2023</p>
                </div>
            </div>
            <div
                className=" pt-16 flex flex-col justify-center flex-wrap lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]"
            >
                <p className="pb-2  font-plus_jakarta_sans font-[600]">
                    This Cookie Policy explains how The Lakeside L.L.C. (“Lakeside Training”, “we”, “us” or “our”) uses cookies and similar technologies in connection with the <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">www.learnlakeside.com</a> website
                </p>
            </div>
            <div
                className="  flex flex-col justify-center flex-wrap lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]"
            >
                <h2 className="text-2xl font-bold">What are Cookies?</h2>
                <p className="py-2 ">
                    Cookies can be delicious. Cookies are small text files placed on your computer by websites and sometimes by emails. They provide useful information to organizations, which helps to make your visits to their websites more effective and efficient. We use cookies to ensure that we can understand how you use our websites and to ensure that we can make improvements to the websites.
                </p>
                <p className="py-2 ">
                    Cookies do not contain any personal or confidential information about you.
                </p>
                <h2 className="text-2xl font-bold">How we use Cookies</h2>
                <p className="py-2 ">
                    We use cookies to ensure that you get the best from our website. The first time that you visit our website you will be asked to consent to our use of cookies and we suggest that you agree to allow the cookies to be active on your device whilst you visit and browse our website to ensure that you experience our website fully. For example, you will not be able to access your My Move file if you browse with the cookies disabled.
                </p>
                <p className="py-2">
                    The types of cookies that we use:
                </p>
                <p className="py-2">
                    We use three types of cookies on our websites:
                </p>
                <ul className="ml-10">
                    <li className="py-2 list-disc">Session cookies that are deleted after each visit</li>
                    <li className="py-2 list-disc">Persistent/tracking cookies that remain in place across multiple visits to our websites</li>
                    <li className="py-2 list-disc">Third-party cookies that are used by other parties, for example, Google Analytics</li>
                </ul>
                <p className="py-2">
                    Session cookies and persistent cookies are necessary for you to use our website. These cookies can be deleted via your browser, but this will restrict the functions that you can carry out on our websites.
                </p>
                <p className="py-2">
                    Session cookies expire when you leave the website and are not stored on your computer and do not contain any personal data. Persistent cookies last beyond your visit to our website.
                </p>
                <p className="py-2">
                    We may use Google Analytics on our website. This is a tracking cookie that enables us to track how popular our site is and to record visitor trends over time. The cookie does not contain any personal data but it does use your computer’s IP address to determine where in the world you are accessing the website from and to track your page visit within the site.
                </p>
                <h2 className="text-2xl font-bold">Optional cookies</h2>
                <p className="py-2 ">
                    These cookies are usually supplied by business partners and help us to filter out information that is not relevant to you.
                </p>
                <h2 className="text-2xl font-bold">Cookies and Demographics</h2>
                <p className="py-2 ">
                    We may use data from Google's interest-based advertising or 3rd-party audience data (such as age, gender, and interests) with Google Analytics.
                </p>
                <h2 className="text-2xl font-bold">Managing Cookies</h2>
                <p className="py-2 ">
                    You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit our website and some services and functionalities we offer may not work
                </p>
                <p className="py-2 ">
                    To restrict or handle cookies, please see the ‘Help’ section of your internet browser.
                </p>
            </div>
        </div>
    );
};

export default CookiePolicy;