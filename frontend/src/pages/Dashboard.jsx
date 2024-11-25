import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  TruckIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

const data = [
  { name: "Jan", Shipments: 4000, Claims: 2400 },
  { name: "Feb", Shipments: 3000, Claims: 1398 },
  { name: "Mar", Shipments: 2000, Claims: 9800 },
  { name: "Apr", Shipments: 2780, Claims: 3908 },
  { name: "May", Shipments: 1890, Claims: 4800 },
  { name: "Jun", Shipments: 2390, Claims: 3800 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-darkGrey">Dashboard</h1>
        <button className="px-6 py-3 bg-yellow text-white rounded-lg shadow-md hover:bg-yellowHover transition">
          Create New Shipment
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[ 
          { title: "Total Shipments", value: "12", icon: TruckIcon, link: "View all" },
          { title: "Active Claims", value: "1", icon: DocumentDuplicateIcon, link: "View all" },
          { title: "Customer Satisfaction", value: "98.3%", icon: FaceSmileIcon, link: "View details" },
        ].map((card, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <card.icon className="h-6 w-6 text-yellow" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-darkGrey">{card.title}</p>
                <p className="text-2xl font-bold text-darkGrey">{card.value}</p>
              </div>
            </div>
            <a href="#" className="text-yellow mt-4 inline-block hover:underline">
              {card.link}
            </a>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-darkGrey mb-4">Shipments vs Claims Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Shipments" fill="#FF9900" />
            <Bar dataKey="Claims" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Shipments & Tasks */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Shipments */}
        <div className="md:col-span-4 bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-darkGrey">Recent Shipments</h3>
          <p className="text-sm text-darkGrey mt-2">You have 3 shipments in transit</p>
          <div className="mt-4 divide-y divide-gray-200">
            {[ 
              { label: "Shipment ID", value: "SH-2023-001" },
              { label: "Destination", value: "Delhi" },
            ].map((item, index) => (
              <div key={index} className="py-3">
                <p className="text-sm text-darkGrey">{item.label}</p>
                <p className="text-lg text-darkGrey">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="md:col-span-3 bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-darkGrey">Upcoming Tasks</h3>
          <p className="text-sm text-darkGrey mt-2">You have 5 tasks due soon</p>
          <ul className="mt-4 divide-y divide-gray-200">
            {[ 
              { task: "Submit customs declaration", due: "Due today", color: "bg-green-100 text-green-800" },
              { task: "Review shipping invoice", due: "Due tomorrow", color: "bg-yellow-100 text-yellow-800" },
            ].map((item, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <p className="text-darkGrey">{item.task}</p>
                <span className={`px-3 py-1 text-sm rounded-full ${item.color}`}>{item.due}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
