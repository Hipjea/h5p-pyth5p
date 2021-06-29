import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import l10n from '../localization'; 

// Imports the story for the test
import { Visible, Invisible } from '../stories/Button.stories';

it('renders the button in the visible state', () => {
  render(<Visible {...Visible.args} />);
  expect(screen.getByRole('button')).toHaveTextContent(l10n.run);
});

it('renders the button in the invisible state', () => {
  render(<Invisible {...Invisible.args} />);
  expect(screen.queryByRole('button')).toBeNull();
});
