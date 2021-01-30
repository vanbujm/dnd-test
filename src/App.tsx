import React, { useMemo } from 'react';
import { ClassDisplay, ClassDisplayProps } from './ClassView';
import { useDndData } from './data';
import styled from '@emotion/styled';

const ClassContainer = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }
`;

const AppContainer = styled.div`
  padding: 3rem;
`;

const App = () => {
  const { data, loading }: any = useDndData();
  const classes = useMemo(
    () =>
      data
        ? data.map((theClass: Record<string, any>) => (
            <ClassDisplay
              key={theClass.name}
              {...(theClass as ClassDisplayProps)}
            />
          ))
        : null,
    [data]
  );

  return (
    <AppContainer className="App">
      <h1>Select a class</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ClassContainer>{classes}</ClassContainer>
      )}
    </AppContainer>
  );
};

export default App;
