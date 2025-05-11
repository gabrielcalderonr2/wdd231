document.getElementById('menu-toggle').addEventListener('click', () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});
