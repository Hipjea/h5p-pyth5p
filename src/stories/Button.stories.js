import React from 'react';
import Button from '../components/Button';
import { defaultContext } from '../../.storybook/config/context';


export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  l10n: defaultContext.l10n
};
