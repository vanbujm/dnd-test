import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Pin, PinProps } from '.';

export default {
  title: 'SVGIcons',
  component: Pin,
  argTypes: {
    alt: { control: 'string' },
  },
} as Meta;

const Template: Story<PinProps> = (args) => <Pin {...args} />;

export const PinIcon = Template.bind({});
PinIcon.args = { alt: 'A Pin', stroke: '', fill: '' };
