import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { capitalize } from '../common';
import { toWords } from 'number-to-words';
import { SpellNameList } from './SpellNameList';
import { None } from '../ClassView';

export interface SpellDisplayProps {
  spellList?: Record<string, Record<string, number>>;
  spells?: string[] | null;
  level: string;
  name: string;
}

const StyledHeading = styled.h3`
  margin-bottom: 0;
`;

const StyledList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0 0 0 1rem;
  font-weight: bold;
  font-size: 1rem;
`;

export const SpellDisplay: React.FC<SpellDisplayProps> = ({
  spells,
  spellList,
  level,
  name,
}) => {
  const numSpells = useMemo(() => {
    if (!spellList || !spellList[level]) return 0;
    return Object.values(spellList[level]).reduce((acc, num) => {
      if (isNaN(parseInt(`${num}`))) return acc;
      return acc + num;
    }, 0);
  }, [level, spellList]);

  const spellListEntries = useMemo(() => {
    if (!spellList || !spellList[level]) return;
    return Object.entries(spellList[level]).map(([spellLevel, number]) => {
      if (number === 0 || number == null) return null;
      if (spellLevel === 'cantrips') {
        return <li key={spellLevel}>{capitalize(toWords(number))} cantrips</li>;
      }
      return (
        <li key={spellLevel}>
          {capitalize(toWords(number))} level {spellLevel} spells
        </li>
      );
    });
  }, [level, spellList]);

  const formattedSpellList = spellList ? (
    <>
      <StyledHeading>You can cast {numSpells} spells:</StyledHeading>
      <StyledList>{spellListEntries}</StyledList>
    </>
  ) : null;
  return (
    <>
      <h2>Spells:</h2>
      {formattedSpellList}
      {spells ? <SpellNameList spells={spells} keyPrefix={name} /> : <None />}
    </>
  );
};
