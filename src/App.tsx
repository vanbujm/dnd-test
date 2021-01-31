import React, { useMemo } from 'react';
import { ClassDisplay, ClassDisplayProps } from './ClassView';
import { useDndData } from './data';
import styled from '@emotion/styled';

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
        <div>Loading...</div>
      ) : (
        <ClassContainer>{classes}</ClassContainer>
      )}
    </AppContainer>
  );
};

export default App;
