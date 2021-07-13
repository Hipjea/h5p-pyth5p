import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import l10n from '../localization'; 
import { shallow } from 'enzyme';
import Button from './Button';
import { defaultContext } from '../../.storybook/config/context';

// Imports the story for the test
import { Default } from '../stories/Button.stories';

it('renders the button in the visible state', () => {
  render(<Default {...Default.args} />);
  expect(screen.getByRole('button')).toHaveTextContent(l10n.run);
});

describe('when the button is clicked', () => {
  const mockCallback = jest.fn();
  const wrapper = shallow((
    <Button onLaunchAction={mockCallback} visible={true} {...defaultContext} />
  )); 

  beforeAll(() => wrapper.find('button').simulate('click'));

  it('triggers a click event', () => {
    expect(mockCallback).toHaveBeenCalled(); 
  });

  it('uses a valid callback', () => {
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});