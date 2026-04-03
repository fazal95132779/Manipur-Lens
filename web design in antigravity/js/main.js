document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. CUSTOM CURSOR
  ══════════════════════════════════════ */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  if (cursor) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    });
    (function animFollower() {
      fx += (mx - fx) * 0.14; fy += (my - fy) * 0.14;
      follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
      requestAnimationFrame(animFollower);
    })();
    document.querySelectorAll('a, button, .lb-row, .creator-card, .tilt-card, .cat-pill, .magnetic').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); follower.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); follower.classList.remove('hovering'); });
    });
  }

  /* ══════════════════════════════════════
     2. NAVBAR
  ══════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
  }, { passive: true });
  function updateActiveNav() {
    const ids = ['home', 'gallery', 'about', 'contact'];
    let current = 'home';
    ids.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 150) current = id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }

  /* ══════════════════════════════════════
     3. HAMBURGER
  ══════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); navLinksEl.classList.toggle('open'); });
  navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('open'); navLinksEl.classList.remove('open'); }));

  /* ══════════════════════════════════════
     4. HERO PARALLAX
  ══════════════════════════════════════ */
  const heroImg = document.getElementById('heroImg');
  const heroContent = document.getElementById('heroContent');
  const heroOrbs = document.querySelectorAll('.hero-orb');
  const heroChevron = document.getElementById('heroChevron');
  const hero = document.getElementById('home');
  const layerBg = document.getElementById('layerBg');

  window.addEventListener('scroll', () => {
    const s = window.scrollY; const vh = window.innerHeight;
    if (s > vh) return; const p = s / vh;
    if (heroImg) heroImg.style.transform = `scale(1.08) translateY(${s * 0.28}px)`;
    if (heroContent) { heroContent.style.transform = `translateY(${s * 0.45}px)`; heroContent.style.opacity = 1 - p * 1.8; }
    heroOrbs.forEach((o, i) => o.style.transform = `translateY(${s * (0.1 + i * 0.06)}px)`);
    if (heroChevron) heroChevron.style.opacity = 1 - p * 3;
  }, { passive: true });

  if (hero) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      if (layerBg) layerBg.style.transform = `translate(${dx * 14}px,${dy * 8}px) scale(1.06)`;
      if (heroContent) heroContent.style.transform = `translate(${dx * -8}px,${dy * -5}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      if (layerBg) layerBg.style.transform = '';
      if (heroContent) heroContent.style.transform = '';
    });
  }

  /* ══════════════════════════════════════
     5. PARTICLES
  ══════════════════════════════════════ */
  const pc = document.getElementById('heroParticles');
  if (pc) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div'); p.className = 'particle';
      const size = Math.random() * 5 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;background:${Math.random() > .5 ? 'rgba(245,158,11,0.7)' : 'rgba(232,100,42,0.7)'};left:${Math.random() * 100}%;bottom:-${size}px;animation-duration:${Math.random() * 14 + 9}s;animation-delay:${Math.random() * 18}s;opacity:0;`;
      pc.appendChild(p);
    }
  }

  /* ══════════════════════════════════════
     6. 3D TILT CARDS
  ══════════════════════════════════════ */
  document.querySelectorAll('.tilt-card').forEach(card => {
    const shine = card.querySelector('.card-shine');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transform = `perspective(900px) rotateX(${dy * -12}deg) rotateY(${dx * 14}deg) scale(1.04)`;
      if (shine) shine.style.background = `radial-gradient(circle at ${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'; card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s'; });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease, box-shadow 0.4s'; });
  });

  /* ══════════════════════════════════════
     7. MAGNETIC BUTTONS
  ══════════════════════════════════════ */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.32;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.32;
      btn.style.transform = `translate(${dx}px,${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'; });
    btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform 0.1s ease'; });
  });

  /* ══════════════════════════════════════
     8. SCROLL REVEAL
  ══════════════════════════════════════ */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el => revObs.observe(el));

  /* ══════════════════════════════════════
     9. SCROLL PROGRESS BAR
  ══════════════════════════════════════ */
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#e8642a,#f59e0b);z-index:9999;width:0%;transition:width 0.1s;pointer-events:none;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => { bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%'; }, { passive: true });

  /* ══════════════════════════════════════
     10. SMOOTH SCROLL
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } });
  });

  /* ══════════════════════════════════════
     11. CONTACT FORM
  ══════════════════════════════════════ */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('formSubmit');
  const submitText = document.getElementById('submitText');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
        form.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }], { duration: 400, iterations: 2 }); return;
      }
      submitText.textContent = 'Sending…'; submitBtn.disabled = true;
      setTimeout(() => { form.reset(); submitText.textContent = 'Send Message'; submitBtn.disabled = false; success.classList.add('show'); setTimeout(() => success.classList.remove('show'), 5000); }, 1800);
    });
  }

  /* ══════════════════════════════════════
     12. XP ARENA — STATE
  ══════════════════════════════════════ */
  const STATE = {
    myXp: 380,
    myLevel: 4,
    uploadsToday: 3,
    MAX_UPLOADS: 5,
    likesGiven: new Set(),
    users: [
      { id: 1, name: 'Ima_Queen', initials: 'IQ', color: '#e8642a', xp: 1840, level: 8, uploads: 47, likes: 312 },
      { id: 2, name: 'LokTak_Lens', initials: 'LL', color: '#f59e0b', xp: 1620, level: 7, uploads: 39, likes: 289 },
      { id: 3, name: 'KanglaKing', initials: 'KK', color: '#d4a017', xp: 1380, level: 6, uploads: 34, likes: 241 },
      { id: 4, name: 'ManipurKing', initials: 'MK', color: '#e74c3c', xp: 380, level: 4, uploads: 12, likes: 74, isMe: true },
      { id: 5, name: 'RasLeela_Ru', initials: 'RR', color: '#9b59b6', xp: 1190, level: 6, uploads: 28, likes: 198 },
      { id: 6, name: 'PhakchiRider', initials: 'PR', color: '#1abc9c', xp: 1050, level: 5, uploads: 25, likes: 167 },
      { id: 7, name: 'NagaHills_Cam', initials: 'NH', color: '#3498db', xp: 920, level: 5, uploads: 22, likes: 143 },
      { id: 8, name: 'YaiphabiShots', initials: 'YS', color: '#e67e22', xp: 810, level: 4, uploads: 19, likes: 121 },
      { id: 9, name: 'IrilShutter', initials: 'IS', color: '#27ae60', xp: 740, level: 4, uploads: 17, likes: 108 },
      { id: 10, name: 'ThoubalDreams', initials: 'TD', color: '#8e44ad', xp: 680, level: 4, uploads: 15, likes: 95 },
      { id: 11, name: 'Bishenpur_Eye', initials: 'BE', color: '#2980b9', xp: 590, level: 3, uploads: 13, likes: 80 },
      { id: 12, name: 'UkhulExplorer', initials: 'UE', color: '#c0392b', xp: 510, level: 3, uploads: 11, likes: 68 },
    ],
    posts: [
      { id: 'p1', userId: 1, img: 'assets/images/manipur_loktak_lake_1775070149166.png', likes: 98 },
      { id: 'p2', userId: 2, img: 'assets/images/manipur_ras_leela_dance_1775070166960.png', likes: 84 },
      { id: 'p3', userId: 3, img: 'assets/images/manipur_kangla_fort_1775070218413.png', likes: 76 },
      { id: 'p4', userId: 5, img: 'assets/images/manipur_ima_keithel_1775070185046.png', likes: 71 },
      { id: 'p5', userId: 6, img: 'assets/images/manipur_tribal_festival_1775070235608.png', likes: 63 },
      { id: 'p6', userId: 7, img: 'assets/images/manipur_waterfall_1775070202619.png', likes: 57 },
      { id: 'p7', userId: 8, img: 'assets/images/manipur_tea_garden_1775070255405.png', likes: 49 },
      { id: 'p8', userId: 9, img: 'assets/images/manipur_handloom_1775070270641.png', likes: 44 },
      { id: 'p9', userId: 4, img: 'assets/images/hero.png', likes: 12 },
    ]
  };

  // Sort by XP DESC for leaderboard
  const sorted = [...STATE.users].sort((a, b) => b.xp - a.xp);

  /* ── Render Leaderboard ── */
  function renderLeaderboard(container, limit) {
    container.innerHTML = '';
    sorted.slice(0, limit).forEach((u, i) => {
      const rank = i + 1;
      const medals = ['🥇', '🥈', '🥉'];
      const topClass = rank <= 3 ? `top-${rank}` : '';
      const meClass = u.isMe ? 'is-you' : '';
      const row = document.createElement('div');
      row.className = `lb-row ${topClass} ${meClass}`;
      row.innerHTML = `
        <div class="lb-rank">${rank <= 3 ? medals[rank - 1] : rank}</div>
        <div class="lb-av" style="background:${u.color}">${u.initials}</div>
        <div class="lb-info">
          <div class="lb-name">${u.name}${u.isMe ? '<span class="lb-you-tag">YOU</span>' : ''}</div>
          <div class="lb-sub">Lv.${u.level} · ${u.uploads} uploads · ${u.likes} ♥</div>
        </div>
        <div class="lb-xp">${u.xp.toLocaleString()} XP</div>`;
      container.appendChild(row);
    });
  }

  const lbList = document.getElementById('leaderboardList');
  const flbList = document.getElementById('flbList');
  if (lbList) renderLeaderboard(lbList, 10);
  if (flbList) renderLeaderboard(flbList, sorted.length);

  /* ── Render Creators Grid ── */
  function renderCreators() {
    const grid = document.getElementById('creatorsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    // Sort posts by likes, top 9
    const topPosts = [...STATE.posts].sort((a, b) => b.likes - a.likes).slice(0, 9);
    topPosts.forEach(post => {
      const user = STATE.users.find(u => u.id === post.userId);
      const card = document.createElement('div');
      card.className = 'creator-card';
      const liked = STATE.likesGiven.has(post.id);
      card.innerHTML = `
        <img src="${post.img}" alt="${user?.name}" loading="lazy" />
        <div class="creator-card-shine"></div>
        <div class="creator-card-overlay">
          <div class="creator-card-name">@${user?.name || 'Unknown'}</div>
          <div class="creator-like-row">
            <div class="like-count">♥ <span class="lc-num">${post.likes}</span></div>
            <button class="like-btn${liked ? ' liked' : ''}" data-post="${post.id}" data-owner="${post.userId}" title="Like">
              ${liked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>`;
      // 3D tilt + shine
      const shine = card.querySelector('.creator-card-shine');
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        card.style.transform = `perspective(600px) rotateX(${dy * -10}deg) rotateY(${dx * 12}deg) scale(1.05)`;
        card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(232,100,42,0.18)`;
        shine.style.opacity = '1';
        shine.style.background = `radial-gradient(circle at ${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = ''; card.style.boxShadow = ''; shine.style.opacity = '0';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s';
      });
      card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease, box-shadow 0.3s'; });
      grid.appendChild(card);
    });
  }
  renderCreators();

  /* ── Like Logic ── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.like-btn');
    if (!btn) return;
    const postId = btn.dataset.post;
    const ownerId = parseInt(btn.dataset.owner);
    const myUserId = 4; // ManipurKing = id 4
    if (ownerId === myUserId) { showFloatXP(e.clientX, e.clientY, '🚫 No self-like'); return; }
    if (STATE.likesGiven.has(postId)) return;
    STATE.likesGiven.add(postId);
    const post = STATE.posts.find(p => p.id === postId);
    if (post) post.likes++;
    // Update owner XP
    const owner = STATE.users.find(u => u.id === ownerId);
    if (owner) owner.xp += 5;
    // Animate
    btn.classList.add('liked'); btn.textContent = '❤️';
    const lcNum = btn.closest('.creator-like-row').querySelector('.lc-num');
    if (lcNum) lcNum.textContent = post.likes;
    showFloatXP(e.clientX, e.clientY, '+5 XP');
    STATE.myXp += 1; // tiny reward for giving a like
    document.getElementById('likeCount').textContent = STATE.likesGiven.size;
    if (lbList) renderLeaderboard(lbList, 10);
    if (flbList) renderLeaderboard(flbList, sorted.length);
  });

  /* ── Floating XP animation ── */
  function showFloatXP(x, y, text) {
    const el = document.createElement('div');
    el.className = 'xp-float-anim';
    el.textContent = text;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }

  /* ── Upload Logic ── */
  const fileInput = document.getElementById('fileInput');
  const limitMsg = document.getElementById('uploadLimitMsg');
  const successMsg = document.getElementById('uploadSuccessMsg');
  const ucDots = document.getElementById('ucDots');
  const ucText = document.getElementById('ucText');
  const xpBarFill = document.getElementById('xpBarFill');
  const xpVal = document.getElementById('xpVal');
  const xpTotal = document.getElementById('xpTotal');
  const uploadCountEl = document.getElementById('uploadCount');
  const uploadZoneInner = document.getElementById('uploadDrop');

  // Drag & drop
  if (uploadZoneInner) {
    uploadZoneInner.addEventListener('dragover', e => { e.preventDefault(); uploadZoneInner.classList.add('dragover'); });
    uploadZoneInner.addEventListener('dragleave', () => uploadZoneInner.classList.remove('dragover'));
    uploadZoneInner.addEventListener('drop', e => { e.preventDefault(); uploadZoneInner.classList.remove('dragover'); handleUpload(e.dataTransfer.files[0]); });
  }
  if (fileInput) fileInput.addEventListener('change', e => handleUpload(e.target.files[0]));

  function handleUpload(file) {
    if (!file) return;
    if (STATE.uploadsToday >= STATE.MAX_UPLOADS) { limitMsg.classList.add('show'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('File too large! Max 5MB.'); return; }
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) { alert('Invalid format. Use JPG, PNG or WEBP.'); return; }

    STATE.uploadsToday++;
    STATE.myXp += 20;
    uploadCountEl.textContent = STATE.uploadsToday;
    xpTotal.textContent = STATE.myXp;

    // Update dots
    const dots = ucDots.querySelectorAll('.uc-dot');
    dots.forEach((d, i) => d.classList.toggle('filled', i < STATE.uploadsToday));
    ucText.innerHTML = `Uploads today: <strong>${STATE.uploadsToday} / 5</strong>`;

    // XP bar animation
    const pct = Math.min((STATE.myXp % 500) / 500 * 100, 100);
    xpBarFill.style.width = pct + '%';
    xpVal.textContent = `${STATE.myXp} / ${Math.ceil(STATE.myXp / 500) * 500} XP`;

    if (STATE.uploadsToday >= STATE.MAX_UPLOADS) limitMsg.classList.add('show');

    // Add preview to creators grid
    const url = URL.createObjectURL(file);
    STATE.posts.unshift({ id: 'new_' + Date.now(), userId: 4, img: url, likes: 0 });
    renderCreators();

    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 4000);
    showFloatXP(window.innerWidth / 2, window.innerHeight / 2, '+20 XP');
    if (fileInput) fileInput.value = '';
  }

  /* ── Full Leaderboard Modal ── */
  const modal = document.getElementById('fullLbModal');
  const viewAllBtn = document.getElementById('viewAllBtn');
  const flbClose = document.getElementById('flbClose');
  const flbBackdrop = document.getElementById('flbBackdrop');
  if (viewAllBtn) viewAllBtn.addEventListener('click', () => { modal.classList.add('open'); document.body.style.overflow = 'hidden'; });
  if (flbClose) flbClose.addEventListener('click', closeModal);
  if (flbBackdrop) flbBackdrop.addEventListener('click', closeModal);
  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });


  /* ══════════════════════════════════════
     13. AUTH TABS + FORMS
  ══════════════════════════════════════ */
  const tabSignIn  = document.getElementById('tabSignIn');
  const tabSignUp  = document.getElementById('tabSignUp');
  const panelSignIn = document.getElementById('panelSignIn');
  const panelSignUp = document.getElementById('panelSignUp');
  const indicator  = document.getElementById('authTabIndicator');

  function switchAuthTab(tab) {
    if (tab === 'signin') {
      tabSignIn.classList.add('active'); tabSignUp.classList.remove('active');
      panelSignIn.classList.add('active'); panelSignUp.classList.remove('active');
      if (indicator) indicator.style.left = '0%';
    } else {
      tabSignUp.classList.add('active'); tabSignIn.classList.remove('active');
      panelSignUp.classList.add('active'); panelSignIn.classList.remove('active');
      if (indicator) indicator.style.left = '50%';
    }
  }
  if (tabSignIn) tabSignIn.addEventListener('click', () => switchAuthTab('signin'));
  if (tabSignUp) tabSignUp.addEventListener('click', () => switchAuthTab('signup'));

  // Show/hide password
  function togglePass(inputId, btnId) {
    const inp = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!inp || !btn) return;
    btn.addEventListener('click', () => {
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      btn.textContent = show ? '🙈' : '👁';
    });
  }
  togglePass('siPass', 'siPassToggle');
  togglePass('suPass', 'suPassToggle');

  // Password strength meter
  const suPassInput = document.getElementById('suPass');
  const psBar = document.getElementById('psBar');
  const psLabel = document.getElementById('psLabel');
  if (suPassInput) {
    suPassInput.addEventListener('input', () => {
      const v = suPassInput.value;
      let score = 0;
      if (v.length >= 8)  score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      const pct = score * 25;
      const colors = ['#ef4444','#f97316','#eab308','#22c55e'];
      const labels = ['Too weak','Fair','Good','Strong'];
      if (psBar) { psBar.style.width = pct + '%'; psBar.style.background = colors[score-1] || '#ef4444'; }
      if (psLabel) psLabel.textContent = v.length ? labels[score-1] || 'Too weak' : '';
    });
  }

  // Sign In submit
  const signinForm = document.getElementById('panelSignIn');
  if (signinForm) {
    signinForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('siEmail')?.value.trim();
      const pass  = document.getElementById('siPass')?.value;
      if (!email || !pass) return;
      const btn = document.getElementById('signinBtn');
      if (btn) { btn.querySelector('span').textContent = 'Signing in…'; btn.disabled = true; }
      setTimeout(() => {
        if (btn) { btn.querySelector('span').textContent = 'Sign In'; btn.disabled = false; }
        const s = document.getElementById('siSuccess');
        if (s) { s.classList.add('show'); setTimeout(() => s.classList.remove('show'), 5000); }
      }, 1500);
    });
  }

  // Sign Up submit
  const signupForm = document.getElementById('panelSignUp');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const name  = document.getElementById('suName')?.value.trim();
      const email = document.getElementById('suEmail')?.value.trim();
      const pass  = document.getElementById('suPass')?.value;
      const agree = document.getElementById('agreeTerms')?.checked;
      if (!name || !email || !pass || !agree) return;
      const btn = document.getElementById('signupBtn');
      if (btn) { btn.querySelector('span').textContent = 'Creating account…'; btn.disabled = true; }
      setTimeout(() => {
        if (btn) { btn.querySelector('span').textContent = 'Create Account & Earn XP'; btn.disabled = false; }
        const s = document.getElementById('suSuccess');
        if (s) { s.classList.add('show'); setTimeout(() => s.classList.remove('show'), 6000); }
        showFloatXP(window.innerWidth/2 + 200, window.innerHeight/2, '+50 XP 🎉');
      }, 1800);
    });
  }
});
