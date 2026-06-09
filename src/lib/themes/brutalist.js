export function brutalist(data) {
  const { user, repos, topLanguages, aiContent } = data;
  const repoDescMap = Object.fromEntries((aiContent.repos || []).map(r => [r.name, r.description]));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${user.name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#f0ede8;--fg:#0a0a0a;--accent:#ff2d00;--border:#0a0a0a;--card:#fff}
body{font-family:'IBM Plex Mono',monospace;background:var(--bg);color:var(--fg);line-height:1.5}
a{color:inherit;text-decoration:none}
.container{max-width:900px;margin:0 auto;padding:0 20px}
header{border-bottom:4px solid var(--fg);padding:40px 0;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start}
.name{font-family:'Bebas Neue',sans-serif;font-size:5rem;line-height:0.9;letter-spacing:-1px;margin-bottom:16px}
.name span{color:var(--accent)}
.tagline{font-size:0.85rem;text-transform:uppercase;letter-spacing:3px;color:#555;margin-bottom:16px;border-left:3px solid var(--accent);padding-left:12px}
.bio{font-size:0.88rem;line-height:1.8;max-width:500px;color:#333}
.avatar-block{text-align:right}
.avatar{width:120px;height:120px;object-fit:cover;filter:grayscale(100%) contrast(1.2);border:3px solid var(--fg)}
.stats{display:flex;gap:0;margin-top:16px;border:2px solid var(--fg)}
.stat{padding:8px 16px;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;border-right:2px solid var(--fg)}
.stat:last-child{border-right:none}
.stat strong{display:block;font-size:1.1rem;font-family:'Bebas Neue',sans-serif;letter-spacing:1px}
section{padding:48px 0;border-bottom:3px solid var(--fg)}
h2{font-family:'Bebas Neue',sans-serif;font-size:3rem;letter-spacing:1px;margin-bottom:24px;display:flex;align-items:center;gap:16px}
h2::after{content:'';flex:1;height:3px;background:var(--fg)}
.skills{display:flex;flex-wrap:wrap;gap:0}
.skill{padding:8px 16px;border:2px solid var(--fg);margin-right:-2px;margin-bottom:-2px;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;background:var(--card)}
.skill:hover{background:var(--fg);color:var(--bg)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0}
.card{background:var(--card);border:2px solid var(--fg);margin-right:-2px;margin-bottom:-2px;padding:24px;position:relative}
.card:hover{background:var(--fg);color:var(--bg)}
.card:hover .card-link{background:var(--bg);color:var(--fg)}
.card-num{font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#ddd;margin-bottom:8px;line-height:1}
.card-name{font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;font-weight:500;margin-bottom:10px}
.card-desc{font-size:0.8rem;line-height:1.7;margin-bottom:16px;opacity:0.7}
.card-footer{display:flex;align-items:center;justify-content:flex-end}
.card-link{padding:4px 12px;border:1px solid currentColor;font-size:0.7rem;letter-spacing:1px}
/* Education */
.edu-list{display:flex;flex-direction:column;gap:0}
.edu-item{border:2px solid var(--fg);margin-bottom:-2px;padding:20px 24px;background:var(--card);display:grid;grid-template-columns:1fr auto;align-items:start;gap:16px}
.edu-left{}
.edu-degree{font-size:0.82rem;text-transform:uppercase;letter-spacing:2px;font-weight:500;outline:none;min-width:40px;display:block;margin-bottom:6px}
.edu-school{font-size:0.78rem;color:#555;outline:none;min-width:40px;display:block}
.edu-year{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:1px;color:#ccc;outline:none;min-width:40px;text-align:right}
[contenteditable]:focus{background:rgba(255,45,0,0.05);outline:2px solid var(--accent);padding:1px 4px}
[contenteditable]:empty:before{content:attr(data-placeholder);color:#bbb;pointer-events:none;font-weight:400;letter-spacing:0}
.edu-actions{margin-top:12px;display:flex;gap:0}
.edu-add-btn,.edu-remove-btn{padding:8px 16px;border:2px solid var(--fg);background:transparent;font-family:'IBM Plex Mono',monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;cursor:pointer;margin-right:-2px}
.edu-add-btn:hover{background:var(--fg);color:var(--bg)}
.edu-remove-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.edit-hint{font-size:0.72rem;text-transform:uppercase;letter-spacing:2px;color:#999;margin-bottom:16px}
footer{padding:32px 0;font-size:0.75rem;text-transform:uppercase;letter-spacing:2px;color:#777;display:flex;justify-content:space-between}
</style>
</head>
<body>
<div class="container">
<header>
  <div class="header-left">
    <h1 class="name">${user.name.split(' ').join('<br>')}</h1>
    <p class="tagline">${aiContent.tagline || 'Software Developer'}</p>
    <p class="bio">${aiContent.bio || user.bio}</p>
    ${user.location || user.website ? `
    <div class="stats" style="margin-top:20px">
      ${user.location ? `<div class="stat"><strong>${user.location}</strong>Location</div>` : ''}
      <div class="stat"><strong>${user.followers}</strong>Followers</div>
      <div class="stat"><strong>${user.public_repos}</strong>Repos</div>
      ${user.website ? `<div class="stat"><a href="${user.website}" target="_blank"><strong>↗</strong>Site</a></div>` : ''}
    </div>` : ''}
  </div>
  <div class="avatar-block">
    <img class="avatar" src="${user.avatar}" alt="${user.name}">
  </div>
</header>

<section>
  <h2>Skills</h2>
  <div class="skills">
    ${topLanguages.map(l => `<span class="skill">${l}</span>`).join('')}
  </div>
</section>

<section>
  <h2>Education</h2>
  <p class="edit-hint">✏ Click any field to edit</p>
  <div class="edu-list" id="edu-list">
    <div class="edu-item">
      <div class="edu-left">
        <span class="edu-degree" contenteditable="true" data-placeholder="Degree / Certification">Bachelor of Science in Computer Science</span>
        <span class="edu-school" contenteditable="true" data-placeholder="School / Institution">University Name</span>
      </div>
      <span class="edu-year" contenteditable="true" data-placeholder="2020">2018–2022</span>
    </div>
  </div>
  <div class="edu-actions">
    <button class="edu-add-btn" onclick="addEdu()">+ Add</button>
  </div>
</section>

<section>
  <h2>Work</h2>
  <div class="grid">
    ${repos.map((r, i) => `
    <div class="card">
      <div class="card-num">0${i + 1}</div>
      <div class="card-name">${r.name}</div>
      <div class="card-desc">${repoDescMap[r.name] || r.description || 'No description.'}</div>
      <div class="card-footer">
        <a class="card-link" href="${r.url}" target="_blank">View ↗</a>
      </div>
    </div>`).join('')}
  </div>
</section>

<footer>
  <span>@${user.username}</span>
  <span>Built with Dev Portfolio Generator</span>
</footer>
</div>
<script>
function addEdu() {
  const list = document.getElementById('edu-list');
  const item = document.createElement('div');
  item.className = 'edu-item';
  item.innerHTML = \`
    <div class="edu-left">
      <span class="edu-degree" contenteditable="true" data-placeholder="Degree / Certification"></span>
      <span class="edu-school" contenteditable="true" data-placeholder="School / Institution"></span>
    </div>
    <span class="edu-year" contenteditable="true" data-placeholder="Year"></span>
  \`;
  const removeBtn = document.createElement('button');
  removeBtn.className = 'edu-remove-btn';
  removeBtn.textContent = '✕ Remove';
  removeBtn.onclick = () => item.remove();
  item.appendChild(removeBtn);
  list.appendChild(item);
  item.querySelector('[contenteditable]').focus();
}
</script>
</body>
</html>`;
}