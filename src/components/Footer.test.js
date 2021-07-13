import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
require('../stories/static/jquery.min.js');
require('../stories/static/h5p.js');
require('../stories/static/h5p-event-dispatcher.js');


// Imports the story for the test
import { Default, IsNoExercise } from '../stories/Footer.stories';

it('renders the check button', () => {
  render(<Default {...Default.args} />);
  expect(screen.queryByTestId('checkbutton')).not.toBeNull();
  expect(screen.queryByTestId('checkbutton')).toBeVisible();
});

it('has no check button', () => {
  render(<IsNoExercise {...IsNoExercise.args} />);
  expect(screen.queryByTestId('checkbutton')).toBeNull();
});

describe('when the check button is clicked', () => {
  const setShowSolutionButton = jest.fn();
  const wrapper = mount(<Default {...Default.args} />);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation(showSolutionButton => [showSolutionButton, setShowSolutionButton]);

  beforeAll(() => wrapper.find('#pyth5p-checkbutton').simulate('click'));
  
  it('triggers a click event', () => {
    expect(setShowSolutionButton).toBeTruthy();
  });
});
