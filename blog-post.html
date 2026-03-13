/* RED CROWN MMA — HUNT PROTOCOL — main.js */
(function(){
'use strict';

/* ── CURSOR ── */
const CR=document.getElementById('cr'), CD=document.getElementById('cd');
let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function tick(){
  rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
  CR.style.left=rx+'px'; CR.style.top=ry+'px';
  CD.style.left=mx+'px'; CD.style.top=my+'px';
  requestAnimationFrame(tick);
})();
document.querySelectorAll('a,button,[data-hover],.gc,.pc,.cc,.tc,.tier').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* ── NAV SCROLL ── */
const NAV=document.getElementById('nav');
if(NAV){
  window.addEventListener('scroll',()=>NAV.classList.toggle('solid',scrollY>30),{passive:true});
  if(scrollY>30) NAV.classList.add('solid');
}

/* ── HAMBURGER ── */
const BURG=document.getElementById('burg'), MM=document.getElementById('mm');
if(BURG&&MM){
  BURG.addEventListener('click',()=>{
    const o=MM.classList.toggle('open');
    BURG.classList.toggle('open',o);
    document.body.style.overflow=o?'hidden':'';
  });
  MM.querySelectorAll('.mlnk').forEach(l=>l.addEventListener('click',()=>{
    MM.classList.remove('open'); BURG.classList.remove('open'); document.body.style.overflow='';
  }));
}

/* ── PAGE WIPE TRANSITIONS ── */
const WIPE=document.getElementById('wipe');
document.querySelectorAll('[data-link]').forEach(el=>{
  el.addEventListener('click',e=>{
    const href=el.getAttribute('href');
    if(!href||href==='#'||href.startsWith('#')) return;
    e.preventDefault();
    WIPE.className='in';
    setTimeout(()=>location.href=href,440);
  });
});
if(WIPE){WIPE.className='out'; setTimeout(()=>WIPE.className='',470);}

/* ── SCROLL REVEALS ── */
const IO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');IO.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>IO.observe(el));

/* ── STAT COUNTERS ── */
const CIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, t=parseFloat(el.dataset.count), dur=1600, s=performance.now();
    (function step(n){const p=Math.min((n-s)/dur,1),v=1-Math.pow(1-p,3);el.textContent=Number.isInteger(t)?Math.round(v*t):(v*t).toFixed(1);if(p<1)requestAnimationFrame(step);})(s);
    CIO.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>CIO.observe(el));

/* ══════════════════════════════════════════════════════
   BLOODHOUND — BEAST OF THE HUNT
   Full ultimate activation sequence
   Phase 1: Amber flash flood
   Phase 2: Sonar rings + sweep arm on canvas
   Phase 3: Corner HUD brackets snap in
   Phase 4: HUD readouts populate
   Phase 5: Rune ring rotates in
   Phase 6: "THE HUNT" glitch-slams
   Phase 7: Charge bar fills
   Phase 8: Final burst → navigate
══════════════════════════════════════════════════════ */
const FTS = document.getElementById('fts');
let ftRunning = false;
let bhRAF = null;

