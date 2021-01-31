import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Level, LevelProps } from '.';

export default {
  title: 'Inputs/Level',
  component: Level,
  argTypes: {
    dndClass: { control: 'cleric' },
  },
} as Meta;

const Template: Story<LevelProps> = (args) => <Level {...args} />;

export const LevelInput = Template.bind({ dndClass: 'cleric' });
