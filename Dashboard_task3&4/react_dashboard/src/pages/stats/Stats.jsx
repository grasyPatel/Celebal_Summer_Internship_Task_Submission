import "./Stats.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  ScatterChart,
  Scatter,
  RadialBarChart,
  RadialBar,
} from "recharts";

const data = [
  { name: "Jan", users: 4000, sales: 2400 },
  { name: "Feb", users: 3000, sales: 1398 },
  { name: "Mar", users: 2000, sales: 9800 },
  { name: "Apr", users: 2780, sales: 3908 },
  { name: "May", users: 1890, sales: 4800 },
  { name: "Jun", users: 2390, sales: 3800 },
  { name: "Jul", users: 3490, sales: 4300 },
];

const pieData = [
  { name: "Active", value: 600 },
  { name: "Inactive", value: 400 },
];
const areaData = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 900 },
  { month: "Apr", revenue: 1600 },
];

const radarData = [
  { subject: "Login", A: 120, fullMark: 150 },
  { subject: "Profile", A: 98, fullMark: 150 },
  { subject: "Orders", A: 86, fullMark: 150 },
  { subject: "Products", A: 99, fullMark: 150 },
  { subject: "Settings", A: 85, fullMark: 150 },
];

const composedData = [
  { name: "A", uv: 590, pv: 800 },
  { name: "B", uv: 868, pv: 967 },
  { name: "C", uv: 1397, pv: 1098 },
  { name: "D", uv: 1480, pv: 1200 },
];

const radialData = [
  { name: "Progress", value: 75, fill: "#8884d8" },
  { name: "Completed", value: 100, fill: "#82ca9d" },
];

const scatterData = [
  { x: 100, y: 200 },
  { x: 120, y: 100 },
  { x: 170, y: 300 },
  { x: 140, y: 250 },
];


const COLORS = ["#8884d8", "#82ca9d"];

const Stats = () => {
  return (
    <div className="stats">
      <Sidebar />
      <div className="newcontainer">
        <Navbar />

        <div className="top">
          <div className="chartCard">
            <h3>User Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chartCard">
            <h3>Sales Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bottom">
          <div className="chartCard pie">
            <h3>User Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
           {/* Area Chart */}
  <div className="chartCard">
    <h3>Revenue Trend</h3>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={areaData}>
        <defs>
          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRev)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>

  {/* Radar Chart */}
  <div className="chartCard">
    <h3>Feature Usage</h3>
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart outerRadius={90} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
</div>

<div className="bottom">
  {/* Composed Chart */}
  <div className="chartCard">
    <h3>Combined Metrics</h3>
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={composedData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>

  {/* Radial Bar Chart */}
  <div className="chartCard">
    <h3>Completion</h3>
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={10}
        data={radialData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar background clockWise dataKey="value" />
        <Legend />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  </div>

  {/* Scatter Chart */}
  <div className="chartCard">
    <h3>Scatter: X vs Y</h3>
    <ResponsiveContainer width="100%" height={250}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="X" />
        <YAxis type="number" dataKey="y" name="Y" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Data Points" data={scatterData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
