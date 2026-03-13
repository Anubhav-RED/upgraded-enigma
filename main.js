@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow+Condensed:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300&family=Share+Tech+Mono&display=swap');

:root {
  --void: #000F08; --v2: #081310; --v3: #0D1C16; --v4: #14261D;
  --blood: #FB3640; --blood2: #C01D26; --glow: rgba(251,54,64,.16);
  --gold: #D4A843; --mist: #8FAAA0; --fog: #4A6358;
  --white: #ECF4F0; --border: rgba(251,54,64,.14); --bw: rgba(236,244,240,.06);
  --fd: 'Rajdhani', sans-serif; --fb: 'Barlow Condensed', sans-serif; --fm: 'Share Tech Mono', monospace;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: var(--void); color: var(--white); font-family: var(--fb); font-weight: 300; overflow-x: hidden; cursor: none; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
ul { list-style: none; }
button, input, select, textarea { font-family: inherit; border: none; outline: none; background: none; }
::selection { background: var(--blood); color: var(--void); }

/* ── CURSOR ─────────────────────────────────── */
#cr { position: fixed; z-index: 99999; pointer-events: none; width: 36px; height: 36px; transform: translate(-50%,-50%); transition: width .18s, height .18s; }
#cr svg { width: 100%; height: 100%; }
#cd { position: fixed; z-index: 99999; pointer-events: none; width: 4px; height: 4px; background: var(--blood); border-radius: 50%; transform: translate(-50%,-50%); }
body.hov #cr { width: 52px; height: 52px; }
body.hov #cr .cr-ring { stroke: var(--blood); stroke-opacity: 1; }
body.hov #cr .cr-arm { opacity: 0; }

/* ── GRAIN ───────────────────────────────────── */
#grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 9990; opacity: .03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px; animation: grain .4s steps(4) infinite;
}
@keyframes grain { 0%{background-position:0 0} 25%{background-position:-20px 30px} 50%{background-position:15px -12px} 75%{background-position:-8px 22px} }
#scanline { position: fixed; inset: 0; pointer-events: none; z-index: 9989; background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.06) 3px,rgba(0,0,0,.06) 4px); }

/* ── PAGE WIPE ───────────────────────────────── */
#wipe { position: fixed; inset: 0; z-index: 9980; background: var(--blood); transform: scaleX(0); transform-origin: right; pointer-events: none; }
#wipe.in  { animation: wi .42s cubic-bezier(.76,0,.24,1) forwards; }
#wipe.out { animation: wo .42s cubic-bezier(.76,0,.24,1) .06s forwards; }
@keyframes wi  { to { transform: scaleX(1); transform-origin: right; } }
@keyframes wo  { from { transform: scaleX(1); transform-origin: left; } to { transform: scaleX(0); transform-origin: left; } }

/* ══════════════════════════════════════════════════════
   BLOODHOUND — BEAST OF THE HUNT
   Full-screen ultimate activation overlay
   Amber #C89828  ·  Sonar rings  ·  Runic HUD
══════════════════════════════════════════════════════ */
#fts {
  position: fixed; inset: 0; z-index: 9970;
  background: #000;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity .18s ease;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
}
#fts.on { opacity: 1; pointer-events: all; }

/* Amber flash layer — flares on activation */
#bh-flash {
  position: absolute; inset: 0; z-index: 1;
  background: radial-gradient(ellipse at center, rgba(200,152,40,.95) 0%, rgba(180,110,0,.6) 40%, transparent 75%);
  opacity: 0; pointer-events: none;
  transition: opacity .12s;
}
#fts.bh-flare #bh-flash { opacity: 1; }

/* Canvas — sonar rings, sweep, rune sigil */
#bh-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  z-index: 2;
}

/* Scanlines */
.fts-sl {
  position: absolute; inset: 0; z-index: 3;
  background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.18) 3px,rgba(0,0,0,.18) 4px);
  pointer-events: none;
}

