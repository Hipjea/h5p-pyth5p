import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { Props as PreviewProps } from './Preview';
import l10n from '../localization'; 
import { defaultContext } from '../../.storybook/config/context';

// Imports the story for the test
import { Filled } from '../stories/Preview.stories';

const defaultArgs : PreviewProps = {
  out: '',
  l10n: l10n
};

const ref = React.createRef<HTMLInputElement>();

it('renders a preview with string content', () => {
  const wrapper = mount(<Filled {...defaultArgs} ref={ref} />);
  expect(wrapper.find('pre')).toHaveTextContent(defaultContext.code);
});
/*
it('renders a preview with array content', () => {
  const text = Array(5).fill(0).map((_, i) => `txt ${i++}`).join('');
  mount(<Filled out={text} l10n={l10n} />);
  expect(screen.queryByRole('pre')).toHaveTextContent(text);
});

it('renders an empty preview', () => {
  mount(<Empty {...defaultArgs} />);
  expect(screen.queryByRole('pre')).toHaveTextContent('');
});
*/