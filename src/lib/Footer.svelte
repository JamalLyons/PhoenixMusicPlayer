<script lang="ts">
  import { MessageSquare, Heart, Disc3 } from '@lucide/svelte';
</script>

<footer class="footer-wrapper">
  <div class="container footer-container">
    <div class="footer-brand-col">
      <div class="brand-row">
        <img src="./app-icon.png" alt="Phoenix" class="footer-logo" />
        <span class="footer-brand-name">Phoenix Music Player</span>
      </div>
      <p class="brand-tagline">
        A calm, high-fidelity music player for people who want to own their listening again. Bit-perfect playback, in-app acquisition, studio EQ, and deep metadata editing.
      </p>
      <div class="social-row">
        <a 
          href="https://discord.gg/TPCBTUrfNT" 
          target="_blank" 
          rel="noreferrer" 
          class="social-link" 
          aria-label="Discord Community"
        >
          <MessageSquare size={18} />
        </a>
        <a 
          href="https://github.com/JamalLyons/PhoenixMusicPlayer" 
          target="_blank" 
          rel="noreferrer" 
          class="social-link" 
          aria-label="GitHub Repository"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-nav-col">
      <span class="nav-heading">Product</span>
      <a href="#features" class="footer-link">Features</a>
      <a href="#eq" class="footer-link">10-Band EQ</a>
      <a href="#editor" class="footer-link">Tag Editor</a>
      <a href="#download" class="footer-link">Downloads</a>
    </div>

    <div class="footer-nav-col">
      <span class="nav-heading">Ecosystem</span>
      <a href="https://github.com/JamalLyons/PhoenixMusicPlayer/releases" target="_blank" rel="noreferrer" class="footer-link">Releases & Binaries</a>
      <a href="https://discord.gg/TPCBTUrfNT" target="_blank" rel="noreferrer" class="footer-link">Discord Community</a>
      <a href="https://github.com/JamalLyons/PhoenixMusicPlayer/issues" target="_blank" rel="noreferrer" class="footer-link">Issue Tracker</a>
    </div>
  </div>

  <div class="container footer-bottom">
    <span class="copyright">
      Released under the MIT License • Built with Svelte, Vite & Rust.
    </span>
    <span class="submodule-note">
      Public Static Distribution Portal
    </span>
  </div>
</footer>

<style>
  .footer-wrapper {
    background: var(--ph-surface);
    border-top: 1px solid var(--ph-border);
    padding: 60px 0 30px 0;
    margin-top: 60px;
  }

  .footer-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 50px;
  }

  .footer-brand-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 440px;
  }

  .brand-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .footer-logo {
    width: 32px;
    height: 32px;
    border-radius: var(--ph-radius-sm);
  }

  .footer-brand-name {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .brand-tagline {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    line-height: 1.6;
  }

  .social-row {
    display: flex;
    gap: 10px;
  }

  .social-link {
    width: 36px;
    height: 36px;
    border-radius: var(--ph-radius-md);
    background: var(--ph-surface-raised);
    border: 1px solid var(--ph-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ph-text-muted);
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .social-link:hover {
    color: var(--ph-text);
    border-color: var(--ph-border-strong);
    background: var(--ph-surface-overlay);
  }

  .footer-nav-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .nav-heading {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ph-text-dim);
    margin-bottom: 4px;
  }

  .footer-link {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .footer-link:hover {
    color: var(--ph-text);
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 1px solid var(--ph-border);
    font-size: 0.75rem;
    color: var(--ph-text-dim);
    flex-wrap: wrap;
    gap: 12px;
  }

  .submodule-note {
    font-family: var(--ph-font-mono);
  }

  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
</style>
