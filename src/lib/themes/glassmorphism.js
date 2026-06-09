export function glassmorphism(data) {
  const { user, repos, topLanguages, aiContent } = data;
  const repoDescMap = Object.fromEntries((aiContent.repos || []).map(r => [r.name, r.description]));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${user.name} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#080b14;--fg:#e8eaf6;--fg2:#9ea3c0;--accent:#7c6afb;--accent2:#e040fb;--border:rgba(255,255,255,0.08);--glass:rgba(255,255,255,0.04)}
body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6;min-height:100vh;overflow-x:hidden}
a{color:var(--accent);text-decoration:none}
.orbs{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0}
.orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.35}
.orb1{width:500px;height:500px;background:var(--accent);top:-100px;left:-100px}
.orb2{width:400px;height:400px;background:var(--accent2);bottom:-80px;right:-80px}
.orb3{width:300px;height:300px;background:#00bcd4;top:50%;left:50%;transform:translate(-50%,-50%)}
.container{max-width:860px;margin:0 auto;padding:0 24px;position:relative;z-index:1}
.glass{background:var(--glass);border:1px solid var(--border);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:20px}
header{padding:80px 0 60px;text-align:center}
.avatar-wrap{position:relative;display:inline-block;margin-bottom:28px}
.avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid var(--border)}
.avatar-ring{position:absolute;inset:-6px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));padding:2px;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;-webkit-mask-composite:xor}
.name{font-size:2.8rem;font-weight:600;background:linear-gradient(135deg,#fff 30%,var(--fg2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
.tagline{font-size:1rem;color:var(--fg2);margin-bottom:20px}
.bio{font-size:0.95rem;color:var(--fg2);max-width:520px;margin:0 auto 28px;line-height:1.8}
.badges{display:flex;justify-content:center;flex-wrap:wrap;gap:10px}
.badge{padding:6px 16px;border-radius:100px;background:var(--glass);border:1px solid var(--border);font-size:0.82rem;color:var(--fg2)}
section{padding:60px 0}
h2{font-size:1.1rem;font-weight:500;color:var(--fg2);text-transform:uppercase;letter-spacing:3px;margin-bottom:28px;display:flex;align-items:center;gap:12px}
h2::before{content:'';width:24px;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent2))}
.skills{display:flex;flex-wrap:wrap;gap:10px}
.skill{padding:8px 18px;border-radius:100px;background:var(--glass);border:1px solid var(--border);font-size:0.88rem;color:var(--fg);backdrop-filter:blur(10px)}
.skill:hover{border-color:var(--accent);color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.card{padding:24px;transition:transform 0.2s,border-color 0.2s}
.card:hover{transform:translateY(-4px);border-color:rgba(124,106,251,0.4)}
.card-name{font-size:1rem;font-weight:500;margin-bottom:8px}
.card-desc{font-size:0.85rem;color:var(--fg2);line-height:1.7;margin-bottom:16px}
.card-footer{display:flex;align-items:center;justify-content:flex-end}
.card-link{padding:6px 14px;border-radius:100px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-size:0.8rem;font-weight:500}
/* Education */
.edu-list{display:flex;flex-direction:column;gap:12px}
.edu-item{padding:20px 24px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.edu-left{flex:1}
.edu-degree{font-size:0.95rem;font-weight:500;color:var(--fg);outline:none;min-width:40px;display:block;margin-bottom:5px}
.edu-school{font-size:0.85rem;color:var(--fg2);outline:none;min-width:40px;display:block}
.edu-year{font-size:0.82rem;color:var(--accent);background:rgba(124,106,251,0.12);border:1px solid rgba(124,106,251,0.25);border-radius:100px;padding:3px 12px;white-space:nowrap;outline:none;min-width:40px;text-align:center}
[contenteditable]:focus{background:rgba(124,106,251,0.08);outline:1px solid rgba(124,106,251,0.4);border-radius:6px;padding:2px 6px}
[contenteditable]:empty:before{content:attr(data-placeholder);color:rgba(255,255,255,0.2);pointer-events:none}
.edu-year:focus{border-radius:100px}
.edu-actions{margin-top:14px;display:flex;gap:10px}
.edu-add-btn,.edu-remove-btn{padding:7px 18px;border-radius:100px;background:var(--glass);border:1px solid var(--border);color:var(--fg2);font-family:'Outfit',sans-serif;font-size:0.82rem;cursor:pointer}
.edu-add-btn:hover{border-color:var(--accent);color:var(--accent)}
.edu-remove-btn:hover{border-color:rgba(224,64,251,0.5);color:var(--accent2)}
.edit-hint{font-size:0.8rem;color:rgba(255,255,255,0.2);margin-bottom:16px;letter-spacing:0.5px}
footer{padding:40px 0;text-align:center;font-size:0.82rem;color:var(--fg2);border-top:1px solid var(--border)}
</style>
</head>
<body>
<div class="orbs">
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>
</div>
<div class="container">
<header>
  <div class="avatar-wrap">
    <div class="avatar-ring"></div>
    <img class="avatar" src="${user.avatar}" alt="${user.name}">
  </div>
  <h1 class="name">${user.name}</h1>
  <p class="tagline">${aiContent.tagline || user.username}</p>
  <p class="bio">${aiContent.bio || user.bio}</p>
  <div class="badges">
    ${user.location ? `<span class="badge">📍 ${user.location}</span>` : ''}
    <span class="badge">👥 ${user.followers} followers</span>
    <span class="badge">📦 ${user.public_repos} repos</span>
    ${user.website ? `<a class="badge" href="${user.website}" target="_blank">🔗 Website</a>` : ''}
    <a class="badge" href="https://github.com/${user.username}" target="_blank">⌥ GitHub</a>
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
  <p class="edit-hint">✏ Click any field to edit live</p>
  <div class="edu-list" id="edu-list">
    <div class="edu-item glass">
      <div class="edu-left">
        <span class="edu-degree" contenteditable="true" data-placeholder="Degree / Certification">Bachelor of Science in Computer Science</span>
        <span class="edu-school" contenteditable="true" data-placeholder="School / Institution">University Name</span>
      </div>
      <span class="edu-year" contenteditable="true" data-placeholder="Year">2018 – 2022</span>
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
    <div class="card glass">
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
  item.className = 'edu-item glass';
  item.innerHTML = \`
    <div class="edu-left">
      <span class="edu-degree" contenteditable="true" data-placeholder="Degree / Certification"></span>
      <span class="edu-school" contenteditable="true" data-placeholder="School / Institution"></span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
      <span class="edu-year" contenteditable="true" data-placeholder="Year"></span>
      <button class="edu-remove-btn" onclick="this.closest('.edu-item').remove()">✕ Remove</button>
    </div>
  \`;
  list.appendChild(item);
  item.querySelector('[contenteditable]').focus();
}
</script>
</body>
</html>`;
}