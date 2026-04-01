/* ============================
   SCRIPT.JS — Portfolio Logic
   ============================ */

// ============================================================
// CONFIG — ⚡ MODIFICA ESTOS VALORES CON TU INFORMACIÓN
// ============================================================
const CONFIG = {
  githubUsername: 'RubenAzocar',
  linkedinUrl: 'https://linkedin.com/in/razocardaroch',
  email: 'Progpythontest@gmail.com',
  name: 'Rubén Azócar Daroch',
  reposPerPage: 9,
  typingWords: [
    'Desarrollador Full Stack 🚀',
    'Apasionado por la Tecnología ⚡',
    'Builder de soluciones digitales 🔧',
    'Open Source Contributor 🌐',
    'Analista Ciberseguridad 🛡️',
  ],
};

// ============================================================
// ESTADO GLOBAL
// ============================================================
const state = {
  allRepos: [],
  filteredRepos: [],
  displayedCount: 0,
  currentFilter: 'all',
  currentSort: 'updated',
  searchQuery: '',
  currentSlide: 0,
  isDark: true,
};

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initHero();
  initCursorGlow();
  initScrollReveal();
  initSkillBars();
  initSlider();
  initContactForm();
  initTestimonioForm();
  initBackToTop();
  initFooter();
  initCertAccordions();
  loadGitHubData();
  animateCounters();
  updatePersonalInfo();
});

// ============================================================
// PERSONAL INFO — aplica config a los elementos del DOM
// ============================================================
function updatePersonalInfo() {
  // Nombre en hero
  const heroName = document.getElementById('heroName');
  if (heroName) heroName.textContent = CONFIG.name;

  // Links de GitHub
  const ghLinks = ['contactGithub', 'footerGithub'];
  ghLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.href = `https://github.com/${CONFIG.githubUsername}`;
      if (id === 'contactGithub') {
        el.querySelector('.contact-link-value').textContent = `github.com/${CONFIG.githubUsername}`;
      }
    }
  });

  // Links de LinkedIn
  const liLinks = ['contactLinkedin', 'footerLinkedin'];
  liLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.href = CONFIG.linkedinUrl;
      if (id === 'contactLinkedin') {
        const val = el.querySelector('.contact-link-value');
        if (val) val.textContent = CONFIG.linkedinUrl.replace('https://','');
      }
    }
  });

  // Email
  const emailLinks = ['contactEmail', 'footerEmail'];
  emailLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.href = `mailto:${CONFIG.email}`;
      if (id === 'contactEmail') {
        const val = el.querySelector('.contact-link-value');
        if (val) val.textContent = CONFIG.email;
      }
    }
  });

  // Correo del formulario y footer
  const emailInput = document.getElementById('contactEmailInput');

  // Footer year
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // LinkedIn text update
  const footerLinkedin = document.getElementById('footerLinkedin');
  if (footerLinkedin) {
    footerLinkedin.setAttribute('href', CONFIG.linkedinUrl);
  }
}

// ============================================================
// THEME TOGGLE
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  state.isDark = theme === 'dark';
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = state.isDark ? 'fas fa-moon' : 'fas fa-sun';
  }
}

// ============================================================
// CURSOR GLOW
// ============================================================
function initCursorGlow() {
  const cursor = document.getElementById('cursorGlow');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// ============================================================
// NAVBAR — scroll shrink & active link & hamburger
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNavLink();
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ============================================================
// HERO — typing effect & particles
// ============================================================
function initHero() {
  initTypingEffect();
  createParticles();
}

function initTypingEffect() {
  const el = document.getElementById('typingWords');
  if (!el) return;
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const word = CONFIG.typingWords[wordIndex];
    el.textContent = isDeleting
      ? word.substring(0, charIndex--)
      : word.substring(0, charIndex++);

    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === word.length + 1) {
      delay = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % CONFIG.typingWords.length;
      delay = 300;
    }
    setTimeout(type, delay);
  }
  type();
}

