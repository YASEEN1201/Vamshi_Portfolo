import React from 'react';

export const BackgroundAura: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary subtle top-right ambient electric blue lighting */}
      <div
        className="absolute -top-[15%] right-[-5%] w-[650px] h-[650px] rounded-full opacity-[0.14] blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #2563eb 0%, #1e40af 50%, transparent 70%)',
        }}
      />

      {/* Mid-screen restrained accent glow */}
      <div
        className="absolute top-[45%] -left-[10%] w-[550px] h-[550px] rounded-full opacity-[0.09] blur-[150px]"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #1d4ed8 45%, transparent 70%)',
        }}
      />

      {/* Subtle bottom ambient glow */}
      <div
        className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[160px]"
        style={{
          background: 'radial-gradient(circle, #2563eb 0%, #0f172a 60%, transparent 75%)',
        }}
      />

      {/* Subtle cinematic film noise / grid texture simulation */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
