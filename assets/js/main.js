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
const LOCAL_LEADERBOARD_KEY = 'oucss_leaderboard';

function getLocalLeaderboard() {
  const primary = JSON.parse(localStorage.getItem(LOCAL_LEADERBOARD_KEY) || 'null');
  if (Array.isArray(primary)) return primary;

  // backward-compatible fallback for old exists key
  const legacy = JSON.parse(localStorage.getItem('leaderboard') || 'null');
  if (Array.isArray(legacy)) return legacy;

  return [];
}

function setLocalLeaderboard(entries) {
  localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(entries));
}
function addLocalLeaderboardEntry(username, score, challenge_id = null) {
  if (!username || isNaN(score)) return false;
  const leaderboard = getLocalLeaderboard();
  leaderboard.push({ username, score: Number(score), challenge_id, solved_at: new Date().toISOString() });
  setLocalLeaderboard(leaderboard);
  return true;
}

function renderLeaderboard() {
  console.log('Leaderboard loading...');
  const tableBody = document.getElementById('leaderboardBody');
  if (!tableBody) return;

  let players = getLocalLeaderboard();
  players.sort((a, b) => b.score - a.score);

  tableBody.innerHTML = '';
  if (players.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align:center;opacity:0.7">No leaderboard entries yet. Solve a challenge to add one.</td>
      </tr>
    `;
    return;
  }

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
// Backwards-compatible function name referenced in old code
function fetchLeaderboard() {
  renderLeaderboard();
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

// Function to submit flag
function submitFlag() {
  alert('Flag submit function called!');
  console.log('submitFlag called');
  const flag = document.getElementById('flagInput').value.trim();
  const feedback = document.getElementById('flagFeedback');
  console.log('Submitted flag:', flag);
  
  // Correct flag (you can change this)
  const correctFlag = 'OUCSS{test}';
  
  if (flag.toLowerCase() === correctFlag.toLowerCase()) {
    console.log('Flag correct');
    // Flag correct, show username input
    document.getElementById('flagInput').style.display = 'none';
    document.getElementById('flagSubmitBtn').style.display = 'none';
    document.getElementById('usernameRow').style.display = 'flex';
    feedback.innerHTML = '<span style="color:#a8ff78">✓ Flag correct! Enter your username below.</span>';
  } else {
    console.log('Flag incorrect');
    feedback.innerHTML = '<span style="color:#ff6b6b">✗ Incorrect flag. Try again!</span>';
  }
}

// Function to submit username
function submitUsername() {
  const username = document.getElementById('usernameInput').value.trim();
  const feedback = document.getElementById('flagFeedback');
  
  if (username) {
    // Add to leaderboard with score 100
    let players = JSON.parse(localStorage.getItem('leaderboard')) || [];
    players.push({ username: username, score: 100 });
    localStorage.setItem('leaderboard', JSON.stringify(players));
    
    feedback.innerHTML = '<span style="color:#a8ff78">✓ Success! You\'ve been added to the leaderboard.</span>';
    document.getElementById('usernameInput').value = '';
    document.getElementById('usernameRow').style.display = 'none';
    
    // Redirect to leaderboard
    setTimeout(() => {
      window.location.href = 'leaderboard.html';
    }, 2000);
  } else {
    feedback.innerHTML = '<span style="color:#ff6b6b">Please enter a username.</span>';
  }
}

// Load leaderboard if on leaderboard page
if (document.getElementById('leaderboard') || document.getElementById('leaderboardTable')) {
  // Support table setups with id='leaderboard' (new) and id='leaderboardTable' (legacy)
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

if (!document.getElementById('leaderboard')) {
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}