import NavBar from "../components/navBar.jsx";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <NavBar />

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-bold text-blue-400 tracking-wide">WGPT</h1>
        <p className="text-sm text-gray-400">Weather GPT - Landing</p>
      </div>
    </div>
  );
}

export default Landing;
