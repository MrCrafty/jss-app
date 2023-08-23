import TestComponent from './TestComponent';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'TestComponent',
  component: TestComponent,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    text: 'SUBMIT',
    bgColor: 'blue',
  },
};

export const Danger = {
  args: {
    ...Default.args,
    bgColor: 'red',
  },
};

export const Success = {
  args: {
    ...Default.args,
    bgColor: 'green',
  },
};

export const ClickMe = {
  args: {
    ...Default.args,
    text: 'ClickMe',
  },
};

export const Back = {
  args: {
    ...Default.args,
    text: 'Back',
  },
};

export const OutRed = {
  args: {
    ...Default.args,
    bgColor: 'out-red',
  },
};
export const OutBlue = {
  args: {
    ...Default.args,
    bgColor: 'out-blue',
  },
};
