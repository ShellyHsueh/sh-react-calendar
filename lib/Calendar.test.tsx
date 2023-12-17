import { fireEvent, render, screen } from '@testing-library/react';
import Calendar from './Calendar.tsx';

describe('Calendar (display)', () => {
  it('should show current year & month in zh-TW as default', () => {
    render(<Calendar />);

    const currentYearMonthText = screen.queryByText(
      new Date().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
      })
    );
    expect(currentYearMonthText).toBeVisible();
  });
});

describe('Calendar (cross-month selection)', () => {
  it('should select cross-month date range', () => {
    const onRangeChanged = vi.fn();
    render(<Calendar onRangeChanged={onRangeChanged} />);

    const prevMonthBtn = screen.getByTestId('calendar-header-left-button');
    const nextMonthBtn = screen.getByTestId('calendar-header-right-button');
    const dayContainer = screen.getByTestId('calendar-day-container');

    fireEvent.click(dayContainer.childNodes[10]);
    fireEvent.click(nextMonthBtn);
    fireEvent.click(dayContainer.childNodes[10]);
    expect(onRangeChanged).toBeCalledTimes(1);
    expect(dayContainer.childNodes[10]).toHaveClass('active');
    expect(dayContainer.childNodes[11]).not.toHaveClass('active');

    fireEvent.click(prevMonthBtn);
    expect(dayContainer.childNodes[10]).toHaveClass('active');
    expect(dayContainer.childNodes[11]).toHaveClass('active');
  });
});
