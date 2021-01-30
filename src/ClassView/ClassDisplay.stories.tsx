import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ClassDisplay, ClassDisplayProps } from './ClassDisplay';
import { mockFormattedClasses } from '../test-data';

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
