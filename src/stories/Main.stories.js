import React from 'react';
import Main from '../components/Main';
import Snippet from '../components/Snippet';
import Preview from '../components/Snippet';
import { defaultContext } from '../../.storybook/config/context';
import { behaviourEditable, behaviourUneditable, behaviourManual } from '../../.storybook/config/behaviourContext';
import { defaultEditorContext, uneditableEditorContext } from '../../.storybook/config/editorContext';
import { Filled } from './Preview.stories';
import { ref } from '../../.storybook/config/refs';


export default {
  title: 'Scenes/Main',
  component: Main,
  subcomponents: { Snippet, Preview }
};

const changeOutText = () => {
    action('Changed!')
}

const TemplateDefault = (args) => (
    <Main {...args}>
        <Snippet 
            ref={ref} 
            id={defaultContext.id}
            code={defaultContext.code}
            isEditable={behaviourEditable.isEditable}
            checkOnEdit={behaviourEditable.checkOnEdit}
            setOutText={changeOutText} 
            clearOutText={changeOutText} 
            {...Default.args}
        />
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
            checkOnEdit={behaviourUneditable.checkOnEdit}
            setOutText={changeOutText} 
            clearOutText={changeOutText} 
            {...Uneditable.args}
        />
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