/* ── Corner HUD brackets ── */
.bh-c {
  position: absolute; z-index: 10;
  width: 56px; height: 56px;
  opacity: 0;
  transition: opacity .12s, transform .22s cubic-bezier(.2,1.4,.4,1);
}
.bh-c.snap { opacity: 1; transform: translate(0,0) !important; }
.bh-tl { top: 28px; left: 28px;  transform: translate(-12px,-12px); }
.bh-tr { top: 28px; right: 28px; transform: translate(12px,-12px); }
.bh-bl { bottom: 28px; left: 28px;  transform: translate(-12px,12px); }
.bh-br { bottom: 28px; right: 28px; transform: translate(12px,12px); }
/* L-shaped amber bracket lines */
.bh-tl::before,.bh-tl::after,
.bh-tr::before,.bh-tr::after,
.bh-bl::before,.bh-bl::after,
.bh-br::before,.bh-br::after {
  content: ''; position: absolute; background: #C89828;
}
.bh-tl::before,.bh-tr::before,.bh-bl::before,.bh-br::before { width: 2px; height: 100%; }
.bh-tl::after, .bh-tr::after, .bh-bl::after, .bh-br::after  { width: 100%; height: 2px; }
.bh-tl::before { top:0; left:0; }   .bh-tl::after  { top:0; left:0; }
.bh-tr::before { top:0; right:0; }  .bh-tr::after  { top:0; right:0; }
.bh-bl::before { bottom:0; left:0; } .bh-bl::after { bottom:0; left:0; }
.bh-br::before { bottom:0; right:0; } .bh-br::after { bottom:0; right:0; }
/* Dim inner ticks on brackets */
.bh-tl::before { box-shadow: inset 0 0 0 0; }

/* ── HUD corner readouts ── */
.bh-hud {
  position: absolute; z-index: 10;
  font-family: var(--fm);
  font-size: clamp(7px,1vw,9px);
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(200,152,40,.65);
  line-height: 1.9;
  opacity: 0;
  transition: opacity .4s ease;
  pointer-events: none;
}
.bh-hud.vis { opacity: 1; }
.bh-hud-tl { top: 92px;    left: 92px;   text-align: left; }
.bh-hud-tr { top: 92px;    right: 92px;  text-align: right; }
.bh-hud-bl { bottom: 92px; left: 92px;   text-align: left; }
.bh-hud-br { bottom: 92px; right: 92px;  text-align: right; }

/* ── Centre stage ── */
#bh-stage {
  position: relative; z-index: 10;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  gap: 0;
  pointer-events: none;
}

/* Rune ring SVG */
#bh-rune-ring {
  width: clamp(120px,20vw,200px);
  height: clamp(120px,20vw,200px);
  opacity: 0;
  transition: opacity .5s ease;
  margin-bottom: 24px;
}
#bh-rune-ring.vis { opacity: 1; }
#bh-rune-ring svg {
  animation: bh-ring-rot 8s linear infinite;
}
#bh-rune-ring-inner svg {
  animation: bh-ring-rot-rev 5s linear infinite;
}
@keyframes bh-ring-rot { to { transform: rotate(360deg); } }
@keyframes bh-ring-rot-rev { to { transform: rotate(-360deg); } }

