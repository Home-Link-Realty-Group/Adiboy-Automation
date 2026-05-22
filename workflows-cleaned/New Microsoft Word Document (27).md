# New Microsoft Word Document (27)

Source: New Microsoft Word Document (27).docx

import React from 'react';

export default function CRMSidebar({ activeTab, setActiveTab, badges }) {

  const tabs = [

    { id: 'dashboard', icon: '📊', label: 'Dashboard' },

    { id: 'scoring', icon: '🎯', label: 'Lead Scoring', badge: badges?.scoring },

    { id: 'leads', icon: '👥', label: 'Pipeline' },

    { id: 'stacked', icon: '🔥', label: 'Stacked Leads', badge: badges?.stacked },

    { id: 'followups', icon: '📅', label: 'Follow-Ups', badge: badges?.followups },

    { id: 'dialpad', icon: '☎️', label: 'Dial Pad' },

    { id: 'kpi', icon: '📈', label: 'Daily KPIs' },

    { id: 'deals', icon: '💰', label: 'Deals' },

    { id: 'scripts', icon: '📋', label: 'Scripts' },

    { id: 'buyers', icon: '🏦', label: 'Buyers' },

  ];

  return (

    <aside className="w-56 bg-slate-900 text-white fixed h-screen overflow-y-auto flex flex-col">

      {/* Header */}

      <div className="p-6 border-b border-white/10">

        <div className="text-lg font-black">🏠 Home-Link</div>

        <div className="text-xs text-slate-400 mt-1">Realty Group LLC</div>

      </div>

      {/* Tabs */}

      <nav className="flex-1">

        {tabs.map((tab) => (

          <button

            key={tab.id}

            onClick={() => setActiveTab(tab.id)}

            className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium border-l-4 transition-colors ${

              activeTab === tab.id

                ? 'bg-red-500/20 border-red-500 text-white'

                : 'border-transparent text-slate-400 hover:text-white'

            }`}

          >

            <span className="text-base">{tab.icon}</span>

            <span>{tab.label}</span>

            {tab.badge > 0 && (

              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">

                {tab.badge}

              </span>

            )}

          </button>

        ))}

      </nav>

      {/* Footer */}

      <div className="p-5 border-t border-white/10 text-xs">

        <div className="text-slate-300">Jacob Levy</div>

        <div className="text-slate-500">(855) 810-1786</div>

        <a href="/" className="block mt-4 text-slate-400 hover:text-white">← Public Site</a>

        <a href="/CallLists" className="block mt-2 text-red-400 font-bold hover:text-red-300">📋 Outbound Engine</a>

      </div>

    </aside>

  );

}
