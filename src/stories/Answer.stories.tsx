import React from 'react';
import Answer, { Props as AnswerProps } from '../components/Answer';
import { defaultContext } from '../../.storybook/config/context';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';

export default {
  title: 'Answer',
  component: Answer,
} as ComponentMeta<typeof Answer>;

const defaultArgs: AnswerProps = {
  id: "1",
  answer: defaultContext.contentType.correction.answers[0],
  l10n: l10n,
  behaviour: {
    enableRetry: true,
    isEditable: false,
    enableSolutionsButton: true
  }
};

export const Default: ComponentStory<typeof Answer> = () => {
  const args: AnswerProps = { ...defaultArgs };
  return <Answer { ...args } />;
}

export const BestAnswer: ComponentStory<typeof Answer> = () => {
  const args: AnswerProps = { 
    ...defaultArgs,
    answer: defaultContext.contentType.correction.answers[1],
  };
  return <Answer { ...args } />;
}