function launchFT() {
  if (ftRunning) return;
  if (!FTS) { location.href = 'fighter-team.html'; return; }
  ftRunning = true;

  /* Inject Bloodhound HUD layout */
  FTS.innerHTML = `
    <div id="bh-flash"></div>
    <canvas id="bh-canvas"></canvas>
    <div class="fts-sl"></div>
    <div class="bh-c bh-tl"></div>
    <div class="bh-c bh-tr"></div>
    <div class="bh-c bh-bl"></div>
    <div class="bh-c bh-br"></div>
    <div class="bh-hud bh-hud-tl" id="bh-hl">HUNTER PROTOCOL ᚱ<br>RED CROWN MMA<br>NOIDA · INDIA</div>
    <div class="bh-hud bh-hud-tr" id="bh-hr">TARGET: FIGHT TEAM<br>STATUS: LOCATED<br>RANGE: WITHIN REACH</div>
    <div class="bh-hud bh-hud-bl" id="bh-hbl">SCAN: ACTIVE<br>THREAT: ██████<br>ᚹ GLORY AWAITS</div>
    <div class="bh-hud bh-hud-br" id="bh-hbr">ᚱ ENTER THE HUNT<br>SENSES: HEIGHTENED<br>PREY: IDENTIFIED</div>
    <div id="bh-stage">
      <div id="bh-rune-ring">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%">
          <circle cx="80" cy="80" r="74" fill="none" stroke="#C89828" stroke-opacity=".35" stroke-width="1"/>
          <line x1="80" y1="6"   x2="80" y2="18"  stroke="#C89828" stroke-opacity=".6" stroke-width="1.2"/>
          <line x1="80" y1="142" x2="80" y2="154" stroke="#C89828" stroke-opacity=".6" stroke-width="1.2"/>
          <line x1="6"  y1="80"  x2="18" y2="80"  stroke="#C89828" stroke-opacity=".6" stroke-width="1.2"/>
          <line x1="142" y1="80" x2="154" y2="80" stroke="#C89828" stroke-opacity=".6" stroke-width="1.2"/>
          <text x="80" y="9"   text-anchor="middle" dominant-baseline="middle" font-family="serif" font-size="9" fill="#C89828" fill-opacity=".7">ᚱ</text>
          <text x="151" y="80" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-size="9" fill="#C89828" fill-opacity=".7">ᛗ</text>
          <text x="80" y="152" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-size="9" fill="#C89828" fill-opacity=".7">ᚹ</text>
          <text x="9"  y="80"  text-anchor="middle" dominant-baseline="middle" font-family="serif" font-size="9" fill="#C89828" fill-opacity=".7">ᛟ</text>
          <line x1="28"  y1="28"  x2="36"  y2="36"  stroke="#C89828" stroke-opacity=".3" stroke-width=".8"/>
          <line x1="124" y1="28"  x2="132" y2="36"  stroke="#C89828" stroke-opacity=".3" stroke-width=".8"/>
          <line x1="28"  y1="124" x2="36"  y2="132" stroke="#C89828" stroke-opacity=".3" stroke-width=".8"/>
          <line x1="124" y1="124" x2="132" y2="132" stroke="#C89828" stroke-opacity=".3" stroke-width=".8"/>
          <circle cx="80" cy="80" r="54" fill="none" stroke="#C89828" stroke-opacity=".2" stroke-width=".8" stroke-dasharray="5 10"/>
          <polygon points="80,62 98,80 80,98 62,80" fill="none" stroke="#C89828" stroke-opacity=".55" stroke-width="1.2"/>
          <polygon points="80,70 90,80 80,90 70,80" fill="none" stroke="#C89828" stroke-opacity=".35" stroke-width=".8"/>
          <circle cx="80" cy="80" r="4" fill="#C89828" fill-opacity=".7"/>
          <circle cx="80" cy="80" r="7" fill="none" stroke="#C89828" stroke-opacity=".4" stroke-width=".7"/>
        </svg>
      </div>
      <div id="bh-title" data-txt="THE HUNT">THE HUNT</div>
      <div id="bh-sub">Beast of the Hunt · Activated · ᚱ Red Crown</div>
      <div id="bh-bar-wrap"><div id="bh-bar"></div></div>
      <div id="bh-status">SCANNING FOR PREY...</div>
    </div>
  `;

  /* Canvas sonar — use window dimensions directly since FTS is fixed full-screen */
  const CANVAS = document.getElementById('bh-canvas');
  if (!CANVAS) { FTS.classList.add('on'); return; }
  const ctx = CANVAS.getContext('2d');
  if (!ctx) { FTS.classList.add('on'); return; }

  function resizeCanvas() {
    CANVAS.width  = window.innerWidth;
    CANVAS.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const rings = [];
  function spawnRing(a) { rings.push({ r: 0, alpha: a || .7, speed: 2.4 }); }

  spawnRing(.75);
  setTimeout(() => spawnRing(.8),   220);
  setTimeout(() => spawnRing(.7),   440);
  setTimeout(() => spawnRing(.85),  700);
  setTimeout(() => spawnRing(.65),  950);
  setTimeout(() => spawnRing(.9),  1200);
  setTimeout(() => { spawnRing(1); spawnRing(.95); spawnRing(.8); }, 1950);

  let sweepAngle = -Math.PI / 2;
  const DECAY = .0028, SWEEP_SPEED = .032;

  function drawFrame() {
    bhRAF = requestAnimationFrame(drawFrame);
    const W = CANVAS.width, H = CANVAS.height;
    if (!W || !H) return;                        /* skip if zero-size */
    const cx = W / 2, cy = H / 2;
    const maxR = Math.max(Math.hypot(cx, cy) * 1.1, 1);  /* never zero */
    ctx.clearRect(0, 0, W, H);

    /* Radial glow */
    const r1 = Math.max(maxR * .55, 1);          /* gradient outer radius always > 0 */
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
    grd.addColorStop(0, 'rgba(200,152,40,.07)');
    grd.addColorStop(.5,'rgba(200,152,40,.02)');
    grd.addColorStop(1,  'rgba(0,0,0,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);

    /* Tactical grid */
    const step = Math.max(40, Math.floor(Math.min(W,H) / 14));
    ctx.save();
    ctx.strokeStyle = 'rgba(200,152,40,.04)';
    ctx.lineWidth = .5;
    for (let x = cx % step; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = cy % step; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    ctx.restore();

    /* Rings */
    for (let i = rings.length - 1; i >= 0; i--) {
      const rg = rings[i];
      rg.r += rg.speed; rg.alpha -= DECAY;
      if (rg.alpha <= 0 || rg.r > maxR) { rings.splice(i,1); continue; }
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, Math.max(rg.r, 0.1), 0, Math.PI*2);
      ctx.strokeStyle = `rgba(200,152,40,${rg.alpha})`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, Math.max(rg.r - 3, 0.1), 0, Math.PI*2);
      ctx.strokeStyle = `rgba(255,220,120,${rg.alpha*.3})`; ctx.lineWidth = .6; ctx.stroke();
      ctx.restore();
    }

    /* Sweep sector */
    sweepAngle += SWEEP_SPEED;
    const SWEEP_ARC = Math.PI / 3;
    ctx.save();
    const steps = 20;
    for (let s = 0; s < steps; s++) {
      const a1 = sweepAngle - SWEEP_ARC + (SWEEP_ARC * s / steps);
      const a2 = sweepAngle - SWEEP_ARC + (SWEEP_ARC * (s+1) / steps);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, maxR, a1, a2); ctx.closePath();
      ctx.fillStyle = `rgba(200,152,40,${(s/steps)*.14})`; ctx.fill();
    }
    /* Sweep leading edge */
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + maxR * Math.cos(sweepAngle), cy + maxR * Math.sin(sweepAngle));
    ctx.strokeStyle = 'rgba(200,152,40,.6)'; ctx.lineWidth = 1.5;
    ctx.shadowColor = '#C89828'; ctx.shadowBlur = 8; ctx.stroke();
    ctx.restore();

    /* Centre reticle */
    ctx.save();
    ctx.shadowColor = ''; ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(200,152,40,.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx-20,cy); ctx.lineTo(cx+20,cy);
    ctx.moveTo(cx,cy-20); ctx.lineTo(cx,cy+20); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,6,0,Math.PI*2); ctx.stroke();
    ctx.restore();
  }

  /* Show overlay then start animation */
  FTS.classList.add('on');
  requestAnimationFrame(drawFrame);

  /* Phase 1: amber flood */
  requestAnimationFrame(() => {
    FTS.classList.add('bh-flare');
    setTimeout(() => FTS.classList.remove('bh-flare'), 280);
  });

  /* Phase 2: flicker */
  setTimeout(() => {
    FTS.classList.add('bh-flicker-anim');
    setTimeout(() => FTS.classList.remove('bh-flicker-anim'), 200);
  }, 120);

  /* Phase 3: corners */
  setTimeout(() => document.querySelectorAll('.bh-c').forEach(c => c.classList.add('snap')), 300);

  /* Phase 4: HUD readouts */
  setTimeout(() => {
    ['bh-hl','bh-hr','bh-hbl','bh-hbr'].forEach((id,i) => {
      setTimeout(() => { const e=document.getElementById(id); if(e) e.classList.add('vis'); }, i*80);
    });
  }, 550);

  /* Phase 5: rune ring */
  setTimeout(() => { const rr=document.getElementById('bh-rune-ring'); if(rr) rr.classList.add('vis'); }, 700);

  /* Phase 6: title slam + glitch */
  setTimeout(() => {
    const title=document.getElementById('bh-title');
    const sub=document.getElementById('bh-sub');
    if (title) {
      title.classList.add('vis');
      setTimeout(() => { title.classList.add('glitch'); setTimeout(()=>title.classList.remove('glitch'),240); }, 80);
      setTimeout(() => { title.classList.add('glitch'); setTimeout(()=>title.classList.remove('glitch'),180); }, 500);
    }
    if (sub) setTimeout(() => sub.classList.add('vis'), 200);
  }, 950);

  /* Phase 7: charge bar */
  setTimeout(() => {
    const bw=document.getElementById('bh-bar-wrap');
    const bar=document.getElementById('bh-bar');
    const st=document.getElementById('bh-status');
    if (bw) bw.classList.add('vis');
    if (st) st.classList.add('vis');
    if (bar) {
      const MSGS=['SCANNING FOR PREY...','HEIGHTENING SENSES...','TRACKING HUNT...','FIGHT TEAM LOCATED.','COMMENCING HUNT.'];
      let pct=0, si=0;
      const bi=setInterval(()=>{
        pct=Math.min(pct+1.35,100);
        bar.style.width=pct+'%';
        const nsi=Math.floor((pct/100)*(MSGS.length-1));
        if(nsi!==si && st){ si=nsi; st.textContent=MSGS[si]; }
        if(pct>=100) clearInterval(bi);
      }, 28);
    }
  }, 1200);

  /* Phase 8: final burst + navigate */
  setTimeout(() => {
    const title=document.getElementById('bh-title');
    if(title){ title.classList.add('glitch'); setTimeout(()=>title.classList.remove('glitch'),200); }
    FTS.classList.add('bh-flare');
    setTimeout(()=>FTS.classList.remove('bh-flare'),160);
    FTS.classList.add('bh-flicker-anim');
    setTimeout(()=>{
      window.removeEventListener('resize', resizeCanvas);
      if(bhRAF) cancelAnimationFrame(bhRAF);
      FTS.classList.remove('on'); ftRunning=false;
      if(WIPE) WIPE.className='in';
      setTimeout(()=>location.href='fighter-team.html',440);
    }, 380);
  }, 2050);
}
window.launchFT = launchFT;

