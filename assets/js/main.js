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
  if (pageName === linkName) {
    link.classList.add('active');
  }
});

// ================================
// Leaderboard Functionality
// ================================
function fetchLeaderboard() {
  console.log('Leaderboard loading...');
  const tableBody = document.getElementById('leaderboardBody');
  if (!tableBody) return;
  
  // Load from localStorage, or use defaults
  let players = JSON.parse(localStorage.getItem('leaderboard')) || [
    { username: "Alice", score: 150 },
    { username: "Bob", score: 120 },
    { username: "Charlie", score: 100 },
    { username: "Diana", score: 80 },
    { username: "Eve", score: 60 },
    { username: "Frank", score: 40 },
    { username: "Grace", score: 20 }
  ];

  // Sort by score descending
  players.sort((a, b) => b.score - a.score);

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

// Function to add a new player (for testing/demo)
function addNewPlayer() {
  const username = document.getElementById('newUsername').value.trim();
  const score = parseInt(document.getElementById('newScore').value);
  if (username && !isNaN(score)) {
    let players = JSON.parse(localStorage.getItem('leaderboard')) || [];
    players.push({ username, score });
    localStorage.setItem('leaderboard', JSON.stringify(players));
    fetchLeaderboard(); // Refresh the display
    // Clear inputs
    document.getElementById('newUsername').value = '';
    document.getElementById('newScore').value = '';
  } else {
    alert('Please enter a valid username and score.');
  }
}

// Load leaderboard if on leaderboard page
if (document.getElementById('leaderboardTable')) {
  fetchLeaderboard();
}

// ================================
// Dynamic Footer Injection
// ================================
const footerHTML = `
<footer class="main-footer">
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-col branding">
        <h3 class="footer-logo">OUCSS</h3>
        <p>The Cyber Security Society for Open University students.</p>
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
      </div>
    </div>
  </div>
</footer>
`;

document.body.insertAdjacentHTML('beforeend', footerHTML);