import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectArea from '../components/SelectArea';
import Selectable from '../components/Selectable';

it('multiple range selection with ctrl + shift + click', async () => {
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
        <Selectable index={5}>
          <div data-testid='item-5'>item5</div>
        </Selectable>
        <Selectable index={6}>
          <div data-testid='item-6'>item6</div>
        </Selectable>
        <Selectable index={7}>
          <div data-testid='item-7'>item7</div>
        </Selectable>
      </div>
    </SelectArea>,
  );

  const item2 = screen.getByTestId('item-2');
  const item4 = screen.getByTestId('item-4');
  const item6 = screen.getByTestId('item-6');
  const item7 = screen.getByTestId('item-7');

  // initial focus on index 0
  expect(onFocus).toBeCalledTimes(1);
  expect(onFocus).toBeCalledWith(0);
  vi.clearAllMocks();

  userEvent.click(item2);
  userEvent.click(item4, { shiftKey: true });
  userEvent.click(item6, { ctrlKey: true });
  userEvent.click(item7, { ctrlKey: true, shiftKey: true });

  expect(onFocus).toBeCalledTimes(4);
  expect(onFocus).toHaveBeenNthCalledWith(1, 2);
  expect(onFocus).toHaveBeenNthCalledWith(2, 4);
  expect(onFocus).toHaveBeenNthCalledWith(3, 6);
  expect(onFocus).toHaveBeenNthCalledWith(4, 7);
  expect(onSelect).toBeCalledTimes(5);
  expect(onSelect).toHaveBeenNthCalledWith(1, 2);
  expect(onSelect).toHaveBeenNthCalledWith(2, 3);
  expect(onSelect).toHaveBeenNthCalledWith(3, 4);
  expect(onSelect).toHaveBeenNthCalledWith(4, 6);
  expect(onSelect).toHaveBeenNthCalledWith(5, 7);
  expect(onUnselect).not.toBeCalled();
});
