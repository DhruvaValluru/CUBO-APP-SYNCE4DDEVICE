import { useEffect, useMemo, useState } from 'react';

import { HeadDirection } from '../types/app';

const demoSequence: HeadDirection[] = [
  'Forward',
  'Forward',
  'Forward',
  'Left',
  'Left',
  'Forward',
  'Right',
  'Forward',
];

export const useMockDetection = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((current) => (current + 1) % demoSequence.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const headDirection = demoSequence[step];
  const distracted = headDirection !== 'Forward';

  return useMemo(
    () => ({
      headDirection,
      distracted,
      eyeGaze: distracted ? 'Off-road' : 'On-road',
      detectionStatus: distracted ? 'Driver Distracted' : 'Focused',
      focusScore: distracted ? 54 : 97,
      dwellMs: distracted ? 1320 : 220,
    }),
    [distracted, headDirection],
  );
};
