import {
  ArrowUpRight,
  Star,
  MoreVertical,
  MessageCircle,
  Pencil,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { Dropdown, Select, Space, type MenuProps } from "antd";

const data = [
  { name: "Active", value: 40, color: "#0D6832" },
  { name: "Ready to Load", value: 12, color: "#34D399" },
  { name: "Loading Delayed", value: 23, color: "#60A5FA" },
  { name: "Ready to Un-load", value: 3, color: "#3B82F6" },
  { name: "Unloading Delayed", value: 12, color: "#93C5FD" },
  { name: "Canceled", value: 3, color: "#111827" },
];

const data2 = [
  { name: "Completed", value: 84, color: "#022C22" }, // dark green
  { name: "Remaining", value: 100 - 84, color: "#F3FFF3" }, // light green
];
const items: MenuProps["items"] = [
  {
    label: "Item",
    key: "0",
  },
  {
    label: "Name",
    key: "1",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const growthData = [
  { year: "2016", value: 5000 },
  { year: "2017", value: 9000 },
  { year: "2018", value: 30000 },
  { year: "2019", value: 50000 },
  { year: "2020", value: 8000 },
  { year: "2021", value: 15000 },
  { year: "2022", value: 45000 },
  { year: "2023", value: 60000 },
];
const Dashboard = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  console.log(total);

  return (
    <div className="p-2 space-y-3 bg-gray-50 min-h-screen w-full">
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-2">
        {/* Total Routes */}
        <div className=" bg-white p-3 pl-14">
          <p className="mt-4 text-2xl font-bold mb-2">Total Routes</p>
          <h2 className="text-5xl mt-8 flex items-center">
            15% <ArrowUpRight className="ml-3 w-9 h-9 text-green-600" />
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Increase compared to last week
          </p>
          <p className="mt-3 text-green-700 cursor-pointer">
            Reports →
          </p>
        </div>

        {/* Routes Completed */}
        <div className="bg-white p-2 text-center">
          <p className="text-2xl font-semibold mb-2">Routes Completed</p>

          {/* Gauge-style Half Circle */}
          <div className="relative w-[160px] h-[90px] mx-auto overflow-hidden">
            <PieChart width={160} height={90}>
              <Pie
                data={data2}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={65}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                cornerRadius={10}
              >
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            {/* Center Text */}
            <div className="absolute inset-0 flex justify-center items-center mt-6">
              <span className="text-xl font-semibold">84%</span>
            </div>
          </div>

          <p className="text-green-700 mt-8 cursor-pointer">
            All goals →
          </p>
        </div>

        {/* Truck Status */}
        <div className="bg-white pr-2 ">
          <div className="mt-3 ml-2 flex justify-between items-center mb-4">
            <h3 className="font-medium text-1.9xl">Loading Trucks</h3>
            <span className="text-blue-600 text-sm cursor-pointer">
              View All
            </span>
          </div>

          <div className="flex space-x-5">
            {/* Doughnut Chart */}
            <div className="w-[120px] h-[120px] relative">
              <PieChart width={120} height={120}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={49}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[46%] text-center text-[10px]">
                <p className="text-[20px] font-semibold">120</p>
                <p className="text-xs text-gray-500">Total Trucks</p>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm pl-6">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-[3px] h-[20px]"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-medium">{item.value}</p>
                    <p className="text-gray-600 text-xs">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Month */}
        <div className="bg-white p-4 ">
          <p className="text-sm text-gray-500 mb-8">Top month</p>
          <div className="mt-27">
            <p className=" text-2xl font-bold">November</p>
            <p className="text-gray-500">2019</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-2">
        {/* Customers */}
        <div className="bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Customers</h3>

            <Dropdown
              menu={{ items }}
              trigger={["hover"]}
              className="cursor-default"
            >
              <Space>
                Sort by<span className="font-semibold">Newest</span>
              </Space>
            </Dropdown>
          </div>
          <div className="space-y-1">
            {[
              {
                name: "Chris Friedkly",
                company: "Supermarket Villanova",
                avatar: "👨‍💼",
              },
              {
                name: "Maggie Johnson",
                company: "Oasis Organic Inc.",
                active: true,
                avatar: "👩‍💼",
              },
              {
                name: "Gael Harry",
                company: "New York Finest Fruits",
                avatar: "👨‍💼",
              },
              {
                name: "Jenna Sullivan",
                company: "Walmart",
                avatar: "👩‍💼",
              },
            ].map((customer, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-2 ${
                  customer.active ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
                    <span className="text-sm">{customer.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.company}</p>
                  </div>
                </div>
                {customer.active && (
                  <div className="flex items-center space-x-6">
                    <MessageCircle size={20} className="cursor-pointer" />
                    <Star size={20} className="cursor-pointer" />
                    <Pencil size={20} className="cursor-pointer" />
                    <MoreVertical
                      size={20}
                      className="text-gray-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-green-700 underline cursor-pointer">
            All customers →
          </p>
        </div>

        {/* Growth Chart */}
        <div className="bg-white p-3">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Growth</h3>
            <Select
              defaultValue="yearly"
              className="w-24 text-sm"
              size="small"
              bordered={false}
            >
              <Select.Option value="yearly">Yearly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="hourly">Hourly</Select.Option>
            </Select>
          </div>

          {/* Area Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={growthData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="growthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#bbf7d0" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="url(#growthGradient)"
                  strokeDasharray="4 2"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Top year</p>
              <p className="text-xl font-bold">2023</p>
              <p className="text-sm text-gray-500">96K sold so far</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Top Customer</p>
              <div className="flex items-center space-x-2 mt-1">
                <img
                  src={"./Avatar.jpg"} // replace with actual customer avatar
                  alt="Maggie Johnson"
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-medium text-sm">Maggie Johnson</p>
                  <p className="text-xs text-gray-500">Oasis Organic Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-3">
        {/* Chats */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-2">Chats</h3>
          <p className="text-sm text-gray-500 mb-4">2 unread messages</p>
          <div className="flex space-x-4">
            {[
              { emoji: "👨‍💼", bg: "bg-blue-100" },
              { emoji: "👩‍💼", bg: "bg-green-100" },
              { emoji: "👨‍💼", bg: "bg-purple-100" },
              { emoji: "👩‍💼", bg: "bg-pink-100" },
            ].map((avatar, i) => (
              <div
                key={i}
                className={`w-12 h-12 ${avatar.bg} border-2 border-white flex items-center justify-center`}
              >
                <span className="text-xs">{avatar.emoji}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-green-700 underline cursor-pointer">
            All messages →
          </p>
        </div>

        {/* Top States */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Top states</h3>
          <div className="space-y-3">
            {[
              { state: "NY", value: "120K", percentage: 100 },
              { state: "MA", value: "80K", percentage: 75 },
              { state: "NH", value: "70K", percentage: 65 },
              { state: "OR", value: "50K", percentage: 45 },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-3 py-2 text-sm font-semibold"
                style={{
                  background: `linear-gradient(to right, #10b981, #bbf7d0)`,
                  width: `${item.percentage}%`,
                }}
              >
                <span className="text-black">{item.state}</span>
                <span className="text-black">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New Routes */}
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">New Routes</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              "Fruit2Go",
              "Marshall's MKT",
              "CCNT",
              "Joana Mini-market",
              "Little Brazil Vegan",
              "Target",
              "Organic Place",
              "Morello's",
            ].map((route, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-3 py-2 bg-green-100 text-green-800 text-sm"
              >
                
                <img src={"./Icon (from Tabler.io).svg"} alt="" className="mr-1"/>
                {route}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
