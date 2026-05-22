# New Microsoft Word Document (68)

Source: New Microsoft Word Document (68).docx

import { rgba } from "@/components/HQ/HQHelpers";

export const Bar = ({ value, max, color, h = 6 }) => {

  const pct = Math.min(100, Math.round(((value||0)/Math.max(max,1))*100));

  return (

    <div style={{background:"#1e293b",borderRadius:99,height:h,overflow:"hidden"}}>

      <div style={{width:`${pct}%`,height:"100%",borderRadius:99,transition:"width 0.6s ease",background:pct>=100?"#22c55e":pct>=60?color:pct>=30?"#f59e0b":"#ef4444"}} />

    </div>

  );

};

export const Pill = ({ label, color }) => (

  <span style={{background:`${color}20`,color,borderRadius:20,padding:"1px 7px",fontSize:10,fontWeight:800,whiteSpace:"nowrap"}}>{label}</span>

);

export const Card = ({ children, style={}, glow }) => (

  <div style={{background:"linear-gradient(145deg,#0f1826,#0d1520)",border:`1px solid ${glow?rgba(glow,0.35):"#0B1F45"}`,borderRadius:16,overflow:"hidden",boxShadow:glow?`0 0 30px ${rgba(glow,0.08)}`:"none",...style}}>{children}</div>

);

export const CardHeader = ({ icon, title, subtitle, right }) => (

  <div style={{padding:"16px 20px",borderBottom:"1px solid #0f1e2e",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

    <div>

      <div style={{fontWeight:800,color:"#f1f5f9",fontSize:15,display:"flex",alignItems:"center",gap:7}}><span>{icon}</span>{title}</div>

      {subtitle && <div style={{fontSize:11,color:"#334155",marginTop:2}}>{subtitle}</div>}

    </div>

    {right}

  </div>

);

export const SectionTitle = ({ icon, title, sub }) => (

  <div style={{marginBottom:16}}>

    <h2 style={{color:"#f1f5f9",fontSize:17,fontWeight:800,margin:0,display:"flex",alignItems:"center",gap:8}}><span>{icon}</span>{title}</h2>

    {sub && <p style={{color:"#334155",fontSize:12,margin:"3px 0 0 26px"}}>{sub}</p>}

  </div>

);

export const KpiTile = ({ icon, label, value, sub, color, pulse, onClick }) => (

  <div onClick={onClick}

    style={{background:"linear-gradient(145deg,#0f1826,#0d1520)",border:`1px solid ${rgba(color,0.25)}`,borderRadius:14,padding:"16px",cursor:onClick?"pointer":"default",transition:"all 0.15s"}}

    onMouseEnter={e=>{if(onClick)e.currentTarget.style.borderColor=color}}

    onMouseLeave={e=>{if(onClick)e.currentTarget.style.borderColor=rgba(color,0.25)}}>

    <div style={{fontSize:11,color:"#334155",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{icon} {label}</div>

    <div style={{fontSize:26,fontWeight:900,color,letterSpacing:"-1px",display:"flex",alignItems:"center",gap:7}}>

      {value}

      {pulse && value > 0 && <span style={{width:7,height:7,borderRadius:"50%",background:color,display:"inline-block",animation:"glow 1.5s infinite"}} />}

    </div>

    {sub && <div style={{fontSize:10,color:"#1e3a5f",marginTop:4}}>{sub}</div>}

  </div>

);

export const ZipMarketBadge = ({ zip }) => {

  if (!zip) return null;

  return <span style={{fontSize:9,color:"#334155",background:"#0a111e",borderRadius:4,padding:"1px 5px"}}>{zip}</span>;

};
