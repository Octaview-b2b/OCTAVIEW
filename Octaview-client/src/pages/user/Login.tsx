import React, { useState } from "react";
import { LoginForm } from "../../components/user/Login";
import { SignupForm } from "../../components/user/Signup";

function Login() {
  const [activeTab, setActiveTab] = useState("login"); // State to track active tab

  return (
    <div className="flex flex-col items-center">
      {/* Active Form */}
      {activeTab === "login" ? (
        <div className="flex flex-col items-center">
          <LoginForm />
          {/* Switch to Signup Link */}
          <p className="mt-4">
            Don't have an account? 
            <button 
              className="text-blue-500 underline ml-1" 
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <SignupForm />
          {/* Switch to Login Link */}
          <p className="mt-4">
            Already have an account? 
            <button 
              className="text-blue-500 underline ml-1" 
              onClick={() => setActiveTab("login")}
            >
              Log In
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;

