import { useEffect } from 'react';

export function useKeyDown(key: string, onKeyDown: () => void): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === key) onKeyDown();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, onKeyDown]);
}
