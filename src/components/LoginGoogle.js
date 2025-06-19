import React, { useContext, useState } from "react";
const jwt_decode = require("jwt-decode").default;
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_URL } from "../constants/constant";
import { EmailContext } from "./context/emailContext";
import { useNavigate } from "react-router-dom";
import { setItem,setUrl } from "../utils/methods/methods";

const clientId =
  "403680778141-vc53o3fr7pumkgv1hhmnt16lcf12ao4i.apps.googleusercontent.com"; // Replace with your actual client ID

const LoginGoogle = ({ handlGoogleApi }) => {
  const navigate = useNavigate();
  // const [userDetails,setUserDetails] = useState({})

  const {
    setName,
    setLastName,
    setEmail,
    isLocalLogin,
    setIsLocalLogin,
    googleId,
    setGoogleId,
    googleToken,setGoogleToken
  } = useContext(EmailContext);
  const handleSuccess = async (response) => {
    try {
      const decoded = jwt_decode(response.credential);
    setGoogleToken(response.credential);

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

      

      if (res.status === 200 && res.data.message === "Login successful") {
        // redirect to login here user is already in db
        handlGoogleApi(res.data.data.emailId);
        let value = { data: res.data.data.name };

        setItem(value); // can add firstname and lastname also

        navigate("/");
        if (res.data.data.url) {
          setUrl(res.data.data.url);
          window.location.href = res.data.data.url;
        }

        // setEmail(res.data.data.emailId)
      } else if (res.status === 200 && res.data.message === "Sign up") {
        

        // here we need to create account
        handlGoogleApi(res.data.data.email);
        // setEmail(res.data.data.email)
        setLastName(res.data.data.family_name);
        setName(res.data.data.given_name);
        setGoogleId(res.data.data.sub);
        setIsLocalLogin(false);
        navigate("/signup");
      }
    } catch (err) {
      
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
