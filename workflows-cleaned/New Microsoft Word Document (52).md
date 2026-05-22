# New Microsoft Word Document (52)

Source: New Microsoft Word Document (52).docx

import { useState, useEffect } from 'react';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { base44 } from '@/api/base44Client';

import CityAdRecommendations from './CityAdRecommendations';

const NAVY = "#0B1F45";

const GOLD = "#D4A843";

// All city pages with their routes

const CITY_PAGES = [

  { name: "Dallas", path: "/Dallas" },

  { name: "Dallas Foreclosure", path: "/DallasForeclosure" },

  { name: "Dallas Inherited", path: "/DallasInherited" },

  { name: "Houston", path: "/SellHouseHouston" },

  { name: "Fort Worth", path: "/SellHouseFortWorth" },

  { name: "San Antonio", path: "/SellHouseSanAntonio" },

  { name: "Atlanta", path: "/SellHouseAtlanta" },

  { name: "Atlanta Foreclosure", path: "/ForeclosureAtlanta" },

  { name: "Atlanta Inherited", path: "/InheritedAtlanta" },

  { name: "Chicago", path: "/SellHouseChicago" },

  { name: "Philadelphia", path: "/SellHousePhiladelphia" },

  { name: "Pittsburgh", path: "/SellHousePittsburgh" },

  { name: "Charlotte", path: "/SellHouseCharlotte" },

  { name: "Nashville", path: "/SellHouseNashville" },

  { name: "Orlando", path: "/SellHouseOrlando" },

  { name: "Louisville", path: "/SellHouseLouisville" },

  { name: "Detroit", path: "/SellHouseDetroit" },

  { name: "Cleveland", path: "/SellHouseCleveland" },

  { name: "Indianapolis", path: "/SellHouseIndianapolis" },

  { name: "Memphis", path: "/SellHouseMemphis" },

  { name: "Baltimore", path: "/SellHouseBaltimore" },

  { name: "Kansas City", path: "/SellHouseKansasCity" },

  { name: "St. Louis", path: "/SellHouseStLouis" },

  { name: "Columbus", path: "/SellHouseColumbus" },

  { name: "Milwaukee", path: "/SellHouseMilwaukee" },

];

