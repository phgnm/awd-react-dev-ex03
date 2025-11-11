import { useState } from "react";
import Background from "../components/Background";
import { Link } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email && form.password)
            setStatus({
                type: "success",
                msg: "Login simulated successfully"
            });
        else
            setStatus({
                type: "error",
                msg: "Please fill all fields"
            });
    }

    return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <BackToHomeButton />
      <Background />
      <form onSubmit={handleSubmit} className="form-card">
        <h1>Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input-field"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input-field"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary">Login</button>

        {status && (
          <p className={status.type === "success" ? "success-text" : "error-text"}>
            {status.msg}
          </p>
        )}

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