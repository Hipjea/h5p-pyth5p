import React from 'react';
import Footer, { Props as FooterProps } from '../components/Footer';
import Feedback from '../components/Feedback';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Footer',
  component: Footer,
  subcomponents: { Feedback }
} as ComponentMeta<typeof Feedback>;

const correction = {
  correction: 'Correction text',
  l10n: l10n
};

const defaultArgs: FooterProps = {
  userCode: 'print("hello")',
  isCodeRun: false,
  performRetry: action('retry'),
  l10n: l10n,
  contentType: {
    isExercise: true,
    correction: {
      correctionText: "print(\"Correction filler\")",
      answers: [
        {
          text: 'print("Hello world")',
          bestAnswer: false,
          tipsAndFeedback: "<p>Tips...</p>"
        },
        {
          text: 'print("Best answer code")',
          bestAnswer: true,
          tipsAndFeedback: "<p>This is the best answer</p>"
        }
      ]
    }
  },
  behaviour: {
    enableRetry: true,
    isEditable: false,
    enableSolutionsButton: true
  }
};

export const Default: ComponentStory<typeof Footer> = () => {
  const args: FooterProps = { ...defaultArgs };
  return <Footer {...args}>
          <Feedback {...correction} />
        </Footer>
}

export const CheckEnabled: ComponentStory<typeof Footer> = () => {
  const args: FooterProps = { ...defaultArgs, isCodeRun: true };
  return <Footer {...args}>
          <Feedback {...correction} />
        </Footer>
}

export const NoExercise: ComponentStory<typeof Footer> = () => {
  const args: FooterProps = { ...defaultArgs, contentType: { ...defaultArgs.contentType, isExercise: false } };
  return <Footer {...args}>
          <Feedback {...correction} />
        </Footer>
}
