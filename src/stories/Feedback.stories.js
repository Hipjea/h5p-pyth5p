import React from 'react';
import Feedback from '../components/Feedback';
import { defaultContext } from '../../.storybook/config/context';


export default {
  title: 'Components/Feedback',
  component: Feedback
};

const correction = defaultContext.contentType.correction.correctionCode;
const Template = (args) => <Feedback correction={correction} {...args} />;

const storyContext = { ...defaultContext };

export const Hidden = Template.bind({});
Hidden.args = storyContext;

export const Shown = Template.bind({});
Shown.args = storyContext;
