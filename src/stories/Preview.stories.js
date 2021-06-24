import React from 'react';
import { Preview } from '../components/Preview';
import { defaultContext } from '../../.storybook/config/context';

export default {
  title: 'Components/Preview',
  component: Preview
};

const Template = (args) => <Preview ref={ref} {...args} />;

const pre = React.createRef();
const canvas = React.createRef();
const ref = {
    pre: pre,
    canvas: canvas
}

export const Empty = Template.bind({});
Empty.args = {
  l10n: defaultContext.l10n,
  out: ''
};

export const Filled = Template.bind({});
Filled.args = {
  l10n: defaultContext.l10n,
  out: 'print("Hello world !")'
};
