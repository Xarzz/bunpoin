import { levels } from './data.js';

// ===== TTS (Text-to-Speech) =====
window.speakJP = function(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = 0.85;
  u.pitch = 1;
  speechSynthesis.speak(u);
};

// ===== CONFETTI =====
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#f43f5e','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899'];
  const particles = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 8 + 4,
    h: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    vy: Math.random() * 3 + 2,
    vx: (Math.random() - 0.5) * 2,
    rot: Math.random() * 360,
    rv: (Math.random() - 0.5) * 10
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.rv;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

// ===== LOCAL STORAGE PROGRESS =====
function getProgress() {
  try { return JSON.parse(localStorage.getItem('bunpoin_progress') || '{}'); } catch { return {}; }
}
function saveProgress(data) {
  const p = getProgress();
  Object.assign(p, data);
  // Update streak
  const today = new Date().toDateString();
  if (p.lastStudy !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    p.streak = (p.lastStudy === yesterday) ? (p.streak || 0) + 1 : 1;
    p.lastStudy = today;
  }
  localStorage.setItem('bunpoin_progress', JSON.stringify(p));
}
function recordQuizDone(skill, sessionIdx, score, total) {
  const p = getProgress();
  if (!p.quizzes) p.quizzes = [];
  p.quizzes.push({ skill, sessionIdx, score, total, pct: Math.round(score/total*100), date: new Date().toISOString() });
  p.totalQuizzes = (p.totalQuizzes || 0) + 1;
  saveProgress(p);
}

// ===== DARK MODE =====
function initDarkMode() {
  const saved = localStorage.getItem('bunpoin_dark');
  if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
}
window.toggleDarkMode = function() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('bunpoin_dark', isDark);
  // Update meta theme-color
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#0f172a' : '#f43f5e';
};
initDarkMode();

// ===== FLASHCARD MODE =====
window.openFlashcards = function(levelId) {
  const l = levels[levelId];
  if (!l || !l.vocabSessions) return;
  const allWords = l.vocabSessions.flatMap(s => s.items);
  const shuffled = allWords.sort(() => Math.random() - 0.5).slice(0, 20);
  let idx = 0;
  let flipped = false;

  function renderCard() {
    const w = shuffled[idx];
    app.innerHTML = `
      <div class="flashcard-page">
        <div class="flashcard-header">
          <button class="btn btn-outline" onclick="location.hash='#/${levelId}/vocab'" style="font-size:0.85rem;">← Kembali</button>
          <span class="flashcard-counter">${idx + 1} / ${shuffled.length}</span>
        </div>
        <div class="flashcard-container" onclick="window.__flipCard()">
          <div class="flashcard ${flipped ? 'flipped' : ''}">
            <div class="flashcard-front">
              <div class="flashcard-jp">${w.jp}</div>
              <div class="flashcard-hint">Tap untuk lihat arti</div>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-meaning">${w.id}</div>
              <div class="flashcard-romaji">${w.ro}</div>
              <button class="flashcard-speak" onclick="event.stopPropagation(); speakJP('${w.jp.replace(/'/g, "\\\\'")}')">🔊</button>
            </div>
          </div>
        </div>
        <div class="flashcard-actions">
          <button class="btn btn-outline" onclick="window.__prevCard()" ${idx === 0 ? 'disabled' : ''}>← Sebelumnya</button>
          <button class="btn btn-primary" onclick="window.__nextCard()">${idx < shuffled.length - 1 ? 'Selanjutnya →' : '🎉 Selesai!'}</button>
        </div>
        <div class="flashcard-progress-bar">
          <div class="flashcard-progress-fill" style="width:${((idx + 1) / shuffled.length) * 100}%"></div>
        </div>
      </div>
    `;
  }

  window.__flipCard = () => { flipped = !flipped; renderCard(); };
  window.__nextCard = () => {
    if (idx < shuffled.length - 1) { idx++; flipped = false; renderCard(); }
    else { navigate(`#/${levelId}/vocab`); }
  };
  window.__prevCard = () => {
    if (idx > 0) { idx--; flipped = false; renderCard(); }
  };

  renderCard();
};

// Simple hash router
let currentRoute = '';
const app = document.getElementById('app');

function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  return window.location.hash.slice(1) || '/';
}

window.addEventListener('hashchange', () => render());
window.addEventListener('DOMContentLoaded', () => {
  render();
  
  // Initialize Modal Listeners
  const kanjiModal = document.getElementById('kanji-modal');
  const closeKanjiModal = document.getElementById('close-kanji-modal');

  if (closeKanjiModal) {
    closeKanjiModal.addEventListener('click', () => {
      kanjiModal.classList.remove('active');
    });
  }
  
  if (kanjiModal) {
    kanjiModal.addEventListener('click', (e) => {
      if (e.target === kanjiModal) kanjiModal.classList.remove('active');
    });
  }

  const sessionModal = document.getElementById('session-modal');
  const closeSessionModal = document.getElementById('close-session-modal');

  if (closeSessionModal) {
    closeSessionModal.addEventListener('click', () => {
      sessionModal.classList.remove('active');
    });
  }
  
  if (sessionModal) {
    sessionModal.addEventListener('click', (e) => {
      if (e.target === sessionModal) sessionModal.classList.remove('active');
    });
  }
});

