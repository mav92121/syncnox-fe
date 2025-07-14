// import {
//   ArrowUpRight,
//   Star,
//   Edit,
//   MoreVertical,
//   PlusCircle,
// } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <div className="p-6 space-y-6">
//       {/* Top Metrics */}
//       <div className="grid grid-cols-6 gap-6">
//         <div>
//           <p className="text-sm text-gray-500">Total Routes</p>
//           <h2 className="mt-3 text-4xl ">
//             15% <ArrowUpRight className="inline w-4 h-4 text-green-600" />
//           </h2>
//           <p className="mt-2 text-xs text-gray-400">
//             Increase compared to last week
//           </p>
//           <p className="mt-2 text-sm text-green-700 underline cursor-pointer">
//             Reports →
//           </p>
//         </div>

//         <div>
//           <p className="text-2xl font-semibold text-black-500">
//             Routes Completed
//           </p>
//           <div className="mt-2 w-[150px] h-[150px] rounded-full border-[10px] border-green-800 border-t-green-200 flex items-center justify-center text-2xl font-bold">
//             84%
//           </div>
//           <p className="mt-2 text-sm text-green-700 underline cursor-pointer">
//             All goals →
//           </p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500 mb-2">Loading Trucks</p>
//           <div className="mt-3.5 w-[150px] h-[150px] rounded-full border-[20px] border-green-600 border-t-gray-700 border-b-blue-400 grid items-center justify-center text-sm font-bold">
//             120
//             <br />
//             <span className="text-xs text-gray-500 font-medium">
//               Total Trucks
//             </span>
//           </div>
//         </div>

//         <div className="text-sm">
//           <p className="text-blue-700 cursor-pointer text-right">View All</p>
//           <div className="grid grid-cols-2 gap-4">
//             <ul className="mt-2 space-y-1">
//               <li className="flex justify-between">
//                 <span className="text-green-700">Active</span>
//                 <span>40</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Ready to Load</span>
//                 <span>12</span>
//               </li>
//               <li className="flex justify-between">
//                 <span className="text-blue-700">Loading Delayed</span>
//                 <span>23</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Ready to Un-load</span>
//                 <span>3</span>
//               </li>
//               <li className="flex justify-between">
//                 <span className="text-blue-700">Unloading Delayed</span>
//                 <span>12</span>
//               </li>
//               <li className="flex justify-between">
//                 <span className="text-gray-400">Canceled</span>
//                 <span>3</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div>
//           <p className="font-semibold">Top month</p>
//           <p className="mt-40 text-lg font-bold">November</p>
//           <p className="text-gray-500">2019</p>
//         </div>
//       </div>

//       {/* Customers */}
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Customers</h3>
//           <ul className="divide-y divide-gray-200">
//             {[
//               { name: "Chris Friedkly", company: "Supermarket Villanova" },
//               {
//                 name: "Maggie Johnson",
//                 company: "Oasis Organic Inc.",
//                 active: true,
//               },
//               { name: "Gael Harry", company: "New York Finest Fruits" },
//               { name: "Jenna Sullivan", company: "Walmart" },
//             ].map((c, i) => (
//               <li
//                 key={i}
//                 className={`py-3 px-2 flex justify-between items-center rounded ${
//                   c.active ? "bg-green-50" : ""
//                 }`}
//               >
//                 <div>
//                   <p className="font-medium">{c.name}</p>
//                   <p className="text-sm text-gray-500">{c.company}</p>
//                 </div>
//                 {c.active && (
//                   <div className="flex items-center space-x-3 text-gray-600">
//                     <Star size={16} className="cursor-pointer" />
//                     <Edit size={16} className="cursor-pointer" />
//                     <MoreVertical size={16} className="cursor-pointer" />
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//           <p className="mt-2 text-green-700 underline cursor-pointer">
//             All customers →
//           </p>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2">Growth</h3>
//           <img
//             src="/growth-chart.svg"
//             alt="Growth Chart"
//             className="w-full h-[180px] object-contain"
//           />
//           <div className="flex justify-between items-center mt-4 text-sm">
//             <div>
//               <p className="text-gray-500">Top year</p>
//               <p className="text-lg font-bold">2023</p>
//               <p className="text-gray-500">96K sold so far</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Top Customer</p>
//               <div className="font-medium">Maggie Johnson</div>
//               <p className="text-sm text-gray-500">Oasis Organic Inc.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Grid */}
//       <div className="grid grid-cols-3 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Chats</h3>
//           <p className="text-sm text-gray-500 mb-2">2 unread messages</p>
//           <div className="flex -space-x-3">
//             {[1, 2, 3, 4].map((i) => (
//               <img
//                 key={i}
//                 src={`/avatar${i}.svg`}
//                 alt="Avatar"
//                 className="w-8 h-8 rounded-full border-2 border-white"
//               />
//             ))}
//           </div>
//           <p className="mt-2 text-green-700 underline cursor-pointer">
//             All messages →
//           </p>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2">Top states</h3>
//           {[
//             { state: "NY", value: "120K" },
//             { state: "MA", value: "80K" },
//             { state: "NH", value: "70K" },
//             { state: "OR", value: "50K" },
//           ].map((s, i) => (
//             <div
//               key={i}
//               className="flex justify-between items-center bg-green-100 px-3 py-1 rounded mb-2 text-sm"
//             >
//               <span className="font-medium">{s.state}</span>
//               <span>{s.value}</span>
//             </div>
//           ))}
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2">New Routes</h3>
//           <div className="flex flex-wrap gap-2">
//             {[
//               "Fruit2Go",
//               "Marshall's MKT",
//               "CCNT",
//               "Joana Mini-market",
//               "Little Brazil Vegan",
//               "Target",
//               "Organic Place",
//               "Morello's",
//             ].map((route, i) => (
//               <div
//                 key={i}
//                 className="flex items-center px-3 py-1 bg-green-50 text-green-900 text-sm rounded-full"
//               >
//                 <PlusCircle size={14} className="mr-1" />
//                 {route}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import {
  ArrowUpRight,
  Star,
  Edit,
  MoreVertical,
  PlusCircle,
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

const COLORS = data.map((item) => item.color);

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
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {/* Total Routes */}
        <div className=" bg-white p-3 pl-14">
          <p className="mt-4 text-2xl font-bold mb-2">Total Routes</p>
          <h2 className="text-5xl mt-8 flex items-center">
            15% <ArrowUpRight className="ml-3 w-9 h-9 text-green-600" />
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Increase compared to last week
          </p>
          <p className="mt-5 text-green-700 cursor-pointer">
            Reports →
          </p>
        </div>

        {/* Routes Completed */}
        <div className="bg-white p-4 rounded-lg text-center">
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
        <div className="bg-white pr-2 rounded-lg">
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
                    className="w-[3px] h-[20px] rounded-sm"
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
        <div className="bg-white p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-8">Top month</p>
          <div className="mt-27">
            <p className=" text-2xl font-bold">November</p>
            <p className="text-gray-500">2019</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Customers */}
        <div className="bg-white p-4 rounded-lg">
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
                className={`flex items-center justify-between p-2 rounded ${
                  customer.active ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
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
        <div className="bg-white p-4 rounded-lg">
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
                  className="w-10 h-10 rounded-full"
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
      <div className="grid grid-cols-3 gap-6">
        {/* Chats */}
        <div className="bg-white p-4 rounded-lg">
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
                className={`w-12 h-12 rounded-sm ${avatar.bg} border-2 border-white flex items-center justify-center`}
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
        <div className="bg-white p-4 rounded-lg">
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
        <div className="bg-white p-4 rounded-lg">
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
