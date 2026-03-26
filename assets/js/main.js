// ================================
// Theme Toggle with Memory
// ================================
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ================================
// Hamburger Mobile Menu
// ================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ================================
// Active Nav Link
// ================================
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('http')) return;
  const pageName = currentPath.split('/').pop() || 'index.html';
  const linkName = href.split('/').pop();
  if (
    href === currentPath ||
    linkName === pageName ||
    (currentPath === '/' && (href === '/' || href === 'index.html'))
  ) {
    link.classList.add('nav-active');
  }
});

async function fetchLeaderboard() {
  console.log('Leaderboard loading...');
  const tableBody = document.getElementById('leaderboardBody');
  
  // Sample data for testing
  const players = [
    { username: "Alice", score: 150 },
    { username: "Bob", score: 120 },
    { username: "Charlie", score: 100 },
    { username: "Diana", score: 80 },
    { username: "Eve", score: 60 },
    { username: "Frank", score: 40 },
    { username: "Grace", score: 20 }
  ];

  tableBody.innerHTML = '';
  players.forEach((player, index) => {
    const row = `
      <tr>
        <td>#${index + 1}</td>
        <td>${player.username}</td>
        <td>${player.score} pts</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Run the function when the page loads
if (document.getElementById('leaderboardTable')) {
  fetchLeaderboard();
}

// ================================
// Inject Footer into every page
// ================================
const footer = document.createElement('footer');
footer.className = 'site-footer';
footer.innerHTML = `
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">OUCSS</div>
        <p>Open University Cyber Security Society.<br>Beginner to elite. Offensive. Defensive. Relentless.</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <a href="/">Home</a>
        <a href="/about.html">About</a>
        <a href="/lore.html">Lore</a>
        <a href="/team.html">Team</a>
        <a href="/meetups.html">Meetups</a>
      </div>
      <div class="footer-col">
        <h4>Content</h4>
        <a href="/blog.html">Blogs</a>
        <a href="/projects.html">Member Projects</a>
        <a href="/resources.html">Resources</a>
        <a href="/leaderboard.html">Leaderboard</a>
        <a href="/ctfd.html">CTF Platform</a>
      </div>
      <div class="footer-col">
        <h4>Community</h4>
        <a href="https://join.oucss.rocks" target="_blank">Join Discord</a>
        <a href="https://ctftime.org/team/150351" target="_blank">CTFtime</a>
        <a href="https://tryhackme.com" target="_blank">TryHackMe</a>
        <a href="https://hackthebox.com" target="_blank">Hack The Box</a>
        <a href="https://github.com/oucss" target="_blank">GitHub</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>// OUCSS ${new Date().getFullYear()} &mdash; Open University Cyber Security Society</p>
      <div class="footer-socials">
        <a href="https://join.oucss.rocks" target="_blank">Discord</a>
        <a href="https://github.com/oucss" target="_blank">GitHub</a>
        <a href="https://ctftime.org/team/150351" target="_blank">CTFtime</a>
      </div>
    </div>
  </div>
`;
document.body.appendChild(footer);