import { useMemo } from 'react';

interface Props {
  year?: number;
  month?: number;
  rowLength?: number;
  weekdayOffset?: number; // 0: Sun. as the 1st week day; -1: Mon. as the 1st; 1: Sat. as the 1st; range: [-6, 6]
}

export default function useGetCalendarDates({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  rowLength = 6,
  weekdayOffset: _inputWeekdayOffset = -1,
}: Props) {
  const DAYS_PER_WEEK = 7;
  const dateLength = DAYS_PER_WEEK * rowLength;
  const weekdayOffset = _inputWeekdayOffset % DAYS_PER_WEEK;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dayLengthOfTheMonth = lastDay.getDate();

  const firstDayIndex =
    firstDay.getDay() + weekdayOffset < 0
      ? firstDay.getDay() + weekdayOffset + DAYS_PER_WEEK
      : firstDay.getDay() + weekdayOffset;
  const lastDayIndex = firstDayIndex + dayLengthOfTheMonth - 1;

  const dates = useMemo(
    () =>
      Array.from({ length: dateLength }, (_v, index) => {
        if (index < firstDayIndex) {
          return new Date(year, month, index - firstDayIndex + 1);
        }
        if (index > lastDayIndex) {
          return new Date(year, month + 1, index - lastDayIndex);
        }
        return new Date(year, month, index - firstDayIndex + 1);
      }),
    [rowLength, year, month]
  );

  return { dates };
}
