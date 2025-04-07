import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_URL } from "../constants/constant";
// import jwt_decode from "jwt-decode"; 

const clientId = "403680778141-vc53o3fr7pumkgv1hhmnt16lcf12ao4i.apps.googleusercontent.com"; // Replace with your actual client ID


const LoginGoogle = () => {

  // const [userDetails,setUserDetails] = useState({})
  const handleSuccess = async (response) => {
    const decoded = response.credential;


    try{

      const res = await axios.post(`${API_URL}google-login`,JSON.stringify(decoded));

      console.log(res,"google login")
      
    }
    catch(err){
      console.error(err.message)
    }
    // jwt_decode(
        
    // ); 

    console.log("Google User:", decoded, response);
    // Send token to backend for authentication
  };

  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center">
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
