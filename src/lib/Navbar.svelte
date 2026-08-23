<script lang="ts">
  import { theme, ACCENT_PRESETS } from './theme';
  import type { ReleaseInfo } from './types';
  import { 
    Sun, 
    Moon, 
    Download, 
    Disc3, 
    MessageSquare, 
    Sparkles, 
    Menu, 
    X 
  } from '@lucide/svelte';

  interface Props {
    release?: ReleaseInfo;
  }

  let { release }: Props = $props();

  let isDark = $state(true);
  let mobileMenuOpen = $state(false);
  let showAccentPicker = $state(false);

  function toggleTheme() {
    theme.toggleMode();
    isDark = theme.mode === 'dark';
  }

  function selectAccent(color: string) {
    theme.setAccent(color);
    showAccentPicker = false;
  }
</script>

<header class="navbar-wrapper glass">
  <div class="container navbar-container">
    <a href="/" class="brand-link">
      <img src="./app-icon.png" alt="Phoenix Icon" class="brand-icon" />
      <div class="brand-info">
        <span class="brand-title">Phoenix</span>
        <span class="version-tag">{release?.version || 'v0.1.0'}</span>
      </div>
    </a>

    <nav class="nav-links desktop-only">
      <a href="#features" class="nav-item">Features</a>
      <a href="#eq" class="nav-item">Equalizer</a>
      <a href="#editor" class="nav-item">Tag Editor</a>
      <a href="#download" class="nav-item">Download</a>
    </nav>

    <div class="nav-actions">
      <!-- Accent Picker Dropdown -->
      <div class="accent-picker-wrap">
        <button 
          class="icon-btn" 
          onclick={() => showAccentPicker = !showAccentPicker}
          title="Customize Theme Accent"
          aria-label="Customize Theme Accent"
        >
          <Sparkles size={18} />
        </button>

        {#if showAccentPicker}
          <div class="accent-dropdown glass">
            <span class="dropdown-title">Accent Color</span>
            <div class="swatches-grid">
              {#each ACCENT_PRESETS as preset}
                <button 
                  class="swatch-btn"
                  style="background-color: {preset.color};"
                  onclick={() => selectAccent(preset.color)}
                  title={preset.name}
                  aria-label={preset.name}
                ></button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Dark / Light Toggle -->
      <button 
        class="icon-btn" 
        onclick={toggleTheme}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle Theme Mode"
      >
        {#if isDark}
          <Sun size={18} />
        {:else}
          <Moon size={18} />
        {/if}
      </button>

      <!-- Discord Link -->
      <a 
        href="https://discord.gg/TPCBTUrfNT" 
        target="_blank" 
        rel="noreferrer" 
        class="icon-btn" 
        title="Join our Discord community"
        aria-label="Join Discord"
      >
        <MessageSquare size={18} />
      </a>

      <!-- GitHub Link -->
      <a 
        href="https://github.com/JamalLyons/PhoenixMusicPlayer" 
        target="_blank" 
        rel="noreferrer" 
        class="icon-btn" 
        title="View source on GitHub"
        aria-label="GitHub Repository"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </a>

      <!-- Direct CTA -->
      <a href="#download" class="btn btn-primary nav-download-btn desktop-only">
        <Download size={16} />
        <span>Get Phoenix</span>
      </a>

      <!-- Mobile Menu Toggle -->
      <button 
        class="icon-btn mobile-only" 
        onclick={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle navigation menu"
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
    <div class="mobile-nav-menu glass">
      <a href="#features" class="mobile-nav-item" onclick={() => mobileMenuOpen = false}>Features</a>
      <a href="#eq" class="mobile-nav-item" onclick={() => mobileMenuOpen = false}>Equalizer</a>
      <a href="#editor" class="mobile-nav-item" onclick={() => mobileMenuOpen = false}>Tag Editor</a>
      <a href="#download" class="mobile-nav-item" onclick={() => mobileMenuOpen = false}>Download Releases</a>
      <div class="mobile-menu-divider"></div>
      <a href="https://discord.gg/TPCBTUrfNT" target="_blank" class="mobile-nav-item" onclick={() => mobileMenuOpen = false}>
        <MessageSquare size={16} /> Discord Community
      </a>
      <a href="https://github.com/JamalLyons/PhoenixMusicPlayer" target="_blank" class="mobile-nav-item" onclick={() => mobileMenuOpen = false}>
        GitHub Releases
      </a>
    </div>
  {/if}
</header>

<style>
  .navbar-wrapper {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: 1px solid var(--ph-border);
  }

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--ph-text);
  }

  .brand-icon {
    width: 38px;
    height: 38px;
    border-radius: var(--ph-radius-sm);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .brand-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .brand-title {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--ph-text) 60%, var(--ph-accent) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .version-tag {
    font-size: 0.75rem;
    font-family: var(--ph-font-mono);
    padding: 2px 6px;
    border-radius: var(--ph-radius-sm);
    background: var(--ph-accent-muted);
    color: var(--ph-text-muted);
    border: 1px solid var(--ph-border);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-item {
    text-decoration: none;
    color: var(--ph-text-muted);
    font-size: 0.9375rem;
    font-weight: 500;
    transition: color 0.15s ease;
  }

  .nav-item:hover {
    color: var(--ph-text);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon-btn {
    background: var(--ph-surface-raised);
    border: 1px solid var(--ph-border);
    color: var(--ph-text-muted);
    width: 38px;
    height: 38px;
    border-radius: var(--ph-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .icon-btn:hover {
    border-color: var(--ph-border-strong);
    color: var(--ph-text);
    background: var(--ph-surface-overlay);
  }

  .nav-download-btn {
    padding: 8px 16px;
    font-size: 0.875rem;
    margin-left: 6px;
  }

  .accent-picker-wrap {
    position: relative;
  }

  .accent-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 170px;
    padding: 12px;
    border-radius: var(--ph-radius-md);
    box-shadow: var(--ph-shadow-md);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dropdown-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ph-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .swatches-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .swatch-btn {
    width: 32px;
    height: 32px;
    border-radius: var(--ph-radius-sm);
    border: 2px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .swatch-btn:hover {
    transform: scale(1.15);
  }

  .mobile-nav-menu {
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    border-top: 1px solid var(--ph-border);
    gap: 14px;
  }

  .mobile-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--ph-text);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
  }

  .mobile-menu-divider {
    height: 1px;
    background: var(--ph-border);
    margin: 6px 0;
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
