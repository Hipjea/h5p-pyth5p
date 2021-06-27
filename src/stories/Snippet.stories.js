import React from 'react';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import { defaultContext } from '../../.storybook/config/context';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';
import { Visible, Invisible } from './Button.stories';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Snippet',
  component: Snippet,
  subcomponents: { Button }
};

const pre = React.createRef();
const canvas = React.createRef();
const ref = {
    pre: pre,
    canvas: canvas
}

const changeOutText = () => {
    action('Changed!')
}

const Template = (args) => (
    <Snippet 
        setOutText={changeOutText} 
        clearOutText={changeOutText} 
        ref={ref} {...args}>
        <Visible {...Visible.args} 
    />
    </Snippet>
);

export const Default = Template.bind({});
Default.args = { 
    id: 1, 
    code: defaultContext.code,
    isEditable: true, 
    checkOnEdit: true,
    ...defaultEditorContext, 
    ...defaultContext
};

export const Uneditable = Template.bind({});
Uneditable.args = { 
    id: 2, 
    code: defaultContext.code,
    isEditable: false, 
    checkOnEdit: false,
    ...uneditableEditorContext, 
    ...defaultContext
};

const TemplateWithoutButton = (args) => (
    <Snippet 
        setOutText={changeOutText} 
        clearOutText={changeOutText} 
        ref={ref} {...args}>
        <Invisible {...Invisible.args} 
    />
    </Snippet>
);

export const WithoutButton = TemplateWithoutButton.bind({});
WithoutButton.args = {
    id: 3, 
    code: defaultContext.code,
    isEditable: true, 
    checkOnEdit: true,
    ...defaultEditorContext, 
    ...defaultContext 
};