/* THE HUNT title */
#bh-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(52px,10vw,120px);
  font-weight: 700;
  color: #C89828;
  letter-spacing: -2px;
  line-height: .85;
  text-transform: uppercase;
  opacity: 0;
  transform: scale(.9);
  transition: opacity .2s, transform .3s cubic-bezier(.2,1.2,.4,1);
  position: relative;
}
#bh-title.vis {
  opacity: 1;
  transform: scale(1);
}
/* Glitch layers */
#bh-title::before,
#bh-title::after {
  content: attr(data-txt);
  position: absolute;
  inset: 0;
  opacity: 0;
}
#bh-title.glitch::before {
  color: #ff3a00;
  clip-path: polygon(0 22%,100% 22%,100% 44%,0 44%);
  transform: translateX(-4px);
  opacity: .7;
  animation: bh-glitch-a .22s steps(2) forwards;
}
#bh-title.glitch::after {
  color: #00cfff;
  clip-path: polygon(0 58%,100% 58%,100% 78%,0 78%);
  transform: translateX(4px);
  opacity: .7;
  animation: bh-glitch-b .22s steps(2) forwards;
}
@keyframes bh-glitch-a {
  0%   { transform: translateX(-4px) scaleX(.999); }
  50%  { transform: translateX(5px)  scaleX(1.002); }
  100% { transform: translateX(0);   opacity: 0; }
}
@keyframes bh-glitch-b {
  0%   { transform: translateX(4px)  scaleX(.999); }
  50%  { transform: translateX(-3px) scaleX(1.001); }
  100% { transform: translateX(0);   opacity: 0; }
}

/* Subtitle */
#bh-sub {
  font-family: var(--fm);
  font-size: clamp(7px,1.2vw,10px);
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(200,152,40,.6);
  margin-top: 10px;
  margin-bottom: 28px;
  opacity: 0;
  transition: opacity .5s ease .2s;
}
#bh-sub.vis { opacity: 1; }

/* Charge bar */
#bh-bar-wrap {
  width: clamp(220px,35vw,420px);
  height: 3px;
  background: rgba(200,152,40,.12);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity .3s;
  margin-bottom: 12px;
}
#bh-bar-wrap.vis { opacity: 1; }
#bh-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, rgba(200,152,40,.4), #C89828);
  transition: width .05s linear;
  position: relative;
}
/* Bright leading edge */
#bh-bar::after {
  content: '';
  position: absolute;
  right: 0; top: -2px;
  width: 6px; height: 7px;
  background: #fff8e0;
  box-shadow: 0 0 8px 2px #C89828;
}

/* Status text */
#bh-status {
  font-family: var(--fm);
  font-size: 8px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: rgba(200,152,40,.45);
  opacity: 0;
  transition: opacity .3s;
}
#bh-status.vis { opacity: 1; }

/* Flicker glitch on whole overlay */
@keyframes bh-flicker {
  0%,100% { opacity: 1; }
  8%  { opacity: .85; }
  9%  { opacity: 1; }
  42% { opacity: 1; }
  43% { opacity: .9; }
  44% { opacity: 1; }
}
#fts.bh-flicker-anim { animation: bh-flicker .18s steps(1) forwards; }

/* ── LEGACY — kept so old static HTML references don't break ── */
.fts-box,.fts-bdg,#fts-t,.ftc,.fts-bw,.fts-b,.fts-s { display: none !important; }

