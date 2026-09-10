const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark' || savedTheme === 'light') {
  root.dataset.theme = savedTheme;
} else {
  root.dataset.theme = 'light';
}

function updateThemeControl() {
  if (!themeButton) return;
  const dark = root.dataset.theme === 'dark';
  themeButton.textContent = dark ? 'Light' : 'Dark';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeControl();

themeButton?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  updateThemeControl();
});

document.getElementById('year').textContent = new Date().getFullYear();
