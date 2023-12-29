import { useState, useEffect } from 'react';

function useWindowSize(threshold = 640) {
  // Initialize state with undefined so it's SSR (server-side rendering) friendly
  const [isScreenSmall, setIsScreenSmall] = useState(undefined);

  useEffect(() => {
    // Ensure window is defined
    if (typeof window !== 'undefined') {
      function handleResize() {
        setIsScreenSmall(window.innerWidth < threshold);
      }

      window.addEventListener('resize', handleResize);
      // Set the initial value
      handleResize();

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [threshold]); // Depend on the threshold

  return isScreenSmall;
}

export default useWindowSize;
