document.addEventListener('DOMContentLoaded', () => {
  const contentDisplay = document.querySelector('.content #content-display');
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

  function setActiveLink(currentUrl) {
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === currentUrl;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function loadContent(url, updateHistory = true) {
    if (!contentDisplay || !url) return;

    contentDisplay.setAttribute('aria-busy', 'true');

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(htmlContent => {
        contentDisplay.innerHTML = htmlContent;
        contentDisplay.removeAttribute('aria-busy');
        setActiveLink(url);

        if (updateHistory) {
          const fileName = url.split('/').pop().replace('.html', '');
          history.replaceState(null, '', `#${fileName}`);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Could not load content:', error);
        contentDisplay.removeAttribute('aria-busy');
        contentDisplay.innerHTML = `
          <div class="error-message-container" role="status">
            <img src="../images/no_data_found.png" alt="Content unavailable">
            <p>Oops! This lesson could not be loaded. Please try another topic.</p>
          </div>`;
      });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const contentPath = link.getAttribute('href');
      if (!contentPath) return;
      event.preventDefault();
      loadContent(contentPath);
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  const currentHash = window.location.hash.substring(1);
  let initialUrl = navLinks.length ? navLinks[0].getAttribute('href') : null;

  if (currentHash) {
    const hashLink = Array.from(navLinks).find(link => {
      const href = link.getAttribute('href') || '';
      return href.split('/').pop() === `${currentHash}.html`;
    });
    if (hashLink) initialUrl = hashLink.getAttribute('href');
  }

  if (initialUrl) loadContent(initialUrl, false);

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
