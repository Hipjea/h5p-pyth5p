import React from 'react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

const buttonAction = () => {
  action('Button is clicked');
}

const Template = (args) => <Button onLaunchAction={buttonAction} {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 1,
  title: "button title",
  cls: "h5p-joubelui-button h5p-question-check-answer",
  disabled: false,
  text: "Button text"
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 1,
  title: "button title",
  cls: "h5p-joubelui-button h5p-question-check-answer",
  disabled: true,
  text: "Button disabled"
};

export const RunButton = Template.bind({});
RunButton.args = {
  id: 1,
  title: "button title",
  cls: "pyth5p-run-btn",
  disabled: false,
  icon: <i className="play-icon"></i>,
  text: "Run"
};
