import { createContext } from 'react';
import { SelectStore } from '../types/selectStore';

export const SelectStoreContext = createContext<SelectStore | null>(null);