document.addEventListener('keydown', e => {
  if (e.key==='Escape' && FTS && FTS.classList.contains('on')) {
    if(bhRAF) cancelAnimationFrame(bhRAF);
    FTS.classList.remove('on'); ftRunning=false;
  }
});
['logo-btn','hero-logo-btn'].forEach(id => {
  const el=document.getElementById(id);
  if(el){el.addEventListener('click',launchFT);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')launchFT();});}
});

/* ── GALLERY LIGHTBOX ── */
const LB=document.getElementById('lb'), LBIMG=document.getElementById('lbimg'), LBCAP=document.getElementById('lbcap'), LBCLS=document.getElementById('lbcls'), LBPREV=document.getElementById('lbprev'), LBNEXT=document.getElementById('lbnext'), LBCNT=document.getElementById('lbcnt');
let items=[], lbIdx=0;
document.querySelectorAll('.gc[data-lb]').forEach((c,i)=>{
  items.push({lbl:c.dataset.lb,sub:c.dataset.lbSub||''});
  c.addEventListener('click',()=>openLB(i));
  c.addEventListener('keydown',e=>{if(e.key==='Enter')openLB(i);});
});
function openLB(i){if(!LB)return;lbIdx=i;updateLB();LB.classList.add('open');document.body.style.overflow='hidden';}
function closeLB(){if(!LB)return;LB.classList.remove('open');document.body.style.overflow='';}
function updateLB(){
  const it=items[lbIdx];
  LBCAP.textContent=it.lbl;
  LBCNT.textContent=(lbIdx+1)+' / '+items.length;
  LBIMG.querySelectorAll('.lbphl').forEach(el=>el.textContent=it.lbl);
}
if(LBCLS)LBCLS.addEventListener('click',closeLB);
if(LBPREV)LBPREV.addEventListener('click',()=>{lbIdx=(lbIdx-1+items.length)%items.length;updateLB();});
if(LBNEXT)LBNEXT.addEventListener('click',()=>{lbIdx=(lbIdx+1)%items.length;updateLB();});
if(LB){
  LB.addEventListener('click',e=>{if(e.target===LB)closeLB();});
  document.addEventListener('keydown',e=>{
    if(!LB.classList.contains('open'))return;
    if(e.key==='Escape')closeLB();
    if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+items.length)%items.length;updateLB();}
    if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%items.length;updateLB();}
  });
}

