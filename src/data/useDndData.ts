import { API } from '../common';
import { useQuery } from '@apollo/client';
import { CLASSES } from './queries';
import { useState } from 'react';

const classLevelCache: Record<string, any> = {};

const getLevels = async (dndClass: string) => {
  if (classLevelCache[dndClass]) return classLevelCache[dndClass];
  // Default options are marked with *
  const responsePromise = await fetch(
    `${API}/api/classes/${dndClass.toLocaleLowerCase()}/levels`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const response = await responsePromise;

  const results = await response.json();

  classLevelCache[dndClass] = results.reduce(
    (
      acc: Record<string, Record<string, string>>,
      { spellcasting, level }: Record<string, any>
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
      acc[level] = {
        cantrips: spellcasting['cantrips_known'],
        ...formattedSpellSlots,
      };
      return acc;
    },
    {}
  );
  return classLevelCache[dndClass];
};

const spellCache: Record<string, any> = {};

const getSpells = async (url: string) => {
  // Default options are marked with *
  const responsePromise = fetch(`${API}${url}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await responsePromise;
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
      async ({
        name,
        spells: spellUrl,
        subclasses: theSubclasses,
        ...rest
      }: any) => {
        let formattedSpells = null;
        if (spellUrl) {
          if (!spellCache[spellUrl]) {
            spellCache[spellUrl] = getSpells(spellUrl);
          }
          formattedSpells = await spellCache[spellUrl];
        }
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
        async ({ name }: { name: string }) => {
          if (!classLevelCache[name]) {
            classLevelCache[name] = getLevels(name);
          }
          const levels = await classLevelCache[name];
          return {
            [name]: levels,
          };
        }
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
