import { useState } from 'react';
import classes from './CalendarBody.module.css';
import Day from './Day.tsx';
import useGetCalendarDates from '../hooks/useGetCalendarDates.ts';
import { isDateEarlier, isInDateRange } from '../utils/dateUtils.ts';

interface Props {
  year?: number;
  month?: number;
  rowLength?: number;
  onRangeChanged?: (dateRange: Array<Date>) => void;
}

export default function CalendarBody({
  rowLength,
  year,
  month,
  onRangeChanged,
}: Props) {
  const [dateRange, setDateRange] = useState<Array<Date>>([]);
  const { dates } = useGetCalendarDates({ rowLength, year, month });

  const onDateClick = (date: Date) => {
    const startDate = dateRange[0];
    if (!startDate || dateRange.length >= 2 || isDateEarlier(startDate, date)) {
      setDateRange([date]);
      return;
    }
    setDateRange([startDate, date]);
    onRangeChanged && onRangeChanged([startDate, date]);
  };

  return (
    <div className={classes.calendarBody}>
      {dates?.map((date, i) => (
        <Day
          key={i}
          date={date}
          onClick={() => onDateClick(date)}
          active={isInDateRange(date, dateRange)}
          lighter={date.getMonth() !== month}
          enableTodayHighlight={true}
        />
      ))}
    </div>
  );
}
