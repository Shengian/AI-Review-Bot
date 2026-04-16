"use client";

import React, { useState } from 'react';

// A refined, elegant wrapper for review sections instead of bulky accordions
export const ReviewSection = ({ title, emoji, children, isCritical = false }: any) => (
  <div style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <span style={{ fontSize: '1.5rem', backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '12px', border: `1px solid ${isCritical ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)'}` }}>
        {emoji}
      </span>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, color: isCritical ? '#fca5a5' : '#f3f4f6', letterSpacing: '-0.01em' }}>
        {title}
      </h3>
    </div>
    <div style={{ paddingLeft: '3.25rem' }}>
      {children}
    </div>
  </div>
);

export const MistakeHighlighter = ({ mistakes }: any) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
    {mistakes.map((m: any, i: number) => (
      <div key={i} style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.25rem', borderRadius: '12px', transition: 'transform 0.2s' }}
           onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
           <span style={{ color: '#ef4444', fontSize: '1.25rem' }}>⚠️</span>
           <h4 style={{ margin: 0, fontWeight: 600, color: '#fca5a5', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.type}</h4>
        </div>
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#d1d5db', lineHeight: 1.5 }}>{m.description}</p>
      </div>
    ))}
  </div>
);

export const CorrectionStepper = ({ guide }: any) => {
  const steps = [
    { num: 1, text: guide.step1, title: "Point it out", color: '#ef4444' },
    { num: 2, text: guide.step2, title: "Explain why", color: '#f59e0b' },
    { num: 3, text: guide.step3, title: "Ask to think", color: '#3b82f6' },
    { num: 4, text: guide.step4, title: "Suggest fix", color: '#8b5cf6' },
    { num: 5, text: guide.step5, title: "Give task", color: '#ec4899' },
    { num: 6, text: guide.step6, title: "Deadline", color: '#10b981' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
      {/* Vertical Connecting Line */}
      <div style={{ position: 'absolute', left: '15px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, #ef4444, #f59e0b, #3b82f6, #ec4899, #10b981)', opacity: 0.3, zIndex: 0 }}></div>
      
      {steps.map((s, idx) => (
        <div key={s.num} style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', position: 'relative', zIndex: 1 }}>
          
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0a0a0c', border: `2px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', color: s.color, flexShrink: 0, marginTop: '2px' }}>
            {s.num}
          </div>
          
          <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.25rem', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: s.color, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.title}</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#e5e7eb', lineHeight: 1.5 }}>{s.text}</p>
          </div>

        </div>
      ))}
    </div>
  );
};

// Main Export
export function ReviewResultsDashboard({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>
      
      {/* Grand Summary Header */}
      <div style={{ marginBottom: '3rem', backgroundColor: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '2rem', borderRadius: '16px' }}>
         <h2 style={{ fontSize: '1.25rem', margin: '0 0 1rem 0', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <span style={{ fontSize: '1.5rem' }}>✨</span> Executive Summary
         </h2>
         <p style={{ margin: 0, fontSize: '1.1rem', color: '#f3f4f6', lineHeight: 1.6, fontWeight: 500 }}>
           "{data.final_feedback}"
         </p>
      </div>

      <ReviewSection title={`Document Goal: ${data.understanding.title}`} emoji="🎯">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '1.5rem' }}>
          <div>
             <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Objective</span>
             <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', color: '#d1d5db' }}>{data.understanding.objective}</p>
          </div>
          <div>
             <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Target Audience</span>
             <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', color: '#d1d5db' }}>{data.understanding.audience}</p>
          </div>
        </div>
      </ReviewSection>

      <ReviewSection title="Clarity & Flow" emoji="🌊">
        <p style={{ fontSize: '1rem', color: '#e5e7eb', marginBottom: '1rem' }}>
          <span style={{ color: '#60a5fa', fontWeight: 600, marginRight: '0.5rem' }}>Status:</span>
          {data.clarity.logical_flow}
        </p>
        
        {data.clarity.confusing_points.length > 0 && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem 1.25rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Confusing Points to Address</span>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: '#d1d5db', fontSize: '0.95rem' }}>
              {data.clarity.confusing_points.map((p: string, i: number) => <li key={i} style={{ marginBottom: '0.5rem' }}>{p}</li>)}
            </ul>
          </div>
        )}
      </ReviewSection>

      <ReviewSection title="Quality & Presentation" emoji="💎">
         <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
           <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
             <span style={{ fontSize: '1.25rem' }}>📐</span>
             <div>
               <strong style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Formatting</strong>
               <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>{data.presentation.formatting}</span>
             </div>
           </div>
           <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
             <span style={{ fontSize: '1.25rem' }}>👔</span>
             <div>
               <strong style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Professionalism</strong>
               <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>{data.quality.professionalism}</span>
             </div>
           </div>
         </div>
         {data.quality.grammar.length > 0 && (
           <p style={{ color: '#fca5a5', marginTop: '1rem', fontSize: '0.9rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '0.75rem', borderRadius: '8px' }}>
             <span style={{ fontWeight: 600 }}>Grammar Alerts:</span> {data.quality.grammar.join(', ')}
           </p>
         )}
      </ReviewSection>

      <ReviewSection title="Identified Structural Mistakes" emoji="🚩" isCritical={data.identified_mistakes.length > 0}>
        <MistakeHighlighter mistakes={data.identified_mistakes} />
        
        {data.completeness.missing_sections.length > 0 && (
           <div style={{ marginTop: '1.5rem', backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
               <span style={{ color: '#f59e0b', fontSize: '1.25rem' }}>🧩</span>
               <h4 style={{ margin: 0, fontWeight: 600, color: '#fcd34d', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Missing Sections</h4>
             </div>
             <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#d1d5db', fontSize: '0.95rem' }}>
                {data.completeness.missing_sections.map((m: string, i: number) => <li key={i} style={{ marginBottom: '0.25rem' }}>{m}</li>)}
             </ul>
           </div>
        )}
      </ReviewSection>

      <ReviewSection title="Your 6-Step Improvement Plan" emoji="📈">
        <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Follow this guided methodology to correct your document structure and logic.
        </p>
        <CorrectionStepper guide={data.correction_guide} />
      </ReviewSection>

    </div>
  );
}
