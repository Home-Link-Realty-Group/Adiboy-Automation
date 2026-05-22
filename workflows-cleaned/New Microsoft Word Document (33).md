# New Microsoft Word Document (33)

Source: New Microsoft Word Document (33).docx

import { useState, useEffect } from 'react';

import { rentcastPropertyIntel } from '@/functions/rentcastPropertyIntel';

import { TrendingUp, Building2, Home, DollarSign, Calendar, AlertCircle, Loader } from 'lucide-react';

const NAVY = '#0B1F45';

const NAVY2 = '#122B5E';

const GOLD = '#D4A843';

const GREEN = '#27ae60';

export default function MarketIntelligenceWidget({ lead }) {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {

    if (expanded && !data && !loading) {

      fetchMarketData();

    }

  }, [expanded]);

  async function fetchMarketData() {

    if (!lead.address || !lead.city || !lead.state) {

      setError('Address information incomplete');

      return;

    }

    setLoading(true);

    setError(null);

    try {

      const response = await rentcastPropertyIntel({

        address: lead.address,

        city: lead.city,

        state: lead.state,

        zipCode: lead.zip || null

      });

      setData(response.data);

    } catch (e) {

      setError('Failed to fetch market data: ' + e.message);

    }

    setLoading(false);

  }

  const formatCurrency = (val) => {

    if (!val) return '—';

    return '$' + Math.round(val).toLocaleString();

  };

  return (

    <div style={{ background: '#fff', borderRadius: 12, border: `2px solid ${NAVY}22`, marginBottom: 20, overflow: 'hidden' }}>

      {/* Header */}

      <button

        onClick={() => setExpanded(!expanded)}

        style={{

          width: '100%',

          display: 'flex',

          alignItems: 'center',

          gap: 12,

          padding: '16px 18px',

          background: expanded ? NAVY2 : '#f9f9f9',

          border: 'none',

          cursor: 'pointer',

          color: expanded ? '#fff' : NAVY,

          transition: 'all 0.2s'

        }}

      >

        <TrendingUp size={20} color={GOLD} />

        <div style={{ flex: 1, textAlign: 'left' }}>

          <div style={{ fontWeight: 800, fontSize: 15 }}>📊 Market Intelligence</div>

          <div style={{ fontSize: 11, color: expanded ? '#aaa' : '#888', marginTop: 2 }}>RentCast Property Estimates & Comps</div>

        </div>

        <div style={{ fontSize: 20, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>⋎</div>

      </button>

      {/* Content */}

      {expanded && (

        <div style={{ padding: '20px 18px', borderTop: `1px solid ${NAVY}22`, background: '#fafafa' }}>

          {error && (

            <div style={{ background: '#fff3f3', border: `1px solid #e74c3c`, borderRadius: 8, padding: 12, marginBottom: 16, display: 'flex', gap: 10, fontSize: 12, color: '#c0392b' }}>

              <AlertCircle size={16} style={{ flexShrink: 0 }} />

              {error}

              <button onClick={fetchMarketData} style={{ marginLeft: 'auto', color: '#e74c3c', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Retry</button>

            </div>

          )}

          {loading && (

            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>

              <Loader size={24} style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />

              <div style={{ fontSize: 13 }}>Fetching market data from RentCast...</div>

            </div>

          )}

          {data && !loading && (

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>

              {/* Valuation Card */}

              {data.valuation && (

                <div style={{ background: '#fff', border: `2px solid ${GOLD}22`, borderRadius: 10, padding: 14 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>

                    <Home size={16} color={GOLD} />

                    <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase' }}>Estimated Value</div>

                  </div>

                  <div style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 6 }}>

                    {formatCurrency(data.valuation.value || data.valuation.valuePerSqFt)}

                  </div>

                  {data.valuation.valuePerSqFt && (

                    <div style={{ fontSize: 11, color: '#666' }}>

                      ${data.valuation.valuePerSqFt}/sqft

                    </div>

                  )}

                  {data.valuation.percentile && (

                    <div style={{ fontSize: 10, color: '#888', marginTop: 6 }}>

                      {data.valuation.percentile}th percentile in area

                    </div>

                  )}

                </div>

              )}

              {/* Rental Card */}

              {data.rental && (

                <div style={{ background: '#fff', border: `2px solid ${GREEN}22`, borderRadius: 10, padding: 14 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>

                    <Building2 size={16} color={GREEN} />

                    <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase' }}>Monthly Rent Estimate</div>

                  </div>

                  <div style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 6 }}>

                    {formatCurrency(data.rental.rentEstimate || data.rental.rent)}

                  </div>

                  {data.rental.rentPerSqFt && (

                    <div style={{ fontSize: 11, color: '#666' }}>

                      ${data.rental.rentPerSqFt}/sqft/mo

                    </div>

                  )}

                  {data.valuation && (

                    <div style={{ fontSize: 10, color: '#888', marginTop: 6, fontWeight: 700 }}>

                      Cap Rate: {((data.rental.rentEstimate * 12 / (data.valuation.value || 1)) * 100).toFixed(1)}%

                    </div>

                  )}

                </div>

              )}

              {/* Last Updated */}

              {data.lastUpdated && (

                <div style={{ background: '#fff', border: `1px solid #ddd`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 8 }}>

                  <Calendar size={16} color='#888' />

                  <div>

                    <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', fontWeight: 700 }}>Data Updated</div>

                    <div style={{ fontSize: 12, color: NAVY, fontWeight: 600 }}>

                      {new Date(data.lastUpdated).toLocaleDateString()}

                    </div>

                  </div>

                </div>

              )}

            </div>

          )}

          {/* Comparable Sales */}

          {data && data.comparables && data.comparables.listings && data.comparables.listings.length > 0 && (

            <div style={{ marginTop: 20, borderTop: `1px solid ${NAVY}22`, paddingTop: 16 }}>

              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>📍 Recent Comparable Sales ({data.comparables.listings.length})</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>

                {data.comparables.listings.slice(0, 5).map((comp, i) => (

                  <div key={i} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>

                    <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>

                      {comp.address}

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>

                      <div>

                        <div style={{ fontSize: 10, color: '#666' }}>Sold Price</div>

                        <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>

                          {formatCurrency(comp.soldPrice)}

                        </div>

                      </div>

                      <div style={{ textAlign: 'right' }}>

                        <div style={{ fontSize: 10, color: '#666' }}>Days Ago</div>

                        <div style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>

                          {Math.round((Date.now() - new Date(comp.soldDate).getTime()) / (1000 * 60 * 60 * 24))} days

                        </div>

                      </div>

                    </div>

                    {comp.soldPricePerSqFt && (

                      <div style={{ fontSize: 10, color: '#666' }}>

                        ${comp.soldPricePerSqFt}/sqft

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* Refresh Button */}

          <button

            onClick={fetchMarketData}

            disabled={loading}

            style={{

              marginTop: 16,

              width: '100%',

              background: loading ? '#ddd' : '#f0f4ff',

              color: loading ? '#999' : NAVY,

              border: `1.5px solid ${loading ? '#ddd' : '#3498db'}`,

              borderRadius: 8,

              padding: '10px 16px',

              fontWeight: 700,

              fontSize: 12,

              cursor: loading ? 'default' : 'pointer',

              transition: 'all 0.2s'

            }}

          >

            {loading ? '⏳ Refreshing...' : '🔄 Refresh Market Data'}

          </button>

        </div>

      )}

      <style>{`

        @keyframes spin {

          from { transform: rotate(0deg); }

          to { transform: rotate(360deg); }

        }

      `}</style>

    </div>

  );

}
