import { Link } from "react-router-dom";
import Background from "../components/Background";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated, logout } = useAuth(); // Get auth state

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <Background />

      <div className="absolute top-6 right-6 z-10 flex gap-4">
        {isAuthenticated ? (
          // If logged in, either check user's account or logout
          <>
            <Link to="/account" className="btn-secondary !mt-0">
              My Account
            </Link>
            <button onClick={logout} className="btn-primary !mt-0">
              Logout
            </button>
          </>
        ) : (
          // Otherwise, login or register
          <Link to="/login" className="btn-primary !mt-0">
            Login / Register
          </Link>
        )}
      </div>

      <h1 className="text-5xl font-extrabold mb-10 text-center">🚀 Welcome to IA03 & IA04</h1>

      <div className="flex gap-6">
        {isAuthenticated ? (
          // If logged in, show a big button to their account
          <Link to="/account" className="btn-primary text-lg px-8 py-3">
            Go to My Account
          </Link>
        ) : (
          // If not logged in, show Login and Register
          <>
            <Link to="/login" className="btn-primary px-6">
              Login
            </Link>
            <Link to="/register" className="btn-secondary px-6">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home