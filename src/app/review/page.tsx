"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ReviewResultsDashboard } from '@/components/ReviewComponents';

export default function ReviewDashboard() {
  const [documentText, setDocumentText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [reviewResult, setReviewResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    
    if (file.type.includes('text') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setDocumentText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      setDocumentText(`[File attached: ${file.name}]\n\nWaiting for processing...`);
    }
  };

  const runPipeline = async () => {
    if (!documentText.trim() && !fileName) return;
    setIsEvaluating(true);
    setReviewResult(null);
    
    try {
      const res = await fetch('/api/review', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: documentText || fileName }) 
      });
      const data = await res.json();
      if (res.ok) {
        setReviewResult(data);
      } else {
        alert(data.error || "Failed to run pipeline.");
      }
    } catch (e) {
      console.error(e);
      alert("Network or API error.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="fade-in" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#000',
      color: '#fff'
    }}>
      {/* Modern, sleek top nav */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 2rem', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/" style={{ fontSize: '0.9rem', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} 
                onMouseOver={e => e.currentTarget.style.color = '#fff'}
                onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}>
            &larr; Home
          </Link>
          <div style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          <h1 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #60a5fa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Universal AI Review Engine
          </h1>
        </div>
        <div>
          {reviewResult?.identified_mistakes?.some((m: any) => m.type === "Configuration") ? (
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '9999px' }}>
              ⚠️ API Key Missing
            </span>
          ) : reviewResult ? (
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '9999px' }}>
              🟢 Live Engine Active
            </span>
          ) : (
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#9ca3af', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '9999px' }}>
              Awaiting Document
            </span>
          )}
        </div>
      </nav>

      {/* Main Workspace Layout */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1600px', 
        width: '100%', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)', 
        gap: '2rem', 
        padding: '2rem',
        height: 'calc(100vh - 73px)'
      }}>
        
        {/* Left Panel: The Setup / Editor */}
        <section style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          borderRadius: '16px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          backgroundColor: '#0a0a0c', 
          overflow: 'hidden', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121217', display: 'flex', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', color: '#e5e7eb', textTransform: 'uppercase', margin: 0 }}>Document Source</h3>
          </div>

          <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
            
            {/* File Upload Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                border: '2px dashed rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'; e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept=".txt,.md,.pdf,.doc,.docx" />
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#d1d5db', margin: 0, paddingBottom: '0.5rem' }}>Click to upload a file</p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Supports .txt, .md, .pdf (We will parse it for you.)</p>
              
              {fileName && (
                <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', borderRadius: '8px', fontSize: '0.875rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  {fileName} attached
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', flex: 1 }}></div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>OR PASTE TEXT</span>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', flex: 1 }}></div>
            </div>
            
            <textarea 
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '1rem',
                color: '#d1d5db',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                resize: 'none',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              placeholder="Paste your document, script, or proposal here..."
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
            />
          </div>

          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121217', display: 'flex', justifyContent: 'flex-end' }}>
             <button 
                onClick={runPipeline}
                disabled={isEvaluating || (!documentText.trim() && !fileName)}
                style={{
                  position: 'relative',
                  padding: '0.75rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.025em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: (isEvaluating || (!documentText.trim() && !fileName)) ? 'not-allowed' : 'pointer',
                  border: (isEvaluating || (!documentText.trim() && !fileName)) ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  backgroundColor: (isEvaluating || (!documentText.trim() && !fileName)) ? '#1f2937' : '#fff',
                  color: (isEvaluating || (!documentText.trim() && !fileName)) ? '#6b7280' : '#000',
                  boxShadow: (isEvaluating || (!documentText.trim() && !fileName)) ? 'none' : '0 0 40px -10px rgba(255,255,255,0.4)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => { if (!isEvaluating && (documentText.trim() || fileName)) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.backgroundColor = '#e5e7eb'; } }}
                onMouseOut={e => { if (!isEvaluating && (documentText.trim() || fileName)) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#fff'; } }}
              >
                {isEvaluating ? (
                  <span>Processing...</span>
                ) : (
                  <span>Run Review Pipeline</span>
                )}
              </button>
          </div>
        </section>

        {/* Right Panel: The Output Dashboard */}
        <section style={{ 
          height: '100%',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: isEvaluating ? 'rgba(99, 102, 241, 0.5)' : reviewResult ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.05)',
          backgroundColor: isEvaluating ? '#0a0a0f' : '#0a0a0c',
          transition: 'all 0.7s ease',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}>
          
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121217', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, position: 'relative' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{reviewResult ? '🎯' : '📊'}</span>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', color: '#e5e7eb', textTransform: 'uppercase', margin: 0 }}>Review Dashboard</h3>
            </div>
            {reviewResult && <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>Analysis Complete</span>}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', position: 'relative' }}>
            
            {/* Background Glows */}
            {isEvaluating && (
               <div className="fade-in" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                  <div style={{ position: 'absolute', top: '25%', left: '25%', width: '16rem', height: '16rem', backgroundColor: 'rgba(79, 70, 229, 0.2)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
                  <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: '16rem', height: '16rem', backgroundColor: 'rgba(2db, 39, 119, 0.2)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
               </div>
            )}

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {isEvaluating ? (
                <div className="fade-in" style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', background: 'linear-gradient(to right, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                       AI Engine Running
                    </h2>
                    <p style={{ color: '#9ca3af', maxWidth: '300px', margin: '0 auto', lineHeight: 1.5, fontSize: '0.9rem' }}>
                      Evaluating the document against the 11-point schema, identifying logical fallacies, and structuring the correction mentor plan.
                    </p>
                  </div>
                  
                  {/* Mock Loading Bar */}
                  <div style={{ width: '16rem', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '9999px', overflow: 'hidden', marginTop: '1rem' }}>
                    <div className="animate-glow" style={{ height: '100%', background: 'linear-gradient(to right, #3b82f6, #6366f1, #ec4899)', borderRadius: '9999px', width: '60%' }}></div>
                  </div>
                </div>
              ) : !reviewResult ? (
                <div className="fade-in" style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem 0' }}>Awaiting Input</h2>
                  <p style={{ color: '#9ca3af', textAlign: 'center', maxWidth: '300px', fontSize: '0.9rem' }}>
                    Upload a file or paste text on the left, then click Review to initiate the pipeline.
                  </p>
                </div>
              ) : (
                <ReviewResultsDashboard data={reviewResult} />
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
