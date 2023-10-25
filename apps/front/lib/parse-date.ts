import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
export const parseDateDDMMYYYY = (dateString: string) => {
  if (!dayjs(dateString).isValid()) {
    return dateString;
  }
  const date = new Date(dateString);
  return dayjs(date).format("DD/MM/YYYY");
};
