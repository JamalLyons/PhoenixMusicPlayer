<script lang="ts">
  import { getPlatformOptions } from './releases';
  import type { ReleaseInfo } from './types';
  import { Download, Monitor, Terminal, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from '@lucide/svelte';

  interface Props {
    release?: ReleaseInfo;
  }

  let { release }: Props = $props();

  let platforms = $derived(getPlatformOptions(release));
</script>

<section id="download" class="download-section">
  <div class="container">
    <div class="section-header">
      <div class="badge">Releases & Distribution</div>
      <h2 class="section-title">Download Phoenix for Desktop</h2>
      <p class="section-subtitle">
        Native, lightweight, and completely free. Choose your operating system below to start playing your local music library.
      </p>
    </div>

    <div class="downloads-grid">
      {#each platforms as platform}
        <div class="download-card glass-card">
          <div class="card-top">
            <div class="os-icon-badge">
              {#if platform.icon === 'apple'}
                <!-- Apple SVG -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.58.65-1.09 1.71-.95 2.73 1 .08 2.03-.49 2.67-1.23z"/>
                </svg>
              {:else if platform.icon === 'monitor'}
                <Monitor size={22} />
              {:else}
                <Terminal size={22} />
              {/if}
            </div>

            <div class="os-info">
              <h3 class="os-title">{platform.label}</h3>
              <span class="os-arch">{platform.sublabel}</span>
            </div>
          </div>

          <div class="card-specs">
            <div class="spec-row">
              <span class="spec-label">Format:</span>
              <span class="spec-val format-val">{platform.fileExt}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Architecture:</span>
              <span class="spec-val">{platform.arch}</span>
            </div>
            {#if platform.sizeFormatted}
              <div class="spec-row">
                <span class="spec-label">File Size:</span>
                <span class="spec-val">{platform.sizeFormatted}</span>
              </div>
            {/if}
          </div>

          <a 
            href={platform.downloadUrl || 'https://github.com/JamalLyons/PhoenixMusicPlayer/releases'} 
            class="btn btn-primary download-btn"
          >
            <Download size={16} />
            <span>Download {platform.fileExt}</span>
          </a>
        </div>
      {/each}
    </div>

    <!-- Verification & Terminal helpers -->
    <div class="install-helpers glass-card">
      <div class="helper-col">
        <h4><ShieldCheck size={18} class="helper-icon" /> Release Verification</h4>
        <p>All binaries are built automatically via GitHub Actions CI and cryptographically signed. You can inspect SHA-256 checksums on the release page.</p>
        <a 
          href="https://github.com/JamalLyons/PhoenixMusicPlayer/releases" 
          target="_blank" 
          rel="noreferrer" 
          class="gh-release-link"
        >
          <span>View GitHub Releases & Changelog</span>
          <ExternalLink size={14} />
        </a>
      </div>

      <div class="helper-divider"></div>

      <div class="helper-col">
        <h4><Terminal size={18} class="helper-icon" /> System Compatibility</h4>
        <p>• <strong>macOS</strong>: macOS 11 (Big Sur) or higher on Apple Silicon or Intel.<br />
        • <strong>Windows</strong>: Windows 10 (1809+) or Windows 11 (64-bit).<br />
        • <strong>Linux</strong>: glibc 2.31+ with WebKit2GTK (Ubuntu 20.04+, Fedora 36+, Arch).</p>
      </div>
    </div>
  </div>
</section>

<style>
  .download-section {
    padding: 80px 0;
  }

  .section-header {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 50px auto;
  }

  .section-title {
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-top: 14px;
    margin-bottom: 14px;
  }

  .section-subtitle {
    font-size: 1.0625rem;
    color: var(--ph-text-muted);
    line-height: 1.6;
  }

  .downloads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 36px;
  }

  .download-card {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }

  .card-top {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .os-icon-badge {
    width: 44px;
    height: 44px;
    border-radius: var(--ph-radius-md);
    background: var(--ph-surface-overlay);
    color: var(--ph-accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .os-info {
    display: flex;
    flex-direction: column;
  }

  .os-title {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .os-arch {
    font-size: 0.75rem;
    color: var(--ph-text-muted);
  }

  .card-specs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: var(--ph-surface);
    border-radius: var(--ph-radius-sm);
    border: 1px solid var(--ph-border);
  }

  .spec-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
  }

  .spec-label {
    color: var(--ph-text-dim);
  }

  .spec-val {
    font-family: var(--ph-font-mono);
    color: var(--ph-text);
  }

  .format-val {
    color: var(--ph-accent);
    font-weight: 600;
  }

  .download-btn {
    width: 100%;
  }

  .install-helpers {
    padding: 28px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 28px;
    align-items: center;
  }

  .helper-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .helper-col h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 700;
  }

  :global(.helper-icon) {
    color: var(--ph-accent);
  }

  .helper-col p {
    font-size: 0.8125rem;
    color: var(--ph-text-muted);
    line-height: 1.6;
  }

  .helper-divider {
    width: 1px;
    height: 100%;
    background: var(--ph-border);
  }

  .gh-release-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--ph-accent);
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 600;
    margin-top: 4px;
  }

  .gh-release-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .install-helpers {
      grid-template-columns: 1fr;
    }
    .helper-divider {
      display: none;
    }
  }
</style>