// ===== RENDER =====
function render() {
  currentRoute = getRoute();
  const [page, ...params] = currentRoute.split('/').filter(Boolean);

  if (page === 'learn') {
    renderLearnPage();
  } else if (page === 'tryout') {
    renderTryoutPage();
  } else if (page === 'profile') {
    renderProfilePage();
  } else if (page && levels[page]) {
    renderLevelPage(page, params[0] || (page === 'kana' ? 'hiragana' : 'kanji'));
  } else {
    renderHome();
  }
  updateBottomNav();
  window.scrollTo(0, 0);
}

function updateBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  const [page] = currentRoute.split('/').filter(Boolean);
  nav.querySelectorAll('.bottom-nav-item').forEach(btn => {
    const tab = btn.dataset.tab;
    btn.classList.toggle('active',
      (!page && tab === 'home') ||
      (page === 'learn' && tab === 'learn') ||
      (page === 'tryout' && tab === 'tryout') ||
      (page === 'profile' && tab === 'profile') ||
      (page && levels[page] && tab === 'tryout')
    );
  });
}

// ===== NAVBAR =====
function navbar(activeLevel) {
  return `
  <nav class="navbar">
    <div class="nav-logo" onclick="location.hash='#/'">Bunpoin</div>
    <div class="nav-links">
      <a onclick="location.hash='#/'" class="${!activeLevel ? 'active' : ''}">Home</a>
      ${Object.values(levels).map(l =>
        `<a onclick="location.hash='#/${l.id}'" class="${activeLevel === l.id ? 'active' : ''}" style="${activeLevel === l.id ? `color:${l.color}` : ''}">${l.label}</a>`
      ).join('')}
    </div>
    <button class="nav-mobile-btn" onclick="document.querySelector('.mobile-menu').classList.toggle('open')">☰</button>
  </nav>
  <div class="mobile-menu">
    <a onclick="location.hash='#/';document.querySelector('.mobile-menu').classList.remove('open')">Home</a>
    ${Object.values(levels).map(l =>
      `<a onclick="location.hash='#/${l.id}';document.querySelector('.mobile-menu').classList.remove('open')" style="color:${l.color}">${l.label}</a>`
    ).join('')}
    <a onclick="document.querySelector('.mobile-menu').classList.remove('open')" style="color:var(--text-muted)">✕ Close</a>
  </div>`;
}

