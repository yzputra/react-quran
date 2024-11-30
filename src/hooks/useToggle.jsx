import { useState, useCallback } from 'react';

const useToggle = (initValue) => {
  const [value, setValue] = useState(initValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggle]; 
}

export default useToggle;

