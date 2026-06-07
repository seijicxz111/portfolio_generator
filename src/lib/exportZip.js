import JSZip from 'jszip';

export async function exportPortfolio(html, username) {
  const zip = new JSZip();

  zip.file('index.html', html);
  zip.file('README.txt', `
DEV PORTFOLIO GENERATOR
========================
Generated for: @${username}

HOW TO CUSTOMIZE:
-----------------
1. Open index.html in any text editor (VS Code recommended)
2. All styles are in the <style> tag — change colors, fonts, spacing freely
3. Update your name, bio, projects, and links directly in the HTML
4. The portfolio is fully self-contained — no dependencies needed

HOW TO DEPLOY:
--------------
Option A — GitHub Pages:
  1. Create a new GitHub repo
  2. Upload index.html
  3. Go to Settings → Pages → Deploy from branch → main
  4. Your site is live at https://yourusername.github.io/reponame

Option B — Vercel:
  1. Go to vercel.com → New Project
  2. Import your GitHub repo or drag & drop the folder
  3. Done — live in seconds

Option C — Netlify:
  1. Go to netlify.com → Add new site → Deploy manually
  2. Drag & drop this folder
  3. Live instantly with a free URL

Happy coding! ✨
`.trim());

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-${username}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}
