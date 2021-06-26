import React from 'react';
import Main from '../components/Main';
import Snippet from '../components/Snippet';
import { defaultContext } from '../../.storybook/config/context';
import { behaviourUneditable, behaviourManual } from '../../.storybook/config/behaviourContext';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';

export default {
  title: 'Scenes/Main',
  component: Main,
  subcomponents: { Snippet }
};

const TemplateDefault = (args) => (
    <Main {...args}>
        <Snippet {...Default.args} />
    </Main>
);

export const Default = TemplateDefault.bind({});
Default.args = { 
    id: 1, 
    ...defaultEditorContext, 
    ...defaultContext, 
    ...behaviourManual 
};

const TemplateUneditable = (args) => (
    <Main {...args}>
        <Snippet {...Uneditable.args} />
    </Main>
);

export const Uneditable = TemplateUneditable.bind({});
Uneditable.args = { 
    id: 2,
    ...uneditableEditorContext, 
    ...defaultContext, 
    ...behaviourUneditable 
};
