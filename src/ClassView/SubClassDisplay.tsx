import React from 'react';
import { None } from './common';
import { SpellNameList } from '../SpellDisplay/SpellNameList';

export interface SubClassDisplayProps {
  name: string;
  spells: {
    spell: { name: string };
  }[];
}

export const SubClassDisplay: React.FC<SubClassDisplayProps> = ({
  name,
  spells,
}) => (
  <>
    <h3>{name}</h3>
    <h4>Spells: </h4>
    {spells ? (
      <SpellNameList
        spells={spells.map(({ spell: { name } }) => name)}
        keyPrefix={name}
      />
    ) : (
      <None />
    )}
  </>
);
