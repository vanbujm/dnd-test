import React, { useMemo } from 'react';
import { ClassDisplay, ClassDisplayProps } from './ClassView';
import { useDndData } from './data';

const App = () => {
  const data: any = useDndData();
  console.log(JSON.stringify(data));
  const classes = useMemo(
    () =>
      data
        ? data.map((theClass: Record<string, any>) => (
            <li key={theClass.name}>
              <ClassDisplay {...(theClass as ClassDisplayProps)} />
            </li>
          ))
        : null,
    [data]
  );

  return (
    <div className="App">
      <h1>Classes</h1>
      <ul>{classes}</ul>
    </div>
  );
};

export default App;
