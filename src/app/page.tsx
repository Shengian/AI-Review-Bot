"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' }}>
      
      {/* Sleek Top Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ fontWeight: 800, letterSpacing: '-0.05em', fontSize: '1.25rem' }}>
          Rev<span style={{ color: '#6366f1' }}>AI</span>
        </div>
        <div>
          <Link href="/review" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', textDecoration: 'none', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)', transition: 'background-color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ position: 'relative', paddingTop: '12rem', paddingBottom: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1 }}>
        
        {/* Abstract Background Elements */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 60%)', zIndex: -1, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', backgroundPosition: 'center center', zIndex: -2, maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}></div>

        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 1.5rem 0', maxWidth: '1000px' }}>
          Flawless reviews.<br/>
          <span style={{ background: 'linear-gradient(to right, #a855f7, #6366f1, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
             Uncompromising rigor.
          </span>
        </h1>

        <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '600px', margin: '0 0 3.5rem 0', lineHeight: 1.6 }}>
          Stop relying on manual reviews or generic chat bots. Our AI enforces a strict 11-point pedagogical framework to analyze, correct, and teach you how to improve your documents.
        </p>

        <Link href="/review" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#fff', color: '#000', padding: '1rem 3rem', borderRadius: '9999px', fontSize: '1.125rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(255,255,255,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.2)'; }}>
          Start Reviewing <span style={{ fontSize: '1.25rem' }}>&rarr;</span>
        </Link>
      </main>

      {/* Refined Feature Cards - Tighter and smaller */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 8rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Row 1 */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: '2 1 500px', backgroundColor: '#0c0c0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 15px 30px -10px rgba(0,0,0,0.5)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 0.75rem 0' }}>6-Step Correction Mentor</h3>
                <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.6 }}>We don't just rewrite for you. The engine identifies mistakes, explains the "why", and assigns actionable tasks so you actually improve.</p>
              </div>
            </div>

            <div style={{ flex: '1 1 300px', backgroundColor: '#0c0c0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 15px 30px -10px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>Surgical Precision</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>Extracts clarity, constraints, and accuracy using deterministic LLM prompting.</p>
            </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: '1 1 300px', backgroundColor: '#0c0c0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 15px 30px -10px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>Visual Analytics</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>Understand your document's strengths instantly through elegant UI scorecards.</p>
            </div>

            <div style={{ flex: '2 1 500px', backgroundColor: '#0c0c0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 15px 30px -10px rgba(0,0,0,0.5)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 0.75rem 0', position: 'relative', zIndex: 2 }}>11-Point Quality Control</h3>
              <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>Our engine validates every requirement, checks practical technicalities, and ensures professional tone. Nothing slips through the cracks.</p>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', fontSize: '10rem', opacity: 0.05, transform: 'rotate(-15deg)', pointerEvents: 'none' }}>
                🎯
              </div>
            </div>
        </div>

      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
        Universal AI Review Engine &copy; {new Date().getFullYear()}
      </footer>

    </div>
  );
}
