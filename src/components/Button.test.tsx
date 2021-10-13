import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import l10n from '../localization'; 
import { shallow } from 'enzyme';
import Button, { Props as ButtonProps } from './Button';


// Imports the story for the test
import { RunButton } from '../stories/Button.stories';

const defaultArgs : ButtonProps = {
  id: '1',
  title: 'button title',
  klass: 'h5p-joubelui-button h5p-question-check-answer',
  onLaunchAction: jest.fn(),
  disabled: false,
  text: 'Button text'
};

it('renders the button in the visible state', () => {
  render(<RunButton {...defaultArgs} />);
  expect(screen.getByRole('button')).toHaveTextContent(l10n.run);
});

describe('when the button is clicked', () => {
  const wrapper = shallow((
    <Button {...defaultArgs} />
  )); 

  beforeAll(() => wrapper.find('button').simulate('click'));

  it('triggers a click event', () => {
    expect(defaultArgs.onLaunchAction).toHaveBeenCalled(); 
  });
});
