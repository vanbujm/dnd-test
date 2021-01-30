import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ClassDisplay, ClassDisplayProps } from './ClassDisplay';
import { mockFormattedClasses } from '../test-data';
import styled from '@emotion/styled';

export default {
  title: 'ClassView/Class',
  component: ClassDisplay,
  argTypes: {
    name: { control: 'string' },
  },
} as Meta;

const Template: Story<ClassDisplayProps> = (args) => <ClassDisplay {...args} />;

export const Cleric = Template.bind({});
Cleric.args = mockFormattedClasses[0];

export const Monk = Template.bind({});
Monk.args = mockFormattedClasses[1];

const ClassContainer = styled.div`
  display: flex;

  & > * {
    min-width: 100px;
  }
`;

export const Collection = () => (
  <ClassContainer>
    <ClassDisplay {...mockFormattedClasses[0]} />
    <ClassDisplay {...mockFormattedClasses[1]} />
  </ClassContainer>
);
