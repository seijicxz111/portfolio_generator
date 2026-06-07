export async function load({ params, fetch }) {
  const { username } = params;

  const githubRes = await fetch(`/api/github?username=${encodeURIComponent(username)}`);
  if (!githubRes.ok) {
    const err = await githubRes.json();
    return { error: err.error || 'GitHub user not found.', username };
  }

  const githubData = await githubRes.json();

  const aiRes = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(githubData),
  });

  const aiContent = await aiRes.json();

  return { ...githubData, aiContent, username };
}
