import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import { Props as FooterProps } from './Footer';
import l10n from '../localization';
require('../stories/static/jquery.min.js');
require('../stories/static/h5p.js');
require('../stories/static/h5p-event-dispatcher.js');


// Imports the story for the test
import { Default, NoExercise } from '../stories/Footer.stories';

const defaultArgs : FooterProps = {
  userCode: 'print("hello")',
  isCodeRun: false,
  performRetry: jest.fn(),
  l10n: l10n,
  contentType: {
    isExercise: true,
    correction: {
      correctionText: "print(\"Correction filler\")",
      answers: [
        {
          text: 'print("Hello world")',
          bestAnswer: false,
          tipsAndFeedback: "<p>Tips...</p>"
        },
        {
          text: 'print("Best answer code")',
          bestAnswer: true,
          tipsAndFeedback: "<p>This is the best answer</p>"
        }
      ]
    }
  },
  behaviour: {
    enableRetry: true,
    isEditable: false,
    enableSolutionsButton: true
  }
};

it('renders the check button', () => {
  render(<Default {...defaultArgs} />);
  expect(screen.queryByTestId('checkbutton')).not.toBeNull();
  expect(screen.queryByTestId('checkbutton')).toBeVisible();
});

it('has no check button', () => {
  const args = { ...defaultArgs, contentType: { isExercise: false } };
  render(<NoExercise {...args} />);
  expect(screen.queryByTestId('checkbutton')).toBeNull();
});

describe('when the check button is clicked', () => {
  const setShowSolutionButton = jest.fn();
  const wrapper = mount(<Default {...defaultArgs} />);
  const handleClick = jest.spyOn(React, "useState") as jest.Mock<any>;
  handleClick.mockImplementation(showSolutionButton => [showSolutionButton, setShowSolutionButton]);

  beforeAll(() => wrapper.find('.h5p-question-check-answer').simulate('click'));
  
  it('triggers a click event', () => {
    expect(setShowSolutionButton).toBeTruthy();
  });
});
