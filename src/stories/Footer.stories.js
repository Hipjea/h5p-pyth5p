import React from 'react';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';
import { Shown } from './Feedback.stories';
import { defaultContext, noExerciseContext } from '../../.storybook/config/context';
import { behaviourEditable } from '../../.storybook/config/behaviourContext';


export default {
  title: 'Footer',
  component: Footer,
  subcomponents: { Feedback }
};

const correction = defaultContext.contentType.correction.correctionText;

const Template = (args) => (
  <Footer {...args}>
    <Feedback correction={correction} {...Shown.args} />
  </Footer>
);

const storyContext = { ...defaultContext, ...behaviourEditable };

export const Default = Template.bind({});
Default.args = storyContext;

export const CheckEnabled = Template.bind({});
CheckEnabled.args = { isCodeRun: true, ...storyContext };

export const IsNoExercise = Template.bind({});
IsNoExercise.args = { ...noExerciseContext, ...behaviourEditable }