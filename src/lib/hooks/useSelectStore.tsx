import { useContext } from 'react';
import { SelectStoreContext } from '../contexts/SelectStoreContext';

export default function useSelectStore() {
  const context = useContext(SelectStoreContext);
  if (!context) {
    throw new Error('useSelectStore must be used within a SelectProvider');
  }
  return context;
}
