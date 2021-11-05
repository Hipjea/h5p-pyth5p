import React from 'react';
import { Preview } from '../components/Preview';
import { Preview as PreviewProps } from '../types/Preview';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import l10n from '../../src/localization';

export default {
  title: 'Preview',
  component: Preview
} as ComponentMeta<typeof Preview>;

const defaultArgs: PreviewProps = {
  l10n: l10n
};

const ref = React.createRef<HTMLInputElement>();

export const Empty: ComponentStory<typeof Preview> = () => {
  const args: PreviewProps = { ...defaultArgs };
  return <Preview {...args} ref={ref} />
}

export const Filled: ComponentStory<typeof Preview> = () => {
  const args: PreviewProps = { ...defaultArgs };
  return <Preview {...args} ref={ref} />
}
