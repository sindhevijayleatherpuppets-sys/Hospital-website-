'use client';

export default function BubbleBackground() {
  const bubbles = [
    { size: 55, left: '5%', delay: '0s', duration: '14s' },
    { size: 85, left: '15%', delay: '4s', duration: '18s' },
    { size: 40, left: '22%', delay: '1s', duration: '12s' },
    { size: 105, left: '32%', delay: '6s', duration: '20s' },
    { size: 65, left: '42%', delay: '2s', duration: '15s' },
    { size: 90, left: '52%', delay: '8s', duration: '17s' },
    { size: 45, left: '60%', delay: '3.5s', duration: '13s' },
    { size: 115, left: '68%', delay: '5s', duration: '22s' },
    { size: 70, left: '78%', delay: '1.5s', duration: '16s' },
    { size: 95, left: '88%', delay: '7s', duration: '19s' },
    { size: 50, left: '94%', delay: '2.5s', duration: '14s' },
    { size: 75, left: '10%', delay: '9s', duration: '16s' },
    { size: 48, left: '28%', delay: '11s', duration: '13s' },
    { size: 82, left: '46%', delay: '10s', duration: '17s' },
    { size: 60, left: '73%', delay: '12s', duration: '15s' },
  ];

  return (
    <div className="bubble-bg-container" aria-hidden="true">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="green-bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
    </div>
  );
}
