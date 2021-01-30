import React from 'react';
import { SubClassDisplay, SubClassDisplayProps } from './SubClassDisplay';
import { None } from './common';

export interface ClassDisplayProps {
  name: string;
  spells: string[] | null;
  subclasses: SubClassDisplayProps[];
}

export const ClassDisplay: React.FC<ClassDisplayProps> = ({
  name,
  spells,
  subclasses,
}) => (
  <>
    <img
      src={`${process.env.PUBLIC_URL}/icons/Class Icon - ${name}.svg`}
      alt={name}
      height={50}
      width={50}
    />
    <h1>{name}</h1>
    <h2>Spells:</h2>
    <p>{spells ? spells.join(', ') : null}</p>
    <h2>Subclasses</h2>
    {subclasses ? (
      subclasses.map((subClass: Record<string, any>) => (
        <SubClassDisplay
          key={subClass.name}
          {...(subClass as SubClassDisplayProps)}
        />
      ))
    ) : (
      <None />
    )}
  </>
);
