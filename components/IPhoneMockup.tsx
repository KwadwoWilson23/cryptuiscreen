'use client';

import { ReactNode } from 'react';

export default function IPhoneMockup({ children }: { children: ReactNode }) {
  return (
    <>
      {/* MOBILE: full-bleed app, no frame */}
      <div className="desktop:hidden fixed inset-0 bg-white overflow-hidden">
        {children}
      </div>

      {/* DESKTOP: pixel-perfect iPhone 16 Pro mockup */}
      <div className="hidden desktop:flex w-full min-h-[100dvh] items-center justify-center py-10">
        <div
          className="relative"
          style={{ width: '427px', height: '878px' }}
        >
          {/* Side buttons (left) */}
          <div
            className="absolute -left-[3px] top-[105px] w-[3px] h-[34px] bg-neutral-700"
            style={{ borderTopLeftRadius: '2px', borderBottomLeftRadius: '2px' }}
          />
          <div
            className="absolute -left-[3px] top-[170px] w-[3px] h-[60px] bg-neutral-700"
            style={{ borderTopLeftRadius: '2px', borderBottomLeftRadius: '2px' }}
          />
          <div
            className="absolute -left-[3px] top-[245px] w-[3px] h-[100px] bg-neutral-700"
            style={{ borderTopLeftRadius: '2px', borderBottomLeftRadius: '2px' }}
          />

          {/* Side buttons (right) */}
          <div
            className="absolute -right-[3px] top-[210px] w-[3px] h-[120px] bg-neutral-700"
            style={{ borderTopRightRadius: '2px', borderBottomRightRadius: '2px' }}
          />

          {/* Outer titanium ring */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: '60px',
              background:
                'linear-gradient(145deg, #d4d4d4 0%, #a3a3a3 35%, #737373 60%, #a3a3a3 100%)',
              boxShadow:
                '0 35px 90px rgba(0,0,0,0.30), 0 14px 28px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.25)',
            }}
          >
            {/* Inner black bezel */}
            <div
              className="absolute bg-black"
              style={{
                top: '3px',
                left: '3px',
                right: '3px',
                bottom: '3px',
                borderRadius: '57px',
              }}
            >
              {/* Screen */}
              <div
                className="absolute bg-white overflow-hidden"
                style={{
                  top: '13px',
                  left: '13px',
                  width: '393px',
                  height: '852px',
                  borderRadius: '47px',
                }}
              >
                {/* Dynamic Island */}
                <div
                  className="absolute z-50 bg-black"
                  style={{
                    top: '11px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '124px',
                    height: '36px',
                    borderRadius: '20px',
                  }}
                />

                {/* Grain + scanline overlays */}
                <div className="grain-overlay" />
                <div className="scanlines-overlay" />

                {/* App content */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
