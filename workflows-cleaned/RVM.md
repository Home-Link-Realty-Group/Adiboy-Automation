# RVM

Source: RVM.docx

import { useState, useEffect, useRef } from "react";

import { Lead, FollowUp } from "@/api/entities";

import { Mic } from "lucide-react";

import SaaSLayout from "@/components/saas/SaaSLayout";

const SkeletonPulse = ({ w = "100%", h = 18, r = 8, mb = 0 }) => (

  <div style={{ width: w, height: h, borderRadius: r, background: "linear-gradient(90deg,#0B1F45 25%,#122B5E 50%,#0B1F45 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: mb }} />

);

// ─────────────────────────────────────────────────────────────────────────────

// HOME-LINK REALTY GROUP — RVM CENTER (Ringless Voicemail)

// Powered by Drop Cowboy (primary — $0.004/drop BYOC) or Slybroadcast (backup — $0.10/drop)

// Send pre-recorded voice messages directly to seller voicemail — no ringing

// ─────────────────────────────────────────────────────────────────────────────

const C = {

  dark: "#0B1F45", red: "#D4A843", green: "#16a34a", blue: "#2563eb",

  purple: "#7c3aed", gold: "#d97706", teal: "#0d9488", gray: "#f8fafc",

  border: "#e2e8f0", text: "#1e293b", muted: "#64748b", orange: "#ea580c"

};

const CALLER_ID = "8558101786"; // Home-Link toll-free

// ── Pre-written RVM scripts — proven for real estate wholesaling ──────────────

const RVM_SCRIPTS = [

  {

    id: "follow_up_touch3",

    name: "Touch 3 — Friendly Check-In",

    emoji: "👋",

    tag: "MOST USED",

    tagColor: C.green,

    use_when: "Day 7–10 follow-up. Lead went quiet after initial contact.",

    script: `Hey, this is Jacob with Home-Link Realty Group. I was just calling to follow up — I reached out a little while ago about your property. If you're still thinking about selling, I'd love to chat. We pay cash, close fast, no repairs needed. Give me a call or shoot me a text back at 855-810-1786. No pressure at all — just wanted to touch base. Hope you're having a great day!`

  },

  {

    id: "urgent_offer",

    name: "Touch 6 — Offer Pending",

    emoji: "💰",

    tag: "HIGH CONVERT",

    tagColor: C.gold,

    use_when: "Touch 6 — lead hasn't responded. Create urgency around your offer.",

    script: `Hi, this is Jacob with Home-Link Realty Group. I have a cash offer ready for your property and I just want to make sure you get a chance to look at it before I move on. We're closing on several homes in your area right now and I'd love to include yours. Call or text me at 855-810-1786 at your earliest convenience. I'll be available all week. Talk soon!`

  },

  {

    id: "pre_foreclosure",

    name: "Pre-Foreclosure — Stop the Clock",

    emoji: "🚨",

    tag: "PRE-FC",

    tagColor: C.red,

    use_when: "Pre-foreclosure leads. Time-sensitive — empathetic tone.",

    script: `Hi, my name is Jacob with Home-Link Realty Group. I'm calling because I may be able to help you with your property situation before things go further. We specialize in helping homeowners who need to sell quickly — we can close in as little as 7 days and handle everything for you. Please call or text me back at 855-810-1786. There's no obligation — I just want to see if I can help. Hope to hear from you soon.`

  },

  {

    id: "inherited_probate",

    name: "Inherited / Probate",

    emoji: "⚖️",

    tag: "PROBATE",

    tagColor: C.purple,

    use_when: "Inherited property or probate leads. Compassionate, no pressure.",

    script: `Hello, this is Jacob calling from Home-Link Realty Group. I understand you may have recently inherited a property, and I just wanted to reach out to let you know we help families in that exact situation every week. We buy homes as-is for cash — no repairs, no clean-out required, no realtor fees. If you'd like to talk through your options with zero pressure, I'm at 855-810-1786. I hope you're doing well.`

  },

  {

    id: "vacant_absentee",

    name: "Vacant / Absentee Owner",

    emoji: "🏚️",

    tag: "ABSENTEE",

    tagColor: C.teal,

    use_when: "Absentee owner or vacant property. Speak to cost of holding.",

    script: `Hey, Jacob here with Home-Link Realty Group. I'm reaching out about a property I believe you own. If you've been thinking about selling it — whether it's vacant, needs work, or you just want to stop paying taxes and insurance on it — I'd love to make you a fast cash offer. No showings, no listing, no hassle. Call or text me at 855-810-1786 whenever it's convenient. Take care!`

  },

  {

    id: "win_back",

    name: "Touch 12 — Win-Back / Last Attempt",

    emoji: "🔄",

    tag: "WIN-BACK",

    tagColor: C.orange,

    use_when: "Lead went cold. Last touch before removing from sequence.",

    script: `Hi, this is Jacob with Home-Link Realty Group. I know I've reached out a few times and I completely understand if the timing hasn't been right. I just want you to know our offer still stands and I'm here whenever you're ready. Call or text me at 855-810-1786 — even if it's just to say you're not interested, that's totally fine. I wish you all the best either way. Take care!`

  },

];

const SEND_MODES = [

  { id: "single",   label: "Single Drop",   emoji: "📱", desc: "One lead right now" },

  { id: "bulk",     label: "Bulk Campaign", emoji: "📦", desc: "Multiple leads at once" },

  { id: "schedule", label: "Scheduled",     emoji: "⏰", desc: "Set a future date/time" },

];

// ── Provider configs ──────────────────────────────────────────────────────────

const PROVIDERS = [

  {

    id: "dropcowboy",

    name: "Drop Cowboy",

    emoji: "🤠",

    cost: "$0.004/drop (BYOC)",

    costAlt: "$0.025/drop (standard)",

    desc: "Best price. Uses your Twilio number. AI voice cloning available.",

    url: "https://app.dropcowboy.com",

    signupUrl: "https://app.dropcowboy.com/register",

    apiUrl: "https://api.dropcowboy.com/v1/rvm",

  },

  {

    id: "slybroadcast",

    name: "Slybroadcast",

    emoji: "📣",

    cost: "$0.10/drop",

    costAlt: "No monthly fee",

    desc: "Pay as you go. No minimum. Simplest API. 100 drops = $10.",

    url: "https://www.slybroadcast.com",

    signupUrl: "https://www.slybroadcast.com/register.php",

    apiUrl: "https://www.mobile-sphere.com/gateway/vmb.php",

  },

];

function getProviderConfig() {

  return {

    dropcowboy_team_id: localStorage.getItem("dc_team_id") || "",

    dropcowboy_secret:  localStorage.getItem("dc_secret") || "",

    slybroadcast_email: localStorage.getItem("sb_email") || "",

    slybroadcast_pass:  localStorage.getItem("sb_pass") || "",

    active_provider:    localStorage.getItem("rvm_provider") || "dropcowboy",

  };

}

function exportCSV(rows) {

  const headers = ["lead_name", "phone", "script", "provider", "status", "sent_at", "session_id"];

  const lines = [headers.join(","), ...rows.map(r => headers.map(h => `"${(r[h] || "").toString().replace(/"/g, '""')}"`).join(","))];

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a"); a.href = url; a.download = "rvm_history.csv"; a.click();

}

// ─────────────────────────────────────────────────────────────────────────────

export default function RVM() {

  const [tab, setTab]                 = useState("send");

  const [leads, setLeads]             = useState([]);

  const [selectedScript, setSelectedScript] = useState(null);

  const [sendMode, setSendMode]       = useState("single");

  const [singleLead, setSingleLead]   = useState(null);

  const [bulkLeads, setBulkLeads]     = useState([]);

  const [scheduleDate, setScheduleDate] = useState("");

  const [scheduleTime, setScheduleTime] = useState("10:00");

  const [sending, setSending]         = useState(false);

  const [results, setResults]         = useState([]);

  const [history, setHistory]         = useState([]);

  const [search, setSearch]           = useState("");

  const [filterPriority, setFilterPriority] = useState("all");

  const [config, setConfig]           = useState(getProviderConfig());

  const [configDirty, setConfigDirty] = useState(false);

  const [audioFile, setAudioFile]     = useState(null);

  const [audioUrl, setAudioUrl]       = useState("");

  const [useCustomAudio, setUseCustomAudio] = useState(false);

  const [customScript, setCustomScript] = useState("");

  const [recording, setRecording]     = useState(false);

  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [audioBlob, setAudioBlob]     = useState(null);

  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);

  const fileRef = useRef();

  const provider = PROVIDERS.find(p => p.id === config.active_provider) || PROVIDERS[0];

  const isConfigured = config.active_provider === "dropcowboy"

    ? (config.dropcowboy_team_id && config.dropcowboy_secret)

    : (config.slybroadcast_email && config.slybroadcast_pass);

  useEffect(() => {

    Lead.list({ limit: 500 }).then(l => setLeads(l.filter(lead => lead.phone)));

    const h = JSON.parse(localStorage.getItem("rvm_history") || "[]");

    setHistory(h);

  }, []);

  // ── In-browser recording ────────────────────────────────────────────────

  const startRecording = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mr = new MediaRecorder(stream);

      const chunks = [];

      mr.ondataavailable = e => chunks.push(e.data);

      mr.onstop = () => {

        const blob = new Blob(chunks, { type: "audio/webm" });

        setAudioBlob(blob);

        setAudioPreviewUrl(URL.createObjectURL(blob));

        stream.getTracks().forEach(t => t.stop());

      };

      mr.start();

      setMediaRecorder(mr);

      setRecording(true);

    } catch (e) {

      alert("Microphone access denied. Please allow microphone access to record.");

    }

  };

  const stopRecording = () => {

    mediaRecorder?.stop();

    setRecording(false);

  };

  // ── Select / deselect bulk leads ────────────────────────────────────────

  const toggleBulkLead = (lead) => {

    setBulkLeads(prev =>

      prev.find(l => l.id === lead.id)

        ? prev.filter(l => l.id !== lead.id)

        : [...prev, lead]

    );

  };

  const quickSelect = (filter) => {

    let f = leads;

    if (filter === "high")   f = leads.filter(l => l.priority === "HIGH" || l.priority === "Hot");

    if (filter === "new")    f = leads.filter(l => l.status === "New");

    if (filter === "touch3") f = leads.filter(l => (l.touch_count || 0) >= 2 && (l.touch_count || 0) <= 4);

    if (filter === "cold")   f = leads.filter(l => l.touch_count >= 8);

    setBulkLeads(f.slice(0, 100));

  };

  // ── Send RVM ──────────────────────────────────────────────────────────────

  const sendRVM = async () => {

    const recipients = sendMode === "single"

      ? (singleLead ? [singleLead] : [])

      : bulkLeads;

    if (!recipients.length || !selectedScript) return;

    setSending(true);

    const scriptText = useCustomAudio ? customScript : selectedScript.script;

    const newResults = [];

    for (const lead of recipients) {

      const phone = lead.phone.replace(/\D/g, "");

      if (!phone || phone.length < 10) { newResults.push({ lead_name: lead.name, phone: lead.phone, status: "skipped", error: "Invalid phone" }); continue; }

      try {

        let sessionId = "";

        let status = "demo";

        if (isConfigured) {

          if (config.active_provider === "slybroadcast") {

            // ── Slybroadcast API ────────────────────────────────────────────

            const formData = new FormData();

            formData.append("c_uid",      config.slybroadcast_email);

            formData.append("c_password", config.slybroadcast_pass);

            formData.append("c_phone",    phone);

            formData.append("c_callerID", CALLER_ID);

            formData.append("c_date",     sendMode === "schedule" && scheduleDate

              ? `${scheduleDate} ${scheduleTime}:00`

              : "now"

            );

            formData.append("mobile_only", "1");

            formData.append("c_title", `HL-${lead.name}-${Date.now()}`);

            if (audioUrl) {

              formData.append("c_url",   encodeURIComponent(audioUrl));

              formData.append("c_audio", audioUrl.endsWith(".mp3") ? "mp3" : "wav");

            } else if (audioBlob) {

              // Upload blob as URL not possible client-side — fallback to text note

              formData.append("c_url",   ""); // User must upload to hosting first

              formData.append("c_audio", "wav");

            }

            const res  = await fetch("https://www.mobile-sphere.com/gateway/vmb.php", { method: "POST", body: formData });

            const text = await res.text();

            if (text.startsWith("OK")) {

              const match = text.match(/session_id=(\d+)/);

              sessionId = match?.[1] || "OK";

              status = "sent";

            } else {

              throw new Error(text.split("\n")[0] || "Slybroadcast error");

            }

          } else {

            // ── Drop Cowboy API ─────────────────────────────────────────────

            const payload = {

              team_id:      config.dropcowboy_team_id,

              secret:       config.dropcowboy_secret,

              phone_number: phone,

              forwarding_number: CALLER_ID,

            };

            if (audioUrl) payload.recording_url = audioUrl;

            const res  = await fetch("https://api.dropcowboy.com/v1/rvm", {

              method: "POST",

              headers: {

                "x-team-id": config.dropcowboy_team_id,

                "x-secret":  config.dropcowboy_secret,

                "Content-Type": "application/json",

              },

              body: JSON.stringify(payload),

            });

            const data = await res.json();

            if (data.id || data.success) {

              sessionId = data.id || "OK";

              status = "sent";

            } else {

              throw new Error(data.message || data.error || "Drop Cowboy error");

            }

          }

        } else {

          // Demo mode — simulate

          await new Promise(r => setTimeout(r, 300));

          sessionId = "DEMO-" + Math.random().toString(36).slice(2,8).toUpperCase();

          status = "demo";

        }

        // Log to lead notes + update touch count

        try {

          await Lead.update(lead.id, {

            touch_count: (lead.touch_count || 0) + 1,

            last_contact_date: new Date().toISOString().split("T")[0],

            notes: (lead.notes || "") + `\n[${new Date().toISOString()}] [RVM] Sent: "${selectedScript.name}" via ${provider.name}. Session: ${sessionId}`,

          });

        } catch (e) {}

        newResults.push({ lead_name: lead.name, phone: lead.phone, script: selectedScript.name, provider: provider.name, status, session_id: sessionId, sent_at: new Date().toISOString() });

      } catch (err) {

        newResults.push({ lead_name: lead.name, phone: lead.phone, script: selectedScript?.name, provider: provider.name, status: "error", error: err.message, sent_at: new Date().toISOString() });

      }

    }

    const newHistory = [...newResults, ...history];

    localStorage.setItem("rvm_history", JSON.stringify(newHistory));

    setHistory(newHistory);

    setResults(newResults);

    setSending(false);

    setTab("results");

  };

  // ── Filtered leads ──────────────────────────────────────────────────────

  const filteredLeads = leads.filter(l =>

    (!search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search)) &&

    (filterPriority === "all" || l.priority === filterPriority || (filterPriority === "Hot" && l.priority === "HIGH"))

  );

  const sentCount = history.filter(h => h.status === "sent").length;

  const demoCount = history.filter(h => h.status === "demo").length;

  const errorCount = history.filter(h => h.status === "error").length;

  // ─────────────────────────────────────────────────────────────────────────

  return (

    <SaaSLayout

      title="RVM Center"

      subtitle={`Ringless Voicemail · ${provider.emoji} ${provider.name} active`}

      icon={Mic}

      accent="#7c3aed"

      badge={isConfigured ? "LIVE" : "DEMO"}

      headerRight={

        <a href="/SOP" style={{ background: "#D4A843", color: "#0B1F45", fontWeight: 800, fontSize: 12, padding: "6px 14px", borderRadius: 6, textDecoration: "none" }}>

          📋 SOP First

        </a>

      }

    >

      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(11,31,69,0.06)", overflow: "hidden" }}>

      {/* Tabs */}

      <div style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, display: "flex", padding: "0 24px", overflowX: "auto" }}>

        {[

          { id: "send",    label: "📤 Send RVM" },

          { id: "scripts", label: "🎤 Scripts Library" },

          { id: "results", label: `📊 Results${results.length ? ` (${results.length})` : ""}` },

          { id: "history", label: `📋 History${history.length ? ` (${history.length})` : ""}` },

          { id: "setup",   label: "⚙️ Setup" },

        ].map(t => (

          <button key={t.id} onClick={() => setTab(t.id)}

            style={{ padding: "14px 18px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",

              borderBottom: tab === t.id ? `3px solid #7c3aed` : "3px solid transparent",

              color: tab === t.id ? "#7c3aed" : C.muted }}>

            {t.label}

          </button>

        ))}

      </div>

      <div style={{ padding: "24px" }}>

        {/* ── SEND TAB ── */}

        {tab === "send" && (

          <div>

            {!isConfigured && (

              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: 14, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>

                <span style={{ fontSize: 20 }}>⚠️</span>

                <div>

                  <div style={{ fontWeight: 700, color: "#92400e" }}>Running in demo mode — no real drops sent</div>

                  <div style={{ fontSize: 13, color: "#b45309" }}>Go to Setup tab to connect Drop Cowboy ($0.004/drop) or Slybroadcast ($0.10/drop, no monthly fee)</div>

                </div>

                <button onClick={() => setTab("setup")} style={{ marginLeft: "auto", background: C.gold, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Setup →</button>

              </div>

            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

              {/* Left — script + audio */}

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Step 1 — Choose script */}

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>

                    <span style={{ background: C.red, color: "#fff", width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>1</span>

                    Choose Script

                    <button onClick={() => setTab("scripts")} style={{ marginLeft: "auto", background: C.gray, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: C.muted }}>View All →</button>

                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

                    {RVM_SCRIPTS.slice(0, 4).map(s => (

                      <div key={s.id} onClick={() => { setSelectedScript(s); setUseCustomAudio(false); }}

                        style={{ padding: "10px 14px", borderRadius: 8, cursor: "pointer", border: `2px solid ${selectedScript?.id === s.id ? C.purple : C.border}`, background: selectedScript?.id === s.id ? "#f5f3ff" : "#fff" }}>

                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>

                          <span>{s.emoji}</span>

                          <div style={{ flex: 1 }}>

                            <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>

                            <div style={{ fontSize: 11, color: C.muted }}>{s.use_when}</div>

                          </div>

                          <span style={{ background: s.tagColor + "20", color: s.tagColor, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 8, whiteSpace: "nowrap" }}>{s.tag}</span>

                          {selectedScript?.id === s.id && <span style={{ color: C.purple, fontWeight: 800 }}>✓</span>}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Step 2 — Audio source */}

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>

                    <span style={{ background: C.red, color: "#fff", width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>2</span>

                    Audio Source

                  </div>

                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>

                    {[

                      { id: false, label: "📋 Use Script Text" },

                      { id: true,  label: "🎙️ Custom Audio" },

                    ].map(o => (

                      <button key={String(o.id)} onClick={() => setUseCustomAudio(o.id)}

                        style={{ flex: 1, padding: "9px", border: `2px solid ${useCustomAudio === o.id ? C.blue : C.border}`, borderRadius: 8, background: useCustomAudio === o.id ? "#eff6ff" : "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12, color: useCustomAudio === o.id ? C.blue : C.muted }}>

                        {o.label}

                      </button>

                    ))}

                  </div>

                  {!useCustomAudio ? (

                    // Script preview

                    <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 8, padding: 14, fontSize: 13, color: "#4c1d95", lineHeight: 1.7, maxHeight: 140, overflowY: "auto" }}>

                      {selectedScript?.script || <span style={{ color: C.muted }}>Select a script above to preview</span>}

                    </div>

                  ) : (

                    // Custom audio

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                      {/* Record */}

                      <div style={{ background: C.gray, borderRadius: 8, padding: 14 }}>

                        <div style={{ fontWeight: 600, fontSize: 12, color: C.muted, marginBottom: 8 }}>🎙️ RECORD IN BROWSER</div>

                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>

                          {!recording ? (

                            <button onClick={startRecording}

                              style={{ background: C.red, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>

                              ● Record

                            </button>

                          ) : (

                            <button onClick={stopRecording}

                              style={{ background: C.dark, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13, animation: "pulse 1s infinite" }}>

                              ■ Stop

                            </button>

                          )}

                          {recording && <span style={{ color: C.red, fontWeight: 700, fontSize: 12 }}>🔴 Recording...</span>}

                          {audioPreviewUrl && !recording && (

                            <audio src={audioPreviewUrl} controls style={{ height: 32, flex: 1 }} />

                          )}

                        </div>

                      </div>

                      {/* Upload */}

                      <div>

                        <div style={{ fontWeight: 600, fontSize: 12, color: C.muted, marginBottom: 6 }}>📁 UPLOAD AUDIO FILE (MP3 / WAV)</div>

                        <input type="file" accept=".mp3,.wav,.m4a" ref={fileRef} onChange={e => {

                          const f = e.target.files[0];

                          if (f) { setAudioFile(f); setAudioPreviewUrl(URL.createObjectURL(f)); }

                        }} style={{ display: "none" }} />

                        <button onClick={() => fileRef.current?.click()}

                          style={{ width: "100%", padding: "10px", border: `1px dashed ${audioFile ? C.green : C.border}`, borderRadius: 8, background: audioFile ? "#f0fdf4" : C.gray, cursor: "pointer", fontSize: 12, color: audioFile ? C.green : C.muted, fontWeight: 600 }}>

                          {audioFile ? `✅ ${audioFile.name}` : "Click to upload MP3/WAV"}

                        </button>

                      </div>

                      {/* URL */}

                      <div>

                        <div style={{ fontWeight: 600, fontSize: 12, color: C.muted, marginBottom: 6 }}>🔗 OR PASTE AUDIO URL</div>

                        <input value={audioUrl} onChange={e => setAudioUrl(e.target.value)}

                          placeholder="https://your-host.com/message.mp3"

                          style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, boxSizing: "border-box" }} />

                      </div>

                    </div>

                  )}

                </div>

              </div>

              {/* Right — recipients + send */}

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Step 3 — Mode */}

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>

                    <span style={{ background: C.red, color: "#fff", width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>3</span>

                    Send Mode

                  </div>

                  <div style={{ display: "flex", gap: 8 }}>

                    {SEND_MODES.map(m => (

                      <div key={m.id} onClick={() => setSendMode(m.id)}

                        style={{ flex: 1, padding: "10px 8px", borderRadius: 8, cursor: "pointer", border: `2px solid ${sendMode === m.id ? C.blue : C.border}`, background: sendMode === m.id ? "#eff6ff" : "#fff", textAlign: "center" }}>

                        <div style={{ fontSize: 18, marginBottom: 4 }}>{m.emoji}</div>

                        <div style={{ fontWeight: 700, fontSize: 11, color: sendMode === m.id ? C.blue : C.text }}>{m.label}</div>

                        <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{m.desc}</div>

                      </div>

                    ))}

                  </div>

                  {sendMode === "schedule" && (

                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>

                      <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} min={new Date().toISOString().split("T")[0]}

                        style={{ flex: 1, padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }} />

                      <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)}

                        style={{ flex: "0 0 120px", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }} />

                    </div>

                  )}

                </div>

                {/* Step 4 — Recipients */}

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, flex: 1 }}>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>

                    <span style={{ background: C.red, color: "#fff", width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>4</span>

                    {sendMode === "single" ? "Select Lead" : "Select Recipients"}

                    {sendMode === "bulk" && <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 12, color: C.blue }}>{bulkLeads.length} selected</span>}

                  </div>

                  {sendMode === "bulk" && (

                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>

                      {[

                        { label: "High Priority", filter: "high" },

                        { label: "New Leads", filter: "new" },

                        { label: "Touch 3–5", filter: "touch3" },

                        { label: "Touch 8+", filter: "cold" },

                      ].map(q => (

                        <button key={q.filter} onClick={() => quickSelect(q.filter)}

                          style={{ padding: "4px 10px", background: C.gray, border: `1px solid ${C.border}`, borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>

                          {q.label}

                        </button>

                      ))}

                      <button onClick={() => setBulkLeads([])}

                        style={{ padding: "4px 10px", background: "#fee2e2", border: "none", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.red }}>

                        Clear

                      </button>

                    </div>

                  )}

                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>

                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..."

                      style={{ flex: 1, padding: "8px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />

                    <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}

                      style={{ padding: "8px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }}>

                      <option value="all">All</option>

                      <option value="Hot">Hot</option>

                      <option value="HIGH">High</option>

                      <option value="MEDIUM">Medium</option>

                    </select>

                  </div>

                  <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>

                    {filteredLeads.slice(0, 80).map(lead => {

                      const isSelected = sendMode === "single" ? singleLead?.id === lead.id : bulkLeads.find(l => l.id === lead.id);

                      return (

                        <div key={lead.id}

                          onClick={() => sendMode === "single" ? setSingleLead(lead) : toggleBulkLead(lead)}

                          style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", border: `2px solid ${isSelected ? C.blue : C.border}`, background: isSelected ? "#eff6ff" : "#fff", display: "flex", gap: 10, alignItems: "center" }}>

                          {sendMode === "bulk" && (

                            <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${isSelected ? C.blue : C.border}`, background: isSelected ? C.blue : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>

                              {isSelected && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}

                            </div>

                          )}

                          <div style={{ flex: 1, minWidth: 0 }}>

                            <div style={{ fontWeight: 700, fontSize: 12 }}>{lead.name}</div>

                            <div style={{ fontSize: 11, color: C.muted }}>{lead.phone} · Touch #{lead.touch_count || 0}</div>

                          </div>

                          <span style={{ background: lead.priority === "HIGH" || lead.priority === "Hot" ? "#fee2e2" : "#f1f5f9", color: lead.priority === "HIGH" || lead.priority === "Hot" ? C.red : C.muted, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>

                            {lead.priority || "MED"}

                          </span>

                        </div>

                      );

                    })}

                  </div>

                </div>

                {/* Send button */}

                <button onClick={sendRVM}

                  disabled={sending || !selectedScript || (sendMode === "single" && !singleLead) || (sendMode === "bulk" && bulkLeads.length === 0)}

                  style={{ padding: "16px", background: sending ? "#94a3b8" : C.red, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 15 }}>

                  {sending ? "⏳ Sending drops..."

                    : !isConfigured ? `🎭 Demo Drop${sendMode === "bulk" ? ` to ${bulkLeads.length} leads` : ""}`

                    : sendMode === "single" && singleLead ? `🎙️ Drop to ${singleLead.name}`

                    : sendMode === "bulk" && bulkLeads.length ? `🎙️ Drop to ${bulkLeads.length} leads`

                    : "Select a script and lead to send"}

                </button>

                {/* Cost estimate */}

                {(sendMode === "bulk" ? bulkLeads.length : singleLead ? 1 : 0) > 0 && (

                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 12, fontSize: 12, color: "#166534", textAlign: "center" }}>

                    💰 Est. cost: <strong>

                      {isConfigured && config.active_provider === "dropcowboy"

                        ? `$${((sendMode === "bulk" ? bulkLeads.length : 1) * 0.004).toFixed(3)}`

                        : isConfigured

                        ? `$${((sendMode === "bulk" ? bulkLeads.length : 1) * 0.10).toFixed(2)}`

                        : "$0.00 (demo)"}

                    </strong> via {provider.name}

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

        {/* ── SCRIPTS LIBRARY ── */}

        {tab === "scripts" && (

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {RVM_SCRIPTS.map(s => (

              <div key={s.id} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>

                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>

                  <span style={{ fontSize: 24 }}>{s.emoji}</span>

                  <div style={{ flex: 1 }}>

                    <div style={{ fontWeight: 800, fontSize: 15 }}>{s.name}</div>

                    <div style={{ fontSize: 11, color: C.muted }}>{s.use_when}</div>

                  </div>

                  <span style={{ background: s.tagColor + "20", color: s.tagColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{s.tag}</span>

                </div>

                <div style={{ background: C.gray, borderRadius: 8, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 180, overflowY: "auto" }}>

                  {s.script}

                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>

                  <button onClick={() => { setSelectedScript(s); setTab("send"); }}

                    style={{ flex: 1, padding: "9px", background: C.red, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>

                    Use This Script

                  </button>

                  <button onClick={() => navigator.clipboard.writeText(s.script)}

                    style={{ padding: "9px 14px", background: C.gray, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 13 }}>

                    📋 Copy

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* ── RESULTS ── */}

        {tab === "results" && (

          <div>

            {results.length === 0 ? (

              <div style={{ textAlign: "center", padding: 80, color: C.muted }}>

                <div style={{ fontSize: 48, marginBottom: 12 }}>🎙️</div>

                <div style={{ fontSize: 18, fontWeight: 700 }}>No drops sent yet this session</div>

                <div style={{ fontSize: 14, marginTop: 8 }}>Go to Send tab and drop some voicemails</div>

              </div>

            ) : (

              <>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>

                  {[

                    { label: "Total Dropped", value: results.length, color: C.blue, icon: "🎙️" },

                    { label: "Sent", value: results.filter(r=>r.status==="sent").length, color: C.green, icon: "✅" },

                    { label: "Demo", value: results.filter(r=>r.status==="demo").length, color: C.gold, icon: "🎭" },

                    { label: "Errors", value: results.filter(r=>r.status==="error").length, color: C.red, icon: "❌" },

                  ].map(s => (

                    <div key={s.label} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, textAlign: "center" }}>

                      <div style={{ fontSize: 22 }}>{s.icon}</div>

                      <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>

                      <div style={{ fontSize: 12, color: C.muted }}>{s.label}</div>

                    </div>

                  ))}

                </div>

                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>

                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>

                    <thead>

                      <tr style={{ background: C.dark, color: "#94a3b8", fontSize: 11, textTransform: "uppercase" }}>

                        {["Status","Lead","Phone","Script","Provider","Session ID"].map(h => (

                          <th key={h} style={{ padding: "10px 14px", textAlign: "left" }}>{h}</th>

                        ))}

                      </tr>

                    </thead>

                    <tbody>

                      {results.map((r, i) => (

                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i%2===0?"#fff":C.gray }}>

                          <td style={{ padding: "10px 14px" }}>

                            <span style={{ background: r.status==="sent"?"#dcfce7":r.status==="demo"?"#fef9c3":"#fee2e2", color: r.status==="sent"?C.green:r.status==="demo"?"#92400e":C.red, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>

                              {r.status==="sent"?"✅ Sent":r.status==="demo"?"🎭 Demo":"❌ Error"}

                            </span>

                          </td>

                          <td style={{ padding: "10px 14px", fontWeight: 600 }}>{r.lead_name}</td>

                          <td style={{ padding: "10px 14px", color: C.muted }}>{r.phone}</td>

                          <td style={{ padding: "10px 14px", color: C.text, fontSize: 12 }}>{r.script}</td>

                          <td style={{ padding: "10px 14px", color: C.muted }}>{r.provider}</td>

                          <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 11, color: C.muted }}>{r.session_id || r.error || "—"}</td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </>

            )}

          </div>

        )}

        {/* ── HISTORY ── */}

        {tab === "history" && (

          <div>

            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>

              {[

                { label: "All Time Sent", value: sentCount, color: C.green },

                { label: "Demo Drops", value: demoCount, color: C.gold },

                { label: "Errors", value: errorCount, color: C.red },

                { label: "Est. Spend", value: `$${(sentCount * (config.active_provider === "dropcowboy" ? 0.004 : 0.10)).toFixed(2)}`, color: C.blue },

              ].map(s => (

                <div key={s.label} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 20px", textAlign: "center", minWidth: 120 }}>

                  <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>

                  <div style={{ fontSize: 11, color: C.muted }}>{s.label}</div>

                </div>

              ))}

              <button onClick={() => exportCSV(history)} style={{ marginLeft: "auto", background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>

                ⬇ Export CSV

              </button>

            </div>

            {history.length === 0 ? (

              <div style={{ textAlign: "center", padding: 60, color: C.muted }}>No RVM history yet</div>

            ) : (

              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>

                  <thead>

                    <tr style={{ background: C.dark, color: "#94a3b8", fontSize: 11, textTransform: "uppercase" }}>

                      {["Date","Status","Lead","Phone","Script","Provider"].map(h => (

                        <th key={h} style={{ padding: "10px 14px", textAlign: "left" }}>{h}</th>

                      ))}

                    </tr>

                  </thead>

                  <tbody>

                    {history.slice(0, 200).map((r, i) => (

                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i%2===0?"#fff":C.gray }}>

                        <td style={{ padding: "10px 14px", color: C.muted, fontSize: 11 }}>{r.sent_at ? new Date(r.sent_at).toLocaleDateString() : "—"}</td>

                        <td style={{ padding: "10px 14px" }}>

                          <span style={{ background: r.status==="sent"?"#dcfce7":r.status==="demo"?"#fef9c3":"#fee2e2", color: r.status==="sent"?C.green:r.status==="demo"?"#92400e":C.red, borderRadius: 20, padding: "3px 9px", fontSize: 10, fontWeight: 700 }}>

                            {r.status==="sent"?"✅ Sent":r.status==="demo"?"🎭 Demo":"❌"}

                          </span>

                        </td>

                        <td style={{ padding: "10px 14px", fontWeight: 600 }}>{r.lead_name}</td>

                        <td style={{ padding: "10px 14px", color: C.muted }}>{r.phone}</td>

                        <td style={{ padding: "10px 14px", color: C.text, fontSize: 12 }}>{r.script || "—"}</td>

                        <td style={{ padding: "10px 14px", color: C.muted, fontSize: 12 }}>{r.provider || "—"}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}

        {/* ── SETUP ── */}

        {tab === "setup" && (

          <div style={{ maxWidth: 700 }}>

            {/* Provider picker */}

            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>

              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Choose Your RVM Provider</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>

                {PROVIDERS.map(p => (

                  <div key={p.id} onClick={() => { setConfig(c => ({ ...c, active_provider: p.id })); setConfigDirty(true); }}

                    style={{ padding: 16, borderRadius: 10, border: `2px solid ${config.active_provider === p.id ? C.blue : C.border}`, background: config.active_provider === p.id ? "#eff6ff" : "#fff", cursor: "pointer" }}>

                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>

                      <span style={{ fontSize: 22 }}>{p.emoji}</span>

                      <div>

                        <div style={{ fontWeight: 800, fontSize: 14 }}>{p.name}</div>

                        <div style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>{p.cost}</div>

                        <div style={{ fontSize: 10, color: C.muted }}>{p.costAlt}</div>

                      </div>

                      {config.active_provider === p.id && <span style={{ marginLeft: "auto", color: C.blue, fontWeight: 800, fontSize: 16 }}>✓</span>}

                    </div>

                    <div style={{ fontSize: 12, color: C.muted }}>{p.desc}</div>

                    <a href={p.signupUrl} target="_blank" rel="noreferrer"

                      onClick={e => e.stopPropagation()}

                      style={{ display: "inline-block", marginTop: 8, background: C.blue, color: "#fff", padding: "5px 12px", borderRadius: 6, textDecoration: "none", fontSize: 11, fontWeight: 700 }}>

                      Sign Up Free →

                    </a>

                  </div>

                ))}

              </div>

              {/* Drop Cowboy credentials */}

              {config.active_provider === "dropcowboy" && (

                <div style={{ background: C.gray, borderRadius: 10, padding: 18 }}>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🤠 Drop Cowboy Credentials</div>

                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Settings → API in your Drop Cowboy dashboard</div>

                  {[

                    { key: "dropcowboy_team_id", label: "Team ID", placeholder: "Your team_id from Settings → API" },

                    { key: "dropcowboy_secret",  label: "Secret", placeholder: "Your secret key from Settings → API" },

                  ].map(f => (

                    <div key={f.key} style={{ marginBottom: 10 }}>

                      <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 4 }}>{f.label}</label>

                      <input value={config[f.key] || ""} onChange={e => { setConfig(c => ({ ...c, [f.key]: e.target.value })); setConfigDirty(true); }}

                        placeholder={f.placeholder}

                        style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "monospace", boxSizing: "border-box" }} />

                    </div>

                  ))}

                </div>

              )}

              {/* Slybroadcast credentials */}

              {config.active_provider === "slybroadcast" && (

                <div style={{ background: C.gray, borderRadius: 10, padding: 18 }}>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📣 Slybroadcast Credentials</div>

                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Your Slybroadcast login email and password</div>

                  {[

                    { key: "slybroadcast_email", label: "Email", placeholder: "your@email.com" },

                    { key: "slybroadcast_pass",  label: "Password", placeholder: "Your Slybroadcast password", type: "password" },

                  ].map(f => (

                    <div key={f.key} style={{ marginBottom: 10 }}>

                      <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 4 }}>{f.label}</label>

                      <input type={f.type || "text"} value={config[f.key] || ""} onChange={e => { setConfig(c => ({ ...c, [f.key]: e.target.value })); setConfigDirty(true); }}

                        placeholder={f.placeholder}

                        style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, boxSizing: "border-box" }} />

                    </div>

                  ))}

                </div>

              )}

              <button onClick={() => {

                const c = config;

                localStorage.setItem("dc_team_id",    c.dropcowboy_team_id || "");

                localStorage.setItem("dc_secret",     c.dropcowboy_secret || "");

                localStorage.setItem("sb_email",      c.slybroadcast_email || "");

                localStorage.setItem("sb_pass",       c.slybroadcast_pass || "");

                localStorage.setItem("rvm_provider",  c.active_provider);

                setConfigDirty(false);

                alert(`✅ ${provider.name} credentials saved!`);

              }} style={{ marginTop: 16, padding: "12px 28px", background: C.green, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>

                💾 Save Credentials

              </button>

            </div>

            {/* How it works */}

            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>

              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>💡 How RVM Works</div>

              {[

                { n: "1", t: "You record a 20–45 second voicemail script", d: "Record in the browser or upload an MP3/WAV. Pro tip: use your real voice — it converts 3× better than robotic TTS." },

                { n: "2", t: "Drop Cowboy / Slybroadcast injects it into voicemail", d: "The phone never rings. The seller gets a notification they have a new voicemail — they listen in their own time." },

                { n: "3", t: "Sellers call or text back curious", d: "5–15% callback rate typical for motivated sellers. Incoming calls auto-create leads or flag existing ones as HOT." },

                { n: "4", t: "Log in CRM + increment touch count", d: "Every drop is logged to the lead's notes automatically. Touch count updates so your 15-touch sequence stays in sync." },

              ].map(s => (

                <div key={s.n} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>

                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{s.n}</div>

                  <div>

                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.t}</div>

                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.d}</div>

                  </div>

                </div>

              ))}

            </div>

            {/* Pricing comparison */}

            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>

              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>💰 Pricing Comparison</div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>

                <thead>

                  <tr style={{ background: C.gray }}>

                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Provider</th>

                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Per Drop</th>

                    <th style={{ padding: "8px 12px", textAlign: "right" }}>100 Drops</th>

                    <th style={{ padding: "8px 12px", textAlign: "right" }}>500 Drops</th>

                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Monthly Fee</th>

                  </tr>

                </thead>

                <tbody>

                  {[

                    { name: "Drop Cowboy (BYOC)", per: "$0.004", x100: "$0.40", x500: "$2.00", monthly: "None" },

                    { name: "Drop Cowboy (Standard)", per: "$0.025", x100: "$2.50", x500: "$12.50", monthly: "$125+" },

                    { name: "Slybroadcast", per: "$0.10", x100: "$10", x500: "$40", monthly: "None" },

                  ].map((r, i) => (

                    <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>

                      <td style={{ padding: "8px 12px", fontWeight: i === 0 ? 700 : 400 }}>{r.name}{i === 0 && <span style={{ background: "#dcfce7", color: C.green, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 6, marginLeft: 6 }}>BEST</span>}</td>

                      <td style={{ padding: "8px 12px", textAlign: "right", color: C.green, fontWeight: 700 }}>{r.per}</td>

                      <td style={{ padding: "8px 12px", textAlign: "right", color: C.muted }}>{r.x100}</td>

                      <td style={{ padding: "8px 12px", textAlign: "right", color: C.muted }}>{r.x500}</td>

                      <td style={{ padding: "8px 12px", textAlign: "right", color: C.muted }}>{r.monthly}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

              <div style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>

                💡 BYOC = Bring Your Own Carrier — connect your Twilio account to Drop Cowboy to get wholesale rates. Best option for you since Twilio is already set up.

              </div>

            </div>

          </div>

        )}

      </div>

      </div>

    </SaaSLayout>

  );

}
