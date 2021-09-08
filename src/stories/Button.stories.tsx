import React from 'react';
import Button, { Props as ButtonProps } from '../components/Button';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const defaultArgs: ButtonProps = {
  id: '1',
  title: 'button title',
  cls: 'h5p-joubelui-button h5p-question-check-answer',
  onLaunchAction: action('Button is clicked'),
  disabled: false,
  text: 'Button text'
};

export const Default: ComponentStory<typeof Button> = () => {
  const args: ButtonProps = { ...defaultArgs };
  return <Button { ...args } />;
}

export const Disabled: ComponentStory<typeof Button> = () => {
  const args: ButtonProps = { ...defaultArgs, disabled: true };
  return <Button { ...args } />;
}

export const RunButton: ComponentStory<typeof Button> = () => {
  const args: ButtonProps = { 
    ...defaultArgs, 
    cls: "pyth5p-run-btn", 
    icon: React.createElement('i', { className: "play-icon" }, ""),
    onLaunchAction: action('Code is running'),
    text: "Run"
  };
  return <Button { ...args } />;
}