function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      width:${Math.random()*3+1}px;
      height:${Math.random()*3+1}px;
      background:rgba(0,212,170,${Math.random()*0.4+0.1});
      border-radius:50%;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation: particle ${Math.random()*8+4}s ease-in-out infinite;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particle {
        0%,100%{transform:translateY(0) translateX(0);opacity:0.3;}
        25%{transform:translateY(-${Math.random()*30+10}px) translateX(${Math.random()*20-10}px);opacity:0.8;}
        75%{transform:translateY(${Math.random()*20+5}px) translateX(${Math.random()*20-10}px);opacity:0.4;}
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
// COUNTERS
// ============================================================
function animateCounters() {
  const counters = [
    { id: 'yearsCount', target: 2 },
    { id: 'techCount', target: 10 },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count || el.dataset.target || '0');
        animateNumber(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) {
      el.dataset.target = c.target;
      observer.observe(el);
    }
  });
}

function animateNumber(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================================================
// SKILL BARS
// ============================================================
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
}

// ============================================================
// GITHUB API
// ============================================================
async function loadGitHubData() {
  if (!CONFIG.githubUsername || CONFIG.githubUsername === 'TU_USUARIO_GITHUB') {
    showProjectsError('Configura tu usuario de GitHub en CONFIG dentro de script.js');
    return;
  }

  try {
    // Cargar perfil y repos en paralelo
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${CONFIG.githubUsername}`),
      fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?per_page=100&sort=updated`)
    ]);

    if (!profileRes.ok || !reposRes.ok) throw new Error(`HTTP ${profileRes.status}`);

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    displayGitHubProfile(profile);
    state.allRepos = repos.filter(r => !r.fork).sort(sortFn('updated'));
    state.filteredRepos = [...state.allRepos];

    // Actualizar contador de repos en hero
    const reposCount = document.getElementById('reposCount');
    if (reposCount) animateNumber(reposCount, 0, profile.public_repos, 1500);

    buildFilters();
    renderProjects();

  } catch (err) {
    console.error('GitHub API Error:', err);
    showProjectsError(`No se pudo conectar con GitHub. ${err.message}`);
  }
}

function displayGitHubProfile(profile) {
  const banner = document.getElementById('githubBanner');
  if (!banner) return;

  const avatar = document.getElementById('githubAvatar');
  const username = document.getElementById('githubUsername');
  const bio = document.getElementById('githubBio');
  const repos = document.getElementById('gbRepos');
  const followers = document.getElementById('gbFollowers');
  const following = document.getElementById('gbFollowing');
  const link = document.getElementById('githubProfileLink');

  if (avatar) { avatar.src = profile.avatar_url; avatar.alt = profile.name || profile.login; }
  if (username) username.textContent = profile.name || profile.login;
  if (bio) bio.textContent = profile.bio || 'Desarrollador en GitHub';
  if (repos) repos.textContent = profile.public_repos;
  if (followers) followers.textContent = profile.followers;
  if (following) following.textContent = profile.following;
  if (link) link.href = profile.html_url;
}

function buildFilters() {
  const filterBar = document.getElementById('filterBar');
  if (!filterBar) return;

  // Extraer lenguajes únicos con conteo
  const langCount = {};
  state.allRepos.forEach(r => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
  });

  const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 8);

  sorted.forEach(([lang, count]) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = lang;

    const icon = document.createElement('i');
    icon.className = 'fas fa-circle';
    icon.style.fontSize = '0.5rem';
    icon.style.color = getLangColor(lang);

    const text = document.createTextNode(` ${lang} `);

    const badge = document.createElement('span');
    badge.style.color = 'var(--text-muted)';
    badge.style.fontSize = '0.75em';
    badge.textContent = `(${count})`;

    btn.appendChild(icon);
    btn.appendChild(text);
    btn.appendChild(badge);

    btn.addEventListener('click', () => applyFilter(lang));
    filterBar.appendChild(btn);
  });

  // Filtro inicial
  document.getElementById('filter-all')?.addEventListener('click', () => applyFilter('all'));

  // Sort
  document.getElementById('sortRepos')?.addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    applyFiltersAndSort();
  });

  // Search
  const searchInput = document.getElementById('searchRepos');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      state.displayedCount = 0;
      applyFiltersAndSort();
    }, 300));
  }

  // Retry
  document.getElementById('retryBtn')?.addEventListener('click', loadGitHubData);
  document.getElementById('clearFilterBtn')?.addEventListener('click', () => applyFilter('all'));
  document.getElementById('loadMoreBtn')?.addEventListener('click', loadMoreProjects);
}