/* ── NAV ─────────────────────────────────────── */
#nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 52px; transition: background .35s, border-color .35s; }
#nav.solid { background: rgba(0,15,8,.97); border-bottom: 1px solid var(--border); backdrop-filter: blur(12px); }
.n-logo { display: flex; align-items: center; gap: 14px; cursor: none; }
.lw { position: relative; width: 44px; height: 44px; cursor: none; flex-shrink: 0; }
.lsvg { width: 44px; height: 44px; position: relative; z-index: 3; filter: drop-shadow(0 0 8px rgba(251,54,64,.45)); animation: breathe 4s ease-in-out infinite, flckr 20s ease 8s infinite; transition: filter .3s, transform .3s; }
@keyframes breathe { 0%,100%{filter:drop-shadow(0 0 7px rgba(251,54,64,.4))} 50%{filter:drop-shadow(0 0 24px rgba(251,54,64,.9)) drop-shadow(0 0 50px rgba(251,54,64,.2))} }
@keyframes flckr { 0%,90%,100%{opacity:1} 91%{opacity:.7} 93%{opacity:1} 95%{opacity:.5} 96.5%{opacity:.95} 97%{opacity:1} }
.or1 { position: absolute; inset: -8px; border-radius: 50%; z-index: 2; border: 1.5px solid rgba(251,54,64,.22); animation: spin 14s linear infinite; pointer-events: none; }
.or1::before, .or1::after { content: ''; position: absolute; width: 5px; height: 5px; background: var(--blood); border-radius: 50%; top: calc(50% - 2.5px); }
.or1::before { left: -2.5px; } .or1::after { right: -2.5px; }
.or2 { position: absolute; inset: -15px; border-radius: 50%; z-index: 2; border: 1px dashed rgba(251,54,64,.1); animation: spin 22s linear infinite reverse; pointer-events: none; }
.or2::before { content: ''; position: absolute; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; top: -2px; left: calc(50% - 2px); }
@keyframes spin { to{transform:rotate(360deg)} }
.lw:hover .lsvg { filter: drop-shadow(0 0 26px rgba(251,54,64,.95)) drop-shadow(0 0 60px rgba(251,54,64,.3)); transform: scale(1.08); }
.ltip { position: absolute; top: calc(100% + 14px); left: 50%; transform: translateX(-50%); font-family: var(--fm); font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: var(--blood); background: var(--void); border: 1px solid var(--border); padding: 5px 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .3s; animation: pbdr 1.8s ease-in-out infinite; }
.lw:hover .ltip { opacity: 1; }
.n-txt { display: flex; flex-direction: column; }
.n-nm { font-family: var(--fd); font-size: 17px; font-weight: 700; letter-spacing: 3px; color: var(--white); line-height: 1; }
.n-nm em { color: var(--blood); font-style: normal; }
.n-sb { font-family: var(--fm); font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: var(--fog); }
.n-links { display: flex; align-items: center; gap: 2px; }
.n-lnk { font-family: var(--fd); font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--mist); padding: 8px 14px; cursor: none; position: relative; transition: color .25s; }
.n-lnk::after { content: ''; position: absolute; bottom: 4px; left: 14px; right: 14px; height: 1px; background: var(--blood); transform: scaleX(0); transform-origin: left; transition: transform .3s; }
.n-lnk:hover, .n-lnk.active { color: var(--white); }
.n-lnk:hover::after, .n-lnk.active::after { transform: scaleX(1); }
.n-cta { font-family: var(--fd); font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--void); background: var(--blood); padding: 10px 22px; cursor: none; position: relative; overflow: hidden; transition: letter-spacing .25s; }
.n-cta::before { content: ''; position: absolute; inset: 0; background: var(--white); transform: translateX(-101%); transition: transform .32s; }
.n-cta:hover { letter-spacing: 4px; } .n-cta:hover::before { transform: translateX(0); }
.n-cta span { position: relative; z-index: 1; }
.n-burg { display: none; flex-direction: column; gap: 5px; cursor: none; padding: 8px; background: none; border: none; }
.n-burg span { display: block; width: 25px; height: 2px; background: var(--white); transition: transform .3s, opacity .3s; }
.n-burg.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.n-burg.open span:nth-child(2) { opacity: 0; }
.n-burg.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── MOBILE MENU ─────────────────────────────── */
#mm { position: fixed; inset: 0; z-index: 900; background: rgba(0,15,8,.98); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; opacity: 0; pointer-events: none; transition: opacity .35s; }
#mm.open { opacity: 1; pointer-events: all; }
.mlnk { font-family: var(--fd); font-size: clamp(34px,7vw,60px); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--white); cursor: none; padding: 8px 44px; position: relative; overflow: hidden; opacity: 0; transform: translateY(14px); transition: color .25s, opacity .38s, transform .38s; }
#mm.open .mlnk { opacity: 1; transform: translateY(0); }
#mm.open .mlnk:nth-child(1){transition-delay:.06s} #mm.open .mlnk:nth-child(2){transition-delay:.11s}
#mm.open .mlnk:nth-child(3){transition-delay:.16s} #mm.open .mlnk:nth-child(4){transition-delay:.21s}
#mm.open .mlnk:nth-child(5){transition-delay:.26s} #mm.open .mlnk:nth-child(6){transition-delay:.31s}
.mlnk::before { content: ''; position: absolute; inset: 0; background: var(--glow); transform: translateX(-101%); transition: transform .28s; }
.mlnk:hover { color: var(--blood); } .mlnk:hover::before { transform: translateX(0); }
.mmdiv { width: 40px; height: 1px; background: var(--border); margin: 10px 0; opacity: 0; transition: opacity .35s .32s; }
#mm.open .mmdiv { opacity: 1; }
.mmcw { opacity: 0; transform: translateY(10px); transition: opacity .38s .36s, transform .38s .36s; }
#mm.open .mmcw { opacity: 1; transform: none; }

