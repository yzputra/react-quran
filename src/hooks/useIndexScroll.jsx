import { useState, useRef } from 'react';

const useIndexScroll = () => {
  const [value, setValue] = useState(0);

  const listRef = useRef(null);

  const scrollToIndex = (id) => {
    setTimeout(() => {
      const listNode = listRef.current;
      const section = listNode.querySelectorAll('section')[id];
      section.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    setValue(id);
  }

  return { value, listRef, scrollToIndex }
}

export default useIndexScroll;
