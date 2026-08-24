<script lang="ts">
  import { theme } from './theme';
  import type { ReleaseInfo } from './types';
  import { DISCORD_URL, GITHUB_URL } from './pricing';
  import { Sun, Moon, Download, MessageSquare, Menu, X } from '@lucide/svelte';

  interface Props {
    release?: ReleaseInfo;
  }

  let { release }: Props = $props();

  let isDark = $state(true);
  let mobileMenuOpen = $state(false);

  function toggleTheme() {
    theme.toggleMode();
    isDark = theme.mode === 'dark';
  }
</script>

<header class="navbar-wrapper glass">
  <div class="container navbar-container">
    <a href="./" class="brand-link">
      <img src="./app-icon.png" alt="" class="brand-icon" width="36" height="36" />
      <span class="brand-title">Phoenix</span>
      {#if release?.available && release.version}
        <span class="version-tag">{release.version}</span>
      {/if}
    </a>

    <nav class="nav-links desktop-only" aria-label="Primary">
      <a href="#problem" class="nav-item">Why</a>
      <a href="#journey" class="nav-item">Journey</a>
      <a href="#gallery" class="nav-item">Product</a>
      <a href="#pricing" class="nav-item">Tools</a>
      <a href="#download" class="nav-item">Download</a>
    </nav>

    <div class="nav-actions">
      <button
        class="icon-btn"
        onclick={toggleTheme}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label="Toggle theme"
        type="button"
      >
        {#if isDark}
          <Sun size={18} />
        {:else}
          <Moon size={18} />
        {/if}
      </button>

      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        class="icon-btn"
        title="Discord"
        aria-label="Join Discord"
      >
        <MessageSquare size={18} />
      </a>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        class="icon-btn"
        title="GitHub"
        aria-label="GitHub repository"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </a>

      <a href="#download" class="btn btn-primary nav-download-btn desktop-only">
        <Download size={16} />
        <span>Download free</span>
      </a>

      <button
        class="icon-btn mobile-only"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label="Toggle menu"
        type="button"
      >
        {#if mobileMenuOpen}
          <X size={20} />
        {:else}
          <Menu size={20} />
        {/if}
      </button>
    </div>
  </div>

  {#if mobileMenuOpen}
    <div class="mobile-nav-menu">
      <a href="#problem" class="mobile-nav-item" onclick={() => (mobileMenuOpen = false)}>Why Phoenix</a>
      <a href="#journey" class="mobile-nav-item" onclick={() => (mobileMenuOpen = false)}>Journey</a>
      <a href="#gallery" class="mobile-nav-item" onclick={() => (mobileMenuOpen = false)}>Product</a>
      <a href="#pricing" class="mobile-nav-item" onclick={() => (mobileMenuOpen = false)}>Free &amp; Tools</a>
      <a href="#download" class="mobile-nav-item" onclick={() => (mobileMenuOpen = false)}>Download</a>
    </div>
  {/if}
</header>

<style>
  .navbar-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid var(--ph-border);
  }

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--ph-nav-h);
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--ph-text);
  }

  .brand-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--ph-radius-sm);
  }

  .brand-title {
    font-family: var(--ph-font-display);
    font-size: 1.35rem;
    font-weight: 550;
    letter-spacing: -0.02em;
  }

  .version-tag {
    font-size: 0.7rem;
    font-family: var(--ph-font-mono);
    padding: 2px 7px;
    border-radius: var(--ph-radius-sm);
    background: var(--ph-accent-muted);
    color: var(--ph-text-muted);
    border: 1px solid var(--ph-border);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .nav-item {
    text-decoration: none;
    color: var(--ph-text-muted);
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.15s ease;
  }

  .nav-item:hover {
    color: var(--ph-text);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon-btn {
    background: transparent;
    border: 1px solid var(--ph-border);
    color: var(--ph-text-muted);
    width: 36px;
    height: 36px;
    border-radius: var(--ph-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
  }

  .icon-btn:hover {
    border-color: var(--ph-border-strong);
    color: var(--ph-text);
    background: var(--ph-accent-subtle);
  }

  .nav-download-btn {
    padding: 8px 14px;
    font-size: 0.85rem;
    margin-left: 4px;
  }

  .mobile-nav-menu {
    display: flex;
    flex-direction: column;
    padding: 12px 24px 20px;
    border-top: 1px solid var(--ph-border);
    gap: 12px;
  }

  .mobile-nav-item {
    color: var(--ph-text);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 6px 0;
  }

  .desktop-only {
    display: flex;
  }

  .mobile-only {
    display: none;
  }

  @media (max-width: 820px) {
    .desktop-only {
      display: none !important;
    }
    .mobile-only {
      display: flex !important;
    }
  }
</style>
