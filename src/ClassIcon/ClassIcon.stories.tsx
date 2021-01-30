import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ClassIcon, ClassIconProps } from '.';

export default {
  title: 'Icons',
  component: ClassIcon,
  argTypes: {
    name: { control: 'string' },
  },
} as Meta;

const Template: Story<ClassIconProps> = (args) => <ClassIcon {...args} />;

export const ArtificerIcon = Template.bind({});
ArtificerIcon.args = { name: 'Artificer' };

export const IconCollection = () => {
  const classes = [
    'Artificer',
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard',
  ];

  const icons = classes.map((name) => <ClassIcon key={name} name={name} />);

  return <div>{icons}</div>;
};
