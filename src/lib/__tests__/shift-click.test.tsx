import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectArea from '../SelectArea';
import Selectable from '../Selectable';

it('range selection with shift + click', async () => {
  const onSelect = vi.fn();
  const onUnselect = vi.fn();
  const onFocus = vi.fn();

  render(
    <SelectArea onSelect={onSelect} onUnselect={onUnselect} onFocus={onFocus}>
      <div>
        <Selectable index={0}>
          <div data-testid='item-0'>item0</div>
        </Selectable>
        <Selectable index={1}>
          <div data-testid='item-1'>item1</div>
        </Selectable>
        <Selectable index={2}>
          <div data-testid='item-2'>item2</div>
        </Selectable>
        <Selectable index={3}>
          <div data-testid='item-3'>item3</div>
        </Selectable>
        <Selectable index={4}>
          <div data-testid='item-4'>item4</div>
        </Selectable>
      </div>
    </SelectArea>
  );

  const item1 = screen.getByTestId('item-1');
  const item3 = screen.getByTestId('item-3');

  // initial focus on index 0
  expect(onFocus).toBeCalledTimes(1);
  expect(onFocus).toBeCalledWith(0);
  vi.clearAllMocks();

  userEvent.click(item1);
  userEvent.click(item3, { shiftKey: true });
  expect(onFocus).toBeCalledTimes(2);
  expect(onFocus).toHaveBeenNthCalledWith(1, 1);
  expect(onFocus).toHaveBeenNthCalledWith(2, 3);
  expect(onSelect).toBeCalledTimes(3);
  expect(onSelect).toHaveBeenNthCalledWith(1, 1);
  expect(onSelect).toHaveBeenNthCalledWith(2, 2);
  expect(onSelect).toHaveBeenNthCalledWith(3, 3);
  expect(onUnselect).not.toBeCalled();
});
