import React from 'react';
import Snippet from '../components/Snippet';
import { defaultContext } from '../../.storybook/config/context';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';
import { behaviourEditable } from '../../.storybook/config/behaviourContext';
import { action } from '@storybook/addon-actions';
import { ref } from '../../.storybook/config/refs';


export default {
  title: 'Components/Snippet',
  component: Snippet
};

const setCode = () => {
    action('Code is set')
}

const Template = (args) => (
    <Snippet 
        ref={ref} 
        id={defaultContext.id}
        code={defaultContext.code}
        isEditable={behaviourEditable.isEditable}
        setCode={setCode} 
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = { 
    id: 1, 
    code: defaultContext.code,
    isEditable: true, 
    ...defaultEditorContext, 
    ...defaultContext
};

export const Uneditable = Template.bind({});
Uneditable.args = { 
    id: 2, 
    code: defaultContext.code,
    isEditable: false, 
    ...uneditableEditorContext, 
    ...defaultContext
};
