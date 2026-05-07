import { levels } from './data.js';

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
});

// ===== RENDER =====
function render() {
  currentRoute = getRoute();
  const [page, ...params] = currentRoute.split('/').filter(Boolean);

  if (page && levels[page]) {
    renderLevelPage(page, params[0] || 'kanji');
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

// ===== NAVBAR =====
function navbar(activeLevel) {
  return `
  <nav class="navbar">
    <div class="nav-logo" onclick="location.hash='#/'"><span class="logo-icon">🔴</span> Bunpoin</div>
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
      <div class="stat-item"><div class="stat-value" style="color:${l.color}">${l.kanjiCount}</div><div class="stat-label">Kanji</div></div>
      <div class="stat-item"><div class="stat-value" style="color:${l.color}">${l.grammarCount}</div><div class="stat-label">Grammar</div></div>
      <div class="stat-item"><div class="stat-value" style="color:${l.color}">${l.vocabCount}</div><div class="stat-label">Vocabulary</div></div>
    </div>
  </div>

  <div class="section" style="--card-accent:${l.color};--card-accent-bg:${l.color}15">
    <div class="skill-tabs">
      ${['kanji','grammar','quiz','reading','listening','writing'].map(s =>
        `<button class="skill-tab ${activeSkill === s ? 'active' : ''}" onclick="location.hash='#/${levelId}/${s}'">${s === 'kanji' ? '漢字 Kanji' : s === 'grammar' ? '文法 Grammar' : s === 'quiz' ? '📝 Quiz' : s === 'reading' ? '📖 Reading' : s === 'listening' ? '🎧 Listening' : '✍️ Writing'}</button>`
      ).join('')}
    </div>
    <div class="skill-content" id="skill-content"></div>
  </div>

  <footer class="footer"><p>Bunpoin © 2026 — がんばって！</p></footer>`;

  renderSkillContent(levelId, activeSkill);
}

function renderSkillContent(levelId, skill) {
  const l = levels[levelId];
  const el = document.getElementById('skill-content');
  if (!el) return;
  window.__currentLevel = l;

  switch (skill) {
    case 'kanji': renderKanji(el, l); break;
    case 'grammar': renderGrammar(el, l); break;
    case 'quiz': renderQuiz(el, l); break;
    case 'reading': renderReading(el, l); break;
    case 'listening': renderListening(el, l); break;
    case 'writing': renderWriting(el, l); break;
    default: renderKanji(el, l);
  }
}

function renderKanji(el, l) {
  el.innerHTML = `
    <h2 style="margin-bottom:24px">Kanji ${l.label}</h2>
    <div class="kanji-grid">
      ${l.kanji.map((k, index) => `
        <div class="kanji-card" onclick="window.openKanjiModalStr('${l.id}', ${index})">
          <span class="kanji-char">${k.char}</span>
          <div class="kanji-reading">音: ${k.on} ・ 訓: ${k.kun}</div>
          <div class="kanji-meaning">${k.meaning}</div>
        </div>
      `).join('')}
    </div>`;
}

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
let quizState = { current: 0, score: 0, answered: false, questions: [] };

function renderQuiz(el, l) {
  quizState = { current: 0, score: 0, answered: false, questions: [...l.quiz].sort(() => Math.random() - 0.5) };
  renderQuizQuestion(el);
}

function renderQuizQuestion(el) {
  const { current, questions, score } = quizState;
  if (current >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    el.innerHTML = `
      <div class="quiz-result">
        <div class="result-score">${pct}%</div>
        <h2>${pct >= 80 ? '素晴らしい！ Amazing!' : pct >= 60 ? 'いいですね！ Good job!' : 'もう少し！ Keep trying!'}</h2>
        <p>Skor: ${score} / ${questions.length}</p>
        <button class="btn btn-primary" onclick="document.getElementById('skill-content') && renderQuiz(document.getElementById('skill-content'), window.__currentLevel)">Coba Lagi 🔄</button>
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

