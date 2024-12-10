export const calculateRuntime = (startTime: number) => {
  const time = +(performance.now() - startTime).toFixed(3);

  if (time > 2000) {
    return `${Math.round(time) / 1000} seconds`;
  } else {
    return `${time} milliseconds`;
  }
};
