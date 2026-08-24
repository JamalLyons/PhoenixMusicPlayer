<script lang="ts">
  import { MessageSquare } from '@lucide/svelte';
  import { DISCORD_URL, GITHUB_URL, RELEASES_URL } from './pricing';
</script>

<footer class="footer-wrapper">
  <div class="container footer-container">
    <div class="footer-brand-col">
      <div class="brand-row">
        <img src="./app-icon.png" alt="" class="footer-logo" width="32" height="32" />
        <span class="footer-brand-name">Phoenix</span>
      </div>
      <p class="brand-tagline">
        The calm desktop home for music you own. Listen free. Unlock Tools with a one-time license
        when you need acquisition, tagging, and EQ in the same app.
      </p>
      <div class="social-row">
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" class="social-link" aria-label="Discord">
          <MessageSquare size={18} />
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" class="social-link" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-nav-col">
      <span class="nav-heading">Product</span>
      <a href="#problem" class="footer-link">Why Phoenix</a>
      <a href="#journey" class="footer-link">Journey</a>
      <a href="#gallery" class="footer-link">Screenshots</a>
      <a href="#pricing" class="footer-link">Free &amp; Tools</a>
      <a href="#download" class="footer-link">Download</a>
    </div>

    <div class="footer-nav-col">
      <span class="nav-heading">Community</span>
      <a href={RELEASES_URL} target="_blank" rel="noreferrer" class="footer-link">Releases</a>
      <a href={DISCORD_URL} target="_blank" rel="noreferrer" class="footer-link">Discord</a>
      <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer" class="footer-link">Issues</a>
    </div>
  </div>

  <div class="container footer-bottom">
    <span class="copyright">MIT License · Local-first desktop music player</span>
    <span class="submodule-note">jamallyons.github.io/PhoenixMusicPlayer</span>
  </div>
</footer>

<style>
  .footer-wrapper {
    background: var(--ph-surface);
    border-top: 1px solid var(--ph-border);
    padding: 56px 0 28px;
    position: relative;
    z-index: 1;
  }

  .footer-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-brand-col {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 420px;
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
    font-family: var(--ph-font-display);
    font-size: 1.25rem;
    font-weight: 550;
  }

  .brand-tagline {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    line-height: 1.6;
  }

  .social-row {
    display: flex;
    gap: 8px;
  }

  .social-link {
    width: 36px;
    height: 36px;
    border-radius: var(--ph-radius-md);
    border: 1px solid var(--ph-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ph-text-muted);
    text-decoration: none;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .social-link:hover {
    color: var(--ph-text);
    border-color: var(--ph-border-strong);
  }

  .footer-nav-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .nav-heading {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ph-text-dim);
    margin-bottom: 4px;
  }

  .footer-link {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    text-decoration: none;
  }

  .footer-link:hover {
    color: var(--ph-text);
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
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
