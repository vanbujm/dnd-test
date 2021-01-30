import styled from '@emotion/styled';
import React, { FocusEventHandler, MouseEventHandler } from 'react';

export const iconImgPadding = 0.5;
export const iconImgMargin = 0.5;
export const iconImgSize = 50;
export const iconTranslationAmount = 2;

const ClassIconImg = styled.input`
  background-color: white;

  border: 3px solid black;
  border-radius: 50%;
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);

  padding: ${iconImgPadding}rem;
  margin: ${iconImgMargin}rem;

  transition: transform 125ms ease-in, box-shadow 125ms ease-in;

  outline: none;
  cursor: pointer;

  width: ${iconImgSize}px;
  height: ${iconImgSize}px;

  &:hover,
  &:active {
    transform: translate(0, -${iconTranslationAmount}%);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transition: transform 125ms ease-out, box-shadow 125ms ease-out;
  }

  &:focus {
    border: 3px solid #660000;
    box-shadow: 0 14px 28px rgb(102, 0, 0, 0.25),
      0 10px 10px rgb(102, 0, 0, 0.22);
  }
`;

export interface ClassIconProps {
  name: string;
  onClick?: MouseEventHandler;
  onBlur?: FocusEventHandler;
}

export const ClassIcon: React.FC<ClassIconProps> = ({
  name,
  onClick,
  onBlur,
  ...props
}) => (
  <ClassIconImg
    tabIndex={0}
    type="image"
    src={`${process.env.PUBLIC_URL}/icons/Class Icon - ${name}.svg`}
    alt={`${name} class info`}
    onClick={onClick}
    onBlur={onBlur}
    {...props}
  />
);
