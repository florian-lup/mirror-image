import { useEffect, useRef, useCallback } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
}

export function useAutoScroll<T extends HTMLElement>(
  shouldScroll: boolean,
  options: ScrollOptions = { behavior: 'smooth' }
) {
  const ref = useRef<T>(null);

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollIntoView(options);
  }, [options]);

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
    }
  }, [shouldScroll, scrollToBottom]);

  return ref;
} 