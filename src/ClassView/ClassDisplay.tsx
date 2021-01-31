import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SubClassDisplay, SubClassDisplayProps } from './SubClassDisplay';
import { None } from './common';
import {
  ClassIcon,
  iconImgMargin,
  iconImgPadding,
  iconImgSize,
  iconTranslationAmount,
} from '../ClassIcon';
import styled from '@emotion/styled';
import { Pin } from '../Icons';
import { Level } from '../Level';
import { SpellDisplay } from '../SpellDisplay';

export interface ClassDisplayProps {
  name: string;
  spells: string[] | null;
  subclasses: SubClassDisplayProps[];
  spellList?: Record<string, Record<string, number>>;
}

const ClassContainer = styled.div`
  position: relative;
  height: calc(2 * ${iconImgPadding}rem + ${iconImgSize}px + 1rem);
  width: calc(2 * ${iconImgPadding}rem + ${iconImgSize}px + 1rem);
`;

const RevealingClassIcon = styled(ClassIcon)<{ clicked: boolean }>`
  position: absolute;

  z-index: ${({ clicked }) => (clicked ? 99 : 1)};

  &:hover,
  &:active {
    z-index: 99;
  }
  &:hover ~ div,
  &:active ~ div {
    z-index: 98;
    opacity: 1;
    transition: opacity 125ms ease-in;
  }

  &:hover ~ button,
  &:active ~ button {
    z-index: 99;
  }

  ${({ clicked }) =>
    clicked ? `transform: translate(0, -${iconTranslationAmount}%);` : ''};
  ${({ clicked }) => (clicked ? 'border: 3px solid #660000;' : '')};
`;

const PinButton = styled.button<{ clicked: boolean }>`
  background-color: transparent;
  border: none;
  z-index: 100;
  cursor: pointer;

  position: absolute;
  top: 40px;
  left: 45px;

  outline: none;

  opacity: ${({ clicked }) => (clicked ? 1 : 0)};

  pointer-events: none;
`;

const ClassInfoContainer = styled.div<{
  appearRight: boolean;
  clicked: boolean;
}>`
  position: absolute;
  top: calc(${iconImgMargin}rem - ${iconTranslationAmount}px);
  left: ${({ appearRight }) =>
    appearRight ? `${iconImgMargin}rem` : 'initial'};
  right: ${({ appearRight }) =>
    appearRight
      ? 'initial'
      : `calc(${2 * iconImgPadding - iconImgMargin}rem - 2px)`};

  border: 3px solid black;
  border-radius: 1rem;
  border-top-left-radius: ${({ appearRight }) =>
    appearRight ? '36px' : '1rem'};
  border-top-right-radius: ${({ appearRight }) =>
    appearRight ? '1rem' : '36px'};

  padding: 4rem 2rem 2rem;

  opacity: ${({ clicked }) => (clicked ? 1 : 0)};

  transition: opacity 125ms ease-out;

  background-color: white;

  z-index: ${({ clicked }) => (clicked ? 98 : -1)};

  pointer-events: ${({ clicked }) => (clicked ? 'all' : 'none')};

  width: 40vw;
`;

const PositionedLevelInput = styled(Level)<{ appearRight: boolean }>`
  position: absolute;
  top: 1rem;
  right: ${({ appearRight }) => (appearRight ? 1 : 6)}rem;
`;

export const ClassDisplay: React.FC<ClassDisplayProps> = ({
  name,
  spells,
  subclasses,
  spellList,
}) => {
  const ref = useRef();

  const [appearRight, setAppearRight] = useState(true);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = useCallback(() => setClicked(!clicked), [clicked]);
  const [level, setLevel] = useState('1');

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { right } = ref.current.getBoundingClientRect();

      if (right > (window.innerWidth || document.documentElement.clientWidth)) {
        setAppearRight(false);
      }
    }
  }, []);
  return (
    <ClassContainer>
      <RevealingClassIcon
        name={name}
        clicked={clicked}
        onClick={toggleClicked}
      />
      <PinButton onClick={toggleClicked} clicked={clicked} tabIndex={-1}>
        <Pin
          width={30}
          height={30}
          alt="pin info pane"
          stroke={clicked ? '#660000' : 'black'}
          fill={clicked ? '#660000' : 'white'}
        />
      </PinButton>
      <ClassInfoContainer
        appearRight={appearRight}
        clicked={clicked}
        ref={ref as any}
      >
        <form>
          <h1>{name}</h1>
          <PositionedLevelInput
            appearRight={appearRight}
            value={level}
            setValue={setLevel}
            dndClass={name}
          />
          <SpellDisplay
            spells={spells}
            spellList={spellList}
            level={level}
            name={name}
          />
          <h2>Subclasses</h2>
          {subclasses ? (
            subclasses.map((subClass: Record<string, any>) => (
              <SubClassDisplay
                key={subClass.name}
                {...(subClass as SubClassDisplayProps)}
              />
            ))
          ) : (
            <None />
          )}
        </form>
      </ClassInfoContainer>
    </ClassContainer>
  );
};
