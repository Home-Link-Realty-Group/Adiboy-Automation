# socialhq

Source: socialhq.docx

import { useState, useEffect, useCallback } from 'react';

import { base44 } from '@/api/base44Client';

import SocialSidebar from '@/components/SocialHQ/SocialSidebar';

import SocialDashboard from '@/components/SocialHQ/SocialDashboard';

import AIComposer from '@/components/SocialHQ/AIComposer';

import ContentCalendar from '@/components/SocialHQ/ContentCalendar';

import CampaignManager from '@/components/SocialHQ/CampaignManager';

import CommentCenter from '@/components/SocialHQ/CommentCenter';

import ConnectAccounts from '@/components/SocialHQ/ConnectAccounts';

import PostLibrary from '@/components/SocialHQ/PostLibrary';

import AnalyticsPanel from '@/components/SocialHQ/AnalyticsPanel';

import ImageEditor from '@/components/SocialHQ/ImageEditor';

export default function SocialHQ() {

  const [activeTab, setActiveTab] = useState('dashboard');

  const [posts, setPosts] = useState([]);

  const [campaigns, setCampaigns] = useState([]);

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {

    try {

      const [p, c, cm] = await Promise.all([

        base44.entities.SocialPost.list('-created_date', 200),

        base44.entities.SocialCampaign.list(),

        base44.entities.SocialComment.list('-created_date', 100),

      ]);

      setPosts(p || []);

      setCampaigns(c || []);

      setComments(cm || []);

    } catch (e) {

      console.error('SocialHQ load error:', e);

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const newComments = comments.filter(c => c.status === 'New').length;

  const drafts = posts.filter(p => p.status === 'Draft').length;

  if (loading) return (

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a1a', fontFamily: "'Segoe UI', sans-serif" }}>

      <div style={{ textAlign: 'center' }}>

        <div style={{ fontSize: 44, marginBottom: 14 }}>📣</div>

        <div style={{ color: '#e74c3c', fontWeight: 900, fontSize: 16, marginBottom: 4 }}>Social HQ</div>

        <div style={{ color: '#444', fontSize: 12 }}>Loading your content studio...</div>

      </div>

    </div>

  );

  return (

    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1e', fontFamily: "'Segoe UI', Arial, sans-serif", color: '#fff' }}>

      <SocialSidebar

        activeTab={activeTab}

        setActiveTab={setActiveTab}

        counts={{ newComments, drafts }}

      />

      <main style={{ flex: 1, overflowY: 'auto', minHeight: '100vh', background: '#0f0f1e' }}>

        {activeTab === 'dashboard' && (

          <SocialDashboard posts={posts} campaigns={campaigns} comments={comments} onNavigate={setActiveTab} />

        )}

        {activeTab === 'composer' && (

          <AIComposer campaigns={campaigns} onPostSaved={loadData} />

        )}

        {activeTab === 'library' && (

          <PostLibrary posts={posts} onRefresh={loadData} />

        )}

        {activeTab === 'calendar' && (

          <ContentCalendar posts={posts} onRefresh={loadData} />

        )}

        {activeTab === 'campaigns' && (

          <CampaignManager campaigns={campaigns} posts={posts} onRefresh={loadData} />

        )}

        {activeTab === 'analytics' && (

          <AnalyticsPanel posts={posts} campaigns={campaigns} />

        )}

        {activeTab === 'comments' && (

          <CommentCenter comments={comments} posts={posts} onRefresh={loadData} />

        )}

        {activeTab === 'connect' && (

          <ConnectAccounts />

        )}

        {activeTab === 'imageeditor' && (

          <div style={{ padding: '28px', maxWidth: 1400, margin: '0 auto' }}>

            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>🖼️ Image Editor & AI Generator</h1>

            <div style={{ fontSize: 12, color: '#444', marginBottom: 24 }}>Generate AI images, upload photos, apply filters, text overlays — then send directly to the composer</div>

            <ImageEditor onImageReady={(url) => { window._socialImageUrl = url; setActiveTab('composer'); }} />

          </div>

        )}

      </main>

    </div>

  );

}
