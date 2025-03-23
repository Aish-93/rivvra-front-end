import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode"; 

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual client ID

const LoginGoogle = () => {
  const handleSuccess = (response) => {
    const decoded = response.credential;
    // jwt_decode(
        
    // ); 

    console.log("Google User:", decoded);
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
