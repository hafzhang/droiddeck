document.documentElement.classList.add('js');

// Mobile menu
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});

nav?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  }
});

// Scroll spy for main nav
if (nav && document.querySelector('.game-hero')) {
  const homeLink = nav.querySelector('a[href="/"]');
  const anchors = [...nav.querySelectorAll('a[href^="/#"]')]
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(item => item.section);

  let navigationTimer;
  let navigating = false;

  function activate(link) {
    nav.querySelectorAll('a').forEach(item => item.removeAttribute('aria-current'));
    link?.setAttribute('aria-current', link === homeLink ? 'page' : 'location');
  }

  function trackSection() {
    if (navigating) return;
    const offset = document.querySelector('.site-header').getBoundingClientRect().height + 45;
    let current = homeLink;
    anchors.forEach(({ link, section }) => {
      if (section.getBoundingClientRect().top <= offset) current = link;
    });
    activate(current);
  }

  function finishNavigation() {
    clearTimeout(navigationTimer);
    navigating = false;
    trackSection();
  }

  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!anchors.some(item => item.link === link) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    activate(link);
    navigating = true;
    clearTimeout(navigationTimer);
    navigationTimer = setTimeout(finishNavigation, 1600);
  });

  window.addEventListener('scroll', trackSection, { passive: true });
  window.addEventListener('scrollend', finishNavigation, { passive: true });
  window.addEventListener('wheel', finishNavigation, { passive: true });
  window.addEventListener('touchstart', finishNavigation, { passive: true });
  window.addEventListener('resize', trackSection);
  window.addEventListener('load', trackSection);
  trackSection();
}

// Tabs
const tabs = [...document.querySelectorAll('[role="tab"]')];

function selectTab(tab, focus = false) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next], true);
    }
  });
});

if (tabs.length) selectTab(tabs[0]);

// Image lightbox dialog
const dialog = document.querySelector('.image-dialog');

document.querySelectorAll('.zoom-button').forEach(button => {
  button.addEventListener('click', () => {
    const original = button.querySelector('img');
    const enlarged = dialog.querySelector('img');
    enlarged.src = original.src;
    enlarged.alt = original.alt;
    dialog.showModal();
  });
});

dialog?.querySelector('.close-image').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

// Back to top
const back = document.querySelector('.back-top');
window.addEventListener('scroll', () => {
  back.hidden = window.scrollY < 700;
}, { passive: true });

back?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
});
