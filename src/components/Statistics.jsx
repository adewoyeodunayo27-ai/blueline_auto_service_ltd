import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../data/business.js';
import { Users, Wrench, Phone, Award } from 'lucide-react';

const ICON_MAP = { Users, Wrench, Phone, Award };

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (!active) return;
    const numericStr = target.replace(/[^0-9]/g, '');
    const suffix = target.replace(/[0-9]/g, '');
    const end = parseInt(numericStr, 10);
    if (isNaN(end)) { setCount(target); return; }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end).toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end.toLocaleString() + suffix);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function StatItem({ stat, active, index }) {
  const Icon = ICON_MAP[stat.icon] || Award;
  const count = useCountUp(stat.value, 1800, active);

  return (
    <div className="stat-item" style={{ animationDelay: `${index * 120}ms` }}>
      <div className="stat-icon" aria-hidden="true">
        <Icon size={28} />
      </div>
      <div className="stat-value" aria-label={`${stat.value} ${stat.label}`}>
        {active ? count : '—'}
      </div>
      <div className="stat-label">{stat.label}</div>
      <p className="stat-note">Placeholder — to be confirmed</p>
    </div>
  );
}

export default function Statistics() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" aria-labelledby="stats-title" ref={ref}>
      <div className="stats-bg" aria-hidden="true" />
      <div className="container">
        <h2 id="stats-title" className="sr-only">Business Statistics</h2>
        <div className="stats-grid">
          {BUSINESS.stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }

        .stats-section {
          position: relative;
          padding: var(--sp-4xl) 0;
          overflow: hidden;
        }

        .stats-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--navy) 0%, var(--accent-dark) 60%, var(--navy-light) 100%);
          z-index: 0;
        }

        .stats-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .stats-section .container {
          position: relative;
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,.1);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-item {
            padding: 1.5rem 0.5rem;
          }
          .stat-icon {
            width: 44px;
            height: 44px;
            margin-bottom: var(--sp-sm);
          }
          .stat-value {
            font-size: 1.75rem;
          }
          .stat-label {
            font-size: 0.75rem;
            letter-spacing: 0.05em;
          }
        }

        .stat-item {
          background: rgba(13,27,62,.5);
          padding: var(--sp-2xl) var(--sp-lg);
          text-align: center;
          position: relative;
          backdrop-filter: blur(4px);
          transition: background var(--transition);
          animation: fadeInStat 0.6s ease both;
        }

        .stat-item:hover {
          background: rgba(29,111,235,.2);
        }

        @keyframes fadeInStat {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          background: rgba(29,111,235,.25);
          border: 1px solid rgba(29,111,235,.35);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-300);
          margin: 0 auto var(--sp-md);
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1;
          margin-bottom: var(--sp-xs);
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--grey-300);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: var(--sp-sm);
        }

        .stat-note {
          font-size: 0.7rem;
          color: rgba(255,255,255,.35);
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
