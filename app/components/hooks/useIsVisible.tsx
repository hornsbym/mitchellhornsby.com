import { useEffect, useState, useRef, RefObject } from 'react';

export default function useIsVisible(ref: RefObject<HTMLElement>, options?: IntersectionObserverInit) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting),
      options
    );
  }, []);

  useEffect(() => {
    if (observerRef.current && ref.current) observerRef.current.observe(ref.current);

    return () => {
      if (observerRef.current && ref.current) observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}