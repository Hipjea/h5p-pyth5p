import React from 'react';
import Button from '../components/Button';
import { defaultContext } from '../../.storybook/config/context';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Visible = Template.bind({});
Visible.args = {
  l10n: defaultContext.l10n,
  visible: true
};

export const Invisible = Template.bind({});
Invisible.args = {
  l10n: defaultContext.l10n,
  visible: false
};