/* ── FORM DEMO ── */
const FORM = document.getElementById('trial-form');
if(FORM){
  FORM.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = FORM.querySelector('.fsub');
    const original = btn.textContent;

    // Show sending state
    btn.textContent = '◆ SENDING...';
    btn.style.opacity = '.7';
    btn.disabled = true;

    const data = {
      name:    FORM.querySelector('#cf-name').value,
      phone:   FORM.querySelector('#cf-phone').value,
      email:   FORM.querySelector('#cf-email').value,
      program: FORM.querySelector('#cf-prog').value,
      level:   FORM.querySelector('#cf-lvl').value,
      message: FORM.querySelector('#cf-msg').value
    };

    // Set a timeout — if fetch hangs over 8s, treat as failed
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 8000)
    );

    try {
      await Promise.race([
        fetch('https://script.google.com/macros/s/AKfycbwo-ZIlRgaGTZkaAFgLYCaVZUBtXixZMmDI7RwhKYS_4r_4EhFBvoc7Hac2-duvzg7A/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }),
        timeout
      ]);

      // Fetch resolved = request reached Google's servers
      showSuccess();
      FORM.reset();

    } catch(err) {
      // Network failure or timeout
      showError();
    }

    function showSuccess() {
      // Replace form with a confirmation card
      FORM.innerHTML = `
        <div style="text-align:center;padding:48px 24px;border:1px solid rgba(22,163,74,.25);background:rgba(22,163,74,.06)">
          <div style="font-family:var(--fm);font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#16a34a;margin-bottom:16px">◆ Request Received</div>
          <p style="font-family:var(--fd);font-size:32px;font-weight:700;color:var(--white);margin-bottom:10px;line-height:1">You're on the list.</p>
          <p style="font-family:var(--fb);font-size:14px;font-weight:300;color:var(--mist);line-height:1.8;margin-bottom:28px">
            We'll confirm your free trial within <strong style="color:var(--white)">24 hours</strong>.<br>
            For faster response, message us directly on WhatsApp.
          </p>
          <a href="https://wa.me/919910604536?text=Hi%2C%20I%20want%20to%20book%20a%20free%20trial%20class%20at%20Red%20Crown%20MMA" target="_blank" rel="noopener"
            style="display:inline-flex;align-items:center;gap:10px;background:#25D366;padding:13px 28px;font-family:var(--fd);font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#064E3B;text-decoration:none">
            💬 <span>WhatsApp Us Now</span>
          </a>
        </div>`;
    }

    function showError() {
      // Keep form intact, show error banner above it
      const banner = document.createElement('div');
      banner.style.cssText = 'padding:16px 20px;background:rgba(127,29,29,.4);border:1px solid rgba(251,54,64,.3);margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap';
      banner.innerHTML = `
        <div>
          <p style="font-family:var(--fd);font-size:15px;font-weight:700;color:var(--white);margin-bottom:3px">Submission failed — please try again.</p>
          <p style="font-family:var(--fb);font-size:12px;font-weight:300;color:var(--mist)">Check your connection, or reach us directly on WhatsApp.</p>
        </div>
        <a href="https://wa.me/919910604536?text=Hi%2C%20I%20want%20to%20book%20a%20free%20trial%20class%20at%20Red%20Crown%20MMA" target="_blank" rel="noopener"
          style="flex-shrink:0;display:inline-flex;align-items:center;gap:8px;background:#25D366;padding:10px 18px;font-family:var(--fd);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#064E3B;text-decoration:none">
          💬 WhatsApp
        </a>`;
      FORM.insertBefore(banner, FORM.firstChild);

      // Reset button
      btn.textContent = original;
      btn.style.opacity = '1';
      btn.style.background = '';
      btn.disabled = false;

      // Auto-dismiss banner after 8s
      setTimeout(() => banner.remove(), 8000);
    }
  });
}

})();
