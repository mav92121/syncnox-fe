import SideBar from "./components/SideBar/SideBar";

const PlanDashboard = () => {
  return (
    <div className="flex h-screen w-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[60px] border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800">Plan /P1</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 5v14m-7-7h14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 20l9-9m-9 9l-9-9m9 9V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content Area - Map View */}
        <main className="flex-1 relative overflow-hidden p-6">
          {/* Map Background - Light colored map */}
          <div className="absolute inset-0 bg-[#f2f6f8] opacity-50">
            {/* Map content would be rendered here */}
            <div className="h-full w-full bg-[url('/map-background.png')] bg-cover bg-center opacity-30"></div>
          </div>

          {/* Action Button - Bottom Right */}
          <div className="absolute bottom-10 right-10">
            <button className="bg-[#0a6e41] text-white py-2.5 px-4 rounded-md flex items-center gap-2 shadow-md hover:bg-[#085234] transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 5v14m-7-7h14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium text-sm">Add New Drop Point</span>
            </button>
          </div>

          {/* User Profile - Bottom Left */}
          <div className="absolute bottom-6 left-6 flex items-center">
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden border-2 border-white">
              <img
                src="avatar.png"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlanDashboard;
