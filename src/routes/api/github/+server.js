import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const username = url.searchParams.get('username');
  if (!username) return json({ error: 'Username required' }, { status: 400 });

  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'dev-portfolio-gen'
  };

  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userRes.ok) return json({ error: 'User not found' }, { status: 404 });
  const user = await userRes.json();

  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=10&type=public`,
    { headers }
  );
  const allRepos = await reposRes.json();
  const repos = allRepos.filter(r => !r.fork).slice(0, 6);

  const langMap = {};
  allRepos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
  const topLanguages = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([l]) => l);

  return json({
    user: {
      name: user.name || username,
      username: user.login,
      bio: user.bio || '',
      avatar: user.avatar_url,
      location: user.location || '',
      website: user.blog || '',
      twitter: user.twitter_username || '',
      followers: user.followers,
      public_repos: user.public_repos,
    },
    repos: repos.map(r => ({
      name: r.name,
      description: r.description || '',
      language: r.language || '',
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      homepage: r.homepage || '',
    })),
    topLanguages,
  });
}
