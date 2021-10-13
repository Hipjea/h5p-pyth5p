import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import l10n from '../localization'; 
import { shallow } from 'enzyme';
import Button, { Props as ButtonProps } from './Button';
import { defaultContext } from '../../.storybook/config/context';

// Imports the story for the test
import { RunButton } from '../stories/Button.stories';

const defaultArgs : ButtonProps = {
  id: '1',
  title: 'button title',
  cls: 'h5p-joubelui-button h5p-question-check-answer',
  onLaunchAction: jest.fn(),
  disabled: false,
  text: 'Button text'
};

it('renders the button in the visible state', () => {
  render(<RunButton {...defaultArgs} />);
  expect(screen.getByRole('button')).toHaveTextContent(l10n.run);
});

describe('when the button is clicked', () => {
  const mockCallback = jest.fn();
  const wrapper = shallow((
    <Button {...defaultContext} {...defaultArgs} />
  )); 

  beforeAll(() => wrapper.find('button').simulate('click'));

  it('triggers a click event', () => {
    expect(mockCallback).toHaveBeenCalled(); 
  });

  it('uses a valid callback', () => {
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});
