import React from 'react';
import Snippet, { Props as SnippetProps } from '../components/Snippet';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Snippet',
  component: Snippet
} as ComponentMeta<typeof Snippet>;

const defaultArgs: SnippetProps = {
    id: '1',
    code: 'print("hello")',
    isEditable: true,
    setCode: action('Button is clicked'),
    answerText: 'print("hello")'
};

const ref = React.createRef<HTMLInputElement>();

export const Default: ComponentStory<typeof Snippet> = () => {
    const args: SnippetProps = { ...defaultArgs };
    return <Snippet ref={ref} { ...args } />;
}

export const Uneditable: ComponentStory<typeof Snippet> = () => {
    const args: SnippetProps = { ...defaultArgs, isEditable: false };
    return <Snippet ref={ref} { ...args } />;
}

