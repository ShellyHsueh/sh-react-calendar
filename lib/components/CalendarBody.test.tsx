import { render, screen, fireEvent } from '@testing-library/react';
import CalendarBody from './CalendarBody.tsx';
import { expect } from 'vitest';

describe('CalendarBody', () => {
  const year = 2023;
  const month = 10 - 1; // Oct.
  const rowLength = 6;
  const firstDayIndex = 6; // 2023/10/1 Sun.
  const lastDayIndex = firstDayIndex + 31 - 1; // 2023/10/31 Tue.

  it('should show correct dates', () => {
    render(<CalendarBody year={year} month={month} rowLength={rowLength} />);

    const days = screen.getByTestId('calendar-day-container').childNodes;
    expect(days.length).toBe(rowLength * 7);
    expect(days[firstDayIndex - 1]).toHaveTextContent('30');
    expect(days[firstDayIndex]).toHaveTextContent('1');
    expect(days[lastDayIndex]).toHaveTextContent('31');
    expect(days[lastDayIndex + 1]).toHaveTextContent('1');
  });

  it('should select the date range when clicking a date and a later date', () => {
    const onRangeChanged = vi.fn();
    render(
      <CalendarBody
        year={year}
        month={month}
        rowLength={rowLength}
        onRangeChanged={onRangeChanged}
      />
    );

    const days = screen.getByTestId('calendar-day-container').childNodes;
    fireEvent.click(days[firstDayIndex]);
    fireEvent.click(days[firstDayIndex + 3]);
    expect(onRangeChanged).toBeCalledTimes(1);

    expect(days[firstDayIndex]).toHaveClass('active');
    expect(days[firstDayIndex + 1]).toHaveClass('active');
    expect(days[firstDayIndex + 3]).toHaveClass('active');

    const dateRange = onRangeChanged.mock.calls[0][0];
    expect(dateRange[0]).toStrictEqual(new Date(year, month, 1));
    expect(dateRange[1]).toStrictEqual(new Date(year, month, 1 + 3));
  });

  it('should select the date range when clicking a same date twice', () => {
    const onRangeChanged = vi.fn();
    render(
      <CalendarBody
        year={year}
        month={month}
        rowLength={rowLength}
        onRangeChanged={onRangeChanged}
      />
    );

    const days = screen.getByTestId('calendar-day-container').childNodes;
    fireEvent.click(days[firstDayIndex]);
    fireEvent.click(days[firstDayIndex]);
    expect(onRangeChanged).toBeCalledTimes(1);
    expect(days[firstDayIndex]).toHaveClass('active');

    const dateRange = onRangeChanged.mock.calls[0][0];
    expect(dateRange[0]).toStrictEqual(new Date(year, month, 1));
    expect(dateRange[1]).toStrictEqual(new Date(year, month, 1));
  });

  it('should restart the selection when clicking a date and an earlier date', () => {
    const onRangeChanged = vi.fn();
    render(
      <CalendarBody
        year={year}
        month={month}
        rowLength={rowLength}
        onRangeChanged={onRangeChanged}
      />
    );

    const days = screen.getByTestId('calendar-day-container').childNodes;
    fireEvent.click(days[firstDayIndex + 3]);
    fireEvent.click(days[firstDayIndex]);
    expect(onRangeChanged).toBeCalledTimes(0);

    expect(days[firstDayIndex]).toHaveClass('active');
    expect(days[firstDayIndex + 1]).not.toHaveClass('active');
    expect(days[firstDayIndex + 3]).not.toHaveClass('active');
  });
});
