import { Meta, StoryObj } from '@storybook/react';
import SelectExample from './SelectExample';

const meta = {
  title: 'SelectExample',
  component: SelectExample,
} satisfies Meta<typeof SelectExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
