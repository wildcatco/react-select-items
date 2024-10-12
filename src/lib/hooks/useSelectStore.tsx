import { useContext } from 'react';
import { SelectContext } from '../contexts/SelectContext';

export default function useSelectStore() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectStore must be used within a SelectProvider');
  }
  return context;
}
