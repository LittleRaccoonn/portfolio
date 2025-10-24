const g = document.getElementById('greeting');
const btn = document.getElementById('askName');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// Функция показывает приветствие
function showGreeting(name) {
    g.textContent = name
        ? `Привет, ${name}!`
        : 'Добро пожаловать!';
}

function askName() {
    const name = prompt("What's your name?");
    if (name) {
        localStorage.setItem("visitorName", name);
    } else {
        localStorage.removeItem("visitorName");
    }
    showGreeting(localStorage.getItem("visitorName"));
}

btn.addEventListener('click', askName);
showGreeting(localStorage.getItem('visitorName'));

// Темная тема
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeBtn.textContent = 'Light theme';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? 'Light theme' : 'Dark theme';
});

// Гамбургер меню
burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
});

// Закрыть меню по клику на пункт (на мобиле)
menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.matchMedia('(max-width: 768px)').matches) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// Закрыть по Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        burger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
    }
});

const scrollTopBtn = document.getElementById('scrollTopBtn');

const SHOW_AFTER = 300;

window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

// При открытии страницы с хэшем (#about) — плавно скроллим к секции
window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
