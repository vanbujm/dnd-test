import { API } from '../common';
import { useQuery } from '@apollo/client';
import { CLASSES } from './queries';
import { useState } from 'react';

const getLevels = async (dndClass: string) => {
  // Default options are marked with *
  const response = await fetch(
    `${API}/api/classes/${dndClass.toLocaleLowerCase()}/levels`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const results = await response.json();
  return results.reduce(
    (
      acc: Record<string, Record<string, string>>,
      { spellcasting }: Record<string, any>,
      index: number
    ) => {
      if (!spellcasting) return acc;
      const { cantrips_known: cantrips, ...spells } = spellcasting;
      const getSpellLevel = /^[\w|_]+(\d+)$/;
      const formattedSpellSlots = Object.entries(
        spells as Record<string, string>
      ).reduce<Record<string, string>>((spellAcc, [key, val]) => {
        const spellLevelMatch = key.match(getSpellLevel);
        if (!spellLevelMatch) return spellAcc;
        const spellLevel: string = spellLevelMatch[1];
        spellAcc[spellLevel] = val;
        return spellAcc;
      }, {});
      acc[index + 1] = {
        cantrips: spellcasting['cantrips_known'],
        ...formattedSpellSlots,
      };
      return acc;
    },
    {}
  );
};

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
  const [spellLists, setSpellLists] = useState(null);

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
      const getLevelPromises = (classData as any).map(
        async ({ name }: { name: string }) => ({
          [name]: await getLevels(name),
        })
      );
      Promise.all(getLevelPromises).then((allSpellLists) => {
        const combinedSpellLists = allSpellLists.reduce(
          (acc, spellList) => Object.assign(acc, spellList),
          {}
        );
        setSpellLists(combinedSpellLists as any);
      });
    });
  }

  return { data: formattedData, loading: loadingSpells, spellLists };
};
