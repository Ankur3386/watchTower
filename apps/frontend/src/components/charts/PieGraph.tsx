import { Pie, PieChart, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
const PieGraph = ({data}:{data:Array<object>}) => {
   return (
    <PieChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
    >
      <Pie
        data={data}
        dataKey="min"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        isAnimationActive={true}
      />
     
      <Tooltip  />
      <RechartsDevtools />
    </PieChart>
  );
}

export default PieChart