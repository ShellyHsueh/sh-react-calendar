import React from 'react';
import sharedClasses from '../shared.module.css';
import classes from './Day.module.css';
import { isToday } from '../utils/dateUtils.ts';

interface Props {
  date: Date;
  active?: boolean;
  lighter?: boolean;
  disabled?: boolean;
  enableTodayHighlight?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Day({
  date,
  active,
  lighter,
  disabled,
  enableTodayHighlight,
  onClick,
}: Props) {
  const getClassName = () => {
    if (active) {
      return classes.active;
    }
    if (lighter || disabled) {
      return classes.lighter;
    }
    if (enableTodayHighlight && isToday(date)) {
      return classes.today;
    }
    return classes.default;
  };

  if (!date) {
    return false;
  }
  return (
    <button
      className={`${sharedClasses.btn} ${getClassName()}`}
      disabled={disabled}
      onClick={onClick}
    >
      {date.getDate()}
    </button>
  );
}
