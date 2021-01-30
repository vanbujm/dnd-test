import React, { useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { API } from './common';

const CLASSES = gql`
  query getClasses {
    classes {
      name
      spells
      subclasses {
        name
      }
    }
    subclasses {
      name
      spells {
        spell {
          name
        }
      }
    }
  }
`;

const None: React.FC = () => <p>None</p>;

type ClassInfo = Record<string, any>;
type SubClassInfo = Record<string, any>;

const SubClassDisplay: React.FC<SubClassInfo> = ({ name, spells }) => (
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

const ClassDisplay: React.FC<ClassInfo> = ({ name, spells, subclasses }) => (
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
        <SubClassDisplay key={subClass.name} {...subClass} />
      ))
    ) : (
      <None />
    )}
  </>
);

const getSpells = async (url: string) => {
  // Default options are marked with *
  const response = await fetch(`${API}${url}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { results } = await response.json();
  return results.map(({ name }: Record<string, string>) => name);
};

const useDndData = () => {
  const { data } = useQuery(CLASSES);
  const [formattedData, setFormattedData] = useState(null);

  if (data && !formattedData) {
    const { classes, subclasses } = data;
    const classPromises = classes.map(
      async ({ name, spells, subclasses: theSubclasses, ...rest }: any) => {
        const formattedSpells = spells ? await getSpells(spells) : null;
        if (subclasses.length === 0) {
          return { name, spells: formattedSpells, ...rest };
        }
        const subClassObj = theSubclasses.map(({ name }: Record<string, any>) =>
          subclasses.find(
            ({ name: subClassName }: any) => name === subClassName
          )
        );
        return {
          name,
          spells: formattedSpells,
          ...rest,
          subclasses: subClassObj,
        };
      }
    );
    Promise.all(classPromises).then((classData) => {
      setFormattedData(classData as any);
    });
  }

  return formattedData;
};

const App = () => {
  const data: any = useDndData();

  const classes = useMemo(
    () =>
      data
        ? data.map((theClass: Record<string, any>) => (
            <li key={theClass.name}>
              <ClassDisplay {...theClass} />
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
