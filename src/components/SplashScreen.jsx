import { useEffect, useState } from 'react';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('hold'), 600);
    const outTimer  = setTimeout(() => setPhase('out'),  3400);
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
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          color: '#C9A96E',
          opacity: 0.07,
          pointerEvents: 'none',
        }}
      >
        <use href="#boteh" x="10"  y="10"  width="60" height="90" />
        <use href="#boteh" x="90"  y="60"  width="60" height="90" />
        <use href="#boteh" x="170" y="0"   width="60" height="90" />
        <use href="#boteh" x="250" y="70"  width="60" height="90" />
        <use href="#boteh" x="330" y="20"  width="60" height="90" />
        <use href="#boteh" x="50"  y="150" width="60" height="90" />
        <use href="#boteh" x="130" y="200" width="60" height="90" />
        <use href="#boteh" x="210" y="160" width="60" height="90" />
        <use href="#boteh" x="290" y="220" width="60" height="90" />
        <use href="#boteh" x="10"  y="280" width="60" height="90" />
        <use href="#boteh" x="170" y="300" width="60" height="90" />
        <use href="#boteh" x="330" y="290" width="60" height="90" />
      </svg>

      <img
        src="/logo-dark.svg"
        alt="Kamran Shawls"
        style={{
          position: 'relative',
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
