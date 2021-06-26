import React from 'react';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import { defaultContext } from '../../.storybook/config/context';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';

import { Visible, Invisible } from './Button.stories';

export default {
  title: 'Components/Snippet',
  component: Snippet,
  subcomponents: { Button }
};

const Template = (args) => (
    <Snippet {...args}>
        <Visible {...Visible.args} />
    </Snippet>
);

export const Default = Template.bind({});
Default.args = { 
    id: 1, 
    code: 'print("Hello world !")',
    isEditable: true, 
    checkOnEdit: true,
    ...defaultEditorContext, 
    ...defaultContext
};

export const Uneditable = Template.bind({});
Uneditable.args = { 
    id: 2, 
    code: 'print("Hello world !")',
    isEditable: false, 
    checkOnEdit: false,
    ...uneditableEditorContext, 
    ...defaultContext
};

const TemplateWithoutButton = (args) => (
    <Snippet {...args}>
        <Invisible {...Invisible.args} />
    </Snippet>
);

export const WithoutButton = TemplateWithoutButton.bind({});
WithoutButton.args = {
    id: 3, 
    code: 'print("Hello world !")',
    isEditable: true, 
    checkOnEdit: true,
    ...defaultEditorContext, 
    ...defaultContext 
};
