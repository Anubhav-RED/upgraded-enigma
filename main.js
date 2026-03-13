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
const FTS=document.getElementById('fts'), FTTERM=document.getElementById('fts-t'), FTBAR=document.getElementById('fts-b'), FTSTAT=document.getElementById('fts-s');
const LINES=['INITIATING SECURE HANDSHAKE...','SCANNING BIOMETRICS...','VERIFYING CLEARANCE LEVEL...','','> IDENTITY CONFIRMED.','> CLEARANCE: LEVEL ██ RESTRICTED','> DOSSIER: RED CROWN FIGHT TEAM','','DECRYPTING MANIFEST...','LOADING CLASSIFIED FILES...','','◆ ACCESS GRANTED. WELCOME, HUNTER.'];
let ftRunning=false;

function launchFT(){
  if(ftRunning||!FTS) return;
  ftRunning=true; FTS.classList.add('on');
  FTTERM.innerHTML='<span class="ftc"></span>';
  FTBAR.style.width='0%'; FTSTAT.textContent='INITIATING...';
  let pct=0;
  const bi=setInterval(()=>{pct=Math.min(pct+1.2,100);FTBAR.style.width=pct+'%';if(pct>=100)clearInterval(bi);},35);
  let li=0;
  function nextLine(){
    if(li>=LINES.length){
      FTSTAT.textContent='ACCESS GRANTED';
      setTimeout(()=>{FTS.classList.remove('on');ftRunning=false;WIPE.className='in';setTimeout(()=>location.href='fighter-team.html',440);},900);
      return;
    }
    const line=LINES[li++];
    if(line===''){FTTERM.innerHTML=FTTERM.innerHTML.replace(/<span class="ftc"><\/span>$/,'')+'\n<span class="ftc"></span>';setTimeout(nextLine,120);return;}
    let i=0;
    const existing=FTTERM.innerHTML.replace(/<span class="ftc"><\/span>$/,'');
    (function typeChar(){
      if(i<=line.length){FTTERM.innerHTML=existing+line.slice(0,i)+'<span class="ftc"></span>';i++;setTimeout(typeChar,20+Math.random()*22);}
      else{FTTERM.innerHTML=FTTERM.innerHTML.replace(/<span class="ftc"><\/span>$/,'')+'\n';setTimeout(nextLine,line.includes('◆')?700:140);}
    })();
  }
  setTimeout(nextLine,300);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&FTS&&FTS.classList.contains('on')){FTS.classList.remove('on');ftRunning=false;}});
['logo-btn','hero-logo-btn'].forEach(id=>{
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
