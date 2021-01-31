import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const SpinningImage = styled.img`
  animation: ${rotation} 2s infinite linear;
`;

export const LoadingSpinner: React.FC = () => (
  <SpinningImage
    width={30}
    height={30}
    src={`${process.env.PUBLIC_URL}/icons/Class Icon - Artificer.svg`}
    alt="Loading spinner"
  />
);

export interface PinProps {
  width?: number;
  height?: number;
  alt: string;
  fill?: string;
  stroke?: string;
}

export const Pin: React.FC<PinProps> = ({
  height = 50,
  width = 50,
  alt,
  fill = 'white',
  stroke = 'black',
}) => (
  <svg
    enableBackground="new 0 0 512 512"
    viewBox={`0 0 512 512`}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={alt}
  >
    <title>{alt}</title>
    <g>
      <path
        d="M 330.274 1.4140000000000001 L 320.374 11.314 C 308.019 23.624 301.04 39.112 299.218 55.235 C 297.395 71.356 300.768 87.806 309.475 102.075 L 309.971 102.888 L 201.191 176.388 L 198.752 173.949 C 178.458 153.593 151.923 143.538 125.213 143.537 C 98.503 143.537 71.968 153.593 51.674 173.949 L 41.774 183.848 L 175.063 317.137 L 1.4140000000000001 490.787 L 21.213 510.586 L 194.862 336.936 L 328.152 470.226 L 338.052 460.326 C 358.408 440.032 368.464 413.497 368.464 386.787 C 368.464 360.076 358.408 333.542 338.052 313.248 L 335.613 310.809 L 409.113 202.029 L 409.926 202.525 C 424.195 211.233 440.645 214.605 456.766 212.783 C 472.889 210.961 488.377 203.981 500.687 191.626 L 510.586 181.727 L 330.274 1.4140000000000001 Z"
        fill={stroke}
      />
      <path
        d="M 340.174 96.167 C 333.164 89.118 328.814 80.226 327.326 71.099 C 325.837 61.971 327.161 52.325 331.189 43.814 L 331.795 42.533 L 469.468 180.206 L 468.187 180.812 C 459.676 184.84 450.03 186.164 440.902 184.675 C 431.775 183.187 422.883 178.837 415.834 171.827 L 340.174 96.167 Z"
        fill={fill}
      />
      <path
        d="M 221.358 196.554 L 328.542 124.133 L 387.867 183.458 L 315.446 290.642 L 221.358 196.554 Z"
        fill={fill}
      />
      <path
        d="M 82.278 184.753 L 83.3 184.079 C 98.014 174.385 115.536 170.261 132.453 171.866 C 149.369 173.471 165.996 180.838 178.953 193.747 L 318.253 333.047 C 331.162 346.004 338.529 362.631 340.134 379.547 C 341.739 396.464 337.615 413.986 327.921 428.7 L 327.247 429.722 L 82.278 184.753 Z"
        fill={fill}
      />
    </g>
  </svg>
);
