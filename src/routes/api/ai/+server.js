import { json } from '@sveltejs/kit';
import { OPENROUTER_API_KEY } from '$env/static/private';

export async function POST({ request }) {
  const { user, repos, topLanguages } = await request.json();

  const prompt = `You are a professional portfolio copywriter for developers. Generate compelling content based on this GitHub profile.

Name: ${user.name}
Bio: ${user.bio || 'No bio'}
Location: ${user.location || 'Not specified'}
Languages: ${topLanguages.join(', ')}
Repos: ${user.public_repos}, Followers: ${user.followers}

Top Repos:
${repos.map(r => `- ${r.name}: ${r.description || 'No description'} [${r.language}, ⭐${r.stars}]`).join('\n')}

Respond ONLY with valid JSON, no markdown fences:
{
  "tagline": "punchy 6-8 word tagline capturing their developer identity",
  "bio": "2-3 sentence first-person professional bio highlighting skills and passion",
  "skills_intro": "one sentence intro for skills section",
  "repos": [${repos.map(r => `{"name":"${r.name}","description":"improved 1-sentence project description"}`).join(',')}]
}`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://dev-portfolio-gen.vercel.app',
        'X-Title': 'Dev Portfolio Generator',
      },
      body: JSON.stringify({
        model: 'poolside/laguna-m.1:free',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
      })
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    const clean = content.replace(/```json|```/g, '').trim();
    return json(JSON.parse(clean));
  } catch {
    return json({
      tagline: `${user.name} — Developer`,
      bio: user.bio || `Hi, I'm ${user.name}. I build software and love clean code.`,
      skills_intro: 'Technologies I work with:',
      repos: repos.map(r => ({ name: r.name, description: r.description || 'A project I built.' }))
    });
  }
}
