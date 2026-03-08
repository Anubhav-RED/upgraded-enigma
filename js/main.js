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
const FORM=document.getElementById('trial-form');
if(FORM){
  FORM.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=FORM.querySelector('.fsub');
    btn.textContent='◆ SUBMITTED — WE\'LL BE IN TOUCH';
    btn.style.background='#16a34a';
    setTimeout(()=>{btn.textContent='BOOK FREE TRIAL →';btn.style.background='';FORM.reset();},4200);
  });
}

})();
