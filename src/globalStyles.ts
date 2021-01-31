import { css } from '@emotion/react';

export const headingFont = "'IM Fell Double Pica', serif";
export const bodyFont = "'EB Garamond', serif";

export const globalStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${headingFont};
  }

  div,
  p,
  span {
    font-family: ${bodyFont};
  }
`;
