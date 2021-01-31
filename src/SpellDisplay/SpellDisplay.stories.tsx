import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { mockFormattedClasses } from '../test-data';
import { SpellDisplay, SpellDisplayProps } from '.';

export default {
  title: 'Spells',
  component: SpellDisplay,
  argTypes: {
    name: { control: 'string' },
  },
} as Meta;

const Template: Story<SpellDisplayProps> = (args) => <SpellDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Cleric',
  spellList: mockFormattedClasses[0].spellList,
  spells: mockFormattedClasses[0].spells,
  level: '5',
};
