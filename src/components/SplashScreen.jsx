import { useEffect, useState } from 'react';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in'); // 'in' | 'hold' | 'out' | 'done'

  useEffect(() => {
    // Fade in: 0.6s
    const holdTimer = setTimeout(() => setPhase('hold'), 600);
    // Hold until 3.4s mark, then fade out
    const outTimer  = setTimeout(() => setPhase('out'),  3400);
    // Remove after fade-out completes
    const doneTimer = setTimeout(() => { setPhase('done'); onDone && onDone(); }, 4000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (phase === 'done') return null;

  const opacity =
    phase === 'in'   ? 0   :
    phase === 'hold' ? 1   :
    phase === 'out'  ? 0   : 0;

  const logoScale =
    phase === 'in'   ? 0.88 :
    phase === 'hold' ? 1    :
    phase === 'out'  ? 1.04 : 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#1F1918',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease',
        opacity: phase === 'out' ? 0 : 1,
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      <img
        src="/logo-dark.svg"
        alt="Kamran Shawls"
        style={{
          width: '90px',
          height: '90px',
          opacity,
          transform: `scale(${logoScale})`,
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          filter: 'none',
          boxShadow: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}
