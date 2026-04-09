import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
type data={
  min:string,
  metric:string
}

export default function LineGraph({data,metric}:{data:Array<data>,metric:string}) {
  

  // const smothenData=data.map((item:any)=>({
  //  ...item,min:dateTimeConversion(item.min)
  // }))
  const timeConversion=(d:string|Date):string=>
  new Date(d).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});
  
  const smothenTimeOnlyData=data.map((item:any)=>({
    ...item,min:timeConversion(item.min)
  }))
  //item.metric does not work item[metric]
 const dataMap=new Map();
 smothenTimeOnlyData.forEach((item)=>{
  dataMap.set(item.min,item[metric]);
 })
const currentTime = new Date();
const dataT=[];
let recentTime:Date |null=null
let oldTime:Date |null=null
for(let i=4;i>=0;i--){
  //set the actual time
  const temp=new Date(Date.now());
  temp.setMinutes(currentTime.getMinutes()-i);
   const time = temp.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  if(i==0){
    recentTime=temp
  }else if(i==4){
    oldTime=temp
  }
  dataT.push({
  min: time,
  [metric]: dataMap.has(time) ? dataMap.get(time) : null
});

}
const hasData = dataT.some(d => d[metric] !== null);
  return (
    <>
    <div className='text-gray-400 flex  justify-end  '>
    {recentTime && oldTime &&`${timeConversion(oldTime)}-${timeConversion(recentTime)} `}
    </div>
    <LineChart
      style={{ width: '80%', aspectRatio: 1.618,minWidth:400, maxWidth: 500,outline:'none' }}
      responsive
      data={dataT}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5"
      />
      <Line type="monotone" dataKey={metric} stroke="yellow" strokeWidth={1} name={metric} />
       <Line dataKey={() => 0} stroke="transparent" dot={false} />
      <XAxis dataKey="min" interval={0}  fontSize={12} />
      <YAxis
        domain={hasData ? [0, 'auto'] : [0, 100]}
      
      />
      <Legend align="right" />
      <Tooltip />
      <RechartsDevtools />
    </LineChart>
    </>
  );
}