function applyFilter(filter) {
  state.currentFilter = filter;
  state.displayedCount = 0;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  applyFiltersAndSort();
}

function applyFiltersAndSort() {
  let repos = [...state.allRepos];

  // Filtro por lenguaje
  if (state.currentFilter !== 'all') {
    repos = repos.filter(r => r.language === state.currentFilter);
  }

  // Búsqueda
  if (state.searchQuery) {
    repos = repos.filter(r =>
      r.name.toLowerCase().includes(state.searchQuery) ||
      (r.description && r.description.toLowerCase().includes(state.searchQuery))
    );
  }

  // Ordenamiento
  repos.sort(sortFn(state.currentSort));
  state.filteredRepos = repos;
  renderProjects();
}

function sortFn(type) {
  return (a, b) => {
    if (type === 'stars') return b.stargazers_count - a.stargazers_count;
    if (type === 'name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  };
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const loading = document.getElementById('projectsLoading');
  const error = document.getElementById('projectsError');
  const empty = document.getElementById('projectsEmpty');
  const footer = document.getElementById('projectsFooter');

  if (!grid) return;

  loading.classList.add('hidden');
  error.classList.add('hidden');

  grid.innerHTML = '';

  if (state.filteredRepos.length === 0) {
    empty.classList.remove('hidden');
    if (footer) footer.style.display = 'none';
    return;
  }

  empty.classList.add('hidden');

  const pageRepos = state.filteredRepos.slice(0, CONFIG.reposPerPage);
  state.displayedCount = pageRepos.length;

  pageRepos.forEach((repo, i) => {
    const card = createProjectCard(repo, i);
    grid.appendChild(card);
  });

  if (footer) {
    footer.style.display = state.filteredRepos.length > CONFIG.reposPerPage ? 'block' : 'none';
  }
}

function loadMoreProjects() {
  const grid = document.getElementById('projectsGrid');
  const footer = document.getElementById('projectsFooter');
  if (!grid) return;

  const next = state.filteredRepos.slice(state.displayedCount, state.displayedCount + CONFIG.reposPerPage);
  next.forEach((repo, i) => {
    const card = createProjectCard(repo, i);
    grid.appendChild(card);
  });

  state.displayedCount += next.length;
  if (footer) {
    footer.style.display = state.displayedCount < state.filteredRepos.length ? 'block' : 'none';
  }
}

function createProjectCard(repo, index) {
  const card = document.createElement('div');
  card.className = 'project-card reveal';
  card.style.animationDelay = `${index * 0.07}s`;

  const langColor = getLangColor(repo.language);
  const updated = new Date(repo.updated_at).toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' });

  card.innerHTML = `
    <div class="project-card-header">
      <div class="project-icon"><i class="fas fa-code-branch"></i></div>
      <div class="project-name">${escapeHtml(repo.name)}</div>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-github-link" title="Ver en GitHub">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <p class="project-description">${escapeHtml(repo.description || 'Sin descripción disponible.')}</p>
    <div class="project-footer">
      <span class="project-lang">
        <span class="lang-dot" style="background:${langColor}"></span>
        ${escapeHtml(repo.language || 'N/A')}
      </span>
      <div class="project-stats">
        <span class="project-stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
        <span class="project-stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
      </div>
      <button class="project-view-btn">Ver más</button>
    </div>
  `;

  // Listener para el link de GitHub (detener propagación para no abrir modal)
  const ghLink = card.querySelector('.project-github-link');
  ghLink?.addEventListener('click', (e) => e.stopPropagation());

  // Click para abrir modal
  card.addEventListener('click', () => openProjectModal(repo));
  setTimeout(() => card.classList.add('visible'), 50);

  return card;
}

function showProjectsError(message) {
  const loading = document.getElementById('projectsLoading');
  const error = document.getElementById('projectsError');
  const errorMsg = document.getElementById('errorMessage');
  if (loading) loading.classList.add('hidden');
  if (error) error.classList.remove('hidden');
  if (errorMsg) errorMsg.textContent = message;
}

// ============================================================
// MODAL
// ============================================================
function openProjectModal(repo) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  // Llenar datos
  document.getElementById('modalTitle').textContent = repo.name;
  document.getElementById('modalStars').textContent = repo.stargazers_count;
  document.getElementById('modalForks').textContent = repo.forks_count;
  document.getElementById('modalWatchers').textContent = repo.watchers_count;
  document.getElementById('modalLang').textContent = repo.language || 'N/A';
  document.getElementById('modalDescription').textContent = repo.description || 'Sin descripción disponible.';
  document.getElementById('modalCreated').textContent = formatDate(repo.created_at);
  document.getElementById('modalUpdated').textContent = formatDate(repo.updated_at);
  document.getElementById('modalGithubLink').href = repo.html_url;

  // Demo link (homepage)
  const demoLink = document.getElementById('modalDemoLink');
  if (demoLink) {
    if (repo.homepage) {
      demoLink.href = repo.homepage;
      demoLink.classList.remove('hidden');
    } else {
      demoLink.classList.add('hidden');
    }
  }

  // Topics
  const topicsEl = document.getElementById('modalTopics');
  if (topicsEl) {
    topicsEl.innerHTML = repo.topics?.map(t => `<span class="topic-tag">${escapeHtml(t)}</span>`).join('') || '';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('projectModal')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================================================
// SLIDER — Testimonios
// ============================================================
function initSlider() {
  const track = document.getElementById('testimoniosTrack');
  const dotsContainer = document.getElementById('sliderDots');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonio-card');
  const total = slides.length;

  // Crear dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer?.appendChild(dot);
  });

  document.getElementById('sliderPrev')?.addEventListener('click', () => {
    goToSlide((state.currentSlide - 1 + total) % total);
  });

  document.getElementById('sliderNext')?.addEventListener('click', () => {
    goToSlide((state.currentSlide + 1) % total);
  });

  // Auto-play
  setInterval(() => {
    goToSlide((state.currentSlide + 1) % total);
  }, 5000);

  // Touch support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(diff > 0
      ? (state.currentSlide + 1) % total
      : (state.currentSlide - 1 + total) % total
    );
  });
}

