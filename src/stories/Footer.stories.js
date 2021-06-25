import React from 'react';
import Footer from '../components/Footer';
import { defaultContext } from '../../.storybook/config/context';

export default {
  title: 'Components/Footer',
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

const storyContext = { ...defaultContext };

export const CheckAvailable = Template.bind({});
CheckAvailable.args = storyContext;

export const CheckClicked = Template.bind({});
CheckClicked.args = storyContext;