// ===== HOME PAGE =====
function renderHome() {
  const kanjiList = ['日','本','語','学','力','試','験','読','書','聞','話','文'];
  app.innerHTML = `
  ${navbar(null)}
  <section class="hero">
    ${kanjiList.map((k, i) => `<span class="floating-kanji" style="top:${10 + Math.random() * 70}%;left:${5 + Math.random() * 85}%;animation-delay:${i * 1.5}s;font-size:${2 + Math.random() * 4}rem">${k}</span>`).join('')}
    <div class="hero-badge">🎌 日本語能力試験 対策</div>
    <h1>Kuasai JLPT dengan<br><span class="gradient-text">Bunpoin</span></h1>
    <p class="hero-sub">Aplikasi belajar bahasa Jepang interaktif untuk persiapan JLPT N5 hingga N1. Latihan Kanji, Grammar, Reading, Listening, dan Writing.</p>
    <div class="hero-cta">
      <button class="btn btn-primary" onclick="document.getElementById('levels').scrollIntoView({behavior:'smooth'})">Mulai Belajar 🚀</button>
      <button class="btn btn-outline" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">Fitur Lengkap</button>
    </div>
  </section>

  <section class="section" id="levels">
    <div class="section-header">
      <h2>Pilih Level JLPT</h2>
      <p>Dari pemula hingga mahir, pilih level yang sesuai dengan kemampuanmu.</p>
    </div>
    <div class="levels-grid">
      ${Object.values(levels).map((l, i) => `
        <div class="level-card fade-in fade-in-delay-${i % 4}" style="--card-accent:${l.color};--card-accent-bg:${l.color}15" onclick="location.hash='#/${l.id}'">
          <div class="level-badge">${l.label}</div>
          <h3>${l.title}</h3>
          <p>${l.desc}</p>
          <span class="level-tag">Kanji ${l.kanjiCount} • Grammar ${l.grammarCount}</span>
        </div>
      `).join('')}
    </div>
  </section>

  <section class="section" id="features">
    <div class="section-header">
      <h2>Fitur Pembelajaran</h2>
      <p>Semua yang kamu butuhkan untuk lulus JLPT.</p>
    </div>
    <div class="features-grid">
      ${[
        {icon:'漢',title:'Kanji Study',desc:'Pelajari kanji sesuai level JLPT dengan on\'yomi, kun\'yomi, dan artinya.'},
        {icon:'文',title:'Grammar / Bunpo',desc:'Pola kalimat penting dilengkapi contoh dan terjemahan.'},
        {icon:'📖',title:'Reading / Dokkai',desc:'Latihan membaca teks Jepang sesuai level dengan pertanyaan pemahaman.'},
        {icon:'🎧',title:'Listening / Choukai',desc:'Simulasi tes listening dengan teks dan pertanyaan.'},
        {icon:'✍️',title:'Writing / Sakubun',desc:'Latihan menulis kalimat Jepang dengan hint dan jawaban.'},
        {icon:'📝',title:'Quiz & Test',desc:'Tes pengetahuan dengan soal kanji, grammar, dan vocabulary.'},
      ].map(f => `
        <div class="feature-card">
          <div class="feature-icon">${f.icon}</div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <footer class="footer">
    <p>Bunpoin © 2026 — がんばって！ Built for JLPT learners everywhere.</p>
  </footer>`;
}

// ===== LEVEL PAGE =====
function renderLevelPage(levelId, activeSkill) {
  const l = levels[levelId];
  if (!l) return renderHome();

  app.innerHTML = `
  ${navbar(levelId)}
  <div class="level-hero" style="--level-glow:${l.color}20;--card-accent:${l.color};--card-accent-bg:${l.color}15">
    <button class="back-btn" onclick="location.hash='#/'">← Kembali ke Home</button>
    <div class="level-badge-lg" style="--card-accent:${l.color};--card-accent-bg:${l.color}15">${l.label}</div>
    <h1>JLPT ${l.label} — ${l.title}</h1>
    <p>${l.desc}</p>
    <div class="stats-bar">
      ${levelId === 'kana' ? `
        <div class="stat-item"><div class="stat-value" style="color:${l.color}">104</div><div class="stat-label">Hiragana</div></div>
        <div class="stat-item"><div class="stat-value" style="color:${l.color}">104</div><div class="stat-label">Katakana</div></div>
      ` : `
        <div class="stat-item"><div class="stat-value" style="color:${l.color}">${l.kanjiCount}</div><div class="stat-label">Kanji</div></div>
        <div class="stat-item"><div class="stat-value" style="color:${l.color}">${l.grammarCount || l.grammar.length}</div><div class="stat-label">Grammar</div></div>
        <div class="stat-item"><div class="stat-value" style="color:${l.color}">${l.vocabSessions ? l.vocabSessions.reduce((a,s) => a + s.items.length, 0) : l.vocabCount}</div><div class="stat-label">Vocabulary</div></div>
      `}
    </div>
  </div>

  <div class="section" style="--card-accent:${l.color};--card-accent-bg:${l.color}15">
    <div class="skill-tabs">
      ${levelId === 'kana' ? 
        ['hiragana', 'katakana'].map(s => `<button class="skill-tab ${activeSkill === s ? 'active' : ''}" onclick="location.hash='#/${levelId}/${s}'">${s === 'hiragana' ? 'あ Hiragana' : 'ア Katakana'}</button>`).join('') :
        ['kanji','vocab','grammar','quiz','reading','listening','writing'].map(s =>
          `<button class="skill-tab ${activeSkill === s ? 'active' : ''}" onclick="location.hash='#/${levelId}/${s}'">${s === 'kanji' ? '漢字 Kanji' : s === 'vocab' ? '📚 Vocab' : s === 'grammar' ? '文法 Grammar' : s === 'quiz' ? '📝 Quiz' : s === 'reading' ? '📖 Reading' : s === 'listening' ? '🎧 Listening' : '✍️ Writing'}</button>`
        ).join('')}
    </div>
    <div class="skill-content" id="skill-content"></div>
  </div>

  <footer class="footer"><p>Bunpoin © 2026 — がんばって！</p></footer>`;

  setTimeout(() => {
    const contentEl = document.getElementById('skill-content');
    renderSkillContent(contentEl, levelId, activeSkill);
  }, 0);
}

function renderSkillContent(el, levelId, skill) {
  const l = levels[levelId];
  if (!el) return;
  window.__currentLevel = l;

  if (levelId === 'kana') {
    renderKana(el, l, skill);
    return;
  }

  switch (skill) {
    case 'kanji': renderKanji(el, l); break;
    case 'vocab': renderVocab(el, l); break;
    case 'grammar': renderGrammar(el, l); break;
    case 'quiz': renderQuiz(el, l); break;
    case 'reading': renderReading(el, l); break;
    case 'listening': renderListening(el, l); break;
    case 'writing': renderWriting(el, l); break;
    default: renderKanji(el, l);
  }
}

function renderKana(el, l, skill) {
  const sessions = skill === 'hiragana' ? l.hiraganaSessions : l.katakanaSessions;
  const allItems = sessions.reduce((acc, s) => acc.concat(s.items), []);
  
  // Pola jumlah huruf per baris dalam tabel standar Kana:
  // Seion: a-o(5), k(5), s(5), t(5), n(5), h(5), m(5), y(3), r(5), w-n(3)
  // Dakuon: g(5), z(5), d(5), b(5)
  // Handakuon: p(5)
  // Yoon: kya(3), sha(3), cha(3), nya(3), hya(3), mya(3), rya(3), gya(3), ja(3), bya(3), pya(3)
  const KANA_LAYOUT = [5, 5, 5, 5, 5, 5, 5, 3, 5, 3, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  
  let layoutHtml = '';
  let cursor = 0;
  
  KANA_LAYOUT.forEach((count, rowIndex) => {
    if (cursor >= allItems.length) return;
    const rowItems = allItems.slice(cursor, cursor + count);
    
    // Beri judul setiap kategori untuk memudahkan visual (opsional, tapi memperjelas)
    if (cursor === 0) layoutHtml += `<h3 class="kana-section-title">Seion (Huruf Dasar)</h3>`;
    if (cursor === 46) layoutHtml += `<h3 class="kana-section-title">Dakuon & Handakuon</h3>`;
    if (cursor === 71) layoutHtml += `<h3 class="kana-section-title">Yōon (Huruf Gabungan)</h3>`;
    
    layoutHtml += `<div class="kana-row">`;
    layoutHtml += rowItems.map(k => `
      <div class="kana-char-card">
        <div class="char">${k.char}</div>
        <div class="ro">${k.ro}</div>
      </div>
    `).join('');
    layoutHtml += `</div>`;
    
    cursor += count;
  });

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:16px;">
      <h2 style="margin:0">${skill === 'hiragana' ? 'Hiragana (ひらがな)' : 'Katakana (カタカナ)'}</h2>
      <button class="btn btn-primary" onclick="window.openSessionModal('${skill}')">Pilih Sesi Quiz 🎮</button>
    </div>
    <div class="kana-chart-container">
      ${layoutHtml}
    </div>
  `;
}