function goToSlide(index) {
  state.currentSlide = index;
  const track = document.getElementById('testimoniosTrack');
  const dots = document.querySelectorAll('.slider-dot');
  if (track) track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check Honeypot
    const hp = document.getElementById('contactHoneypot');
    if (hp && hp.value) {
      console.warn('Bot detected via honeypot');
      return; 
    }

    if (!validateForm()) return;

    // Rate Limit (throttling)
    const lastSubmit = localStorage.getItem('last_submit_time');
    const now = Date.now();
    if (lastSubmit && (now - lastSubmit < 30000)) { // 30 segundos
      showToast('Por favor, espera un momento antes de enviar otro mensaje.', 'error');
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    // Estado loading
    if (btnText) btnText.classList.add('hidden');
    if (btnLoading) btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simular envío (reemplaza con tu servicio real: EmailJS, Formspree, etc.)
    await new Promise(r => setTimeout(r, 1500));

    // Mostrar éxito
    if (btnText) btnText.classList.remove('hidden');
    if (btnLoading) btnLoading.classList.add('hidden');
    submitBtn.disabled = false;

    const success = document.getElementById('formSuccess');
    if (success) success.classList.remove('hidden');
    form.reset();

    showToast('¡Mensaje enviado exitosamente!', 'success');
    localStorage.setItem('last_submit_time', Date.now());

    setTimeout(() => {
      if (success) success.classList.add('hidden');
    }, 5000);
  });

  // Validación en tiempo real
  ['contactName', 'contactEmailInput', 'contactMessage'].forEach(id => {
    document.getElementById(id)?.addEventListener('blur', () => validateField(id));
  });
}

