import React from 'react';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import { defaultContext } from '../../.storybook/config/context';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';
import { behaviourEditable } from '../../.storybook/config/behaviourContext';
import { Visible, Invisible } from './Button.stories';
import { action } from '@storybook/addon-actions';
import { ref } from '../../.storybook/config/refs';


export default {
  title: 'Components/Snippet',
  component: Snippet,
  subcomponents: { Button }
};

const changeOutText = () => {
    action('Changed!')
}

const Template = (args) => (
    <Snippet 
        ref={ref} 
        id={defaultContext.id}
        code={defaultContext.code}
        isEditable={behaviourEditable.isEditable}
        checkOnEdit={behaviourEditable.checkOnEdit}
        setOutText={changeOutText} 
        clearOutText={changeOutText} 
        {...args}>
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
        ref={ref} 
        id={defaultContext.id}
        code={defaultContext.code}
        isEditable={behaviourEditable.isEditable}
        checkOnEdit={behaviourEditable.checkOnEdit}
        setOutText={changeOutText} 
        clearOutText={changeOutText} 
        {...args}>
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
