<script>
  import { goto } from '$app/navigation';

  let username = $state('');
  let loading = $state(false);
  let error = $state('');

  async function generate() {
    if (!username.trim()) return;
    error = '';
    loading = true;

    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(username.trim())}`);
      if (!res.ok) {
        const data = await res.json();
        error = data.error || 'User not found.';
        loading = false;
        return;
      }
      goto(`/generate/${username.trim()}`);
    } catch {
      error = 'Something went wrong. Try again.';
      loading = false;
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') generate();
  }

  const THEMES = [
    { id: 'minimal', label: 'Minimal', desc: 'Clean & editorial', color: '#f5f5f2', text: '#111', accent: '#111' },
    { id: 'pixel', label: 'Pixel', desc: '8-bit retro vibes', color: '#0f0e17', text: '#aaff00', accent: '#aaff00' },
    { id: 'brutalist', label: 'Brutalist', desc: 'Raw & bold', color: '#f0ede8', text: '#0a0a0a', accent: '#ff2d00' },
    { id: 'glassmorphism', label: 'Glass', desc: 'Dark frosted glass', color: '#080b14', text: '#7c6afb', accent: '#7c6afb' },
  ];
</script>

<svelte:head>
  <title>Dev Portfolio Generator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Karla:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

<main>
  <div class="noise"></div>

  <section class="hero">
    <div class="hero-inner">
      <div class="badge">✦ Free · Open · Exportable</div>
      <h1>Turn your GitHub into a <em>real portfolio.</em></h1>
      <p class="sub">Enter your GitHub username, we fetch your repos, write your bio with AI, let you pick a theme, and export a fully ownable website. No lock-in. No account needed.</p>

      <div class="input-group">
        <span class="gh-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </span>
        <input
          bind:value={username}
          on:keydown={handleKey}
          placeholder="your-github-username"
          disabled={loading}
          autocomplete="off"
          spellcheck="false"
        />
        <button on:click={generate} disabled={loading || !username.trim()}>
          {#if loading}
            <span class="spinner"></span>
          {:else}
            Generate →
          {/if}
        </button>
      </div>

      {#if error}
        <p class="error">✗ {error}</p>
      {/if}

      <p class="hint">Try: <button class="try-btn" on:click={() => { username = 'torvalds'; }}>torvalds</button> · <button class="try-btn" on:click={() => { username = 'gaearon'; }}>gaearon</button> · <button class="try-btn" on:click={() => { username = 'sindresorhus'; }}>sindresorhus</button></p>
    </div>
  </section>

  <section class="themes-section">
    <p class="themes-label">4 themes to choose from</p>
    <div class="themes-grid">
      {#each THEMES as theme}
        <div class="theme-card" style="background:{theme.color};color:{theme.text}">
          <div class="theme-accent" style="background:{theme.accent}"></div>
          <div class="theme-info">
            <span class="theme-name" style="color:{theme.text}">{theme.label}</span>
            <span class="theme-desc" style="opacity:0.55">{theme.desc}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="steps">
    <div class="step"><span class="step-num">01</span><span>Enter GitHub username</span></div>
    <div class="step-sep">→</div>
    <div class="step"><span class="step-num">02</span><span>AI writes your bio</span></div>
    <div class="step-sep">→</div>
    <div class="step"><span class="step-num">03</span><span>Pick a theme</span></div>
    <div class="step-sep">→</div>
    <div class="step"><span class="step-num">04</span><span>Export & own it</span></div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #0a0b10;
    color: #e2e4f0;
    font-family: 'Karla', sans-serif;
  }

  main {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .noise {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .hero {
    position: relative;
    z-index: 1;
    padding: 100px 20px 60px;
    display: flex;
    justify-content: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(130, 100, 255, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-inner {
    max-width: 620px;
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 0.78rem;
    color: #888;
    letter-spacing: 1px;
    margin-bottom: 28px;
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 6vw, 3.8rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    color: #fff;
    letter-spacing: -1px;
  }

  h1 em {
    font-style: normal;
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sub {
    font-size: 1rem;
    color: #888;
    line-height: 1.8;
    margin-bottom: 36px;
    font-weight: 300;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    padding: 6px 6px 6px 16px;
    transition: border-color 0.2s;
    margin-bottom: 14px;
  }

  .input-group:focus-within {
    border-color: rgba(167, 139, 250, 0.5);
  }

  .gh-icon {
    color: #666;
    margin-right: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e2e4f0;
    font-family: 'Karla', monospace;
    font-size: 1rem;
    padding: 8px 0;
  }

  input::placeholder { color: #444; }
  input:disabled { opacity: 0.5; }

  button {
    padding: 10px 22px;
    border-radius: 10px;
    background: linear-gradient(135deg, #7c6afb, #60a5fa);
    border: none;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  button:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  button:disabled { opacity: 0.4; cursor: not-allowed; }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .error { color: #f87171; font-size: 0.85rem; margin-top: 8px; }

  .hint {
    font-size: 0.82rem;
    color: #555;
    margin-top: 12px;
  }

  .try-btn {
    background: none;
    border: none;
    color: #7c6afb;
    cursor: pointer;
    padding: 0;
    font-family: 'Karla', sans-serif;
    font-size: 0.82rem;
    text-decoration: underline;
    gradient: none;
    background-image: none;
  }

  .try-btn:hover { opacity: 0.75; transform: none; }

  .themes-section {
    position: relative;
    z-index: 1;
    padding: 20px 20px 60px;
    text-align: center;
  }

  .themes-label {
    font-size: 0.8rem;
    color: #555;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .themes-grid {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 620px;
    margin: 0 auto;
  }

  .theme-card {
    width: 130px;
    height: 90px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s;
  }

  .theme-card:hover { transform: translateY(-3px); }

  .theme-accent {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    opacity: 0.8;
  }

  .theme-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .theme-name { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; }
  .theme-desc { font-size: 0.7rem; }

  .steps {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 20px 80px;
    flex-wrap: wrap;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: #666;
  }

  .step-num {
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    color: #7c6afb;
    font-weight: 700;
  }

  .step-sep { color: #333; font-size: 0.9rem; }
</style>