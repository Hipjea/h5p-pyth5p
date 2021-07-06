import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
require('../stories/static/jquery.min.js');
require('../stories/static/h5p.js');
require('../stories/static/h5p-event-dispatcher.js');

// Imports the story for the test
import { Default } from '../stories/Footer.stories';

it('renders the check button', () => {
  render(<Default {...Default.args} />);
  expect(screen.queryByTestId('checkbutton')).toBeVisible();
});
