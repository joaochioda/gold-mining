import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <div>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
};

export default LoginContainer;
