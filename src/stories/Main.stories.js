import React from 'react';
import Main from '../components/Main';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import { Preview } from '../components/Preview';
import { defaultContext } from '../../.storybook/config/context';
import { behaviourEditable, behaviourUneditable, behaviourManual } from '../../.storybook/config/behaviourContext';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';
import { ref } from '../../.storybook/config/refs';
import { Default as ButtonDefault } from './Button.stories';
import { Filled } from './Preview.stories';

export default {
  title: 'Scenes/Main',
  component: Main,
  subcomponents: { Snippet, Button, Preview }
};

const setCode = () => {
    action('Code is set')
}

const runCode = () => {
    action('Code is running')
}

const TemplateDefault = (args) => (
    <Main {...args}>
        <Snippet 
            ref={ref} 
            id={defaultContext.id}
            code={defaultContext.code}
            isEditable={behaviourEditable.isEditable}
            setCode={setCode} 
            {...Default.args}
        />
        <Button onLaunchAction={() => runCode()} {...ButtonDefault.args} />
        <Preview ref={ref} {...Filled.args} />
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
        <Snippet 
            ref={ref} 
            id={defaultContext.id}
            code={defaultContext.code}
            isEditable={behaviourUneditable.isEditable}
            setCode={setCode} 
            {...Uneditable.args}
        />
        <Button onLaunchAction={() => runCode()} {...ButtonDefault.args} />
        <Preview ref={ref} {...Filled.args} />
    </Main>
);

export const Uneditable = TemplateUneditable.bind({});
Uneditable.args = { 
    id: 2,
    ...uneditableEditorContext, 
    ...defaultContext, 
    ...behaviourUneditable 
};
