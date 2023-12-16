import classes from './Calendar.module.css';
import { useMemo, useState } from 'react';
import CalendarHeader from './components/CalendarHeader.tsx';
import CalenderBody from './components/CalendarBody.tsx';

interface Props {
  locale?: string;
  onRangeChanged?: (dateRange: Array<Date>) => void;
}

export default function Calendar(props: Props) {
  const { locale = 'zh-TW', onRangeChanged } = props;

  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const headerText = useMemo(
    () =>
      new Date(year, month).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
      }),
    [year, month]
  );

  const onPrevMonthClick = () => {
    if (month - 1 >= 0) {
      setMonth((ps) => ps - 1);
      return;
    }
    setYear((ps) => ps - 1);
    setMonth(11);
  };

  const onNextMonthClick = () => {
    if (month + 1 <= 11) {
      setMonth((ps) => ps + 1);
      return;
    }
    setYear((ps) => ps + 1);
    setMonth(0);
  };

  return (
    <div className={classes.calendar}>
      <CalendarHeader
        text={headerText}
        onLeftClick={onPrevMonthClick}
        onRightClick={onNextMonthClick}
        style={{ marginBottom: '16px' }}
      />
      <CalenderBody
        rowLength={6}
        year={year}
        month={month}
        onRangeChanged={onRangeChanged}
      />
    </div>
  );
}
