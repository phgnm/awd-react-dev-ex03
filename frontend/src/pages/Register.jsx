import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import Background from "../components/Background";
import { Link } from "react-router-dom";

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate, isPending, isSuccess, isError, error } = useRegister();

    const onSubmit = (data) => mutate(data);

    return(
        <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
            <Background />
            <form onSubmit={handleSubmit(onSubmit)} className="form-card">
                <h1>Register</h1>

                <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="input-field"
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}

                <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="input-field"
                />
                {errors.password && <p className="error-text">{errors.password.message}</p>}

                <button type="submit" className="btn-primary" disabled={isPending}>
                {isPending ? "Registering..." : "Sign Up"}
                </button>

                {isSuccess && <p className="success-text">🎉 Registered successfully!</p>}
                {isError && <p className="error-text">{error.message}</p>}

                <p className="mt-4 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:underline">
                    Login
                </Link>
                </p>
            </form>
        </div>
    )
}

export default Register