import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data


const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
};
// #endregion

const formatAxisTick = (value: any): string => {
  return `*${value}*`;
};

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
};

export default function BarGraph({data,metric}:{data:Array<object>,metric:string}) {
  return (
    <BarChart width={600} height={300} data={data} margin={margin}>
      <XAxis
        dataKey="min"
        tickFormatter={formatAxisTick}
        label={{ position: 'insideBottomRight', value: 'XAxis title', offset: -10 }}
      />
      <YAxis label={{ position: 'insideTopLeft', value: 'YAxis title', angle: -90, dy: 60 }} />
      <Bar dataKey={metric} fill="#8884d8" label={renderCustomBarLabel} />
      <RechartsDevtools />
    </BarChart>
  );
}