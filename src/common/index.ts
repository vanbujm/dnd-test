export const API = 'https://www.dnd5eapi.co';

export const capitalize = (string = '') =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [...string]
    .map((char, index) => (index ? char : char.toUpperCase()))
    .join('');
