import { useRef } from 'react';

/** Card that tilts toward the pointer in 3D (mouse / pen only; touch stays flat). */
export function Tilt({ children, className = '', max = 8, ...rest }) {
  const ref = useRef(null);

  const move = (e) => {
    if (e.pointerType === 'touch' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
    ref.current.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
    ref.current.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };
  const leave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** Glossy 3D sphere (pure CSS radial gradients). */
export function Orb({ className = '', tone = 'mint' }) {
  return <span aria-hidden="true" className={`orb orb-${tone} ${className}`} />;
}

const FACES = [
  ['A', 'front'],
  ['B', 'back'],
  ['C', 'right'],
  ['Gu', 'left'],
  ['हि', 'top'],
  ['Ab', 'bottom'],
];

/** Slowly rotating 3D cube of letters for the hero. */
export function LetterCube({ size = 150 }) {
  return (
    <div className="cube-scene" style={{ '--size': `${size}px` }} aria-hidden="true">
      <div className="cube">
        {FACES.map(([text, face]) => (
          <span key={face} className={`cube-face cube-${face}`}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Receding perspective grid "floor" for dark banners. */
export function GridFloor() {
  return <div aria-hidden="true" className="grid-floor" />;
}
