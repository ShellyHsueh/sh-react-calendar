# SH React Calendar

This project is for Task – 2 (Date Range Component for cross months), and is built by [Vite](https://vitejs.dev/) with the template of React + Typescript.

The project is mainly composed of 2 folders - `lib` and `src`.

- `lib`: the source of `sh-react-calendar` library.
- `src`: the testbed for the development or the preview of the library.

---

## Run The Project

Start the HMR server for development or for component preview.

1. Ensure to have node `20.10.0` ready and dependencies installed by `yarn`.

```shell
nvm install 20.10.0
nvm use 20.10.0

npm install -g yarn
yarn
```

2. Start the server

```shell
yarn dev
```

---

## Build The Project

Build `lib` sources into `dist` folder as a library, `sh-react-calendar`, for further _publishing (not implemented)_ and reusing.

1. Ensure to have dependencies ready (same prerequisite as running the project)

```shell
nvm install 20.10.0
nvm use 20.10.0

npm install -g yarn
yarn
```

2. Bundle `lib` into `dist`

```shell
yarn build
```

---

## To Use The Library

The way to use the library is documented in the sample testbed - `src/App.tsx`.

```tsx
import { useState } from 'react';
import { Calendar } from 'dist/sh-react-calendar'; /* replace the source path after publishing to any respository */

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
```
