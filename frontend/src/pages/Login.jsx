import { useEffect, useState } from "react";
import Background from "../components/Background";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const from = location.state?.from?.pathName || '/account';

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const { mutate, isPending, isError, error: loginError } = useLogin();

    useEffect(() => {
      if (isAuthenticated) {
        navigate(from, { replace: true});
      }
    }, [isAuthenticated, navigate, from]);

    const onSubmit = (data) => {
      mutate(data);
    };

    return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <BackToHomeButton />
      <Background />
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <h1>Login</h1>

        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          className="input-field"
        />
        {errors.email && (
          <p className="message-error -mt-2 mb-2">{errors.email.message}</p>
        )}

        <input
          {...register('password', { required: 'Password is required' })}
          type="password"
          placeholder="Password"
          className="input-field"
        />
        {errors.password && (
          <p className="message-error -mt-2 mb-2">{errors.password.message}</p>
        )}

        <button 
          type="submit" 
          className="btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>

        {isError && <p className="message-error">{loginError.message}</p>}

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login