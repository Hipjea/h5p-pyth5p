import React from 'react';
import Main, { Props as MainProps } from '../components/Main';
import Snippet from '../components/Snippet';
import Button, { Props as ButtonProps } from '../components/Button';
import { Preview, Props as PreviewProps } from '../components/Preview';
import { behaviourEditable, behaviourUneditable } from '../../.storybook/config/behaviourContext';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Main',
  component: Main,
  subcomponents: { Snippet, Button, Preview }
} as ComponentMeta<typeof Main>;

const setCode = () => {
    action('Code is set')
}

const defaultArgs: MainProps = {
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

const buttonArgs: ButtonProps = {
  id: '1',
  title: 'button title',
  cls: 'h5p-joubelui-button h5p-question-check-answer',
  onLaunchAction: action('Button is clicked'),
  disabled: false,
  text: 'Button text'
};

const previewArgs: PreviewProps = {
  out: '',
  l10n: l10n
};

const ref = React.createRef<HTMLInputElement>();

export const Empty: ComponentStory<typeof Main> = () => {
  const args: MainProps = { ...defaultArgs };
  return <Main {...args}>
          <Snippet 
            ref={ref} 
            isEditable={true}
            setCode={setCode} 
            {...args}
          />
          <Button {...buttonArgs} />
          <Preview ref={ref} {...previewArgs} />
        </Main>
}

export const Uneditable: ComponentStory<typeof Main> = () => {
  const args: MainProps = { ...defaultArgs, behaviour: behaviourUneditable };
  return <Main {...args}>
          <Snippet 
            ref={ref} 
            isEditable={false}
            setCode={setCode} 
            {...args}
          />
          <Button {...buttonArgs} />
          <Preview ref={ref} {...previewArgs} />
        </Main>
}