function validateForm() {
  let valid = true;
  if (!validateField('contactName')) valid = false;
  if (!validateField('contactEmailInput')) valid = false;
  if (!validateField('contactMessage')) valid = false;
  return valid;
}

function validateField(id) {
  const el = document.getElementById(id);
  if (!el) return true;

  const errorMap = {
    contactName: 'nameError',
    contactEmailInput: 'emailError',
    contactMessage: 'messageError',
  };
  const errEl = document.getElementById(errorMap[id]);

  let error = '';
  if (!el.value.trim()) {
    error = 'Este campo es obligatorio.';
  } else if (id === 'contactEmailInput' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
    error = 'Ingresa un correo electrónico válido.';
  } else if (id === 'contactMessage' && el.value.trim().length < 20) {
    error = 'El mensaje debe tener al menos 20 caracteres.';
  }

  if (errEl) errEl.textContent = error;
  el.closest('.input-wrapper').style.borderColor = error ? '#EF4444' : '';
  return !error;
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = document.createElement('i');
  icon.className = `fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}`;

  const span = document.createElement('span');
  span.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(span);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// FOOTER
// ============================================================
function initFooter() {
  const year = document.getElementById('footerYear');
  if (year) year.textContent = new Date().getFullYear();
}

// ============================================================
// UTILS
// ============================================================
function getLangColor(lang) {
  const colors = {
    JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB',
    HTML: '#E34F26', CSS: '#1572B6', Java: '#ED8B00', PHP: '#777BB4',
    'C#': '#239120', 'C++': '#00599C', Ruby: '#CC342D', Go: '#00ADD8',
    Rust: '#DEA584', Swift: '#FA7343', Kotlin: '#0095D5', Shell: '#89E051',
    Vue: '#4FC08D', SCSS: '#CC6699', Dart: '#0175C2', React: '#61DAFB',
    Spring: '#6DB33F', "Spring Boot": '#6DB33F', Docker: '#2496ED',
  };
  return colors[lang] || '#8888AA';
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-CL', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================================
// CERT ACCORDIONS — certificados Google & Alura
// ============================================================
function initCertAccordions() {
  // Todos los botones de acordeón de certificados
  const accordionBtns = document.querySelectorAll('.cert-accordion-btn');
  accordionBtns.forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const panel = targetId ? document.getElementById(targetId) : null;
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      panel.classList.toggle('hidden', isExpanded);
    });
  });
}

// ============================================================
// TESTIMONIO FORM — envio y revision
// ============================================================
function initTestimonioForm() {
  const modal = document.getElementById('testimonioModal');
  const openBtn = document.getElementById('openTestimonioModal');
  const closeBtn = document.getElementById('testimonioModalClose');
  const form = document.getElementById('testimonioForm');

  if (!openBtn || !modal) return;

  // Abrir y cerrar modal
  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Manejar envío
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitTestimonioBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    // Estado loading
    if (btnText) btnText.classList.add('hidden');
    if (btnLoading) btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simular el envío para revision (aqui se integraria un backend)
    await new Promise(r => setTimeout(r, 2000));

    // Exito
    closeModal();
    form.reset();
    setTimeout(() => {
        if (btnText) btnText.classList.remove('hidden');
        if (btnLoading) btnLoading.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;
    }, 500);

    showToast('¡Gracias! Tu testimonio será revisado antes de publicarse.', 'success');
  });
}
