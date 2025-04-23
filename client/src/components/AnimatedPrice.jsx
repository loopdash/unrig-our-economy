import React, { useState, useEffect } from 'react';

export function AnimatedPrice({ end, duration = 1500 }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 30; // Number of animation frames
    const increment = (end - start) / steps;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(interval);
      } else {
        setDisplayed(start);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [end, duration]);

  return <>{displayed.toFixed(2)}</>;
}
