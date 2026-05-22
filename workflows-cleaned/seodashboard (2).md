# seodashboard (2)

Source: seodashboard (2).docx

import { useState, useEffect } from 'react';

import { base44 } from '@/api/base44Client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

import { TrendingUp, AlertTriangle, Zap, Eye, BarChart3, Lightbulb } from 'lucide-react';

import SaaSLayout from '@/components/saas/SaaSLayout';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#27ae60';

const RED = '#e74c3c';

const ORANGE = '#f39c12';

export default function SEODashboard() {

  const [seoData, setSeoData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview');

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {

    document.title = 'SEO Dashboard | Enterprise Keyword & Traffic Monitoring | Home-Link Realty Group';


    // Mock SEO data - in production, integrate Google Search Console API

    const mockSeoData = {

      kpis: {

        avgKeywordRank: 12.4,

        rankingKeywords: 156,

        keywordsTop3: 24,

        organicTraffic: 14280,

        trafficChange: 8.3,

        visibilityScore: 78,

      },

      rankingTrends: [

        { month: 'Jan', avgRank: 18.2, keywords: 120 },

        { month: 'Feb', avgRank: 16.8, keywords: 128 },

        { month: 'Mar', avgRank: 15.1, keywords: 142 },

        { month: 'Apr', avgRank: 14.2, keywords: 148 },

        { month: 'May', avgRank: 13.1, keywords: 154 },

        { month: 'Jun', avgRank: 12.4, keywords: 156 },

      ],

      trafficTrends: [

        { week: 'Week 1', organic: 2100, direct: 480, referral: 320 },

        { week: 'Week 2', organic: 2340, direct: 510, referral: 380 },

        { week: 'Week 3', organic: 2680, direct: 520, referral: 420 },

        { week: 'Week 4', organic: 2760, direct: 550, referral: 450 },

        { week: 'Week 5', organic: 2950, direct: 580, referral: 490 },

        { week: 'Week 6', organic: 3450, direct: 600, referral: 540 },

      ],

      contentDecay: [

        { slug: 'sell-house-fast-dallas', title: 'Sell House Fast Dallas', traffic: 1200, lastUpdated: '6 months ago', decayScore: 72 },

        { slug: 'foreclosure-help-atlanta', title: 'Foreclosure Help Atlanta', traffic: 980, lastUpdated: '3 months ago', decayScore: 45 },

        { slug: 'inherited-property-guide', title: 'Inherited Property Guide', traffic: 650, lastUpdated: '1 year ago', decayScore: 89 },

        { slug: 'cash-offer-process', title: 'Cash Offer Process', traffic: 540, lastUpdated: '8 months ago', decayScore: 78 },

        { slug: 'blog-comparison', title: 'Comparison Blog Post', traffic: 320, lastUpdated: '1.5 years ago', decayScore: 95 },

      ],

      topKeywords: [

        { keyword: 'sell house fast', rank: 3, volume: 8900, ctr: 12.8 },

        { keyword: 'cash home buyers', rank: 5, volume: 5600, ctr: 9.2 },

        { keyword: 'sell house as-is', rank: 2, volume: 4200, ctr: 15.3 },

        { keyword: 'foreclosure help', rank: 8, volume: 3800, ctr: 6.4 },

        { keyword: 'inherited property sale', rank: 4, volume: 2100, ctr: 11.7 },

      ],

    };

    setSeoData(mockSeoData);

    // Generate recommendations

    const recs = [

      {

        icon: '🔥',

        title: 'Update "Inherited Property Guide"',

        description: 'This post hasn\'t been updated in 1 year and is showing high decay. Refresh content, add 2024 data, and internal links.',

        priority: 'critical',

        impact: 'high',

      },

      {

        icon: '📈',

        title: 'Target Long-Tail Keywords',

        description: 'Your city pages rank well for generic terms. Create targeted content for "sell inherited house in [city]" variations.',

        priority: 'high',

        impact: 'medium',

      },

      {

        icon: '🔗',

        title: 'Strengthen Internal Linking',

        description: 'Blog posts mention foreclosure but don\'t link to /ForeclosureAtlanta. Add 3-5 contextual links per post.',

        priority: 'medium',

        impact: 'medium',

      },

      {

        icon: '⚡',

        title: 'Optimize Meta Descriptions',

        description: '12% of your top keywords have CTR below 8%. Rewrite meta descriptions to improve click-through rate.',

        priority: 'medium',

        impact: 'low',

      },

    ];

    setRecommendations(recs);

    setLoading(false);

  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading SEO dashboard...</div>;

  if (!seoData) return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No data available</div>;

  const { kpis, rankingTrends, trafficTrends, contentDecay, topKeywords } = seoData;

  const KPICard = ({ icon: Icon, label, value, change, unit = '' }) => (

    <div style={{

      background: '#fff',

      borderRadius: 12,

      padding: '20px',

      border: '1px solid #e8e8e8',

      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',

    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>

        <div style={{ width: 44, height: 44, background: '#f0f4ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>

          {Icon}

        </div>

        <div style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{label}</div>

      </div>

      <div style={{ fontSize: 28, fontWeight: 900, color: NAVY, marginBottom: 4 }}>

        {value}{unit}

      </div>

      {change !== undefined && (

        <div style={{ fontSize: 12, color: change > 0 ? GREEN : RED, fontWeight: 700 }}>

          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% {change > 0 ? 'improvement' : 'decline'}

        </div>

      )}

    </div>

  );

  return (

    <SaaSLayout

      title="Enterprise SEO Dashboard"

      subtitle="Real-time keyword rankings · organic traffic · content optimization"

      icon={TrendingUp}

      accent="#10b981"

    >

      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(11,31,69,0.06)" }}>

        {/* KPI Cards */}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>

          <KPICard icon="📍" label="Avg Keyword Rank" value={kpis.avgKeywordRank} change={-4.2} />

          <KPICard icon="🔑" label="Ranking Keywords" value={kpis.rankingKeywords} change={9.1} />

          <KPICard icon="🏆" label="Top 3 Keywords" value={kpis.keywordsTop3} change={20} />

          <KPICard icon="📈" label="Organic Traffic" value={kpis.organicTraffic} change={kpis.trafficChange} />

          <KPICard icon="👁️" label="Visibility Score" value={kpis.visibilityScore} change={5.3} unit="%" />

        </div>

        {/* Tabs */}

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '2px solid #e8e8e8', paddingBottom: 0 }}>

          {[

            { id: 'overview', label: '📊 Rankings & Traffic', icon: '📊' },

            { id: 'content', label: '📝 Content Decay', icon: '📝' },

            { id: 'keywords', label: '🔑 Top Keywords', icon: '🔑' },

            { id: 'recommendations', label: '💡 Recommendations', icon: '💡' },

          ].map(tab => (

            <button

              key={tab.id}

              onClick={() => setActiveTab(tab.id)}

              style={{

                background: activeTab === tab.id ? GOLD : 'transparent',

                color: activeTab === tab.id ? '#fff' : '#666',

                border: 'none',

                padding: '12px 18px',

                borderRadius: '8px 8px 0 0',

                cursor: 'pointer',

                fontWeight: 700,

                fontSize: 13,

              }}

            >

              {tab.label}

            </button>

          ))}

        </div>

        {/* Tab Content */}

        <div>

          {activeTab === 'overview' && (

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>


              {/* Keyword Rankings Trend */}

              <div style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #e8e8e8' }}>

                <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>📈 Keyword Rankings Trend</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={rankingTrends}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" stroke="#999" />

                    <YAxis stroke="#999" />

                    <Tooltip />

                    <Legend />

                    <Line type="monotone" dataKey="avgRank" stroke={RED} strokeWidth={2} name="Avg Rank (lower is better)" />

                    <Line type="monotone" dataKey="keywords" stroke={GREEN} strokeWidth={2} name="Ranking Keywords" />

                  </LineChart>

                </ResponsiveContainer>

              </div>

              {/* Organic Traffic Trend */}

              <div style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #e8e8e8' }}>

                <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>📊 Organic Traffic Trend</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <BarChart data={trafficTrends}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="week" stroke="#999" />

                    <YAxis stroke="#999" />

                    <Tooltip />

                    <Legend />

                    <Bar dataKey="organic" fill={GREEN} name="Organic" />

                    <Bar dataKey="direct" fill={GOLD} name="Direct" />

                    <Bar dataKey="referral" fill={NAVY} name="Referral" />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          )}

          {activeTab === 'content' && (

            <div style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #e8e8e8' }}>

              <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>🔍 Content Decay Detection</h3>

              <div style={{ overflowX: 'auto' }}>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>

                  <thead>

                    <tr style={{ borderBottom: '2px solid #e8e8e8', background: '#f8f9fa' }}>

                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: NAVY }}>Content</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Monthly Traffic</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Last Updated</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Decay Score</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {contentDecay.map((item, idx) => {

                      const decayColor = item.decayScore > 80 ? RED : item.decayScore > 60 ? ORANGE : GREEN;

                      return (

                        <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>

                          <td style={{ padding: '12px', fontWeight: 600, color: NAVY }}>{item.title}</td>

                          <td style={{ padding: '12px', textAlign: 'center', color: '#666' }}>{item.traffic.toLocaleString()}</td>

                          <td style={{ padding: '12px', textAlign: 'center', color: '#666', fontSize: 12 }}>{item.lastUpdated}</td>

                          <td style={{ padding: '12px', textAlign: 'center' }}>

                            <span style={{ background: decayColor + '20', color: decayColor, padding: '4px 10px', borderRadius: 6, fontWeight: 700 }}>

                              {item.decayScore}%

                            </span>

                          </td>

                          <td style={{ padding: '12px', textAlign: 'center' }}>

                            {item.decayScore > 70 ? (

                              <button style={{ background: RED, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>

                                Update Now

                              </button>

                            ) : (

                              <button style={{ background: '#ddd', color: '#666', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>

                                Monitor

                              </button>

                            )}

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>

              </div>

            </div>

          )}

          {activeTab === 'keywords' && (

            <div style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #e8e8e8' }}>

              <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>🔑 Top Performing Keywords</h3>

              <div style={{ overflowX: 'auto' }}>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>

                  <thead>

                    <tr style={{ borderBottom: '2px solid #e8e8e8', background: '#f8f9fa' }}>

                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: NAVY }}>Keyword</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Rank</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Search Volume</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>CTR %</th>

                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: NAVY }}>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {topKeywords.map((kw, idx) => (

                      <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>

                        <td style={{ padding: '12px', fontWeight: 600, color: NAVY }}>{kw.keyword}</td>

                        <td style={{ padding: '12px', textAlign: 'center', color: kw.rank <= 3 ? GREEN : ORANGE, fontWeight: 700 }}>

                          #{kw.rank}

                        </td>

                        <td style={{ padding: '12px', textAlign: 'center', color: '#666' }}>{kw.volume.toLocaleString()}</td>

                        <td style={{ padding: '12px', textAlign: 'center', color: '#666' }}>{kw.ctr}%</td>

                        <td style={{ padding: '12px', textAlign: 'center' }}>

                          <span style={{ background: kw.rank <= 3 ? GREEN + '20' : ORANGE + '20', color: kw.rank <= 3 ? GREEN : ORANGE, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>

                            {kw.rank <= 3 ? 'Strong' : 'Optimize'}

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

          {activeTab === 'recommendations' && (

            <div style={{ display: 'grid', gap: 16 }}>

              {recommendations.map((rec, idx) => (

                <div

                  key={idx}

                  style={{

                    background: '#fff',

                    borderRadius: 12,

                    padding: '20px',

                    border: `2px solid ${rec.priority === 'critical' ? RED : rec.priority === 'high' ? ORANGE : GOLD}`,

                    display: 'flex',

                    gap: 16,

                  }}

                >

                  <div style={{ fontSize: 28 }}>{rec.icon}</div>

                  <div style={{ flex: 1 }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>

                      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: NAVY }}>{rec.title}</h3>

                      <span style={{

                        background: rec.priority === 'critical' ? RED : rec.priority === 'high' ? ORANGE : GOLD,

                        color: '#fff',

                        fontSize: 10,

                        fontWeight: 700,

                        padding: '3px 10px',

                        borderRadius: 4,

                        textTransform: 'uppercase',

                      }}>

                        {rec.priority}

                      </span>

                      <span style={{ background: GREEN + '20', color: GREEN, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 4 }}>

                        {rec.impact} impact

                      </span>

                    </div>

                    <p style={{ margin: '0 0 12px', color: '#666', fontSize: 13, lineHeight: 1.6 }}>{rec.description}</p>

                    <button style={{

                      background: NAVY,

                      color: '#fff',

                      border: 'none',

                      padding: '8px 16px',

                      borderRadius: 6,

                      cursor: 'pointer',

                      fontWeight: 700,

                      fontSize: 12,

                    }}>

                      Take Action →

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </SaaSLayout>

  );

}