function renderKanji(el, l) {
  if (!l.kanjiSessions) {
    l.kanjiSessions = [];
    const chunkSize = 20; 
    for (let i = 0; i < l.kanji.length; i += chunkSize) {
      l.kanjiSessions.push({
        title: 'Sesi Kanji ' + (l.kanjiSessions.length + 1),
        items: l.kanji.slice(i, i + chunkSize),
        startIndex: i 
      });
    }
  }

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
      <h2 style="margin:0">Kanji ${l.label}</h2>
      <button class="btn btn-primary" onclick="window.openSessionModal('kanji')">Pilih Sesi Quiz 🎮</button>
    </div>
    <div class="kanji-grid">
      ${l.kanji.map((k, index) => `
        <div class="kanji-card" onclick="window.openKanjiModalStr('${l.id}', ${index})">
          <span class="kanji-char">${k.char}</span>
          <div class="kanji-reading">音: ${k.on} ・ 訓: ${k.kun}</div>
          <div class="kanji-meaning">${k.meaning}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ===== VOCAB =====
function renderVocab(el, l) {
  if (!l.vocabSessions || l.vocabSessions.length === 0) {
    el.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:40px;">Belum ada data kosakata untuk level ini.</p>`;
    return;
  }

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
      <h2 style="margin:0">Kosakata ${l.label}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-info" onclick="window.openFlashcards('${l.id}')">🃏 Flashcard</button>
        <button class="btn btn-primary" onclick="window.openSessionModal('vocab')">Mulai Drilling Quiz</button>
      </div>
    </div>
    <div class="vocab-topics-grid">
      ${l.vocabSessions.map((session, sIdx) => `
        <div class="vocab-topic-card">
          <div class="vocab-topic-header">
            <h3>${session.title}</h3>
            <span class="vocab-topic-count">${session.items.length} kata</span>
          </div>
          <div class="vocab-items-list">
            ${session.items.map(item => `
              <div class="vocab-item" onclick="speakJP('${item.jp.replace(/'/g, "\\'")}')">  
                <span class="vocab-jp">${item.jp} <span class="tts-btn">🔊</span></span>
                <span class="vocab-ro">${item.ro}</span>
                <span class="vocab-id">${item.id}</span>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-info btn-sm" style="width:100%; margin-top:12px;" onclick="startCustomQuiz('vocab', ${sIdx})">Quiz Topik Ini</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.openSessionModal = function(skill) {
  const l = window.__currentLevel;
  let sessions = [];
  if (skill === 'hiragana') sessions = l.hiraganaSessions;
  else if (skill === 'katakana') sessions = l.katakanaSessions;
  else if (skill === 'kanji') sessions = l.kanjiSessions;
  else if (skill === 'vocab') sessions = l.vocabSessions || [];

  const sessionListEl = document.getElementById('session-list');
  sessionListEl.innerHTML = sessions.map((s, idx) => `
    <button class="session-picker-btn" onclick="document.getElementById('session-modal').classList.remove('active'); startCustomQuiz('${skill}', ${idx});">
      <span>${s.title}</span>
      <span class="item-count">${s.items.length} item</span>
    </button>
  `).join('');

  document.getElementById('session-modal').classList.add('active');
};

window.openKanjiModalStr = (levelId, kanjiIndex) => {
  const kanjiData = levels[levelId].kanji[kanjiIndex];
  
  document.getElementById('modal-kanji-char').textContent = kanjiData.char;
  document.getElementById('modal-kanji-meaning').textContent = kanjiData.meaning;
  document.getElementById('modal-kanji-on').textContent = kanjiData.on !== '-' ? kanjiData.on : 'N/A';
  document.getElementById('modal-kanji-kun').textContent = kanjiData.kun !== '-' ? kanjiData.kun : 'N/A';
  
  const examplesList = document.getElementById('modal-kanji-examples');
  examplesList.innerHTML = '';
  
  if (kanjiData.examples && kanjiData.examples.length > 0) {
    kanjiData.examples.forEach(ex => {
      examplesList.innerHTML += `
        <li>
          <span class="example-reading">${ex.reading}</span>
          <span class="example-word">${ex.word}</span>
          <span class="example-meaning">${ex.meaning}</span>
        </li>
      `;
    });
  } else {
    // Generate placeholder example based on meaning if not found
    examplesList.innerHTML = `
      <li>
        <span class="example-reading">???</span>
        <span class="example-word">${kanjiData.char} + ?</span>
        <span class="example-meaning">Contoh menggunakan kata ${kanjiData.meaning}</span>
      </li>
    `;
  }
  
  const modal = document.getElementById('kanji-modal');
  if(modal) modal.classList.add('active');
};

function renderGrammar(el, l) {
  el.innerHTML = `
    <h2 style="margin-bottom:24px">Grammar ${l.label}</h2>
    <div class="grammar-list">
      ${l.grammar.map(g => `
        <div class="grammar-item">
          <div class="grammar-pattern">${g.pattern}</div>
          <div class="grammar-meaning">${g.meaning}</div>
          <div class="grammar-example">${g.example}<div class="grammar-example-trans">${g.trans}</div></div>
        </div>
      `).join('')}
    </div>`;
}

// Quiz state
let quizState = { current: 0, score: 0, answered: false, questions: [], isCustom: false, skill: null, sessionIdx: null };

function renderQuiz(el, l) {
  quizState = { current: 0, score: 0, answered: false, questions: [...l.quiz].sort(() => Math.random() - 0.5), isCustom: false, skill: 'quiz', sessionIdx: null };
  renderQuizQuestion(el);
}

function renderQuizQuestion(el) {
  const { current, questions, score, isCustom, skill, sessionIdx } = quizState;
  if (current >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    
    let extraButtons = '';
    let retryAction = '';
    
    if (isCustom) {
      retryAction = `startCustomQuiz('${skill}', ${sessionIdx})`;
      
      const l = window.__currentLevel;
      let totalSessions = 0;
      if (skill === 'hiragana') totalSessions = l.hiraganaSessions.length;
      else if (skill === 'katakana') totalSessions = l.katakanaSessions.length;
      else if (skill === 'kanji') totalSessions = l.kanjiSessions.length;
      else if (skill === 'vocab') totalSessions = (l.vocabSessions || []).length;
      
      if (sessionIdx + 1 < totalSessions) {
        extraButtons += `<button class="btn btn-info" onclick="startCustomQuiz('${skill}', ${sessionIdx + 1})">Lanjut Sesi Berikutnya</button>`;
      }
      extraButtons += `<button class="btn btn-outline" onclick="window.openSessionModal('${skill}')">Pilih Sesi Lain</button>`;
      // Button to go back to chart view
      extraButtons += `<button class="btn btn-outline" onclick="renderSkillContent(document.getElementById('skill-content'), '${l.id}', '${skill}')">Kembali ke Daftar</button>`;
    } else {
      retryAction = `renderQuiz(document.getElementById('skill-content'), window.__currentLevel)`;
    }

    // Save progress
    recordQuizDone(skill, sessionIdx, score, questions.length);
    saveProgress({});
    if (pct >= 80) setTimeout(() => launchConfetti(), 300);

    el.innerHTML = `
      <div class="quiz-result">
        <div class="result-score">${pct}%</div>
        <h2>${pct >= 80 ? '素晴らしい！ Amazing!' : pct >= 60 ? 'いいですね！ Good job!' : 'もう少し！ Keep trying!'}</h2>
        <p>Skor: ${score} / ${questions.length}</p>
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:24px; max-width:300px; margin-left:auto; margin-right:auto; align-items:center;">
          <button class="btn ${isCustom ? 'btn-success' : 'btn-primary'}" style="width:100%;" onclick="${retryAction}">Coba Lagi</button>
          ${extraButtons.replace(/<button class="btn/g, '<button class="btn" style="width:100%;"')}
        </div>
      </div>`;
    return;
  }
  const q = questions[current];
  el.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-progress">
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(current / questions.length) * 100}%"></div></div>
        <div class="quiz-progress-text">${current + 1} / ${questions.length}</div>
      </div>
      <div class="quiz-question-card">
        <div class="quiz-type-label">${q.type}</div>
        <div class="quiz-question">${q.q}</div>
      </div>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `
          <button class="quiz-option" id="opt-${i}" onclick="handleAnswer(${i}, ${q.ans})">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span>${o}</span>
          </button>
        `).join('')}
      </div>
    </div>`;
}

window.handleAnswer = function(selected, correct) {
  if (quizState.answered) return;
  quizState.answered = true;

  document.getElementById(`opt-${correct}`).classList.add('correct');
  if (selected !== correct) {
    document.getElementById(`opt-${selected}`).classList.add('wrong');
  } else {
    quizState.score++;
  }

  setTimeout(() => {
    quizState.current++;
    quizState.answered = false;
    renderQuizQuestion(document.getElementById('skill-content'));
  }, 1200);
};

window.startCustomQuiz = function(skill, sessionIdx) {
  const l = window.__currentLevel;
  const isKana = skill === 'hiragana' || skill === 'katakana';
  const isVocab = skill === 'vocab';
  const sessions = isKana 
    ? (skill === 'hiragana' ? l.hiraganaSessions : l.katakanaSessions)
    : isVocab
      ? (l.vocabSessions || [])
      : l.kanjiSessions;

  let sessionData;
  if (isKana) {
    sessionData = skill === 'hiragana' ? l.hiraganaSessions[sessionIdx] : l.katakanaSessions[sessionIdx];
  } else if (isVocab) {
    sessionData = l.vocabSessions[sessionIdx];
  } else {
    sessionData = l.kanjiSessions[sessionIdx];
  }

  const items = sessionData.items;
  const questions = [];
  
  // Generate 10 questions dynamically based on the session items
  if (isKana) {
    for (let i = 0; i < 10; i++) {
      const target = items[Math.floor(Math.random() * items.length)];
      const isRomaji = Math.random() > 0.5;
      
      const qText = isRomaji ? `Apa romaji dari 「${target.char}」?` : `Kana mana yang dibaca "${target.ro}"?`;
      
      // Pick 3 random distractors from the same session
      const distractors = new Set();
      while(distractors.size < 3) {
        const rand = items[Math.floor(Math.random() * items.length)];
        if (rand.char !== target.char) distractors.add(isRomaji ? rand.ro : rand.char);
      }
      
      const opts = Array.from(distractors);
      const correctAns = isRomaji ? target.ro : target.char;
      
      // Insert correct answer at random position
      const ansPos = Math.floor(Math.random() * 4);
      opts.splice(ansPos, 0, correctAns);
      
      questions.push({
        type: skill.toUpperCase() + ' Sesi ' + (sessionIdx + 1),
        q: qText,
        opts: opts,
        ans: ansPos
      });
    }
  } else if (isVocab) {
    // Vocab quiz: tampilkan arti Indonesia, jawab dengan bahasa Jepang
    for (let i = 0; i < Math.min(items.length, 10); i++) {
      const target = items[i];
      
      // Pick 3 random distractors from ALL vocab sessions
      const allVocab = (l.vocabSessions || []).reduce((acc, s) => acc.concat(s.items), []);
      const distractors = new Set();
      while(distractors.size < 3) {
        const rand = allVocab[Math.floor(Math.random() * allVocab.length)];
        if (rand.jp !== target.jp) {
          distractors.add(rand.jp);
        }
      }
      
      const opts = Array.from(distractors);
      const ansPos = Math.floor(Math.random() * 4);
      opts.splice(ansPos, 0, target.jp);
      
      questions.push({
        type: sessions[sessionIdx].title,
        q: `Apa bahasa Jepang dari "${target.id}"?`,
        opts: opts,
        ans: ansPos
      });
    }
    // Shuffle
    questions.sort(() => Math.random() - 0.5);
  } else {
    for (let i = 0; i < 10; i++) {
      // Pick 10 random kanji questions
      const target = items[Math.floor(Math.random() * items.length)];
      // Randomize question type: 0 = meaning, 1 = onyomi, 2 = kunyomi
      const qType = Math.floor(Math.random() * 3);
      
      let qText, correctAns;
      if (qType === 0) {
        qText = `Apa arti dari Kanji 「${target.char}」?`;
        correctAns = target.meaning;
      } else if (qType === 1) {
        qText = `Bagaimana bacaan On'yomi (音) dari 「${target.char}」?`;
        correctAns = target.on;
      } else {
        qText = `Bagaimana bacaan Kun'yomi (訓) dari 「${target.char}」?`;
        correctAns = target.kun;
      }
      
      // If it's empty, fallback to meaning
      if (correctAns === '-') {
        qText = `Apa arti dari Kanji 「${target.char}」?`;
        correctAns = target.meaning;
      }
      
      // Pick 3 random distractors
      const distractors = new Set();
      while(distractors.size < 3) {
        const rand = items[Math.floor(Math.random() * items.length)];
        let wrongOpt = qType === 0 ? rand.meaning : (qType === 1 ? rand.on : rand.kun);
        if (wrongOpt !== '-' && wrongOpt !== correctAns && rand.char !== target.char) {
          distractors.add(wrongOpt);
        }
      }
      
      const opts = Array.from(distractors);
      const ansPos = Math.floor(Math.random() * 4);
      opts.splice(ansPos, 0, correctAns);
      
      questions.push({
        type: 'KANJI Sesi ' + (sessionIdx + 1),
        q: qText,
        opts: opts,
        ans: ansPos
      });
    }
  }
  quizState = { current: 0, score: 0, answered: false, questions: questions, isCustom: true, skill: skill, sessionIdx: sessionIdx };
  // Render over the skill content
  renderQuizQuestion(document.getElementById('skill-content'));
};

