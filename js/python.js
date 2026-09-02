document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  const themeSwitcher = document.getElementById('theme-switcher');
  const body = document.body;

  if (sidebar && !document.querySelector('.sidebar-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    body.appendChild(backdrop);

    backdrop.addEventListener('click', closeSidebar);
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    body.classList.add('sidebar-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    body.classList.remove('sidebar-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && sidebar) {
    menuToggle.setAttribute('aria-label', 'Toggle course navigation');
    menuToggle.setAttribute('aria-controls', 'course-navigation');
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.id = sidebar.id || 'course-navigation';

    menuToggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }

  navLinks.forEach(link => {
    try {
      const linkUrl = new URL(link.href, window.location.href);
      if (linkUrl.pathname === window.location.pathname) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    } catch (_) {
      // Leave malformed legacy links untouched instead of breaking the page.
    }

    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  function setTheme(theme) {
    const dark = theme === 'dark';
    body.classList.toggle('dark-mode', dark);

    if (themeSwitcher) {
      themeSwitcher.textContent = dark ? 'Light mode' : 'Dark mode';
      themeSwitcher.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('theme') || 'light';
  } catch (_) {}
  setTheme(savedTheme);

  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
      const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
      setTheme(nextTheme);
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (_) {}
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeSidebar();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar();
  });
});
