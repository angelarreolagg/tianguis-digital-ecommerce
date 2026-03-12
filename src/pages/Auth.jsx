import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { signUp, login } = useAuth();
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    const { email, password } = data;

    if (mode === "signup") {
      result = signUp(email, password);
    } else {
      result = login(email, password);
    }

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                id="email"
                className="form-input"
                type="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Email is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
                id="password"
                className="form-input"
                type="password"
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <button className="btn-auth-link " onClick={() => setMode("login")}>
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button className="btn-auth-link " onClick={() => setMode("signup")}>
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
