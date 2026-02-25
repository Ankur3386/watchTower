

export const calculateCpu=(cpuAtStart,startTimeCpu)=>{
    const endTIme=Date.now();
    const endCpuUsage=process.cpuUsage(cpuAtStart)
    const duration=endTIme-startTimeCpu
    const totalUsage=(endCpuUsage.user +endCpuUsage.system)/1000  // micro to milli
    let cpuPercent =((totalUsage/duration)*100) .toFixed(2)
    return cpuPercent
}

export const memoryUsed=()=>{
    const memory =process.memoryUsage();
    const totalMemory =(memory.rss/1024/1024).toFixed(2);
    return totalMemory
}

  