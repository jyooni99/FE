// PWA 환경인가?

const isPWA = () => {
  if (typeof window === 'undefined') return false;

  const isStandalone = window.matchMedia?.(
    '(display-mode: standalone)',
  )?.matches;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isIOSStandalone = (window.navigator as any).standalone === true;

  return isStandalone || isIOSStandalone;
};

export default isPWA;
