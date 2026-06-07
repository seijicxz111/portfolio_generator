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
.header-left{}
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
.card-footer{display:flex;align-items:center;gap:12px;font-size:0.75rem;text-transform:uppercase}
.card-link{margin-left:auto;padding:4px 12px;border:1px solid currentColor;font-size:0.7rem;letter-spacing:1px}
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
  <h2>Work</h2>
  <div class="grid">
    ${repos.map((r, i) => `
    <div class="card">
      <div class="card-num">0${i + 1}</div>
      <div class="card-name">${r.name}</div>
      <div class="card-desc">${repoDescMap[r.name] || r.description || 'No description.'}</div>
      <div class="card-footer">
        ${r.language ? `<span>${r.language}</span>` : ''}
        <span>★ ${r.stars}</span>
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
</body>
</html>`;
}
