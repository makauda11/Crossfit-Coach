import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
  .cf-root {
    --black: #0a0a0a; --card: #181818; --border: #2a2a2a;
    --orange: #ff4d00; --orange-dim: #ff4d0022; --white: #f0ede8; --gray: #888;
    background: var(--black); color: var(--white);
    font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden;
  }
  .cf-header { position: relative; padding: 60px 40px 40px; border-bottom: 1px solid var(--border); overflow: hidden; }
  .cf-header::after {
    content: 'STRENGTH'; position: absolute; right: -20px; top: -10px;
    font-family: 'Bebas Neue', sans-serif; font-size: 160px; color: var(--white);
    opacity: 0.03; line-height: 1; pointer-events: none; user-select: none;
  }
  .cf-header-tag {
    display: inline-block; background: var(--orange); color: #fff;
    font-size: 10px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    padding: 4px 12px; margin-bottom: 16px;
  }
  .cf-header h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px,8vw,96px); line-height: 0.9; letter-spacing: 2px; margin: 0; }
  .cf-header h1 span { color: var(--orange); }
  .cf-header p { margin-top: 16px; color: var(--gray); font-size: 14px; font-weight: 300; max-width: 400px; }
  .cf-month-selector { display: flex; gap: 8px; padding: 24px 40px 0; }
  .cf-month-btn {
    padding: 8px 20px; background: transparent; border: 1px solid var(--border);
    color: var(--gray); font-family: 'DM Sans', sans-serif; font-size: 12px;
    letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .cf-month-btn:hover { color: var(--white); border-color: var(--white); }
  .cf-month-btn.active { background: var(--orange); border-color: var(--orange); color: #fff; }
  .cf-week-bar { display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; margin: 40px 40px 0; }
  .cf-week-item { background: var(--card); border: 1px solid var(--border); padding: 16px; cursor: pointer; transition: all 0.2s; text-align: center; }
  .cf-week-item:hover, .cf-week-item.active { border-color: var(--orange); background: var(--orange-dim); }
  .cf-wi-day { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--gray); margin-bottom: 6px; }
  .cf-wi-name { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 1px; color: var(--white); line-height: 1.2; }
  .cf-content { padding: 40px; max-width: 1100px; }
  .cf-day-header { display: flex; align-items: baseline; gap: 20px; margin-bottom: 8px; }
  .cf-day-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: 52px; line-height: 1; margin: 0; }
  .cf-focus { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: var(--orange); font-weight: 500; }
  .cf-day-desc { color: var(--gray); font-size: 13px; margin-bottom: 36px; font-weight: 300; }
  .cf-exercises { display: grid; grid-template-columns: repeat(auto-fill,minmax(300px,1fr)); gap: 20px; }
  .cf-exercise-card { background: var(--card); border: 1px solid var(--border); overflow: hidden; transition: border-color 0.2s, transform 0.2s; }
  .cf-exercise-card:hover { border-color: var(--orange); transform: translateY(-2px); }
  .cf-video-link { display: block; width: 100%; aspect-ratio: 16/9; background: #0f0f0f; position: relative; overflow: hidden; text-decoration: none; }
  .cf-video-link img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
  .cf-video-link:hover img { transform: scale(1.04); }
  .cf-video-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  .cf-video-link:hover .cf-video-overlay { background: rgba(0,0,0,0.15); }
  .cf-play-btn { width: 56px; height: 56px; background: #ff0000; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.5); transition: transform 0.2s; }
  .cf-video-link:hover .cf-play-btn { transform: scale(1.1); }
  .cf-play-btn svg { width: 22px; height: 22px; fill: white; margin-left: 3px; }
  .cf-fallback { position: absolute; inset: 0; background: linear-gradient(135deg,#1c1c1c,#2a2a2a); border-bottom: 2px solid var(--orange); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
  .cf-fallback-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; color: var(--white); text-align: center; padding: 0 16px; }
  .cf-fallback-sub { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--orange); }
  .cf-exercise-info { padding: 20px; }
  .cf-exercise-name { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; color: var(--white); margin-bottom: 6px; }
  .cf-muscles { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .cf-muscle-tag { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; padding: 3px 8px; background: var(--orange-dim); color: var(--orange); border: 1px solid #ff4d0033; }
  .cf-scheme-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 14px; }
  .cf-scheme-item { background: var(--card); padding: 10px; text-align: center; }
  .cf-scheme-label { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: var(--gray); display: block; margin-bottom: 4px; }
  .cf-scheme-value { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--white); line-height: 1; }
  .cf-scheme-unit { font-size: 11px; font-family: 'DM Sans', sans-serif; color: var(--gray); font-weight: 300; }
  .cf-tip-box { margin-top: 14px; padding: 10px 14px; border-left: 2px solid var(--orange); background: var(--orange-dim); }
  .cf-tip-box p { font-size: 11px; color: #ccc; font-weight: 300; line-height: 1.5; margin: 0; }
  .cf-tip-strong { color: var(--orange); font-weight: 500; }
  @keyframes cf-fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .cf-panel-enter { animation: cf-fadeIn 0.3s ease; }
  @media (max-width: 600px) {
    .cf-header { padding: 40px 20px 30px; }
    .cf-content { padding: 24px 20px; }
    .cf-week-bar { gap: 4px; margin: 24px 20px 0; }
    .cf-week-item { padding: 10px 6px; }
    .cf-wi-name { font-size: 11px; }
    .cf-month-selector { padding: 16px 20px 0; }
  }
`;

const schemes = {
  1: {
    lunes:     [{s:5,r:3,c:"65%"},{s:4,r:5,c:"50%"}],
    martes:    [{s:5,r:5,c:"75%"},{s:3,r:5,c:"65%"}],
    miercoles: [{s:5,r:5,c:"70%"},{s:4,r:5,c:"80%"}],
    jueves:    [{s:5,r:3,c:"80%"},{s:5,r:2,c:"70%"}],
    viernes:   [{s:5,r:2,c:"70%"},{s:5,r:3,c:"75%"}],
  },
  2: {
    lunes:     [{s:5,r:2,c:"72%"},{s:4,r:4,c:"55%"}],
    martes:    [{s:5,r:3,c:"82%"},{s:4,r:4,c:"70%"}],
    miercoles: [{s:5,r:3,c:"77%"},{s:4,r:4,c:"85%"}],
    jueves:    [{s:5,r:2,c:"87%"},{s:5,r:2,c:"75%"}],
    viernes:   [{s:5,r:2,c:"75%"},{s:5,r:3,c:"80%"}],
  },
  3: {
    lunes:     [{s:4,r:1,c:"80%"},{s:3,r:3,c:"60%"}],
    martes:    [{s:4,r:2,c:"88%"},{s:3,r:3,c:"75%"}],
    miercoles: [{s:4,r:2,c:"83%"},{s:4,r:3,c:"90%"}],
    jueves:    [{s:4,r:1,c:"92%"},{s:4,r:2,c:"80%"}],
    viernes:   [{s:4,r:1,c:"82%"},{s:4,r:2,c:"85%"}],
  },
};

const days = [
  {
    id:"lunes", label:"Lunes", summary:"Power Snatch\n+ Snatch",
    focus:"Halterofilia · Tirón Explosivo",
    desc:"Técnica pura cuando el sistema nervioso está fresco. Foco en velocidad de barra y posición de recepción.",
    exercises:[
      {name:"Power Snatch",muscles:["Trapecios","Glúteos","Hombros","Full body"],videoId:"TL8SMp7RdXQ",tip:"Extensión completa de caderas antes de tirar con los brazos. La barra pega al cuerpo en el muslo."},
      {name:"Snatch",muscles:["Hombros","Trapecios","Tríceps"],videoId:"GhxhiehJcQY",tip:"Sin squat de recepción. Ideal para reforzar el pull alto y la rotación externa de hombro."},
    ],
  },
  {
    id:"martes", label:"Martes", summary:"Back Squat\n+ Front Squat",
    focus:"Piernas · Squat",
    desc:"Día de piernas antes del descanso del miércoles. Máximo reclutamiento de cuádriceps y glúteos.",
    exercises:[
      {name:"Back Squat",muscles:["Cuádriceps","Glúteos","Core"],videoId:"QmZAiBqPvZw",tip:"Rodillas hacia fuera, pecho arriba. Bajar por debajo del paralelo para máxima activación glútea."},
      {name:"Front Squat",muscles:["Cuádriceps","Core","Dorsales"],videoId:"uYumuL_G_V0",tip:"Codos altos siempre. El torso vertical es lo que distingue el Front del Back Squat."},
    ],
  },
  {
    id:"miercoles", label:"Miércoles", summary:"Shoulder Press\n+ Push Press",
    focus:"Tren Superior · Empuje Vertical",
    desc:"Hombros y tríceps aislados. Progresión de press estricto a dinámico para trabajar fuerza y potencia.",
    exercises:[
      {name:"Shoulder Press",muscles:["Hombros","Tríceps","Core"],videoId:"5yWaNOvgFCM",tip:"Glúteos y abdomen contraídos. La barra sube en línea recta, no en arco."},
      {name:"Push Press",muscles:["Hombros","Tríceps","Glúteos"],videoId:"iaBVSJm78ko",tip:"Dip corto y explosivo. Usar las piernas para lanzar, no para compensar la fuerza."},
    ],
  },
  {
    id:"jueves", label:"Jueves", summary:"Deadlift\n+ Clean",
    focus:"Cadena Posterior · Tirón",
    desc:"Fuerza máxima. Deadlift como base + Clean para transferir esa fuerza a movimiento explosivo.",
    exercises:[
      {name:"Deadlift",muscles:["Isquios","Glúteos","Lumbares","Trapecios"],videoId:"op9kVnSso6Q",tip:"Espalda neutra obligatorio. Empujar el suelo, no tirar de la barra. Descenso controlado."},
      {name:"Clean",muscles:["Full body","Potencia","Coordinación"],videoId:"Ty14ogq_Vok",tip:"Recibir con codos adelantados en Front Squat completo. No frenar el tirón antes de la extensión."},
    ],
  },
  {
    id:"viernes", label:"Viernes", summary:"Squat Clean\n+ Push Jerk",
    focus:"Full Body · Complejo Olímpico",
    desc:"Cierre de semana con integración total. El complejo Squat Clean + Push Jerk activa todo el sistema muscular.",
    exercises:[
      {name:"Squat Clean",muscles:["Full body","Cuádriceps","Glúteos"],videoId:"Ty14ogq_Vok",tip:"El squat es parte del tirón, no algo separado. Caer activamente bajo la barra."},
      {name:"Push Jerk",muscles:["Hombros","Tríceps","Piernas"],videoId:"VrHNJXoSyXw",tip:"Caer con los brazos ya extendidos. La barra no sube con brazos, sube con piernas."},
    ],
  },
];

function SchemeGrid({ s, r, c }) {
  return (
    <div className="cf-scheme-grid">
      {[["Series",s],["Reps",r],["Carga",c]].map(([label,val]) => (
        <div key={label} className="cf-scheme-item">
          <span className="cf-scheme-label">{label}</span>
          <div className="cf-scheme-value">
            {typeof val==="string" && val.endsWith("%")
              ? <>{val.replace("%","")}<span className="cf-scheme-unit">%</span></>
              : val}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExerciseCard({ ex, scheme }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="cf-exercise-card">
      <a className="cf-video-link" href={"https://www.youtube.com/watch?v="+ex.videoId} target="_blank" rel="noopener noreferrer">
        {failed ? (
          <div className="cf-fallback">
            <div className="cf-fallback-name">{ex.name}</div>
            <div className="cf-fallback-sub">▶ Ver en YouTube</div>
          </div>
        ) : (
          <img
            src={"https://img.youtube.com/vi/"+ex.videoId+"/hqdefault.jpg"}
            alt={ex.name}
            onError={() => setFailed(true)}
          />
        )}
        <div className="cf-video-overlay">
          <div className="cf-play-btn">
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </a>
      <div className="cf-exercise-info">
        <div className="cf-exercise-name">{ex.name}</div>
        <div className="cf-muscles">
          {ex.muscles.map(m => <span key={m} className="cf-muscle-tag">{m}</span>)}
        </div>
        <SchemeGrid s={scheme.s} r={scheme.r} c={scheme.c} />
        <div className="cf-tip-box">
          <p><span className="cf-tip-strong">Clave:</span> {ex.tip}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [month, setMonth] = useState(1);
  const [activeDay, setActiveDay] = useState("lunes");
  const current = days.find(d => d.id===activeDay);
  const monthSchemes = schemes[month][activeDay];

  return (
    <>
      <style>{styles}</style>
      <div className="cf-root">
        <header className="cf-header">
          <div className="cf-header-tag">Plan 3 meses · Intermedio</div>
          <h1>FUERZA<br /><span>PRE-WOD</span></h1>
          <p>Bloque de fuerza diario antes del WOD. Lunes a viernes, progresión por mes.</p>
        </header>

        <div className="cf-month-selector">
          {[1,2,3].map(m => (
            <button key={m} className={"cf-month-btn"+(month===m?" active":"")} onClick={() => setMonth(m)}>
              MES {m}
            </button>
          ))}
        </div>

        <div className="cf-week-bar">
          {days.map(d => (
            <div key={d.id} className={"cf-week-item"+(activeDay===d.id?" active":"")} onClick={() => setActiveDay(d.id)}>
              <div className="cf-wi-day">{d.label}</div>
              <div className="cf-wi-name">
                {d.summary.split("\n").map((line,i) => <span key={i}>{line}{i===0&&<br/>}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="cf-content">
          <div key={activeDay+month} className="cf-panel-enter">
            <div className="cf-day-header">
              <h2>{current.label.toUpperCase()}</h2>
              <span className="cf-focus">{current.focus}</span>
            </div>
            <p className="cf-day-desc">{current.desc}</p>
            <div className="cf-exercises">
              {current.exercises.map((ex,i) => (
                <ExerciseCard key={ex.name} ex={ex} scheme={monthSchemes[i]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
