import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { headingFont } from '../globalStyles';

const LevelInput = styled.input`
  width: 60px;
  height: 60px;

  border: 3px solid black;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${headingFont};
  font-size: 2rem;

  text-align: center;

  box-sizing: border-box;

  padding-bottom: 0.5rem;

  outline: none;

  &:focus {
    border: 3px solid #660000;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const LabelContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-family: ${headingFont};
  font-size: 2rem;
`;

export interface LevelProps {
  dndClass: string;
  inputProps?: any;
}

export const Level: React.FC<LevelProps> = ({
  dndClass,
  inputProps,
  ...props
}) => {
  const id = `level-${dndClass}`;
  const [value, setValue] = useState('1');

  const setLevelHandler = useCallback(
    (e) => {
      if (!e.target) return;
      const value = e.target.value;
      const valueToSet = Number(value);
      if (isNaN(valueToSet)) return;
      const parentChangeHandler =
        inputProps && inputProps.onChange ? inputProps.onChange : () => value;
      setValue(`${valueToSet}`);
      parentChangeHandler(valueToSet);
    },
    [inputProps]
  );

  return (
    <LabelContainer {...props}>
      <LevelInput
        id={id}
        type="number"
        value={value}
        onChange={setLevelHandler}
        {...inputProps}
      />
      <Label htmlFor={id}>Level</Label>
    </LabelContainer>
  );
};
