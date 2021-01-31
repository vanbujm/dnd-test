import React, { useMemo } from 'react';
import { ClassDisplay, ClassDisplayProps } from './ClassView';
import { useDndData } from './data';
import styled from '@emotion/styled';
import { LoadingSpinner } from './Icons';

const ClassContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AppContainer = styled.div`
  padding: 3rem 10rem;
`;

const App = () => {
  const { data, loading, spellLists }: any = useDndData();
  const classes = useMemo(
    () =>
      data
        ? data.map((theClass: Record<string, any>) => {
            const spellList = spellLists ? spellLists[theClass.name] : null;
            return (
              <ClassDisplay
                key={theClass.name}
                {...(theClass as ClassDisplayProps)}
                spellList={spellList}
              />
            );
          })
        : null,
    [data, spellLists]
  );

  return (
    <AppContainer className="App">
      <h1>Select a class</h1>
      {loading ? (
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading&nbsp;&nbsp;&nbsp;
          <LoadingSpinner />
        </h1>
      ) : (
        <ClassContainer>{classes}</ClassContainer>
      )}
    </AppContainer>
  );
};

export default App;
