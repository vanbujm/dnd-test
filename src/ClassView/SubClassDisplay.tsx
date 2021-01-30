import React from 'react';
import { None } from './common';

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
      <p>{spells.map((spell: any) => spell.spell.name).join(', ')}</p>
    ) : (
      <None />
    )}
  </>
);
