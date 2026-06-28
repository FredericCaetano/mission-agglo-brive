import { useState, useCallback, useRef } from "react";

// ─── Supabase config ───────────────────────────────────────────────────────
const SUPABASE_URL = "https://ibijrfdhlgfhlgecltuw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaWpyZmRobGdmaGxnZWNsdHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDMxODUsImV4cCI6MjA5ODIxOTE4NX0.nUKeVQ2YiSv7gfeJKfO6bn_AUh4Y7cG5iMKO4cIN5iM";
const MOT_DE_PASSE_COMMUN = "AggloBrive2026#";

async function verifierSalarie(code) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/salaries?code=eq.${encodeURIComponent(code)}&select=code,nom,prenom`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) throw new Error("Erreur réseau");
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

// ─── Données métier ────────────────────────────────────────────────────────
const MISSIONS = [
  { code: "HGAB", label: "VP Elec" },
  { code: "HKDB", label: "GAZ ERP" },
  { code: "HKDC", label: "GC ERP" },
  { code: "HBBC", label: "TR SSI" },
  { code: "HHCB", label: "ASCENSEUR" },
  { code: "HHCE+HHCF", label: "ASCENSEUR QUINQUÉNAL" },
  { code: "HHCH", label: "PORTES" },
];

const INITIAL_BATIMENTS = [
  "FOYER DES JEUNES TRAVAILLEURS","CCAS","FOYER LOGEMENT TUAC",
  "CENTRE D'ACCUEIL PATIER","ÉPICERIE SOLIDAIRE","FOYER LES GENÊTS",
  "CINÉMA LE REX","MATERNELLE PONT CARDINAL","HALLE BRASSENS",
  "ÉCOLE DE MUSIQUE","ESPACE DES 3 PROVINCES","THÉÂTRE MUNICIPAL",
];

const missionColors = {
  "HGAB":"#dbeafe","HKDB":"#fef9c3","HKDC":"#fef9c3",
  "HBBC":"#fef9c3","HHCB":"#dbeafe","HHCE+HHCF":"#dbeafe","HHCH":"#dbeafe",
};

function createEmptyMission(m) {
  return { code: m.code, label: m.label, unPrevu:"", unPropose:"", realise:false, intervenant:"", commentaires:"" };
}
function createBatiment(nom) {
  return { id: Date.now() + Math.random(), nom, missions: MISSIONS.map(createEmptyMission), expanded: true };
}

const MAX_HISTORY = 20;
const th = { padding:"10px 14px", textAlign:"left", fontWeight:600, fontSize:12, color:"#475569", borderBottom:"1px solid #e2e8f0", whiteSpace:"nowrap" };
const td = { padding:"8px 14px", borderBottom:"1px solid #f1f5f9", verticalAlign:"middle" };
const inputStyle = { padding:"6px 10px", borderRadius:6, border:"1px solid #e2e8f0", fontSize:13, width:70, outline:"none", textAlign:"center", background:"#f8fafc" };

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DE CONNEXION
// ══════════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [code, setCode] = useState("");
  const [mdp, setMdp] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [showMdp, setShowMdp] = useState(false);

  const handleLogin = async () => {
    setErreur("");
    if (!code.trim() || !mdp.trim()) { setErreur("Veuillez remplir les deux champs."); return; }
    if (mdp !== MOT_DE_PASSE_COMMUN) { setErreur("Mot de passe incorrect."); return; }
    setLoading(true);
    try {
      const salarie = await verifierSalarie(code.trim());
      if (!salarie) { setErreur("Code salarié non reconnu."); }
      else { onLogin(salarie); }
    } catch {
      setErreur("Erreur de connexion. Vérifiez votre réseau.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg, #0f2240 0%, #1e3a5f 60%, #2563eb 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ width:"100%", maxWidth:420, padding:"0 20px" }}>
        {/* Logo / titre */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ width:64, height:64, borderRadius:16, background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:32 }}>🏛️</div>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12, letterSpacing:3, textTransform:"uppercase", marginBottom:6 }}>Agglomération de Brive</div>
          <h1 style={{ color:"white", margin:0, fontSize:24, fontWeight:700 }}>MISSION AGGLO</h1>
          <div style={{ color:"#60a5fa", fontSize:14, marginTop:4 }}>Brive – 2026</div>
        </div>

        {/* Carte de connexion */}
        <div style={{ background:"white", borderRadius:16, padding:"32px 28px", boxShadow:"0 24px 64px rgba(0,0,0,0.35)" }}>
          <h2 style={{ margin:"0 0 24px", fontSize:17, color:"#1e3a5f", fontWeight:700, textAlign:"center" }}>Connexion</h2>

          {/* Code salarié */}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#475569", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>
              Code salarié
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Ex : 11630"
              style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
              onFocus={(e) => e.target.style.borderColor="#2563eb"}
              onBlur={(e) => e.target.style.borderColor="#e2e8f0"}
            />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom:24 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#475569", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>
              Mot de passe
            </label>
            <div style={{ position:"relative" }}>
              <input
                type={showMdp ? "text" : "password"}
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Mot de passe commun"
                style={{ width:"100%", padding:"11px 44px 11px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
                onFocus={(e) => e.target.style.borderColor="#2563eb"}
                onBlur={(e) => e.target.style.borderColor="#e2e8f0"}
              />
              <button onClick={() => setShowMdp(!showMdp)}
                style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:16 }}>
                {showMdp ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Erreur */}
          {erreur && (
            <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", marginBottom:16, color:"#dc2626", fontSize:13, display:"flex", alignItems:"center", gap:8 }}>
              ⚠️ {erreur}
            </div>
          )}

          {/* Bouton */}
          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", padding:"13px", borderRadius:8, border:"none", background: loading ? "#93c5fd" : "linear-gradient(135deg, #1e3a5f, #2563eb)", color:"white", fontWeight:700, fontSize:15, cursor: loading ? "not-allowed" : "pointer", transition:"opacity 0.2s" }}>
            {loading ? "Vérification..." : "Se connecter →"}
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:20, color:"rgba(255,255,255,0.35)", fontSize:12 }}>
          Accès réservé au personnel autorisé
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APPLICATION PRINCIPALE
// ══════════════════════════════════════════════════════════════════════════════
function MainApp({ user, onLogout }) {
  const [batiments, setBatimentsRaw] = useState(INITIAL_BATIMENTS.map(createBatiment));
  const [newBatiment, setNewBatiment] = useState("");
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [addMissionOpen, setAddMissionOpen] = useState({});
  const historyRef = useRef([]);

  const setBatiments = useCallback((updater) => {
    setBatimentsRaw((prev) => {
      historyRef.current = [...historyRef.current.slice(-MAX_HISTORY + 1), prev];
      return typeof updater === "function" ? updater(prev) : updater;
    });
  }, []);

  const undo = () => {
    if (!historyRef.current.length) return;
    const prev = historyRef.current[historyRef.current.length - 1];
    historyRef.current = historyRef.current.slice(0, -1);
    setBatimentsRaw(prev);
  };
  const canUndo = historyRef.current.length > 0;

  const updateMission = useCallback((batId, mCode, field, value) => {
    setBatiments((prev) =>
      prev.map((b) => b.id === batId
        ? { ...b, missions: b.missions.map((m) => m.code === mCode ? { ...m, [field]: value } : m) }
        : b)
    );
  }, [setBatiments]);

  const removeMission = (batId, mCode) => {
    setBatiments((prev) => prev.map((b) => b.id === batId ? { ...b, missions: b.missions.filter((m) => m.code !== mCode) } : b));
  };

  const addMissionToBat = (batId, mCode) => {
    const def = MISSIONS.find((m) => m.code === mCode);
    if (!def) return;
    setBatiments((prev) => prev.map((b) => b.id === batId ? { ...b, missions: [...b.missions, createEmptyMission(def)] } : b));
    setAddMissionOpen((o) => ({ ...o, [batId]: false }));
  };

  const toggleExpand = (batId) => setBatimentsRaw((prev) => prev.map((b) => b.id === batId ? { ...b, expanded: !b.expanded } : b));
  const addBatiment = () => { if (newBatiment.trim()) { setBatiments((prev) => [...prev, createBatiment(newBatiment.trim())]); setNewBatiment(""); } };
  const removeBatiment = (batId) => { setBatiments((prev) => prev.filter((b) => b.id !== batId)); setConfirmDelete(null); };

  const totalPrevu = batiments.reduce((s, b) => s + b.missions.reduce((ss, m) => ss + (parseFloat(m.unPrevu) || 0), 0), 0);
  const totalPropose = batiments.reduce((s, b) => s + b.missions.reduce((ss, m) => ss + (parseFloat(m.unPropose) || 0), 0), 0);
  const totalRealise = batiments.reduce((s, b) => s + b.missions.filter((m) => m.realise).length, 0);
  const filteredBatiments = search.trim() ? batiments.filter((b) => b.nom.toLowerCase().includes(search.trim().toLowerCase())) : batiments;

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding:"20px 32px", color:"white", boxShadow:"0 4px 20px rgba(37,99,235,0.3)" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", opacity:0.7, marginBottom:4 }}>Agglomération de Brive</div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, letterSpacing:0.5 }}>MISSION AGGLO – BRIVE 2026</h1>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            {/* Utilisateur connecté */}
            <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"6px 14px", fontSize:13, color:"white", display:"flex", alignItems:"center", gap:8 }}>
              <span>👤</span>
              <span style={{ fontWeight:600 }}>{user.prenom} {user.nom}</span>
              <span style={{ color:"rgba(255,255,255,0.45)", fontSize:11 }}>#{user.code}</span>
            </div>
            <button onClick={onLogout}
              style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"rgba(255,255,255,0.7)", fontSize:12, cursor:"pointer", fontWeight:600 }}>
              Déconnexion
            </button>
            <div style={{ width:1, height:28, background:"rgba(255,255,255,0.2)" }} />
            <button onClick={undo} disabled={!canUndo} title="Annuler la dernière action"
              style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor: canUndo ? "pointer" : "not-allowed", fontWeight:600, fontSize:13, display:"flex", alignItems:"center", gap:6, background: canUndo ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)", color: canUndo ? "white" : "rgba(255,255,255,0.35)" }}>
              ↩ Annuler
            </button>
            <div style={{ width:1, height:28, background:"rgba(255,255,255,0.2)" }} />
            <button onClick={() => setView("table")} style={{ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background: view==="table" ? "white" : "rgba(255,255,255,0.15)", color: view==="table" ? "#1e3a5f" : "white" }}>📋 Saisie</button>
            <button onClick={() => setView("summary")} style={{ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background: view==="summary" ? "white" : "rgba(255,255,255,0.15)", color: view==="summary" ? "#1e3a5f" : "white" }}>📊 Récapitulatif</button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ background:"#1e3a5f", paddingBottom:20 }}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 32px", display:"flex", gap:16, flexWrap:"wrap" }}>
          {[
            { label:"Bâtiments", value:batiments.length, unit:"", color:"#60a5fa" },
            { label:"Total UM Prévus", value:totalPrevu.toFixed(1), unit:"UM", color:"#34d399" },
            { label:"Total UM Proposés", value:totalPropose.toFixed(1), unit:"UM", color:"#fbbf24" },
            { label:"Missions réalisées", value:totalRealise, unit:`/ ${batiments.reduce((s,b)=>s+b.missions.length,0)}`, color:"#a78bfa" },
          ].map((kpi) => (
            <div key={kpi.label} style={{ background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 20px", flex:"1 1 160px", borderTop:`3px solid ${kpi.color}` }}>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, textTransform:"uppercase", letterSpacing:1 }}>{kpi.label}</div>
              <div style={{ color:"white", fontSize:22, fontWeight:700, marginTop:2 }}>
                {kpi.value} <span style={{ fontSize:13, fontWeight:400, color:kpi.color }}>{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"24px 32px" }}>

        {/* Toolbar */}
        <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, flex:"1 1 220px", background:"white", borderRadius:10, padding:"10px 16px", border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize:18, color:"#94a3b8" }}>🔍</span>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Rechercher un bâtiment..."
              style={{ flex:1, border:"none", outline:"none", fontSize:14, color:"#1e3a5f", background:"transparent" }} />
            {search && (<>
              <button onClick={()=>setSearch("")} style={{ background:"#f1f5f9", border:"none", borderRadius:6, padding:"4px 10px", cursor:"pointer", color:"#64748b", fontSize:12, fontWeight:600 }}>✕ Effacer</button>
              <span style={{ fontSize:12, color:"#94a3b8", whiteSpace:"nowrap" }}>{filteredBatiments.length} résultat{filteredBatiments.length!==1?"s":""}</span>
            </>)}
          </div>
          <button onClick={()=>setBatimentsRaw((prev)=>prev.map((b)=>({...b,expanded:true})))}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, border:"1px solid #e2e8f0", background:"white", color:"#1e3a5f", fontWeight:600, fontSize:13, cursor:"pointer", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", whiteSpace:"nowrap" }}>
            <span>⊞</span> Tout déployer
          </button>
          <button onClick={()=>setBatimentsRaw((prev)=>prev.map((b)=>({...b,expanded:false})))}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, border:"1px solid #e2e8f0", background:"white", color:"#1e3a5f", fontWeight:600, fontSize:13, cursor:"pointer", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", whiteSpace:"nowrap" }}>
            <span>⊟</span> Tout réduire
          </button>
        </div>

        {view === "table" ? (
          <>
            {filteredBatiments.length === 0 && (
              <div style={{ textAlign:"center", padding:"48px 24px", background:"white", borderRadius:12, border:"1px solid #e2e8f0", color:"#94a3b8", marginBottom:16 }}>
                <div style={{ fontSize:32, marginBottom:8 }}>🏢</div>
                <div style={{ fontWeight:600, fontSize:15, color:"#64748b" }}>Aucun bâtiment trouvé</div>
                <div style={{ fontSize:13, marginTop:4 }}>Essayez un autre terme de recherche</div>
              </div>
            )}

            {filteredBatiments.map((bat, batIdx) => {
              const batPrevu = bat.missions.reduce((s,m)=>s+(parseFloat(m.unPrevu)||0),0);
              const batPropose = bat.missions.reduce((s,m)=>s+(parseFloat(m.unPropose)||0),0);
              const usedCodes = bat.missions.map((m)=>m.code);
              const availableMissions = MISSIONS.filter((m)=>!usedCodes.includes(m.code));
              return (
                <div key={bat.id} style={{ background:"white", borderRadius:12, marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", overflow:"hidden", border:"1px solid #e2e8f0" }}>
                  <div onClick={()=>toggleExpand(bat.id)} style={{ display:"flex", alignItems:"center", padding:"14px 20px", background:"linear-gradient(90deg,#1e3a5f,#2a4a7f)", cursor:"pointer", userSelect:"none" }}>
                    <span style={{ color:"#60a5fa", fontSize:11, fontWeight:700, marginRight:12, letterSpacing:1 }}>#{String(batIdx+1).padStart(2,"0")}</span>
                    <span style={{ color:"white", fontWeight:700, fontSize:14, flex:1, letterSpacing:0.5 }}>{bat.nom}</span>
                    <span style={{ color:"#93c5fd", fontSize:12, marginRight:16 }}>Prévu: <b>{batPrevu.toFixed(1)}</b> UM &nbsp;|&nbsp; Proposé: <b>{batPropose.toFixed(1)}</b> UM</span>
                    <button onClick={(e)=>{e.stopPropagation();setConfirmDelete(bat.id);}}
                      style={{ background:"rgba(255,100,100,0.2)", border:"none", color:"#fca5a5", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, marginRight:10 }}>
                      ✕ Supprimer
                    </button>
                    <span style={{ color:"white", fontSize:18, display:"inline-block", transform:bat.expanded?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}>⌄</span>
                  </div>

                  {bat.expanded && (
                    <div style={{ overflowX:"auto" }}>
                      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                        <thead>
                          <tr style={{ background:"#f1f5f9" }}>
                            <th style={th}>Code</th><th style={th}>Mission</th>
                            <th style={{...th,width:90}}>UM Prévu</th><th style={{...th,width:90}}>UM Proposé</th>
                            <th style={{...th,width:80}}>Réalisé</th><th style={{...th,minWidth:140}}>Intervenant</th>
                            <th style={{...th,minWidth:200}}>Commentaires</th><th style={{...th,width:40}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {bat.missions.map((mission,i)=>(
                            <tr key={mission.code} style={{ background:i%2===0?"#f8fafc":"white" }}>
                              <td style={{...td,fontWeight:700,color:"#1e3a5f",whiteSpace:"nowrap"}}>
                                <span style={{ background:missionColors[mission.code]||"#f0f9ff", padding:"3px 8px", borderRadius:5, fontSize:11 }}>{mission.code}</span>
                              </td>
                              <td style={{...td,color:"#475569"}}>{mission.label}</td>
                              <td style={td}><input type="number" step="0.5" value={mission.unPrevu} onChange={(e)=>updateMission(bat.id,mission.code,"unPrevu",e.target.value)} placeholder="—" style={inputStyle}/></td>
                              <td style={td}><input type="number" step="0.5" value={mission.unPropose} onChange={(e)=>updateMission(bat.id,mission.code,"unPropose",e.target.value)} placeholder="—" style={inputStyle}/></td>
                              <td style={{...td,textAlign:"center"}}><input type="checkbox" checked={mission.realise} onChange={(e)=>updateMission(bat.id,mission.code,"realise",e.target.checked)} style={{ width:18,height:18,cursor:"pointer",accentColor:"#2563eb" }}/></td>
                              <td style={td}><input type="text" value={mission.intervenant} onChange={(e)=>updateMission(bat.id,mission.code,"intervenant",e.target.value)} placeholder="Nom..." style={{...inputStyle,width:"100%"}}/></td>
                              <td style={td}><input type="text" value={mission.commentaires} onChange={(e)=>updateMission(bat.id,mission.code,"commentaires",e.target.value)} placeholder="Commentaire..." style={{...inputStyle,width:"100%"}}/></td>
                              <td style={{...td,textAlign:"center"}}>
                                <button onClick={()=>removeMission(bat.id,mission.code)} title="Supprimer cette mission"
                                  style={{ background:"none", border:"none", cursor:"pointer", color:"#fca5a5", fontSize:16, padding:"2px 6px", borderRadius:4 }}
                                  onMouseEnter={(e)=>e.currentTarget.style.background="#fee2e2"}
                                  onMouseLeave={(e)=>e.currentTarget.style.background="none"}>✕</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {availableMissions.length > 0 && (
                        <div style={{ padding:"10px 16px", borderTop:"1px dashed #e2e8f0", display:"flex", alignItems:"center", gap:10 }}>
                          {addMissionOpen[bat.id] ? (<>
                            <span style={{ fontSize:12, color:"#64748b", fontWeight:600 }}>Ajouter une mission :</span>
                            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                              {availableMissions.map((m)=>(
                                <button key={m.code} onClick={()=>addMissionToBat(bat.id,m.code)}
                                  style={{ padding:"4px 12px", borderRadius:6, border:"1px solid #2563eb", background:"#eff6ff", color:"#2563eb", fontWeight:600, fontSize:12, cursor:"pointer" }}
                                  onMouseEnter={(e)=>{e.currentTarget.style.background="#2563eb";e.currentTarget.style.color="white";}}
                                  onMouseLeave={(e)=>{e.currentTarget.style.background="#eff6ff";e.currentTarget.style.color="#2563eb";}}>
                                  {m.code} – {m.label}
                                </button>
                              ))}
                            </div>
                            <button onClick={()=>setAddMissionOpen((o)=>({...o,[bat.id]:false}))} style={{ marginLeft:"auto", background:"none", border:"none", color:"#94a3b8", fontSize:18, cursor:"pointer" }}>✕</button>
                          </>) : (
                            <button onClick={()=>setAddMissionOpen((o)=>({...o,[bat.id]:true}))}
                              style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:8, border:"1px dashed #cbd5e1", background:"transparent", color:"#64748b", fontWeight:600, fontSize:12, cursor:"pointer" }}>
                              + Ajouter une mission
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ background:"white", borderRadius:12, padding:"16px 20px", border:"2px dashed #cbd5e1", display:"flex", gap:12, alignItems:"center" }}>
              <input type="text" value={newBatiment} onChange={(e)=>setNewBatiment(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&addBatiment()} placeholder="Nom du nouveau bâtiment..."
                style={{ flex:1, padding:"10px 14px", borderRadius:8, border:"1px solid #cbd5e1", fontSize:14, outline:"none" }}/>
              <button onClick={addBatiment} style={{ background:"#2563eb", color:"white", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, fontSize:14, cursor:"pointer" }}>+ Ajouter bâtiment</button>
            </div>
          </>
        ) : (
          <div style={{ background:"white", borderRadius:12, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #e2e8f0", fontWeight:700, color:"#1e3a5f", fontSize:15 }}>Récapitulatif par bâtiment</div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ background:"#1e3a5f", color:"white" }}>
                    <th style={{...th,color:"white",background:"transparent"}}>Bâtiment</th>
                    {MISSIONS.map((m)=>(<th key={m.code} style={{...th,color:"#93c5fd",background:"transparent",fontSize:11}}>{m.code}</th>))}
                    <th style={{...th,color:"#34d399",background:"transparent"}}>Total UM Prévu</th>
                    <th style={{...th,color:"#fbbf24",background:"transparent"}}>Total UM Proposé</th>
                    <th style={{...th,color:"#a78bfa",background:"transparent"}}>Réalisé</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatiments.map((bat,i)=>{
                    const batPrevu=bat.missions.reduce((s,m)=>s+(parseFloat(m.unPrevu)||0),0);
                    const batPropose=bat.missions.reduce((s,m)=>s+(parseFloat(m.unPropose)||0),0);
                    const batRealise=bat.missions.filter((m)=>m.realise).length;
                    return (
                      <tr key={bat.id} style={{ background:i%2===0?"#f8fafc":"white" }}>
                        <td style={{...td,fontWeight:700,color:"#1e3a5f",whiteSpace:"nowrap"}}>{bat.nom}</td>
                        {MISSIONS.map((m)=>{
                          const miss=bat.missions.find((x)=>x.code===m.code);
                          return (<td key={m.code} style={{...td,textAlign:"center"}}>
                            {!miss?<span style={{color:"#e2e8f0"}}>–</span>
                              :miss.realise?<span style={{color:"#059669",fontWeight:700}}>✓</span>
                              :(miss.unPropose||miss.unPrevu)?<span style={{color:"#2563eb"}}>{miss.unPropose||miss.unPrevu}</span>
                              :<span style={{color:"#cbd5e1"}}>—</span>}
                          </td>);
                        })}
                        <td style={{...td,textAlign:"center",fontWeight:700,color:"#059669"}}>{batPrevu>0?batPrevu.toFixed(1):"—"}</td>
                        <td style={{...td,textAlign:"center",fontWeight:700,color:"#d97706"}}>{batPropose>0?batPropose.toFixed(1):"—"}</td>
                        <td style={{...td,textAlign:"center"}}>
                          <span style={{ background:batRealise===bat.missions.length?"#d1fae5":batRealise>0?"#fef3c7":"#f1f5f9", color:batRealise===bat.missions.length?"#059669":batRealise>0?"#d97706":"#94a3b8", padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>
                            {batRealise}/{bat.missions.length}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ background:"#1e3a5f", fontWeight:700 }}>
                    <td style={{...td,color:"white"}}>TOTAL</td>
                    {MISSIONS.map((m)=>{
                      const tot=batiments.reduce((s,b)=>{const miss=b.missions.find((x)=>x.code===m.code);return s+(parseFloat(miss?.unPropose)||0);},0);
                      return <td key={m.code} style={{...td,textAlign:"center",color:"#93c5fd"}}>{tot>0?tot.toFixed(1):"—"}</td>;
                    })}
                    <td style={{...td,textAlign:"center",color:"#34d399"}}>{totalPrevu.toFixed(1)}</td>
                    <td style={{...td,textAlign:"center",color:"#fbbf24"}}>{totalPropose.toFixed(1)}</td>
                    <td style={{...td,textAlign:"center",color:"#a78bfa"}}>{totalRealise}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modale suppression bâtiment */}
      {confirmDelete && (() => {
        const bat = batiments.find((b) => b.id === confirmDelete);
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(2px)" }}>
            <div style={{ background:"white", borderRadius:14, padding:"28px 32px", maxWidth:420, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)", textAlign:"center" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🗑️</div>
              <h2 style={{ margin:"0 0 8px", fontSize:18, color:"#1e3a5f", fontWeight:700 }}>Supprimer le bâtiment ?</h2>
              <p style={{ color:"#64748b", fontSize:14, margin:"0 0 24px", lineHeight:1.5 }}>
                Vous allez supprimer <strong style={{ color:"#1e3a5f" }}>{bat?.nom}</strong> et toutes ses données. Cette action est irréversible.
              </p>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <button onClick={()=>setConfirmDelete(null)} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#475569", fontWeight:600, fontSize:14, cursor:"pointer" }}>Annuler</button>
                <button onClick={()=>removeBatiment(confirmDelete)} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:"#ef4444", color:"white", fontWeight:700, fontSize:14, cursor:"pointer" }}>Oui, supprimer</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// POINT D'ENTRÉE
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <LoginPage onLogin={setUser} />;
  return <MainApp user={user} onLogout={() => setUser(null)} />;
}
