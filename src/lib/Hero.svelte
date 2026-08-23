<script lang="ts">
  import { detectUserPlatform, getPlatformOptions, formatFileSize } from './releases';
  import type { ReleaseInfo, PlatformOption } from './types';
  import { 
    Download, 
    ChevronDown, 
    ShieldCheck, 
    AudioWaveform, 
    HardDrive, 
    SlidersHorizontal, 
    Sparkles 
  } from '@lucide/svelte';

  interface Props {
    release?: ReleaseInfo;
  }

  let { release }: Props = $props();

  let userPlatform = $state<'macos-arm' | 'macos-intel' | 'windows' | 'linux'>('macos-arm');
  let showPlatformMenu = $state(false);

  $effect(() => {
    userPlatform = detectUserPlatform();
  });

  let platformOptions = $derived(getPlatformOptions(release));
  let primaryPlatform = $derived(
    platformOptions.find((p) => p.key === userPlatform) || platformOptions[0]
  );
</script>

<section class="hero-section">
  <div class="ambient-bg"></div>

  <div class="container hero-container">
    <!-- Beta Release Pill -->
    <div class="badge hero-badge">
      <Sparkles size={13} />
      <span>v0.1.0 Beta Public Release</span>
    </div>

    <!-- Main Title -->
    <h1 class="hero-headline">
      The calm, high-fidelity home for music you <span class="accent-text">own</span>.
    </h1>

    <!-- Subtitle -->
    <p class="hero-subtitle">
      Play your local audio collection with studio clarity. Acquire music directly, fix tags and artwork with built-in metadata editing, and shape frequency curves with a 10-band equalizer — all in one native desktop app.
    </p>

    <!-- Download Action Suite -->
    <div class="cta-group">
      <div class="primary-download-wrapper">
        <a 
          href={primaryPlatform.downloadUrl || '#download'} 
          class="btn btn-primary btn-lg primary-cta"
        >
          <Download size={20} />
          <div class="cta-text-wrap">
            <span class="cta-main-text">Download for {primaryPlatform.label}</span>
            <span class="cta-sub-text">{primaryPlatform.sublabel} ({primaryPlatform.fileExt}{primaryPlatform.sizeFormatted ? ` • ${primaryPlatform.sizeFormatted}` : ''})</span>
          </div>
        </a>

        <!-- Platform Dropdown Trigger -->
        <button 
          class="btn btn-primary platform-dropdown-trigger" 
          onclick={() => showPlatformMenu = !showPlatformMenu}
          title="Choose another platform"
          aria-label="Choose another operating system"
        >
          <ChevronDown size={18} />
        </button>

        {#if showPlatformMenu}
          <div class="platform-menu glass">
            <span class="menu-label">Select your platform</span>
            {#each platformOptions as option}
              <a 
                href={option.downloadUrl || '#download'} 
                class="platform-menu-item"
                onclick={() => showPlatformMenu = false}
              >
                <div class="platform-meta">
                  <span class="platform-name">{option.label}</span>
                  <span class="platform-arch">{option.sublabel}</span>
                </div>
                <span class="platform-ext">{option.fileExt}</span>
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <a href="#features" class="btn btn-secondary btn-lg">
        Explore Features
      </a>
    </div>

    <div class="release-quick-meta">
      <span>Free & Open Source</span>
      <span class="meta-dot">•</span>
      <span>Requires macOS 11+, Windows 10+, or Linux</span>
      <span class="meta-dot">•</span>
      <a href="#download" class="meta-link">All Downloads & Checksums</a>
    </div>

    <!-- Trust Badges Bar -->
    <div class="trust-grid">
      <div class="trust-item">
        <HardDrive size={18} class="trust-icon" />
        <span>100% Local-First & Fast</span>
      </div>
      <div class="trust-item">
        <ShieldCheck size={18} class="trust-icon" />
        <span>Zero Telemetry & Tracking</span>
      </div>
      <div class="trust-item">
        <SlidersHorizontal size={18} class="trust-icon" />
        <span>Studio-Grade 10-Band EQ</span>
      </div>
      <div class="trust-item">
        <AudioWaveform size={18} class="trust-icon" />
        <span>FLAC / ALAC / WAV / MP3</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    padding-top: 70px;
    padding-bottom: 50px;
    text-align: center;
    position: relative;
  }

  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
  }

  .hero-badge {
    margin-bottom: 24px;
    animation: fadeIn 0.8s ease;
  }

  .hero-headline {
    font-size: clamp(2.4rem, 5.5vw, 4.2rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.035em;
    color: var(--ph-text);
    margin-bottom: 22px;
  }

  .accent-text {
    background: linear-gradient(135deg, var(--ph-accent) 0%, var(--ph-accent-strong) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: underline;
    text-decoration-color: var(--ph-accent-border);
    text-underline-offset: 6px;
  }

  .hero-subtitle {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.6;
    color: var(--ph-text-muted);
    max-width: 740px;
    margin-bottom: 40px;
  }

  .cta-group {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
  }

  .primary-download-wrapper {
    display: inline-flex;
    position: relative;
  }

  .primary-cta {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 20px;
    text-align: left;
  }

  .cta-text-wrap {
    display: flex;
    flex-direction: column;
  }

  .cta-main-text {
    font-size: 1.0625rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .cta-sub-text {
    font-size: 0.75rem;
    opacity: 0.8;
    font-weight: 500;
  }

  .platform-dropdown-trigger {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    padding: 0 14px;
  }

  .platform-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 320px;
    padding: 10px;
    border-radius: var(--ph-radius-md);
    box-shadow: var(--ph-shadow-raised);
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
  }

  .menu-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--ph-text-dim);
    padding: 4px 8px;
  }

  .platform-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: var(--ph-radius-sm);
    text-decoration: none;
    color: var(--ph-text);
    transition: background 0.15s ease;
  }

  .platform-menu-item:hover {
    background: var(--ph-accent-muted);
  }

  .platform-meta {
    display: flex;
    flex-direction: column;
  }

  .platform-name {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .platform-arch {
    font-size: 0.75rem;
    color: var(--ph-text-muted);
  }

  .platform-ext {
    font-size: 0.75rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
    background: var(--ph-surface-overlay);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .release-quick-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8125rem;
    color: var(--ph-text-dim);
    margin-bottom: 50px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .meta-dot {
    opacity: 0.4;
  }

  .meta-link {
    color: var(--ph-text-muted);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .meta-link:hover {
    color: var(--ph-text);
  }

  .trust-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 960px;
    padding: 20px;
    border-radius: var(--ph-radius-lg);
    background: var(--ph-surface-raised);
    border: 1px solid var(--ph-border);
  }

  .trust-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--ph-text-muted);
  }

  :global(.trust-icon) {
    color: var(--ph-accent);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .cta-group {
      flex-direction: column;
      width: 100%;
    }
    .primary-download-wrapper {
      width: 100%;
    }
    .primary-cta {
      flex: 1;
    }
    .trust-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
