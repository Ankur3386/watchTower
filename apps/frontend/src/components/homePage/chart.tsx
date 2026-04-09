import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// CPU usage data
const data = [
  { time: "10:00", cpu: 35 },
  { time: "10:05", cpu: 55 },
  { time: "10:10", cpu: 48 },
  { time: "10:15", cpu: 70 },
  { time: "10:20", cpu: 62 },
  { time: "10:25", cpu: 80 },
  { time: "10:30", cpu: 65 },
];

const CpuUsageChart = ({ isAnimationActive = true }) => (
  <LineChart
    style={{
      width: "100%",
      maxWidth: "700px",
      maxHeight: "70vh",
      aspectRatio: 1.618,
    }}
    responsive
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />

    {/* Time on X-axis */}
    <XAxis dataKey="time" />

    {/* CPU % on Y-axis */}
    <YAxis domain={[0, 100]} width="auto" />

    <Tooltip />
    <Legend />

    {/* CPU line */}
    <Line
      type="monotone"
      dataKey="cpu"
      stroke="#ff7300"
      name="CPU Usage (%)"
      isAnimationActive={isAnimationActive}
    />

    <RechartsDevtools />
  </LineChart>
);

export default CpuUsageChart;