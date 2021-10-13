import React from 'react';
import Feedback from '../components/Feedback';
import type { Feedback as FeedbackProps } from '../types/Feedback';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';

export default {
  title: 'Feedback',
  component: Feedback
} as ComponentMeta<typeof Feedback>;

const defaultArgs: FeedbackProps = {
  correction: 'Correction text',
  l10n: l10n
};

export const Shown: ComponentStory<typeof Feedback> = () => {
  const args: FeedbackProps = { ...defaultArgs };
  return <Feedback { ...args } />;
}

export const Hidden: ComponentStory<typeof Feedback> = () => {
  const args: FeedbackProps = { ...defaultArgs, correction: '' };
  return <Feedback { ...args } />;
}