/* ── SHARED COMPONENTS ───────────────────────── */
.slbl { font-family: var(--fm); font-size: 10px; letter-spacing: 5px; text-transform: uppercase; color: var(--blood); display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.slbl::before { content: '◆'; font-size: 7px; } .slbl::after { content: ''; flex: 1; max-width: 56px; height: 1px; background: var(--blood); }
.stit { font-family: var(--fd); font-size: clamp(40px,6.5vw,84px); font-weight: 700; line-height: .9; letter-spacing: -1px; color: var(--white); }
.stit .r { color: var(--blood); } .stit .ol { -webkit-text-stroke: 1.5px var(--white); color: transparent; }
.phb { background: var(--v3); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; position: relative; overflow: hidden; }
.phb::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(251,54,64,.05),transparent 55%); }
.phx { position: absolute; inset: 0; opacity: .04; } .phx line { stroke: var(--blood); stroke-width: .6; }
.phl { font-family: var(--fm); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--fog); text-align: center; padding: 0 16px; position: relative; z-index: 1; }
.phs { font-family: var(--fb); font-size: 9px; font-weight: 300; color: rgba(74,99,88,.8); text-align: center; padding: 0 20px; line-height: 1.7; position: relative; z-index: 1; }
.phov { position: absolute; inset: 0; background: rgba(251,54,64,.88); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .3s; z-index: 2; }
.phov span { font-family: var(--fd); font-size: 14px; letter-spacing: 3px; text-transform: uppercase; color: var(--void); }
.rv  { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
.rvl { opacity: 0; transform: translateX(-22px); transition: opacity .7s, transform .7s; }
.rvr { opacity: 0; transform: translateX(22px); transition: opacity .7s, transform .7s; }
.rv.in, .rvl.in, .rvr.in { opacity: 1; transform: none; }
.bp { display: inline-flex; align-items: center; gap: 10px; font-family: var(--fd); font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--void); background: var(--blood); padding: 14px 30px; cursor: none; position: relative; overflow: hidden; transition: letter-spacing .25s; }
.bp::before { content: ''; position: absolute; inset: 0; background: var(--white); transform: translateX(-101%); transition: transform .32s; }
.bp:hover { letter-spacing: 4px; } .bp:hover::before { transform: translateX(0); }
.bp span { position: relative; z-index: 1; }
.bo { display: inline-flex; align-items: center; gap: 10px; font-family: var(--fd); font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--white); border: 1px solid rgba(236,244,240,.25); padding: 13px 28px; cursor: none; transition: border-color .25s, color .25s; }
.bo:hover { border-color: var(--blood); color: var(--blood); }

/* ── PAGE SHELL ──────────────────────────────── */
.pgh { padding: 120px 0 68px; position: relative; overflow: hidden; background: var(--void); border-bottom: 1px solid var(--bw); }
.pgh::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(251,54,64,.06),transparent 52%); }
.pgh::after { content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom,transparent,var(--blood),transparent); }
.pghi { max-width: 1280px; margin: 0 auto; padding: 0 56px; position: relative; z-index: 1; }
.pghtag { font-family: var(--fm); font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--blood); display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.pghtag::before { content: '◆'; font-size: 7px; }
.pghh { font-family: var(--fd); font-size: clamp(56px,10vw,118px); font-weight: 700; letter-spacing: -2px; line-height: .85; color: var(--white); margin-bottom: 14px; }
.pghsub { font-family: var(--fb); font-size: 18px; font-weight: 300; color: var(--mist); line-height: 1.8; max-width: 540px; }
.pggnt { position: absolute; right: 40px; bottom: -24px; font-family: var(--fd); font-size: clamp(100px,18vw,230px); font-weight: 700; color: rgba(251,54,64,.04); letter-spacing: -4px; line-height: 1; user-select: none; pointer-events: none; }
.pgb { max-width: 1280px; margin: 0 auto; padding: 0 56px 96px; }