function renderReading(el, l) {
  const r = l.reading;
  let html = `
    <h2 style="margin-bottom:24px">Reading Practice</h2>
    <div class="reading-passage">${r.passage}</div>
    <div class="quiz-container">`;
  r.questions.forEach((q, qi) => {
    html += `
      <div class="quiz-question-card" style="margin-bottom:16px">
        <div class="quiz-type-label">Reading Question ${qi + 1}</div>
        <div class="quiz-question" style="font-size:1rem">${q.q}</div>
      </div>
      <div class="quiz-options" style="margin-bottom:24px">
        ${q.opts.map((o, i) => `
          <button class="quiz-option" onclick="this.parentElement.querySelectorAll('.quiz-option').forEach(b=>{b.classList.remove('correct','wrong');b.style.pointerEvents='none'});this.classList.add('${i === q.ans ? 'correct' : 'wrong'}');document.getElementById('ropt-${qi}-${q.ans}')?.classList.add('correct')" id="ropt-${qi}-${i}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${o}</span>
          </button>
        `).join('')}
      </div>`;
  });
  html += '</div>';
  el.innerHTML = html;
}

function renderListening(el, l) {
  const li = l.listening;
  let showScript = false;
  el.innerHTML = `
    <h2 style="margin-bottom:24px">Listening Practice</h2>
    <div class="listening-player">
      <button class="play-btn" onclick="
        const u = new SpeechSynthesisUtterance('${li.text.replace(/'/g, "\\'")}');
        u.lang='ja-JP'; u.rate=0.85;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
      ">▶</button>
      <p style="color:var(--text-secondary);font-size:0.85rem">Klik untuk mendengarkan</p>
      <button class="btn btn-outline btn-sm" style="margin-top:16px" onclick="document.getElementById('listen-script').classList.toggle('show')">Lihat Script</button>
      <div class="listening-text" id="listen-script">${li.text}</div>
    </div>
    <div class="quiz-container">
      ${li.questions.map((q, qi) => `
        <div class="quiz-question-card" style="margin-bottom:16px">
          <div class="quiz-type-label">Listening Question</div>
          <div class="quiz-question" style="font-size:1rem">${q.q}</div>
        </div>
        <div class="quiz-options">
          ${q.opts.map((o, i) => `
            <button class="quiz-option" onclick="this.parentElement.querySelectorAll('.quiz-option').forEach(b=>{b.classList.remove('correct','wrong');b.style.pointerEvents='none'});this.classList.add('${i === q.ans ? 'correct' : 'wrong'}');document.getElementById('lopt-${qi}-${q.ans}')?.classList.add('correct')" id="lopt-${qi}-${i}">
              <span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${o}</span>
            </button>
          `).join('')}
        </div>
      `).join('')}
    </div>`;
}

