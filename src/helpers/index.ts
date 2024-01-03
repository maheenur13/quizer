export const dateToFormat = (dateString: string) => {
  const date = new Date(dateString);
  const localDate = date.toLocaleDateString(); // Local date
  const localTime = date.toLocaleTimeString(); // Local time
  return localDate + " , " + localTime;
};
