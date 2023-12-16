export function isDateSame(date1: Date, date2: Date) {
  return date1?.toLocaleDateString() === date2?.toLocaleDateString();
}

export function isToday(date: Date) {
  return isDateSame(date, new Date());
}

export function isDateEarlier(date1: Date, date2: Date) {
  return !isDateSame(date1, date2) && date1?.getTime() >= date2?.getTime();
}

export function isInDateRange(date: Date, dateRange: Array<Date>) {
  if (!dateRange.length) {
    return false;
  }
  if (dateRange.length === 1) {
    return isDateSame(date, dateRange[0]);
  }
  return (
    date?.getTime() >= dateRange[0]?.getTime() &&
    date?.getTime() <= dateRange[1]?.getTime()
  );
}