/* ── MARQUEE ─────────────────────────────────── */
.mqw { overflow: hidden; background: var(--blood); padding: 13px 0; border-top: 1px solid rgba(255,255,255,.1); }
.mqt { display: flex; width: max-content; animation: marq 22s linear infinite; }
.mqw:hover .mqt { animation-play-state: paused; }
@keyframes marq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.mqi { font-family: var(--fd); font-size: 12px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--void); padding: 0 44px; display: inline-flex; align-items: center; gap: 44px; }
.mqi::after { content: '◆'; font-size: 7px; }

/* ── FOOTER ──────────────────────────────────── */
footer { background: var(--void); border-top: 1px solid var(--bw); padding: 52px 56px; }
.fi  { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: auto 1fr auto; gap: 40px; align-items: center; }
.fb  { display: flex; align-items: center; gap: 14px; }
.fls { width: 36px; height: 36px; filter: drop-shadow(0 0 6px rgba(251,54,64,.35)); }
.fn  { font-family: var(--fd); font-size: 16px; font-weight: 700; letter-spacing: 3px; color: var(--white); }
.fn em { color: var(--blood); font-style: normal; }
.fsb { font-family: var(--fm); font-size: 8px; letter-spacing: 3px; color: var(--fog); }
.flinks { display: flex; gap: 28px; flex-wrap: wrap; justify-content: center; }
.flnk { font-family: var(--fd); font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--fog); cursor: none; transition: color .2s; }
.flnk:hover { color: var(--blood); }
.fcp { font-family: var(--fm); font-size: 9px; letter-spacing: 1px; color: var(--fog); text-align: right; line-height: 1.8; }

/* ── WHATSAPP FLOAT ──────────────────────────── */
#wa { position: fixed; bottom: 28px; right: 28px; z-index: 2000; display: flex; align-items: center; gap: 10px; background: #25D366; padding: 12px 20px 12px 14px; cursor: none; box-shadow: 0 8px 32px rgba(37,211,102,.3); text-decoration: none; animation: wap 3.5s ease-in-out infinite; transition: transform .25s, box-shadow .25s; }
#wa:hover { transform: scale(1.05); box-shadow: 0 12px 48px rgba(37,211,102,.5); }
@keyframes wap { 0%,100%{box-shadow:0 8px 32px rgba(37,211,102,.3)} 50%{box-shadow:0 8px 52px rgba(37,211,102,.55)} }
.wai { font-size: 22px; line-height: 1; }
.wal { font-family: var(--fd); font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #064E3B; }

/* ── LIGHTBOX ────────────────────────────────── */
#lb { position: fixed; inset: 0; z-index: 5000; background: rgba(0,15,8,.97); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .3s; }
#lb.open { opacity: 1; pointer-events: all; }
.lbbox { position: relative; width: min(860px,90vw); }
#lbimg { aspect-ratio: 16/10; background: var(--v3); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; position: relative; overflow: hidden; }
#lbimg svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .05; }
#lbcap { font-family: var(--fm); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--fog); margin-top: 12px; }
.lbctrl { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; }
.lbbtn { font-family: var(--fd); font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--mist); border: 1px solid rgba(236,244,240,.12); padding: 9px 20px; background: none; cursor: none; transition: border-color .2s, color .2s; }
.lbbtn:hover { border-color: var(--blood); color: var(--blood); }
#lbcnt { font-family: var(--fm); font-size: 9px; letter-spacing: 3px; color: var(--fog); }
#lbcls { position: absolute; top: -42px; right: 0; font-size: 22px; color: var(--mist); cursor: none; background: none; border: none; transition: color .2s; }
#lbcls:hover { color: var(--blood); }

