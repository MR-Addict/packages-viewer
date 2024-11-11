import { useLocaleContext } from "@/contexts/locale";

const intervalMap = {
  year: "year",
  month: "month",
  week: "week",
  day: "day",
  hour: "hour",
  minute: "minute",
  second: "second"
} as const;

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneWeek = oneDay * 7;
const oneMonth = oneDay * 30;
const oneYear = oneDay * 365;

export default function timeInterval(date: string | Date) {
  const newDate = date instanceof Date ? date : new Date(date);
  const currentDate = new Date(new Date().getTime() + oneSecond);
  const ago = currentDate.getTime() >= new Date(newDate).getTime();

  let isNeedCheck = true;
  let interval = { key: "second", value: 0 };
  let leftTime = currentDate.getTime() - new Date(newDate).getTime();
  if (!ago) leftTime = new Date(newDate).getTime() - currentDate.getTime();

  const year = Math.floor(leftTime / oneYear);
  leftTime = leftTime % oneYear;
  if (year >= 1 && isNeedCheck) {
    interval.key = intervalMap.year;
    interval.value = year;
    isNeedCheck = false;
  }

  const month = Math.floor(leftTime / oneMonth);
  leftTime = leftTime % oneMonth;
  if (month >= 1 && isNeedCheck) {
    interval.key = intervalMap.month;
    interval.value = month;
    isNeedCheck = false;
  }

  const week = Math.floor(leftTime / oneWeek);
  leftTime = leftTime % oneWeek;
  if (week >= 1 && isNeedCheck) {
    interval.key = intervalMap.week;
    interval.value = week;
    isNeedCheck = false;
  }

  const day = Math.floor(leftTime / oneDay);
  leftTime = leftTime % oneDay;
  if (day >= 1 && isNeedCheck) {
    interval.key = intervalMap.day;
    interval.value = day;
    isNeedCheck = false;
  }

  const hour = Math.floor(leftTime / oneHour);
  leftTime = leftTime % oneHour;
  if (hour >= 1 && isNeedCheck) {
    interval.key = intervalMap.hour;
    interval.value = hour;
    isNeedCheck = false;
  }

  const minute = Math.floor(leftTime / oneMinute);
  leftTime = leftTime % oneMinute;
  if (minute >= 1 && isNeedCheck) {
    interval.key = intervalMap.minute;
    interval.value = minute;
    isNeedCheck = false;
  }

  const second = Math.floor(leftTime / oneSecond);
  if (second > 0 && isNeedCheck) {
    interval.key = intervalMap.second;
    interval.value = second;
    isNeedCheck = false;
  }

  const { translate } = useLocaleContext();
  const tt = (label: string | string[]) => translate(label, "time");

  if (interval.key === intervalMap.second) return tt("just now");

  if (interval.value === 1) {
    if (ago) return tt(`last ${interval.key}`);
    return tt(`next ${interval.key}`);
  } else return tt(`${interval.value} ${interval.key}s ${ago ? "ago" : "later"}`.split(" "));
}
