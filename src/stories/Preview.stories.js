import React from 'react';
import { Preview } from '../components/Preview';
import { defaultContext } from '../../.storybook/config/context';
import { ref } from '../../.storybook/config/refs';


export default {
  title: 'Preview',
  component: Preview
};

const Template = (args) => <Preview ref={ref} {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  l10n: defaultContext.l10n,
  out: ''
};

export const Filled = Template.bind({});
Filled.args = {
  l10n: defaultContext.l10n,
  out: defaultContext.code
};
