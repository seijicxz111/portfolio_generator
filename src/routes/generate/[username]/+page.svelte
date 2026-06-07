<script>
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { exportPortfolio } from '$lib/exportZip.js';
  import { minimal } from '$lib/themes/minimal.js';
  import { pixel } from '$lib/themes/pixel.js';
  import { brutalist } from '$lib/themes/brutalist.js';
  import { glassmorphism } from '$lib/themes/glassmorphism.js';

  export let data;

  const THEMES = [
    { id: 'minimal', label: 'Minimal', desc: 'Clean & editorial', icon: '◻' },
    { id: 'pixel', label: 'Pixel', desc: '8-bit retro', icon: '▦' },
    { id: 'brutalist', label: 'Brutalist', desc: 'Raw & bold', icon: '▬' },
    { id: 'glassmorphism', label: 'Glass', desc: 'Dark frosted', icon: '◈' },
  ];

  const GENERATORS = { minimal, pixel, brutalist, glassmorphism };

  let selectedTheme = 'minimal';
  let exporting = false;
  let previewHtml = '';

  $: if (data && !data.error) {
    previewHtml = GENERATORS[selectedTheme](data);
  }

  async function handleExport() {
    exporting = true;
    await exportPortfolio(previewHtml, data.username);
    exporting = false;
  }
</script>

<svelte:head>
  <title>{data.user?.name || data.username} — Portfolio Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=Karla:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

{#if data.error}
  <div class="error-page">
    <div class="error-box">
      <span class="error-icon">✗</span>
      <h2>Couldn't load profile</h2>
      <p>{data.error}</p>
      <a href="/">← Try another username</a>
    </div>
  </div>
{:else}
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-inner">
        <a href="/" class="back">← Back</a>

        <div class="user-info">
          <img src={data.user.avatar} alt={data.user.name} class="avatar" />
          <div>
            <div class="user-name">{data.user.name}</div>
            <div class="user-handle">@{data.user.username}</div>
          </div>
        </div>

        <div class="section-label">Theme</div>
        <div class="theme-list">
          {#each THEMES as theme}
            <button
              class="theme-btn"
              class:active={selectedTheme === theme.id}
              on:click={() => selectedTheme = theme.id}
            >
              <span class="theme-icon">{theme.icon}</span>
              <div>
                <div class="theme-name">{theme.label}</div>
                <div class="theme-desc">{theme.desc}</div>
              </div>
              {#if selectedTheme === theme.id}
                <span class="check">✓</span>
              {/if}
            </button>
          {/each}
        </div>

        <div class="section-label">Stats</div>
        <div class="stats">
          <div class="stat"><span class="stat-val">{data.user.public_repos}</span><span class="stat-label">Repos</span></div>
          <div class="stat"><span class="stat-val">{data.user.followers}</span><span class="stat-label">Followers</span></div>
          <div class="stat"><span class="stat-val">{data.repos.length}</span><span class="stat-label">Featured</span></div>
        </div>

        <div class="section-label">Languages</div>
        <div class="langs">
          {#each data.topLanguages as lang}
            <span class="lang-tag">{lang}</span>
          {/each}
        </div>

        <button class="export-btn" on:click={handleExport} disabled={exporting}>
          {#if exporting}
            <span class="spinner"></span> Packing...
          {:else}
            ↓ Export as ZIP
          {/if}
        </button>
        <p class="export-hint">Download a full, standalone website you can customize and deploy anywhere.</p>
      </div>
    </aside>

    <!-- Preview -->
    <main class="preview-area">
      <div class="preview-bar">
        <div class="browser-dots">
          <span></span><span></span><span></span>
        </div>
        <div class="preview-url">portfolio-preview — {selectedTheme}</div>
        <button class="open-btn" on:click={() => {
          const w = window.open('', '_blank');
          w.document.write(previewHtml);
          w.document.close();
        }}>Open fullscreen ↗</button>
      </div>
      <iframe
        title="Portfolio Preview"
        srcdoc={previewHtml}
        sandbox="allow-same-origin"
        class="preview-frame"
      ></iframe>
    </main>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    background: #0a0b10;
    color: #e2e4f0;
    font-family: 'Karla', sans-serif;
  }

  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 280px;
    flex-shrink: 0;
    background: #0e0f16;
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow-y: auto;
  }

  .sidebar-inner {
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100%;
  }

  .back {
    color: #555;
    text-decoration: none;
    font-size: 0.82rem;
    transition: color 0.15s;
  }
  .back:hover { color: #e2e4f0; }

  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #fff;
  }

  .user-handle { font-size: 0.78rem; color: #555; }

  .section-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #444;
    margin-top: 4px;
  }

  .theme-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .theme-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    color: #888;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s;
    font-family: 'Karla', sans-serif;
  }

  .theme-btn:hover { border-color: rgba(255,255,255,0.12); color: #ccc; }
  .theme-btn.active { border-color: rgba(124,106,251,0.5); background: rgba(124,106,251,0.08); color: #e2e4f0; }

  .theme-icon { font-size: 1.1rem; width: 20px; text-align: center; }
  .theme-name { font-size: 0.88rem; font-weight: 500; color: inherit; }
  .theme-desc { font-size: 0.75rem; color: #555; margin-top: 1px; }
  .check { margin-left: auto; color: #7c6afb; font-size: 0.85rem; }

  .stats {
    display: flex;
    gap: 8px;
  }

  .stat {
    flex: 1;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 12px 8px;
    text-align: center;
  }

  .stat-val { display: block; font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 700; color: #fff; }
  .stat-label { font-size: 0.7rem; color: #555; }

  .langs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .lang-tag {
    padding: 4px 10px;
    border-radius: 100px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    font-size: 0.75rem;
    color: #888;
  }

  .export-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #7c6afb, #60a5fa);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: auto;
  }

  .export-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  .export-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .export-hint { font-size: 0.75rem; color: #444; text-align: center; line-height: 1.5; }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .preview-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .preview-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: #0e0f16;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .browser-dots {
    display: flex;
    gap: 5px;
  }
  .browser-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
  }

  .preview-url {
    flex: 1;
    font-size: 0.78rem;
    color: #555;
    background: rgba(255,255,255,0.04);
    padding: 4px 12px;
    border-radius: 6px;
  }

  .open-btn {
    padding: 6px 14px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #888;
    font-family: 'Karla', sans-serif;
    font-size: 0.78rem;
    cursor: pointer;
    transition: color 0.15s;
    background-image: none;
    gradient: none;
  }
  .open-btn:hover { color: #e2e4f0; }

  .preview-frame {
    flex: 1;
    width: 100%;
    border: none;
    background: #fff;
  }

  /* Error page */
  .error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-box {
    text-align: center;
    padding: 48px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
  }

  .error-icon { font-size: 2rem; color: #f87171; display: block; margin-bottom: 16px; }

  .error-box h2 {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    margin-bottom: 8px;
    color: #fff;
  }

  .error-box p { color: #888; margin-bottom: 24px; font-size: 0.9rem; }
  .error-box a { color: #7c6afb; text-decoration: none; font-size: 0.9rem; }
  .error-box a:hover { text-decoration: underline; }
</style>
