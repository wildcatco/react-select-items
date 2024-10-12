# react-select-items

`react-select-items` is a react package for multiple selection with keyboard and mouse. It offers a familiar interface similar to Windows File Explorer, allowing users to intuitively select items.

## Demo

[Storybook](https://67039a0bb8bd36609fe0728d-rzyeaktwsj.chromatic.com/?path=/story/selectexample--example)

## Features

- Ctrl + click for toggle selection
- Shift + click for range selection
- Ctrl + Shift + click for multiple range selection
- Mouse click and drag for box selection

## Installation

```bash
npm install react-select-items
```

## Usage

Here's a basic example of how to use react-select-items:

```tsx
import React from 'react';
import { SelectArea, Selectable } from 'react-select-items';

function App() {
  const handleSelect = (index: number) => {
    console.log('Selected:', index);
  };

  const handleUnselect = (index: number) => {
    console.log('Unselected:', index);
  };

  const handleFocus = (index: number) => {
    console.log('Focused:', index);
  };

  return (
    <SelectArea
      onSelect={handleSelect}
      onUnselect={handleUnselect}
      onFocus={handleFocus}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <Selectable index={0}>
          <div>Item 1</div>
        </Selectable>
        <Selectable index={1}>
          <div>Item 2</div>
        </Selectable>
        <Selectable index={2}>
          <div>Item 3</div>
        </Selectable>
      </div>
    </SelectArea>
  );
}

export default App;
```

## Customizing Styles

### Changing Drag Box Style

You can customize the style of the drag box using CSS classes. The default class name is 'react-select-items-drag-box'. You can change the class name using the `dragBoxClassName` prop.

Example:

```tsx
import React from 'react';
import { SelectArea, Selectable } from 'react-select-items';
import './custom-styles.css';

function App() {
  return (
    <SelectArea dragBoxClassName='custom-drag-box'>
      {/* Selectable items */}
    </SelectArea>
  );
}
```

And in your CSS file:

```css
.custom-drag-box {
  border: 2px dashed blue !important;
  background-color: rgba(0, 0, 255, 0.1) !important;
  opacity: 0.5 !important;
}
```

Note: Use the `!important` rule to ensure your styles are applied.

## API

### SelectArea

| Prop                     | Type                      | Description                                                    | Default Value                 | Required |
| ------------------------ | ------------------------- | -------------------------------------------------------------- | ----------------------------- | -------- |
| `onSelect`               | `(index: number) => void` | Callback function called when an item is selected              | -                             | No       |
| `onUnselect`             | `(index: number) => void` | Callback function called when an item is unselected            | -                             | No       |
| `onFocus`                | `(index: number) => void` | Callback function called when an item is clicked               | -                             | No       |
| `options`                | `object`                  | Selection options object with properties listed below          | -                             | No       |
| `options.useCtrl`        | `boolean`                 | Allows using Ctrl + click for toggle selection                 | true                          | No       |
| `options.useShift`       | `boolean`                 | Allows using Shift + click for range selection                 | true                          | No       |
| `options.useCtrlShift`   | `boolean`                 | Allows using Ctrl + Shift + click for multiple range selection | true                          | No       |
| `options.useDrag`        | `boolean`                 | Allows using mouse click and drag for box selection            | true                          | No       |
| `options.useShiftToDrag` | `boolean`                 | Requires holding Shift key for box selection                   | false                         | No       |
| `dragBoxClassName`       | `string`                  | CSS class name for the drag box                                | 'react-select-items-drag-box' | No       |

### Selectable

| Prop    | Type     | Description                                     | Default Value | Required |
| ------- | -------- | ----------------------------------------------- | ------------- | -------- |
| `index` | `number` | A unique number identifying the selectable item | -             | Yes      |

## License

This project is licensed under the MIT License.
