import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectArea from '../SelectArea';
import Selectable from '../Selectable';

it('basic selection with click', () => {
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
      </div>
    </SelectArea>,
  );

  const item0 = screen.getByTestId('item-0');
  const item1 = screen.getByTestId('item-1');
  const item2 = screen.getByTestId('item-2');

  // initial focus on index 0
  expect(onFocus).toBeCalledTimes(1);
  expect(onFocus).toBeCalledWith(0);
  vi.clearAllMocks();

  userEvent.click(item0);
  expect(onFocus).toBeCalledTimes(1);
  expect(onFocus).toBeCalledWith(0);
  expect(onSelect).toBeCalledTimes(1);
  expect(onSelect).toBeCalledWith(0);
  expect(onUnselect).not.toBeCalled();
  vi.clearAllMocks();

  userEvent.click(item1);
  expect(onFocus).toBeCalledTimes(1);
  expect(onFocus).toBeCalledWith(1);
  expect(onSelect).toBeCalledTimes(1);
  expect(onSelect).toBeCalledWith(1);
  expect(onUnselect).toBeCalledTimes(1);
  expect(onUnselect).toBeCalledWith(0);
  vi.clearAllMocks();

  userEvent.click(item2);
  expect(onFocus).toBeCalledTimes(1);
  expect(onFocus).toBeCalledWith(2);
  expect(onSelect).toBeCalledTimes(1);
  expect(onSelect).toBeCalledWith(2);
  expect(onUnselect).toBeCalledTimes(1);
  expect(onUnselect).toBeCalledWith(1);
});
