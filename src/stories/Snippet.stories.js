import React from 'react';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import { defaultContext } from '../../.storybook/config/context';
import { behaviourEditable, behaviourUneditable, behaviourManual } from '../../.storybook/config/behaviourContext';
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
Default.args = { ...defaultEditorContext, ...defaultContext, ...behaviourManual };

export const Uneditable = Template.bind({});
Uneditable.args = { ...uneditableEditorContext, ...defaultContext, ...behaviourUneditable };

const TemplateWithoutButton = (args) => (
    <Snippet {...args}>
        <Invisible {...Invisible.args} />
    </Snippet>
);

export const WithoutButton = TemplateWithoutButton.bind({});
WithoutButton.args = { ...defaultEditorContext, ...defaultContext, ...behaviourEditable };
