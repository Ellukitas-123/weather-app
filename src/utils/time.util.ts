export function getHourNatural(time: string) {
  if (time.includes("AM")) {
    return time.replace(" AM", ":00");
  }
  const timeStr = time.replace(" PM", ":00");
  const timeArr = timeStr.split(":");
  timeArr[0] = (Number.parseInt(timeArr[0]) + 12).toString().padStart(2, "0");
  return timeArr.join(":");
}
