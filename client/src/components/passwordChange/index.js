/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import toast from "react-hot-toast";
import { useEffect } from "react";

const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const EMAIL = searchParams.get("email");
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const Pool = {
    UserPoolId: "ap-south-1_rSmTWsYuY",
    ClientId: "5h8576ibhd37l0vmk114ie7mdt",
  };

  const userPool = new CognitoUserPool(Pool);

  const getUser = () => {
    return new CognitoUser({
      Username: EMAIL?.toLowerCase(),
      Pool: userPool,
    });
  };

  useEffect(() => {
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log(data);
      },
      onFailure: (data) => {
        console.log(data);
      },
      inputVerificationCode: (data) => {
        console.log(data);
      },
    });
  }, [EMAIL]);

  const CreatePassword = async () => {
    getUser().confirmPassword(code, password, {
      onSuccess: function (result) {
        toast.success("Password changed successfully");
        navigate("/login");
      },
      onFailure: function (err) {
        toast.error(`${err}`);
      },
    });
  };

  return (
    <section className="py-12 sm:py-16">
      <Link className="w-auto flex justify-center h-8 mx-auto lg:mx-0 mb-10 md:mb-16">
        <Logo />
      </Link>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative max-w-md mx-auto lg:max-w-lg">
          <div className="absolute -inset-2">
            <div
              className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
              style={{
                background:
                  "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
              }}
            ></div>
          </div>

          <div className="relative overflow-hidden bg-white shadow-xl rounded-xl">
            <div className="px-4 py-6 sm:px-8">
              <div className="sm:flex items-center justify-center flex-col xs:flex-row gap-2 xs:justify-between">
                <h1 className="text-xl text-center sm:text-start font-bold text-gray-900 font-pj">
                  Change password
                </h1>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-base font-medium text-gray-900 font-pj">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name=""
                      id=""
                      disabled
                      value={EMAIL}
                      placeholder="Email address"
                      className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900 font-pj">
                      OTP
                    </label>
                  </div>
                  <div className="mt-2.5">
                    <input
                      type="number"
                      name=""
                      id=""
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter OTP"
                      className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900 font-pj">
                      New Password
                    </label>
                  </div>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name=""
                      id=""
                      placeholder="Password (min. 8 character)"
                      className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                    />
                  </div>
                </div>
              </div>
              {/* <Link to="/dashboard"> */}
              <button
                onClick={CreatePassword}
                type="submit"
                className="active:scale-95 hover:scale-[1.02] flex items-center justify-center w-full px-8 py-4 mt-5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj"
              >
                Create new password
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PasswordChange;
