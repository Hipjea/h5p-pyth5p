import React from 'react';
import { Preview, Props as PreviewProps } from '../components/Preview';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';

export default {
  title: 'Preview',
  component: Preview
} as ComponentMeta<typeof Preview>;

const defaultArgs: PreviewProps = {
  out: '',
  l10n: l10n
};

const ref = React.createRef<HTMLInputElement>();

export const Empty: ComponentStory<typeof Preview> = () => {
  const args: PreviewProps = { ...defaultArgs };
  return <Preview {...args} ref={ref} />
}

export const Filled: ComponentStory<typeof Preview> = () => {
  const args: PreviewProps = { ...defaultArgs, out: 'print("hello")' };
  return <Preview {...args} ref={ref} />
}
