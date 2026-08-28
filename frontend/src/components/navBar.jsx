import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="flex items-center justify-between rounded-2xl px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-blue-400 transition-transform duration-200 hover:scale-105"
        >
          WGPT
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/chat"
            className="text-sm text-gray-200 transition-colors duration-200 hover:text-blue-400"
          >
            Chat
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-gray-200 transition-colors duration-200 hover:text-blue-400"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
