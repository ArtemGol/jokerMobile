export const isLiveFunc = (startTime: number, endTime: number) => {
  const gtmTime = Math.floor(new Date().getTime() / 1000);
  const isMatchStart = gtmTime >= (startTime || 0);
  const isMatchEnd = endTime && gtmTime >= endTime;
  return isMatchStart && !isMatchEnd;
};
