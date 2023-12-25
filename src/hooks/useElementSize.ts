import React, { useState, useEffect } from 'react';
import useEventListener from './useEventListener';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useElementSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleResize = () => {
    if (elementRef.current) {
      const { clientWidth, clientHeight } = elementRef.current;
      setSize({ width: clientWidth, height: clientHeight });
    }
  };

  const elementRef = React.useRef(null);

  useEventListener("resize", handleResize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref: elementRef, width: size.width, height: size.height };
}

