import React from 'react';
import Footer from '../components/Footer';
import { defaultContext } from '../../.storybook/config/context';
import Feedback from '../components/Feedback';
import { Shown } from './Feedback.stories';


export default {
  title: 'Components/Footer',
  component: Footer,
  subcomponents: { Feedback }
};

const correction = defaultContext.contentType.correction.correctionCode;

const Template = (args) => (
  <Footer {...args}>
    <Feedback correction={correction} {...Shown.args} />
  </Footer>
);

const storyContext = { ...defaultContext };

export const CheckAvailable = Template.bind({});
CheckAvailable.args = storyContext;

export const CheckClicked = Template.bind({});
CheckClicked.args = storyContext;
