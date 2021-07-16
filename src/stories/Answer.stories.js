import React from 'react';
import Answer from '../components/Answer';
import { defaultContext } from '../../.storybook/config/context';
import { behaviourEditable } from '../../.storybook/config/behaviourContext';

export default {
  title: 'Answer',
  component: Answer,
};

const Template = (args) => <Answer {...args} />;

const storyContext = { ...defaultContext, ...behaviourEditable };

export const Default = Template.bind({});
Default.args = {
    id: 1,
    answer: defaultContext.contentType.correction.answers[0],
    ...storyContext
};

export const BestAnswer = Template.bind({});
BestAnswer.args = {
    id: 2,
    answer: defaultContext.contentType.correction.answers[1],
    ...storyContext,
};
