import Sidebar from "../../../components/SideBar";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore } from '../../../state/useAuthStore'; // Updated import



const data = [
  { date: "01/03", value: 4 },
  { date: "01/04", value: 5 },
  { date: "01/05", value: 6 },
  { date: "01/06", value: 5 },
  { date: "01/07", value: 4 },
];

const ShipperDashboard = () => {
  const { isAuthenticated, role } = useAuthStore();
  return (
    <div className="bg-white h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar isAuthenticated={isAuthenticated} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto lg:px-20">
        <h1 className="text-2xl font-bold mb-4 text-gray-500">Dashboard</h1>

        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Overview</h2>
          <span className="text-base font-semibold mb-4 md:mb-6 text-secondary">
            Date Time Range
          </span>

          <div className="grid lg:w-1/2 grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="border rounded-lg p-2 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="border  rounded-lg p-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Average Lead Time */}
            <div className="bg-light-grey p-4 rounded-lg shadow text-center flex-1">
              <p className="text-gray-600 font-semibold text-primary">
                Average Lead Time (in days)
              </p>
              <h3 className="text-4xl font-bold text-primary">5.3</h3>
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* On-Time Pickups (Grid) */}
            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="bg-light-grey p-4 rounded-lg shadow text-center  border border-gray-200"
                >
                  <p className="text-gray-600 text-left font-medium text-primary text-base sm:text-lg md:text-xl">
                    On-Time Pickups
                  </p>
                  <h3 className="text-2xl text-left sm:text-3xl md:text-2xl font-bold text-primary">
                    100%
                  </h3>
                </div>
              ))}
            </div>

            {/* Total Loads Analytics */}
            <div className="bg-light-grey rounded-lg shadow p-4 md:p-6 flex-1">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Total Loads Analytics
              </h2>
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-xl font-medium mb-4 text-secondary">Locations</h2>
          <input
            type="text"
            className="border rounded-lg p-2 mb-4 w-full md:w-auto"
            placeholder="All Locations"
          />

          {/* Sample Grids (to be replaced with dynamic data) */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-light-grey  rounded-lg shadow p-4 md:p-6 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-gray-600 text-primary">Load number</h3>
                  <p>ABC12345566</p>
                </div>
                <div>
                  <h3 className="text-gray-600 text-primary">
                    Delivery Address
                  </h3>
                  <p>Los Angeles, CA</p>
                </div>
                <div>
                  <h3 className="text-gray-600 text-primary">
                    Delivery Date & Time
                  </h3>
                  <p>01 July 2023 19:09 GMT</p>
                </div>
                <div>
                  <h3 className="text-gray-600 text-primary">Status</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipperDashboard;
