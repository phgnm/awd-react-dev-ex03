import { Link } from "react-router-dom";


export default function BackToHomeButton({ label = "Back to Home" }) {
  return (
    <Link
      to="/"
      className="
        fixed top-4 left-4 z-50
        flex items-center gap-2
        bg-white/10 backdrop-blur-sm
        text-gray-200 text-sm font-medium
        px-4 py-2 rounded-lg
        shadow-md
        transition-all duration-300
        hover:bg-white/20 hover:text-white
        hover:shadow-lg
      "
    >
      <span className="text-lg">←</span>
      <span>{label}</span>
    </Link>
  );
}