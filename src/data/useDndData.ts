import { API } from '../common';
import { useQuery } from '@apollo/client';
import { CLASSES } from './queries';
import { useState } from 'react';

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

export const useDndData = () => {
  const { data } = useQuery(CLASSES);
  const [formattedData, setFormattedData] = useState(null);
  const [loadingSpells, setLoadingSpells] = useState(true);

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
      setLoadingSpells(false);
    });
  }

  return { data: formattedData, loading: loadingSpells };
};
