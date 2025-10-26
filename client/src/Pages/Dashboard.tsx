import { useState } from "react";
import ShowTodo from "./ShowTodo";
import CreateTodo from "./CreateTodo";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleTodoCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      {/* Circuit Board - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />
      {/* Your Content/Components */}
      <div className="relative z-1">
        <Navbar />
        <div className="mx-auto w-6xl h-screen  p-4  ">
          {/* Create Todo */}
          <div className="flex mx-auto justify-center mb-4">
            <CreateTodo onTodoCreated={handleTodoCreated} />
          </div>
          {/* show Todo */}
          <div className="h-fit  ">
            <ShowTodo refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
