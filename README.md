# react-select-items

`react-select-items` is a react package for multiple selection with keyboard and mouse. It offers a familiar interface similar to Windows Explorer, allowing users to intuitively select items.

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

## API

### SelectArea

The main component that wraps the selectable items.

Props:

- `onSelect`: (optional) Callback function called when an item is selected
- `onUnselect`: (optional) Callback function called when an item is unselected
- `onFocus`: (optional) Callback function called when an item is clicked
- `options`: (optional) Selection options object with the following properties:
  - `useCtrl`: (boolean) If true, allows using Ctrl + click for toggle selection (default: true)
  - `useShift`: (boolean) If true, allows using Shift + click for range selection (default: true)
  - `useCtrlShift`: (boolean) If true, allows using Ctrl + Shift + click for multiple range selection (default: true)
  - `useDrag`: (boolean) If true, allows using mouse click and drag for box selection (default: true)
  - `useShiftToDrag`: (boolean) If true, requires holding Shift key for box selection (default: false)

### Selectable

A wrapper component for individual selectable items.

Props:

- `index`: A unique number identifying the selectable item

## License

This project is licensed under the MIT License.