function renderWriting(el, l) {
  el.innerHTML = `
    <h2 style="margin-bottom:24px">Writing Practice</h2>
    ${l.writing.map((w, i) => `
      <div class="writing-area" style="margin-bottom:20px">
        <div class="writing-prompt">${w.prompt}</div>
        <textarea class="writing-input" placeholder="Tulis jawaban di sini..." id="writing-${i}"></textarea>
        <div class="writing-hint" onclick="document.getElementById('answer-${i}').classList.toggle('show')">
          💡 Klik untuk lihat hint & jawaban
        </div>
        <div class="writing-answer" id="answer-${i}">
          <div style="color:var(--text-muted);font-size:0.75rem;margin-bottom:8px">HINT</div>
          <div style="margin-bottom:12px">${w.hint}</div>
          <div style="color:var(--text-muted);font-size:0.75rem;margin-bottom:8px">JAWABAN</div>
          <div style="color:var(--accent-teal);font-size:1.1rem">${w.answer}</div>
        </div>
      </div>
    `).join('')}`;
}

// Expose for quiz retry
window.renderQuiz = renderQuiz;
window.__currentLevel = null;

// ===== LEARN PAGE =====
function renderLearnPage() {
  const steps = [
    { n: 1, title: "Hiragana Dasar", desc: "Pelajari 46 huruf Hiragana dasar (あ〜ん)", tag: "Kana", link: "#/kana/hiragana" },
    { n: 2, title: "Katakana Dasar", desc: "Pelajari 46 huruf Katakana dasar (ア〜ン)", tag: "Kana", link: "#/kana/katakana" },
    { n: 3, title: "Kosakata Perkenalan", desc: "Belajar kata untuk memperkenalkan diri", tag: "N5 Vocab", link: "#/n5/vocab" },
    { n: 4, title: "Kosakata Keluarga", desc: "Kata-kata tentang anggota keluarga", tag: "N5 Vocab", link: "#/n5/vocab" },
    { n: 5, title: "Angka & Waktu", desc: "Belajar angka, hari, bulan, dan waktu", tag: "N5 Vocab", link: "#/n5/vocab" },
    { n: 6, title: "Kanji Dasar N5", desc: "100 Kanji paling dasar untuk JLPT N5", tag: "N5 Kanji", link: "#/n5/kanji" },
    { n: 7, title: "Grammar N5 Dasar", desc: "Pola kalimat dasar: は、が、を、に、で", tag: "N5 Grammar", link: "#/n5/grammar" },
    { n: 8, title: "Kosakata Sehari-hari", desc: "Makanan, rumah, transportasi, tempat", tag: "N5 Vocab", link: "#/n5/vocab" },
    { n: 9, title: "Grammar N5 Lanjutan", desc: "て-form, たい, ている, ましょう", tag: "N5 Grammar", link: "#/n5/grammar" },
    { n: 10, title: "Kata Kerja & Sifat", desc: "Kata kerja dan kata sifat penting N5", tag: "N5 Vocab", link: "#/n5/vocab" },
    { n: 11, title: "Quiz N5 — Sesi 1", desc: "Tes pemahamanmu tentang Kanji & Grammar", tag: "Quiz", link: "#/n5/quiz" },
    { n: 12, title: "Reading N5", desc: "Latihan membaca teks pendek bahasa Jepang", tag: "N5 Reading", link: "#/n5/reading" },
    { n: 13, title: "Listening N5", desc: "Latihan mendengarkan percakapan dasar", tag: "N5 Listening", link: "#/n5/listening" },
    { n: 14, title: "Writing N5", desc: "Latihan menulis kalimat sederhana", tag: "N5 Writing", link: "#/n5/writing" },
    { n: 15, title: "Quiz N5 — Final", desc: "Simulasi ujian JLPT N5 lengkap", tag: "Quiz", link: "#/n5/quiz" },
    { n: 16, title: "Lanjut ke N4!", desc: "Siap naik level? Mulai perjalanan N4", tag: "N4", link: "#/n4/kanji" },
  ];

  app.innerHTML = `
    <div class="learn-page">
      <div class="learn-header">
        <h1>📖 Alur Belajar</h1>
        <p>Ikuti tahapan belajar terstruktur dari nol hingga JLPT N5</p>
      </div>
      <div class="learn-path">
        ${steps.map((s, i) => `
          <div class="learn-step">
            <div class="learn-step-line">
              <div class="learn-step-dot ${i === 0 ? 'active' : ''}">${s.n}</div>
              ${i < steps.length - 1 ? '<div class="learn-step-connector"></div>' : ''}
            </div>
            <div class="learn-step-content" onclick="location.hash='${s.link}'">
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
              <span class="step-tag">${s.tag}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ===== TRYOUT PAGE =====
function renderTryoutPage() {
  const lvls = [
    { id: 'kana', label: 'Kana', title: 'Hiragana & Katakana', color: '#f43f5e', desc: '208 huruf dasar' },
    { id: 'n5', label: 'N5', title: 'Pemula', color: '#10b981', desc: '100 Kanji · 80 Grammar · 800 Vocab' },
    { id: 'n4', label: 'N4', title: 'Dasar', color: '#3b82f6', desc: 'Kanji · Grammar · Vocab' },
    { id: 'n3', label: 'N3', title: 'Menengah', color: '#8b5cf6', desc: 'Kanji · Grammar · Vocab' },
    { id: 'n2', label: 'N2', title: 'Lanjutan', color: '#f59e0b', desc: 'Kanji · Grammar · Vocab' },
    { id: 'n1', label: 'N1', title: 'Mahir', color: '#ef4444', desc: 'Kanji · Grammar · Vocab' },
  ];

  app.innerHTML = `
    <div class="tryout-page">
      <div class="tryout-header">
        <h1>📝 Tryout & Latihan</h1>
        <p style="color:var(--text-muted);margin-top:8px;">Akses bebas semua materi — belajar sesukamu!</p>
      </div>
      <div class="tryout-level-list">
        ${lvls.map(l => `
          <button class="tryout-level-btn" onclick="location.hash='#/${l.id}/${l.id === 'kana' ? 'hiragana' : 'kanji'}'">
            <div class="tryout-level-badge" style="background:${l.color}">${l.label}</div>
            <div class="tryout-level-info">
              <h3>${l.title}</h3>
              <p>${l.desc}</p>
            </div>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// ===== PROFILE PAGE =====
function renderProfilePage() {
  const p = getProgress();
  const streak = p.streak || 0;
  const totalQ = p.totalQuizzes || 0;

  app.innerHTML = `
    <div class="profile-page">
      <div class="profile-card">
        <div class="profile-avatar">🎌</div>
        <div class="profile-name">Pelajar Bunpoin</div>
        <div class="profile-subtitle">Mulai perjalanan JLPT-mu!</div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value">${streak}</div>
            <div class="profile-stat-label">Hari Streak</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${totalQ}</div>
            <div class="profile-stat-label">Quiz Selesai</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">N5</div>
            <div class="profile-stat-label">Level Saat Ini</div>
          </div>
        </div>
      </div>
      <div class="profile-section">
        <h3>Pengaturan</h3>
        <div class="profile-menu-item" onclick="alert('Fitur coming soon!')">
          <span>🔔 Notifikasi Belajar</span>
          <span class="arrow">›</span>
        </div>
        <div class="profile-menu-item" onclick="toggleDarkMode(); renderProfilePage();">
          <span>🌙 Mode Gelap</span>
          <span class="arrow" style="font-size:0.8rem;color:var(--text-muted)">${document.documentElement.classList.contains('dark') ? 'ON' : 'OFF'}</span>
        </div>
        <div class="profile-menu-item" onclick="alert('Fitur coming soon!')">
          <span>🎯 Target Level</span>
          <span class="arrow">›</span>
        </div>
      </div>
      <div class="profile-section">
        <h3>Tentang</h3>
        <div class="profile-menu-item">
          <span>📱 Versi Aplikasi</span>
          <span class="arrow" style="font-size:0.8rem;color:var(--text-muted)">v1.0.0</span>
        </div>
        <div class="profile-menu-item" onclick="window.open('https://github.com/Xarzz/bunpoin','_blank')">
          <span>⭐ GitHub Repository</span>
          <span class="arrow">›</span>
        </div>
      </div>
    </div>
  `;
}
