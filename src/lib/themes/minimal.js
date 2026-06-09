export function minimal(data) {
  const { user, repos, topLanguages, aiContent } = data;
  const repoDescMap = Object.fromEntries((aiContent.repos || []).map(r => [r.name, r.description]));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${user.name} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#fafaf8;--fg:#111;--fg2:#555;--border:#e5e5e0;--accent:#111;--card:#fff}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6}
a{color:inherit;text-decoration:none}
.container{max-width:780px;margin:0 auto;padding:0 24px}
header{padding:80px 0 60px;border-bottom:1px solid var(--border)}
.avatar{width:72px;height:72px;border-radius:50%;object-fit:cover;margin-bottom:28px}
.name{font-family:'Fraunces',serif;font-size:2.8rem;font-weight:300;line-height:1.1;margin-bottom:8px}
.tagline{font-size:1rem;color:var(--fg2);margin-bottom:20px}
.bio{font-size:0.95rem;color:var(--fg2);max-width:520px;line-height:1.8}
.meta{display:flex;gap:20px;margin-top:24px;font-size:0.85rem;color:var(--fg2)}
section{padding:60px 0;border-bottom:1px solid var(--border)}
h2{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:300;font-style:italic;margin-bottom:32px}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.skill{padding:6px 14px;border:1px solid var(--border);border-radius:100px;font-size:0.82rem;color:var(--fg2)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;transition:border-color 0.2s}
.card:hover{border-color:#999}
.card-name{font-weight:500;font-size:0.95rem;margin-bottom:8px}
.card-desc{font-size:0.85rem;color:var(--fg2);line-height:1.6;margin-bottom:16px}
.card-footer{display:flex;align-items:center;justify-content:flex-end}
.card-link{padding:4px 12px;border:1px solid var(--border);border-radius:100px;font-size:0.78rem}
.card-link:hover{background:#f0f0f0}
/* Education */
.edu-list{display:flex;flex-direction:column;gap:20px}
.edu-item{padding:20px 24px;background:var(--card);border:1px solid var(--border);border-radius:12px;position:relative}
.edu-degree{font-weight:500;font-size:0.95rem;margin-bottom:4px;outline:none;min-width:40px}
.edu-school{font-size:0.88rem;color:var(--fg2);outline:none;min-width:40px}
.edu-year{font-size:0.8rem;color:var(--fg2);margin-top:6px;outline:none;min-width:40px}
[contenteditable]:focus{background:rgba(0,0,0,0.03);border-radius:4px;padding:1px 4px;margin:-1px -4px}
[contenteditable]:empty:before{content:attr(data-placeholder);color:#bbb;pointer-events:none}
.edu-actions{display:flex;gap:8px;margin-top:16px}
.edu-add-btn,.edu-remove-btn{padding:5px 12px;border:1px solid var(--border);border-radius:100px;font-size:0.78rem;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;color:var(--fg2)}
.edu-add-btn:hover{background:#f0f0f0}
.edu-remove-btn:hover{background:#fff0f0;border-color:#f0a0a0;color:#c00}
.edit-hint{font-size:0.78rem;color:#bbb;margin-bottom:16px;font-style:italic}
footer{padding:40px 0;font-size:0.82rem;color:var(--fg2)}
</style>
</head>
<body>
<div class="container">
<header>
  <img class="avatar" src="${user.avatar}" alt="${user.name}">
  <h1 class="name">${user.name}</h1>
  <p class="tagline">${aiContent.tagline || user.username}</p>
  <p class="bio">${aiContent.bio || user.bio}</p>
  <div class="meta">
    ${user.location ? `<span>📍 ${user.location}</span>` : ''}
    ${user.website ? `<a href="${user.website}" target="_blank">🔗 Website</a>` : ''}
    <a href="https://github.com/${user.username}" target="_blank">⌥ GitHub</a>
    <span>${user.followers} followers · ${user.public_repos} repos</span>
  </div>
</header>

<section>
  <h2>Skills</h2>
  <p style="font-size:0.9rem;color:var(--fg2);margin-bottom:20px">${aiContent.skills_intro}</p>
  <div class="skills">
    ${topLanguages.map(l => `<span class="skill">${l}</span>`).join('')}
  </div>
</section>

<section>
  <h2>Education</h2>
  <p class="edit-hint">✏️ Click any field to edit</p>
  <div class="edu-list" id="edu-list">
    <div class="edu-item">
      <div class="edu-degree" contenteditable="true" data-placeholder="Degree / Certification">Bachelor of Science in Computer Science</div>
      <div class="edu-school" contenteditable="true" data-placeholder="School / Institution">University Name</div>
      <div class="edu-year" contenteditable="true" data-placeholder="Year or date range">2018 – 2022</div>
    </div>
  </div>
  <div class="edu-actions">
    <button class="edu-add-btn" onclick="addEdu()">+ Add education</button>
  </div>
</section>

<section>
  <h2>Projects</h2>
  <div class="grid">
    ${repos.map(r => `
    <div class="card">
      <div class="card-name">${r.name}</div>
      <div class="card-desc">${repoDescMap[r.name] || r.description || 'No description.'}</div>
      <div class="card-footer">
        <a class="card-link" href="${r.url}" target="_blank">View →</a>
      </div>
    </div>`).join('')}
  </div>
</section>

<footer>Built with Dev Portfolio Generator · <a href="https://github.com/${user.username}">@${user.username}</a></footer>
</div>
<script>
function addEdu() {
  const list = document.getElementById('edu-list');
  const item = document.createElement('div');
  item.className = 'edu-item';
  item.innerHTML = \`
    <div class="edu-degree" contenteditable="true" data-placeholder="Degree / Certification"></div>
    <div class="edu-school" contenteditable="true" data-placeholder="School / Institution"></div>
    <div class="edu-year" contenteditable="true" data-placeholder="Year or date range"></div>
    <button class="edu-remove-btn" onclick="this.closest('.edu-item').remove()" style="margin-top:12px">✕ Remove</button>
  \`;
  list.appendChild(item);
  item.querySelector('[contenteditable]').focus();
}
</script>
</body>
</html>`;
}