/* ── FORM ────────────────────────────────────── */
.fg { margin-bottom: 24px; }
.fl { font-family: var(--fm); font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--blood); display: block; margin-bottom: 8px; }
.finp, .fsel, .fta { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(236,244,240,.1); padding: 12px 0; font-family: var(--fb); font-size: 15px; font-weight: 300; color: var(--white); cursor: none; transition: border-color .3s; }
.finp::placeholder, .fta::placeholder { color: rgba(74,99,88,.65); }
.finp:focus, .fsel:focus, .fta:focus { outline: none; border-color: var(--blood); }
.fsel { -webkit-appearance: none; background: var(--v3); }
.fsel option { background: var(--v2); }
.fta { resize: vertical; min-height: 80px; }
.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.fsub { width: 100%; padding: 16px; cursor: none; font-family: var(--fd); font-size: 13px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: var(--void); background: var(--blood); border: none; transition: background .3s, letter-spacing .25s; }
.fsub:hover { background: var(--white); letter-spacing: 6px; }

/* ── SCHEDULE GRID ───────────────────────────── */
.schw { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.schg { display: grid; grid-template-columns: 68px repeat(6,1fr); gap: 2px; min-width: 640px; }
.sgh { background: var(--v3); font-family: var(--fm); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--blood); padding: 10px 8px; text-align: center; }
.sgt { background: var(--v2); font-family: var(--fm); font-size: 10px; color: var(--fog); padding: 10px 8px; display: flex; align-items: center; justify-content: flex-end; border-right: 1px solid rgba(251,54,64,.08); }
.sc { padding: 9px 10px; font-family: var(--fb); font-size: 11px; cursor: none; border-left: 2px solid transparent; transition: transform .18s; }
.sc:hover { transform: scale(1.04); }
.sc.bjj  { background: rgba(59,130,246,.18); border-left-color: #3B82F6; }
.sc.mt   { background: rgba(251,54,64,.18); border-left-color: var(--blood); }
.sc.bx   { background: rgba(212,168,67,.18); border-left-color: var(--gold); }
.sc.wr   { background: rgba(0,180,120,.16); border-left-color: #00B478; }
.sc.mma  { background: rgba(160,0,220,.15); border-left-color: #A000DC; }
.sc.sc2  { background: rgba(255,140,0,.15); border-left-color: #FF8C00; }
.sc.kid  { background: rgba(236,72,153,.15); border-left-color: #EC4899; }
.scn { font-weight: 400; color: var(--mist); line-height: 1.2; }
.scs { font-size: 9px; color: rgba(143,170,160,.5); margin-top: 2px; }
.sge { background: rgba(255,255,255,.01); border: 1px solid rgba(255,255,255,.02); }
.sleg { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 14px; padding: 12px 0; border-top: 1px solid var(--bw); }
.lg  { display: flex; align-items: center; gap: 6px; }
.lgd { width: 8px; height: 8px; border-radius: 2px; }
.lgl { font-family: var(--fm); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--fog); }

/* ── RESPONSIVE ──────────────────────────────── */
@media (max-width: 1024px) {
  #nav { padding: 0 28px; }
  .n-links { display: none; }
  .n-burg { display: flex; }
  .pghi, .pgb { padding-left: 28px; padding-right: 28px; }
  footer { padding: 44px 28px; }
  .fi { grid-template-columns: 1fr; gap: 24px; text-align: center; }
  .fb { justify-content: center; }
  .fcp { text-align: center; }
}
@media (max-width: 640px) {
  .pghi, .pgb { padding-left: 18px; padding-right: 18px; }
  footer { padding: 36px 18px; }
  #wa { bottom: 16px; right: 16px; }
  .frow { grid-template-columns: 1fr; }
}
