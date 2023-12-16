import { useState } from 'react';

import { Calendar } from '../lib'; /* for dev lib */
// import { Calendar } from '../dist/sh-react-calendar'; /* for testing build */

export default function App() {
  const [dateRange, setDateRange] = useState<Array<Date>>([]);

  return (
    <div>
      <Calendar locale="zh-TW" onRangeChanged={setDateRange} />
      {dateRange?.length >= 2 && (
        <p>
          Selected: {dateRange[0]?.toLocaleDateString()} -{' '}
          {dateRange[1]?.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
