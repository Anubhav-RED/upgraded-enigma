/* ============================================
   REDCROWN MMA — MAIN.JS v2
   ============================================ */
(function () {

  /* ── SONAR ── */
  function initSonar(canvasId, alpha) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w, h, angle = 0, dots = [];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function tick() {
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2, cy = h / 2;
      var maxR = Math.min(w, h) * 0.44;

      // Rings
      for (var i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR / 5) * i, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(251,54,64,0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // Cross
      ctx.strokeStyle = 'rgba(251,54,64,0.05)';
      ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke();

      // Sweep
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      var g = ctx.createLinearGradient(0, 0, maxR, 0);
      g.addColorStop(0, 'rgba(251,54,64,0.32)');
      g.addColorStop(0.6, 'rgba(251,54,64,0.08)');
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, -0.45, 0.12);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();

      // Spawn dots
      if (Math.random() > 0.91) {
        var r = 60 + Math.random() * (maxR - 60);
        var a = angle + (Math.random() - 0.5) * 0.5;
        dots.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, life: 1, dec: 0.007 + Math.random() * 0.005 });
      }
      for (var j = dots.length - 1; j >= 0; j--) {
        dots[j].life -= dots[j].dec;
        if (dots[j].life <= 0) { dots.splice(j, 1); continue; }
        ctx.beginPath();
        ctx.arc(dots[j].x, dots[j].y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251,54,64,' + (dots[j].life * alpha) + ')';
        ctx.fill();
      }
      angle += 0.013;
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ── EMBERS ── */
  function initEmbers() {
    var container = document.getElementById('embers');
    if (!container) return;
    for (var i = 0; i < 22; i++) {
      var e = document.createElement('div');
      e.className = 'ember';
      var size = 1.5 + Math.random() * 2.5;
      e.style.cssText = [
        'left:' + (Math.random() * 100) + '%',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'animation-duration:' + (7 + Math.random() * 10) + 's',
        'animation-delay:' + (Math.random() * 10) + 's',
        'opacity:0'
      ].join(';');
      container.appendChild(e);
    }
  }

  /* ── TAPE PARALLAX ── */
  function initTapeParallax() {
    var layer = document.getElementById('tape-layer');
    if (!layer) return;
    var tape1 = layer.querySelector('.tape-1');
    var tape2 = layer.querySelector('.tape-2');
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (tape1) tape1.style.transform = 'rotate(-1.8deg) translateY(' + (y * 0.18) + 'px)';
      if (tape2) tape2.style.transform = 'rotate(1.5deg) translateY(' + (y * -0.12) + 'px)';
      lastY = y;
    }, { passive: true });
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── NAVBAR ── */
  function initNav() {
    var nav = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var links = document.getElementById('nav-links');

    if (nav) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
          nav.style.borderBottomColor = 'rgba(251,54,64,0.3)';
          nav.style.background = 'rgba(0,15,8,0.95)';
        } else {
          nav.style.borderBottomColor = 'rgba(251,54,64,0.18)';
          nav.style.background = 'rgba(0,15,8,0.85)';
        }
      }, { passive: true });
    }

    if (hamburger && links) {
      hamburger.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        var spans = hamburger.querySelectorAll('span');
        if (open) {
          spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
          spans[0].style.transform = spans[1].style.opacity = spans[2].style.transform = '';
          spans[1].style.opacity = '1';
        }
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          hamburger.querySelectorAll('span').forEach(function (s) { s.style.transform = ''; s.style.opacity = '1'; });
        });
      });
    }
  }

  /* ── NAV LOGO → FIGHTER PAGE ── */
  function initFighterPage() {
    var logoLink = document.getElementById('nav-logo-link');
    var fighterPage = document.getElementById('fighter-page');
    var fighterBack = document.getElementById('fighter-back');
    var fighterWL = document.getElementById('fighter-waitlist-btn');

    if (logoLink && fighterPage) {
      logoLink.addEventListener('click', function (e) {
        e.preventDefault();
        fighterPage.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        initSonar('fighter-sonar', 0.85);
      });
    }

    function closeFighter() {
      if (fighterPage) {
        fighterPage.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    if (fighterBack) fighterBack.addEventListener('click', closeFighter);

    if (fighterWL) {
      fighterWL.addEventListener('click', function (e) {
        e.preventDefault();
        closeFighter();
        setTimeout(function () {
          var wl = document.getElementById('waitlist');
          if (wl) wl.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    }
  }

  /* ── ACTIVE NAV LINK ── */
  function setActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href').split('/').pop();
      a.classList.toggle('active', href === page);
    });
  }

  /* ── FLOATING BUTTONS — scroll-aware ── */
  function initFloating() {
    var btns = document.getElementById('floating-btns');
    if (!btns) return;
    // Already visible, just ensure it stays above everything
    btns.style.opacity = '0';
    setTimeout(function () {
      btns.style.transition = 'opacity 0.6s ease';
      btns.style.opacity = '1';
    }, 1200);
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', function () {
    initSonar('sonar-canvas', 0.9);
    initEmbers();
    initTapeParallax();
    initReveal();
    initNav();
    initFighterPage();
    setActiveNav();
    initFloating();
  });

})();

/* Inner page logo → navigate to fighter page on homepage */
(function () {
  var isInnerPage = window.location.pathname.includes('/pages/');
  if (!isInnerPage) return;
  var logoLink = document.getElementById('nav-logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '../index.html?sanctum=1';
    });
  }
})();

/* Auto-open fighter page if ?sanctum=1 */
(function () {
  if (window.location.search.includes('sanctum=1')) {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () {
        var fp = document.getElementById('fighter-page');
        if (fp) {
          fp.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      }, 500);
    });
  }
})();
