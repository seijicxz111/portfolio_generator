export function pixel(data) {
  const { user, repos, topLanguages, aiContent } = data;
  const repoDescMap = Object.fromEntries((aiContent.repos || []).map(r => [r.name, r.description]));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${user.name} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
:root{--bg:#0f0e17;--fg:#e8f4d9;--fg2:#7eb87e;--accent:#aaff00;--border:#2a3a2a;--card:#131a13}
body{font-family:'VT323',monospace;background:var(--bg);color:var(--fg);font-size:18px;line-height:1.5}
a{color:var(--accent);text-decoration:none}
.container{max-width:860px;margin:0 auto;padding:0 20px}
.scanline{position:fixed;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px);pointer-events:none;z-index:999}
header{padding:60px 0 40px}
.pixel-border{border:3px solid var(--accent);padding:20px;display:inline-block;margin-bottom:24px;position:relative}
.pixel-border::before{content:'';position:absolute;top:4px;left:4px;right:-4px;bottom:-4px;border:3px solid var(--fg2);z-index:-1}
.avatar{width:80px;height:80px;object-fit:cover;display:block;border:3px solid var(--accent)}
.name{font-family:'Press Start 2P',monospace;font-size:1.3rem;color:var(--accent);line-height:1.6;margin-bottom:12px;margin-top:20px}
.tagline{color:var(--fg2);margin-bottom:12px;font-size:1.1rem}
.bio{color:var(--fg);font-size:1rem;max-width:600px;line-height:1.6}
.meta{display:flex;flex-wrap:wrap;gap:16px;margin-top:20px;font-size:0.95rem;color:var(--fg2)}
.blink{animation:blink 1s step-end infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
section{padding:48px 0;border-top:2px dashed var(--border)}
h2{font-family:'Press Start 2P',monospace;font-size:0.75rem;color:var(--accent);margin-bottom:28px;letter-spacing:2px}
h2::before{content:'> '}
.skills{display:flex;flex-wrap:wrap;gap:10px}
.skill{padding:6px 14px;border:2px solid var(--fg2);background:var(--card);font-size:0.95rem;color:var(--fg2)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
.card{background:var(--card);border:2px solid var(--border);padding:20px;position:relative;transition:border-color 0.1s}
.card::after{content:'';position:absolute;bottom:-4px;right:-4px;width:100%;height:100%;border:2px solid var(--fg2);z-index:-1}
.card:hover{border-color:var(--accent)}
.card-name{font-family:'Press Start 2P',monospace;font-size:0.6rem;color:var(--accent);margin-bottom:10px;letter-spacing:1px}
.card-desc{font-size:1rem;color:var(--fg);line-height:1.5;margin-bottom:14px}
.card-footer{display:flex;align-items:center;gap:12px;font-size:0.9rem;color:var(--fg2)}
.card-link{margin-left:auto;color:var(--accent);border:1px solid var(--accent);padding:2px 10px}
.hp-bar{display:inline-block;width:60px;height:8px;background:var(--border);position:relative;vertical-align:middle}
.hp-fill{height:100%;background:var(--accent)}
footer{padding:32px 0;font-size:0.9rem;color:var(--border);border-top:2px dashed var(--border)}
footer span{color:var(--fg2)}
</style>
</head>
<body>
<div class="scanline"></div>
<div class="container">
<header>
  <div class="pixel-border">
    <img class="avatar" src="${user.avatar}" alt="${user.name}">
  </div>
  <h1 class="name">${user.name}<span class="blink">_</span></h1>
  <p class="tagline">// ${aiContent.tagline || user.username}</p>
  <p class="bio">${aiContent.bio || user.bio}</p>
  <div class="meta">
    ${user.location ? `<span>[ 📍 ${user.location} ]</span>` : ''}
    ${user.website ? `<a href="${user.website}" target="_blank">[ SITE ]</a>` : ''}
    <a href="https://github.com/${user.username}" target="_blank">[ GITHUB ]</a>
    <span>FOLLOWERS: ${user.followers} | REPOS: ${user.public_repos}</span>
  </div>
</header>

<section>
  <h2>SKILLS</h2>
  <div class="skills">
    ${topLanguages.map(l => `<span class="skill">${l}</span>`).join('')}
  </div>
</section>

<section>
  <h2>PROJECTS</h2>
  <div class="grid">
    ${repos.map(r => `
    <div class="card">
      <div class="card-name">${r.name}</div>
      <div class="card-desc">${repoDescMap[r.name] || r.description || 'No description.'}</div>
      <div class="card-footer">
        ${r.language ? `<span>${r.language}</span>` : ''}
        <span>⭐${r.stars}</span>
        <a class="card-link" href="${r.url}" target="_blank">OPEN</a>
      </div>
    </div>`).join('')}
  </div>
</section>

<footer>// BUILT WITH DEV PORTFOLIO GENERATOR &nbsp;|&nbsp; <span>@${user.username}</span></footer>
</div>
</body>
</html>`;
}
