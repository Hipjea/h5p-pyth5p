import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import l10n from '../localization'; 
import { defaultContext } from '../../.storybook/config/context';


// Imports the story for the test
import { Empty, Filled } from '../stories/Preview.stories';

it('renders a preview with string content', () => {
  render(<Filled {...Filled.args} />);
  expect(screen.queryByRole('pre')).toHaveTextContent(defaultContext.code);
});

it('renders a preview with array content', () => {
  const textArray = Array(5).fill(0).map((_, i) => `txt ${i++}`);
  render(<Filled out={textArray} l10n={l10n} />);
  expect(screen.queryByRole('pre')).toHaveTextContent(textArray.join(''));
});

it('renders an empty preview', () => {
  render(<Empty {...Empty.args} />);
  expect(screen.queryByRole('pre')).toHaveTextContent('');
});