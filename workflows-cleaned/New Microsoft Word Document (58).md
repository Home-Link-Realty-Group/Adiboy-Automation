# New Microsoft Word Document (58)

Source: New Microsoft Word Document (58).docx

import React, { useState, useEffect } from 'react';

const StatusBadge = ({ status }) => {

  const colors = {

    GOOD: { bg: '#f0fdf4', color: '#16a34a', text: '✓ Good' },

    NEEDS_IMPROVEMENT: { bg: '#fffbeb', color: '#f59e0b', text: '⚠ Improve' },

    POOR: { bg: '#fef2f2', color: '#dc2626', text: '✗ Poor' }

  };

  const style = colors[status] || colors.POOR;

  return (

    <span style={{ background: style.bg, color: style.color, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>

      {style.text}

    </span>

  );

};

export default function HQCoreWebVitals() {

  const [metrics, setMetrics] = useState({

    lcp: { current: 0, average: 0, status: 'POOR' },

    fid: { current: 0, average: 0, status: 'POOR' },

    cls: { current: 0, average: 0, status: 'POOR' },

  });

  // Simulated metrics (would be replaced with real API calls)

  useEffect(() => {

    // Placeholder - in production, fetch from backend

    setMetrics({

      lcp: { current: 2100, average: 2200, status: 'GOOD' },

      fid: { current: 45, average: 62, status: 'GOOD' },

      cls: { current: 0.08, average: 0.11, status: 'GOOD' },

    });

  }, []);

  const getScore = (lcp, fid, cls) => {

    let score = 100;

    if (lcp > 2500) score -= 33;

    else if (lcp > 4000) score -= 50;

    if (fid > 100) score -= 33;

    else if (fid > 300) score -= 50;

    if (cls > 0.1) score -= 34;

    else if (cls > 0.25) score -= 50;

    return Math.max(0, score);

  };

  const overallScore = getScore(metrics.lcp.current, metrics.fid.current, metrics.cls.current);

  return (

    <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>

        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1a1a2e' }}>⚡ Core Web Vitals</h3>

        <div style={{ fontSize: '28px', fontWeight: '900', color: overallScore >= 90 ? '#16a34a' : overallScore >= 50 ? '#f59e0b' : '#dc2626' }}>

          {overallScore}

        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>

        {/* LCP */}

        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', border: '1px solid #e5e7eb' }}>

          <div style={{ fontSize: '11px', fontWeight: '700', color: '#666', marginBottom: '4px' }}>LCP (Largest Contentful Paint)</div>

          <div style={{ fontSize: '20px', fontWeight: '900', color: '#0b1f45', marginBottom: '4px' }}>{metrics.lcp.current}ms</div>

          <div style={{ fontSize: '10px', color: '#888', marginBottom: '6px' }}>Target: &lt;2500ms</div>

          <StatusBadge status={metrics.lcp.status} />

        </div>

        {/* FID */}

        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', border: '1px solid #e5e7eb' }}>

          <div style={{ fontSize: '11px', fontWeight: '700', color: '#666', marginBottom: '4px' }}>FID (First Input Delay)</div>

          <div style={{ fontSize: '20px', fontWeight: '900', color: '#0b1f45', marginBottom: '4px' }}>{metrics.fid.current}ms</div>

          <div style={{ fontSize: '10px', color: '#888', marginBottom: '6px' }}>Target: &lt;100ms</div>

          <StatusBadge status={metrics.fid.status} />

        </div>

        {/* CLS */}

        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', border: '1px solid #e5e7eb' }}>

          <div style={{ fontSize: '11px', fontWeight: '700', color: '#666', marginBottom: '4px' }}>CLS (Cumulative Layout Shift)</div>

          <div style={{ fontSize: '20px', fontWeight: '900', color: '#0b1f45', marginBottom: '4px' }}>{metrics.cls.current.toFixed(2)}</div>

          <div style={{ fontSize: '10px', color: '#888', marginBottom: '6px' }}>Target: &lt;0.1</div>

          <StatusBadge status={metrics.cls.status} />

        </div>

      </div>

      <div style={{ marginTop: '12px', fontSize: '11px', color: '#666', borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>

        <strong>Grade: {overallScore >= 90 ? '🟢 Good' : overallScore >= 50 ? '🟡 Needs Improvement' : '🔴 Poor'}</strong>

        <div style={{ marginTop: '4px' }}>Last updated: {new Date().toLocaleTimeString()}</div>

      </div>

    </div>

  );

}
