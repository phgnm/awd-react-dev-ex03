import { Link } from "react-router-dom";
import Background from "../components/Background";

function Home() {
    return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <Background />
      <h1 className="text-5xl font-extrabold mb-10 text-center">🚀 Welcome to IA03</h1>

      <div className="flex gap-6">
        <Link to="/login" className="btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home