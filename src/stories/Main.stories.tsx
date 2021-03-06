import React from 'react';
import Main from '../components/Main';
import type { Main as MainProps } from '../types/Main';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import type { Button as ButtonProps } from '../types/Button';
import { Preview } from '../components/Preview';
import type { Preview as PreviewProps } from '../types/Preview';
import { behaviourUneditable } from '../../.storybook/config/behaviourContext';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';
import { action } from '@storybook/addon-actions';
import { previewArgs } from '../../.storybook/preview';


export default {
  title: 'Main',
  component: Main,
  subcomponents: { Snippet, Button, Preview }
} as ComponentMeta<typeof Main>;

const setCode = () => {
  action('Code is set')
}

const defaultArgs: MainProps = {
  ...previewArgs
};

const buttonArgs: ButtonProps = {
  id: '1',
  title: 'button title',
  klass: 'h5p-joubelui-button h5p-question-check-answer',
  onLaunchAction: action('Button is clicked'),
  disabled: false,
  text: 'Button text'
};

const previewStoryArgs: PreviewProps = {
  l10n: l10n
};

const ref = React.createRef<HTMLInputElement>();

export const Empty: ComponentStory<typeof Main> = () => {
  const args: MainProps = { ...defaultArgs };
  return <Main {...args}>
          <Snippet 
            ref={ref} 
            isEditable={true}
            setLocalCode={setCode} 
            {...args}
          />
          <Button {...buttonArgs} />
          <Preview ref={ref} {...previewStoryArgs} />
        </Main>
}

export const Uneditable: ComponentStory<typeof Main> = () => {
  const args: MainProps = { ...defaultArgs, behaviour: behaviourUneditable };
  return <Main {...args}>
          <Snippet 
            ref={ref} 
            isEditable={false}
            setLocalCode={setCode} 
            {...args}
          />
          <Button {...buttonArgs} />
          <Preview ref={ref} {...previewStoryArgs} />
        </Main>
}
