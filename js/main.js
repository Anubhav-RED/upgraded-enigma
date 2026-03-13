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

/* ── FIGHTER TEAM TERMINAL ── */
const FTS=document.getElementById('fts');
let ftRunning=false;

function launchFT(evt){
  if(ftRunning||!FTS) return;
  ftRunning=true;
  const ox=(evt&&evt.clientX)?evt.clientX:window.innerWidth/2;
  const oy=(evt&&evt.clientY)?evt.clientY:window.innerHeight/2;
  FTS.innerHTML='<canvas id="rl-canvas"></canvas>';
  FTS.classList.add('on');
  const C=document.getElementById('rl-canvas');
  const ctx=C.getContext('2d');
  C.width=window.innerWidth; C.height=window.innerHeight;
  const W=C.width,H=C.height;

  function rnd(a,b){return a+Math.random()*(b-a);}

  /* ── CRACKS ── */
  function buildCrack(x,y,angle,len,depth){
    const pts=[{x,y}];
    let cx=x,cy=y,ang=angle;
    const steps=Math.ceil(len/18);
    for(let i=0;i<steps;i++){ang+=rnd(-.35,.35);cx+=Math.cos(ang)*len/steps;cy+=Math.sin(ang)*len/steps;pts.push({x:cx,y:cy});}
    const crack={pts,drawn:0,depth,width:depth===0?rnd(1.4,2.2):rnd(.5,1.1),branches:[]};
    if(depth<2){for(let b=0;b<3;b++){const bi=Math.floor(rnd(pts.length*.3,pts.length*.7));crack.branches.push({at:bi,crack:buildCrack(pts[bi].x,pts[bi].y,ang+rnd(-1.1,1.1),len*rnd(.35,.6),depth+1)});}}
    return crack;
  }
  const maxDist=Math.hypot(W,H);
  const CRACKS=[];
  for(let i=0;i<14;i++) CRACKS.push(buildCrack(ox,oy,(i/14)*Math.PI*2+rnd(-.2,.2),maxDist*rnd(.55,1.1),0));

  function drawCrack(c){
    if(c.drawn<1)return;
    const end=Math.min(Math.floor(c.drawn),c.pts.length-1);
    if(end<1)return;
    ctx.save();
    ctx.shadowColor='#FB3640';ctx.shadowBlur=c.depth===0?12:6;
    ctx.strokeStyle=c.depth===0?'rgba(251,54,64,.5)':'rgba(251,54,64,.25)';
    ctx.lineWidth=c.width*3.5;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();ctx.moveTo(c.pts[0].x,c.pts[0].y);
    for(let i=1;i<=end;i++)ctx.lineTo(c.pts[i].x,c.pts[i].y);
    ctx.stroke();
    ctx.shadowBlur=0;ctx.strokeStyle='#FB3640';ctx.lineWidth=c.width;
    ctx.beginPath();ctx.moveTo(c.pts[0].x,c.pts[0].y);
    for(let i=1;i<=end;i++)ctx.lineTo(c.pts[i].x,c.pts[i].y);
    ctx.stroke();ctx.restore();
    c.branches.forEach(b=>{if(c.drawn>=b.at){b.crack.drawn=Math.max(0,(c.drawn-b.at)*1.2);drawCrack(b.crack);}});
  }

  /* ── RAVENS ──
     Each raven: position, velocity, wing phase (flapping), size, alpha, rotation
     Drawn as a simple bird silhouette: body arc + two bezier wings
  */
  const RAVENS=[];
  for(let i=0;i<12;i++){
    const angle=rnd(0,Math.PI*2);
    const spd=rnd(2.8,5.5);
    RAVENS.push({
      x:ox, y:oy,
      vx:Math.cos(angle)*spd,
      vy:Math.sin(angle)*spd - rnd(.5,2.5), /* bias upward */
      wing:rnd(0,Math.PI*2),
      wingSpd:rnd(.08,.16),
      size:rnd(14,28),
      alpha:0,
      life:0, /* 0→1 */
      delay:rnd(0,18), /* frames before spawning */
      spawned:false
    });
  }

  function drawRaven(r){
    if(r.alpha<=0)return;
    ctx.save();
    ctx.translate(r.x,r.y);
    ctx.rotate(Math.atan2(r.vy,r.vx));
    ctx.globalAlpha=r.alpha;

    const s=r.size;
    const flap=Math.sin(r.wing)*0.5; /* -0.5 to 0.5 */

    /* Body */
    ctx.fillStyle='#1a0000';
    ctx.shadowColor='#FB3640';ctx.shadowBlur=6;
    ctx.beginPath();
    ctx.ellipse(0,0,s*.55,s*.2,0,0,Math.PI*2);
    ctx.fill();

    /* Left wing */
    ctx.beginPath();
    ctx.moveTo(-s*.1,-s*.05);
    ctx.bezierCurveTo(-s*.6,-s*(.5+flap),-s*.9,-s*(.3+flap),-s*.8,s*.1);
    ctx.bezierCurveTo(-s*.5,s*.05,-s*.2,s*.0,-s*.1,-s*.05);
    ctx.fill();

    /* Right wing */
    ctx.beginPath();
    ctx.moveTo(-s*.1,-s*.05);
    ctx.bezierCurveTo(-s*.6, s*(.4+flap),-s*.9, s*(.2+flap),-s*.8,-s*.1);
    ctx.bezierCurveTo(-s*.5,-s*.05,-s*.2,-s*.0,-s*.1,-s*.05);
    ctx.fill();

    /* Head */
    ctx.shadowBlur=0;
    ctx.beginPath();
    ctx.ellipse(s*.45,0,s*.18,s*.15,-.2,0,Math.PI*2);
    ctx.fill();

    /* Beak */
    ctx.strokeStyle='#FB3640';ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(s*.6,-s*.04);ctx.lineTo(s*.82,s*.02);ctx.stroke();

    ctx.restore();
  }

  /* ── WIPE CURTAIN (drawn on top during phase 3) ── */
  let wipeX=0;

  let phase=1, floodAlpha=0, frameCount=0, raf;

  function frame(){
    raf=requestAnimationFrame(frame);
    frameCount++;
    ctx.clearRect(0,0,W,H);

    /* ── PHASE 1: cracks spider out ── */
    if(phase===1){
      ctx.fillStyle='#060002';ctx.fillRect(0,0,W,H);
      let done=true;
      CRACKS.forEach(c=>{
        c.drawn+=c.pts.length/(c.depth===0?32:20);
        if(c.drawn<c.pts.length)done=false;
        drawCrack(c);
      });
      /* Radial glow at origin */
      const g=ctx.createRadialGradient(ox,oy,0,ox,oy,180);
      g.addColorStop(0,'rgba(251,54,64,.22)');g.addColorStop(.5,'rgba(251,54,64,.06)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      /* Ravens emerge during crack phase */
      RAVENS.forEach(r=>{
        if(r.delay>0){r.delay--;return;}
        r.spawned=true;
        r.x+=r.vx; r.y+=r.vy;
        r.vy-=.04; /* gravity drift upward */
        r.vx*=.995;
        r.wing+=r.wingSpd;
        r.life=Math.min(r.life+.04,1);
        r.alpha=r.life<.3?r.life/.3:r.life>.75?(1-r.life)/.25:1;
        r.alpha*=.85;
        drawRaven(r);
      });
      if(done)phase=2;

    /* ── PHASE 2: blood flood ── */
    }else if(phase===2){
      floodAlpha=Math.min(floodAlpha+.04,1);
      ctx.fillStyle='#060002';ctx.fillRect(0,0,W,H);
      CRACKS.forEach(c=>drawCrack(c));
      ctx.fillStyle=`rgba(10,0,2,${floodAlpha})`;ctx.fillRect(0,0,W,H);
      ctx.save();ctx.globalCompositeOperation='lighter';
      CRACKS.forEach(c=>{
        if(c.pts.length<2)return;
        ctx.strokeStyle=`rgba(251,54,64,${floodAlpha*.7})`;
        ctx.lineWidth=c.width*(2+floodAlpha*4);
        ctx.shadowColor='#FB3640';ctx.shadowBlur=20*floodAlpha;
        ctx.beginPath();ctx.moveTo(c.pts[0].x,c.pts[0].y);
        c.pts.forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();
      });
      ctx.restore();
      ctx.fillStyle=`rgba(120,0,10,${floodAlpha*.85})`;ctx.fillRect(0,0,W,H);
      /* Ravens still flying through the flood */
      RAVENS.forEach(r=>{
        if(!r.spawned)return;
        r.x+=r.vx;r.y+=r.vy;r.vy-=.04;r.wing+=r.wingSpd;
        r.life=Math.min(r.life+.025,1);
        r.alpha=(r.life>.8?(1-r.life)/.2:r.life)*0.7;
        drawRaven(r);
      });
      if(floodAlpha>=1)phase=3;

    /* ── PHASE 3: red curtain wipe left→right ── */
    }else if(phase===3){
      ctx.fillStyle='#0A0002';ctx.fillRect(0,0,W,H);
      wipeX=Math.min(wipeX+W/18, W);
      /* Wipe block */
      ctx.fillStyle='#FB3640';
      ctx.fillRect(0,0,wipeX,H);
      /* Leading edge glow */
      if(wipeX<W){
        const eg=ctx.createLinearGradient(wipeX-30,0,wipeX+10,0);
        eg.addColorStop(0,'rgba(251,54,64,0)');
        eg.addColorStop(.6,'rgba(255,80,80,.3)');
        eg.addColorStop(1,'rgba(255,200,200,.7)');
        ctx.fillStyle=eg;ctx.fillRect(wipeX-30,0,40,H);
      }
      /* Ravens silhouetted against the red */
      RAVENS.forEach(r=>{
        if(!r.spawned)return;
        r.x+=r.vx;r.y+=r.vy;r.vy-=.04;r.wing+=r.wingSpd;
        r.alpha=Math.max(r.alpha-.018,0);
        if(r.alpha>0)drawRaven(r);
      });
      if(wipeX>=W){
        cancelAnimationFrame(raf);
        setTimeout(()=>location.href='fighter-team.html',120);
      }
    }
  }
  requestAnimationFrame(frame);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&FTS&&FTS.classList.contains('on')){FTS.classList.remove('on');ftRunning=false;}});
['logo-btn','hero-logo-btn'].forEach(id=>{
  const el=document.getElementById(id);
  if(el){el.addEventListener('click',e=>launchFT(e));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')launchFT();});}
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
