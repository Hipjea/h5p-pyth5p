import React from 'react';
import Footer from '../components/Footer';
import type { Footer as FooterProps } from '../types/Footer';
import Feedback from '../components/Feedback';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';
import { action } from '@storybook/addon-actions';
import { h5p } from '../../.storybook/preview';

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
  fn: h5p,
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