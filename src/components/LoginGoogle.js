import React, { useState } from "react";
const jwt_decode = require("jwt-decode").default;
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_URL } from "../constants/constant";

const clientId =
  "403680778141-vc53o3fr7pumkgv1hhmnt16lcf12ao4i.apps.googleusercontent.com"; // Replace with your actual client ID

const LoginGoogle = ({ handlGoogleApi }) => {
  // const [userDetails,setUserDetails] = useState({})
  const handleSuccess = async (response) => {
    try {
      const decoded = jwt_decode(response.credential);

      const res = await axios.post(
        `${API_URL}google-login`,
        { token: response.credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res, "google login");

      // getting user login details from google api like email firstname lastname etc
      if (res.status === 200) {
        console.log(res);
        // setEmail(res.data.user.email);
        handlGoogleApi(res.data.user.email);
      }
    } catch (err) {
      console.error(err.message);
    }

    // Send token to backend for authentication
  };

  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center  px-2">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
          width="200px"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
