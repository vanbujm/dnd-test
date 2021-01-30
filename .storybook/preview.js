import { globalStyle } from '../src/globalStyles';
import { Global } from '@emotion/react';
import React from 'react';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
export const decorators = [(Story) => <>
  <Global styles={globalStyle} /><Story/>
  </>];
