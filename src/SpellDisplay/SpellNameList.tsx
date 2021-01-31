import styled from '@emotion/styled';
import React, { useMemo } from 'react';

const SpellListHeading = styled.h3`
  border-top: 3px solid black;
  text-align: center;

  margin: 1rem 0 0.5rem 0;
  padding: 0.5rem 0 0 0;

  width: 100%;

  color: #660000;

  font-weight: bold;
`;

const SpellListContainer = styled.div`
  margin: 0;
  padding: 1rem 0;
  border-top: 3px solid black;

  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SpellBox = styled.div`
  display: inline-block;
  border: 2px solid black;
  border-radius: 4px;

  padding: 0.25rem;
  margin: 2px;
`;

export const SpellNameList: React.FC<{
  spells: string[];
  keyPrefix?: string;
}> = ({ spells, keyPrefix = '' }) => {
  const cleanNameList = useMemo(
    () =>
      [...new Set<string>(spells.sort())].map((spell) => (
        <SpellBox key={`${keyPrefix}${spell}`}>{spell}</SpellBox>
      )),
    [keyPrefix, spells]
  );
  return (
    <>
      <SpellListHeading>Spell List</SpellListHeading>
      <SpellListContainer>{cleanNameList}</SpellListContainer>
    </>
  );
};