export default function CityPerformanceDashboard() {

  const [cityData, setCityData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState('traffic');

  const [filter, setFilter] = useState('all');

  useEffect(() => {

    fetchCityMetrics();

  }, []);

  const [topPages, setTopPages] = useState([]);

  async function fetchCityMetrics() {

    try {

      const response = await base44.functions.invoke('getAnalyticsMetricsRealTime', {});


      if (response && response.cityMetrics) {

        setCityData(response.cityMetrics);

        setTopPages(response.topPages || []);

      } else {

        console.warn('No city metrics returned from GA4');

        setCityData([]);

        setTopPages([]);

      }

      setLoading(false);

    } catch (err) {

      console.error('Failed to fetch city metrics:', err);

      setLoading(false);

    }

  }

  // Sort data

  const sortedData = [...cityData].sort((a, b) => {

    switch (sortBy) {

      case 'traffic': return b.traffic - a.traffic;

      case 'leads': return b.leads - a.leads;

      case 'roi': return parseInt(b.roi) - parseInt(a.roi);

      case 'conversion': return parseFloat(b.conversionRate) - parseFloat(a.conversionRate);

      default: return 0;

    }

  });

  // Filter data

  const filteredData = filter === 'all'

    ? sortedData

    : sortedData.filter(d => d.status === filter);

  // Summary metrics

  const totalTraffic = cityData.reduce((sum, d) => sum + d.traffic, 0);

  const totalLeads = cityData.reduce((sum, d) => sum + d.leads, 0);

  const avgConversion = (cityData.reduce((sum, d) => sum + parseFloat(d.conversionRate), 0) / cityData.length).toFixed(2);

  const totalAdSpend = cityData.reduce((sum, d) => sum + d.adSpend, 0);

  const activeCount = cityData.filter(d => d.status === 'active').length;

  const dormantCount = cityData.filter(d => d.status === 'dormant').length;

  if (loading) return <div style={{ padding: 20, color: '#999' }}>Loading city metrics...</div>;

  return (

    <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 12 }}>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, marginBottom: 20 }}>📍 City Performance Dashboard</h2>

      {/* Top 3 Pages Section */}

      {topPages.length > 0 && (

        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', padding: 16, marginBottom: 24 }}>

          <h3 style={{ fontSize: 14, fontWeight: 900, color: NAVY, margin: '0 0 14px' }}>🔥 Top 3 Pages (All Traffic)</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>

            {topPages.map((page, i) => (

              <div key={i} style={{ background: '#f9fafb', borderRadius: 8, padding: 14, border: `1px solid ${i === 0 ? GOLD : '#e5e7eb'}`, borderLeft: `3px solid ${i === 0 ? GOLD : i === 1 ? '#c0a080' : '#d1d5db'}` }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>

                  <span style={{ fontSize: 18 }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>

                  <div style={{ flex: 1 }}>

                    <div style={{ fontWeight: 800, fontSize: 12, color: NAVY }}>{page.title || page.path}</div>

                    <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{page.path}</div>

                  </div>

                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>

                  <div>

                    <div style={{ color: '#888', fontWeight: 700 }}>Sessions</div>

                    <div style={{ fontWeight: 800, color: NAVY, marginTop: 2 }}>{page.traffic.toLocaleString()}</div>

                  </div>

                  <div>

                    <div style={{ color: '#888', fontWeight: 700 }}>Conversions</div>

                    <div style={{ fontWeight: 800, color: GOLD, marginTop: 2 }}>{page.conversions}</div>

                  </div>

                </div>

                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #e5e7eb', fontSize: 11, color: '#666' }}>

                  Bounce: <span style={{ fontWeight: 700 }}>{page.bounceRate}%</span>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Summary Cards */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>

        <div style={{ background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          <div style={{ fontSize: 11, color: '#888', fontWeight: 700, marginBottom: 4 }}>TOTAL TRAFFIC</div>

          <div style={{ fontSize: 24, fontWeight: 900, color: NAVY }}>{totalTraffic.toLocaleString()}</div>

          <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>{cityData.length} cities tracked</div>

        </div>

        <div style={{ background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          <div style={{ fontSize: 11, color: '#888', fontWeight: 700, marginBottom: 4 }}>TOTAL LEADS</div>

          <div style={{ fontSize: 24, fontWeight: 900, color: GOLD }}>{totalLeads.toLocaleString()}</div>

          <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>{(totalLeads / cityData.length).toFixed(0)} avg per city</div>

        </div>

        <div style={{ background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          <div style={{ fontSize: 11, color: '#888', fontWeight: 700, marginBottom: 4 }}>AVG CONVERSION</div>

          <div style={{ fontSize: 24, fontWeight: 900, color: NAVY }}>{avgConversion}%</div>

          <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>Across all cities</div>

        </div>

        <div style={{ background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          <div style={{ fontSize: 11, color: '#888', fontWeight: 700, marginBottom: 4 }}>AD SPEND (MO)</div>

          <div style={{ fontSize: 24, fontWeight: 900, color: '#c0392b' }}>${totalAdSpend.toLocaleString()}</div>

          <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>{activeCount} active, {dormantCount} dormant</div>

        </div>

      </div>

      {/* Controls */}

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>

        <div>

          <label style={{ fontSize: 11, color: '#666', fontWeight: 700, display: 'block', marginBottom: 6 }}>Sort By:</label>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}

            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13, cursor: 'pointer' }}>

            <option value="traffic">Traffic</option>

            <option value="leads">Leads</option>

            <option value="roi">ROI</option>

            <option value="conversion">Conversion Rate</option>

          </select>

        </div>

        <div>

          <label style={{ fontSize: 11, color: '#666', fontWeight: 700, display: 'block', marginBottom: 6 }}>Filter:</label>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}

            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13, cursor: 'pointer' }}>

            <option value="all">All Cities</option>

            <option value="active">Active Only</option>

            <option value="dormant">Dormant Only</option>

          </select>

        </div>

      </div>

      {/* Charts */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 16, marginBottom: 24 }}>

        {/* Traffic by City */}

        <div style={{ background: '#fff', padding: 14, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 12 }}>Traffic by City</h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={filteredData.slice(0, 10)}>

              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />

              <YAxis tick={{ fontSize: 11 }} />

              <Tooltip />

              <Bar dataKey="traffic" fill={GOLD} />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Conversion Rate by City */}

        <div style={{ background: '#fff', padding: 14, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 12 }}>Conversion Rate by City</h3>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={filteredData.slice(0, 10)}>

              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />

              <YAxis label={{ value: '%', angle: 90, position: 'insideLeft' }} tick={{ fontSize: 11 }} />

              <Tooltip formatter={(v) => `${v}%`} />

              <Line type="monotone" dataKey="conversionRate" stroke={GOLD} dot={{ r: 4 }} strokeWidth={2} />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* City Performance Table */}

      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

        <div style={{ padding: 14, borderBottom: '1px solid #eee' }}>

          <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0 }}>City Metrics</h3>

        </div>

        <div style={{ overflowX: 'auto' }}>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>

            <thead>

              <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>

                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: NAVY }}>City</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>Traffic</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>Leads</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>Conversion %</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>Keyword Rank</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>Ad Spend</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>ROI %</th>

                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: NAVY }}>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredData.map((city, i) => (

                <tr key={i} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fafafa' : '#fff' }}>

                  <td style={{ padding: '10px 14px', fontWeight: 700, color: NAVY }}>

                    <div>{city.name}</div>

                    <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>Top: {city.topKeyword}</div>

                  </td>

                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#555' }}>{city.traffic.toLocaleString()}</td>

                  <td style={{ padding: '10px 14px', textAlign: 'center', color: GOLD, fontWeight: 700 }}>{city.leads}</td>

                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#555' }}>{city.conversionRate}%</td>

                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#666', fontWeight: 600 }}>

                    Avg: <span style={{ color: city.avgRank <= 5 ? '#27ae60' : city.avgRank <= 10 ? GOLD : '#c0392b' }}>{city.avgRank}</span>

                  </td>

                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#c0392b' }}>${city.adSpend.toLocaleString()}</td>

                  <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: parseInt(city.roi) > 0 ? '#27ae60' : '#c0392b' }}>

                    {city.roi}%

                  </td>

                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>

                    <span style={{ background: city.status === 'active' ? '#e8f5e9' : '#ffebee', color: city.status === 'active' ? '#27ae60' : '#c0392b', padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>

                      {city.status.toUpperCase()}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* AI Recommendations */}

      <div style={{ marginTop: 20 }}>

        <CityAdRecommendations cityData={filteredData} />

      </div>

      {/* Insights */}

      <div style={{ marginTop: 16, padding: 14, background: '#f0f8ff', borderRadius: 10, borderLeft: `4px solid ${GOLD}` }}>

        <div style={{ fontSize: 12, color: '#1a3a5c', lineHeight: 1.7 }}>

          <strong>💡 Insights:</strong> {activeCount} cities are actively driving traffic. {dormantCount} cities need attention. Focus ad spend on high-ROI markets and implement SEO improvements for dormant pages.

        </div>

      </div>

    </div>

  );

}
