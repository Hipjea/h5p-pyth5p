import { defaultContext } from "./config/context";
import { behaviourEditable } from './config/behaviourContext';
import l10n from '../src/localization';

export const previewArgs = {
  id: '1',
  code: 'print("Hello world")',
  statement: 'Run this code',
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
  behaviour: behaviourEditable,
  answerText: 'answer text',
  l10n: l10n
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    (Story) => <Story />
  ],
}
