import NavBar from "../components/navBar.jsx";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <NavBar />

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-semibold text-blue-400">Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
