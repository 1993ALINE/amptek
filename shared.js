// ── SHARED LANGUAGE + NAV JS ──
const TRANSLATIONS = {
  en: {
    nav_home:"Home", nav_services:"Services", nav_about:"About Us",
    nav_clients:"Clients", nav_contact:"Contact", nav_call:"Call Now",
    footer_tagline:"Powering industry, protecting lives — Bangladesh's trusted multi-discipline engineering company.",
    footer_rights:"All rights reserved.",
    footer_copy:"Powering Industry. Protecting Lives.",
    marquee:['HT/LT Switchgear','BBT Systems','Power Transformers','NFPA Fire Detection','Hydrant Systems','FM-200 Suppression','Boiler Solutions','HVAC Engineering','Tank Fabrication','Industrial Automation','PLC Programming','Machine Maintenance','Lightning Protection','Safety Compliance'],
  },
  bn: {
    nav_home:"হোম", nav_services:"সেবাসমূহ", nav_about:"আমাদের সম্পর্কে",
    nav_clients:"ক্লায়েন্ট", nav_contact:"যোগাযোগ", nav_call:"কল করুন",
    footer_tagline:"শিল্প পরিচালনা, জীবন সুরক্ষা — বাংলাদেশের বিশ্বস্ত মাল্টি-ডিসিপ্লিন ইঞ্জিনিয়ারিং কোম্পানি।",
    footer_rights:"সর্বস্বত্ব সংরক্ষিত।",
    footer_copy:"শিল্প পরিচালনা। জীবন সুরক্ষা।",
    marquee:['HT/LT সুইচগিয়ার','বিবিটি সিস্টেম','পাওয়ার ট্রান্সফরমার','NFPA ফায়ার ডিটেকশন','হাইড্রান্ট সিস্টেম','FM-200 সাপ্রেশন','বয়লার সমাধান','এইচভিএসি ইঞ্জিনিয়ারিং','ট্যাংক ফ্যাব্রিকেশন','ইন্ডাস্ট্রিয়াল অটোমেশন','পিএলসি প্রোগ্রামিং','মেশিন মেইনটেন্যান্স','লাইটনিং প্রটেকশন','সেফটি কমপ্লায়েন্স'],
  }
};

let lang = localStorage.getItem('amptek_lang') || 'en';

function setLang(l) {
  lang = l;
  localStorage.setItem('amptek_lang', l);
  document.documentElement.setAttribute('data-lang', l);
  const lbEn = document.getElementById('lbEn');
  const lbBn = document.getElementById('lbBn');
  if (lbEn) lbEn.classList.toggle('active', l === 'en');
  if (lbBn) lbBn.classList.toggle('active', l === 'bn');
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (val == null) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else if (el.tagName === 'OPTION') el.textContent = val;
    else el.innerHTML = val;
  });
  if (document.getElementById('marqueeTrack')) buildMarquee(l);
}

function buildMarquee(l) {
  const items = TRANSLATIONS[l].marquee;
  const doubled = [...items, ...items];
  document.getElementById('marqueeTrack').innerHTML =
    doubled.map(t => `<div class="marquee-item">${t}<div class="marquee-dot"></div></div>`).join('');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

function initNavScroll() {
  const nav = document.querySelector('.nav-container');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function initPage() {
  document.documentElement.setAttribute('data-lang', lang);
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    const href = l.getAttribute('href');
    l.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
  setLang(lang);
  initNavScroll();
  initMobileMenu();

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

let toastT;
function showToast(msg, good = true) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.background = good ? '#22c55e' : '#dc2626';
  t.style.display = 'block';
  clearTimeout(toastT);
  toastT = setTimeout(() => { t.style.display = 'none'; }, 3500);
}

window.addEventListener('DOMContentLoaded', initPage);
