<script lang="ts">
  import { detectUserPlatform, getPlatformOptions } from './releases';
  import type { ReleaseInfo } from './types';
  import { LICENSE_WAITLIST_URL } from './pricing';
  import { Download, ChevronDown } from '@lucide/svelte';

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
  let hasDownload = $derived(Boolean(primaryPlatform?.downloadUrl));
</script>

<section class="hero" aria-labelledby="hero-brand">
  <div class="hero-copy container">
    <p class="hero-eyebrow animate-rise" style="animation-delay: 0.05s">Desktop music player</p>
    <h1 id="hero-brand" class="hero-brand animate-rise" style="animation-delay: 0.12s">Phoenix</h1>
    <p class="hero-headline animate-rise" style="animation-delay: 0.2s">
      Music you own, in a home that feels like yours.
    </p>
    <p class="hero-sub animate-rise" style="animation-delay: 0.28s">
      Play your local library. Build playlists. Unlock Tools with a one-time license when you want
      acquisition, tagging, and EQ in the same calm app.
    </p>

    <div class="cta-row animate-rise" style="animation-delay: 0.36s">
      {#if hasDownload && primaryPlatform}
        <div class="primary-download">
          <a href={primaryPlatform.downloadUrl} class="btn btn-primary btn-lg">
            <Download size={20} />
            <span>Download free for {primaryPlatform.label}</span>
          </a>
          <button
            type="button"
            class="btn btn-primary platform-toggle"
            onclick={() => (showPlatformMenu = !showPlatformMenu)}
            aria-expanded={showPlatformMenu}
            aria-label="Choose platform"
          >
            <ChevronDown size={18} />
          </button>
          {#if showPlatformMenu}
            <div class="platform-menu glass" role="menu">
              {#each platformOptions as option}
                {#if option.downloadUrl}
                  <a href={option.downloadUrl} class="platform-option" role="menuitem">
                    <span class="opt-label">{option.label}</span>
                    <span class="opt-sub">{option.sublabel}</span>
                  </a>
                {:else}
                  <span class="platform-option disabled">
                    <span class="opt-label">{option.label}</span>
                    <span class="opt-sub">Coming soon</span>
                  </span>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        <a href="#download" class="btn btn-primary btn-lg">
          <Download size={20} />
          <span>Download free</span>
        </a>
      {/if}
      <a href="#pricing" class="btn btn-secondary btn-lg">Get Tools license</a>
    </div>

    <p class="hero-note animate-fade" style="animation-delay: 0.5s">
      Free forever for listening.
      <a href={LICENSE_WAITLIST_URL} target="_blank" rel="noreferrer">Tools license</a> — one-time, no subscription.
      Beta builds unlock everything while licensing ships.
    </p>
  </div>

  <div class="hero-visual animate-fade" style="animation-delay: 0.25s">
    <img
      src="./screenshots/hero-playback.png"
      alt="Phoenix playing a track from a local library"
      class="hero-shot"
      width="1280"
      height="800"
      fetchpriority="high"
    />
    <div class="hero-fade" aria-hidden="true"></div>
  </div>
</section>

<style>
  .hero {
    padding: 48px 0 0;
    display: flex;
    flex-direction: column;
    gap: 48px;
    min-height: calc(100vh - var(--ph-nav-h));
  }

  .hero-copy {
    position: relative;
    z-index: 2;
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
    padding-top: 32px;
  }

  .hero-eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ph-text-dim);
    margin-bottom: 20px;
  }

  .hero-brand {
    font-family: var(--ph-font-display);
    font-size: clamp(3.5rem, 12vw, 6.5rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 0.95;
    color: var(--ph-text);
    margin-bottom: 20px;
  }

  .hero-headline {
    font-family: var(--ph-font-display);
    font-size: clamp(1.25rem, 2.5vw, 1.65rem);
    font-weight: 450;
    letter-spacing: -0.015em;
    color: var(--ph-text-muted);
    margin-bottom: 16px;
    line-height: 1.35;
  }

  .hero-sub {
    font-size: 1.05rem;
    color: var(--ph-text-dim);
    line-height: 1.65;
    max-width: 34rem;
    margin: 0 auto 28px;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    align-items: flex-start;
  }

  .primary-download {
    position: relative;
    display: flex;
  }

  .primary-download .btn-lg {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .platform-toggle {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding-left: 12px;
    padding-right: 12px;
  }

  .platform-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    min-width: 240px;
    border-radius: var(--ph-radius-md);
    padding: 8px;
    box-shadow: var(--ph-shadow-md);
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .platform-option {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    border-radius: var(--ph-radius-sm);
    text-decoration: none;
    color: var(--ph-text);
    text-align: left;
  }

  .platform-option:hover:not(.disabled) {
    background: var(--ph-accent-muted);
  }

  .platform-option.disabled {
    opacity: 0.45;
    cursor: default;
  }

  .opt-label {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .opt-sub {
    font-size: 0.75rem;
    color: var(--ph-text-muted);
  }

  .hero-note {
    margin-top: 20px;
    font-size: 0.8125rem;
    color: var(--ph-text-dim);
    line-height: 1.55;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-note a {
    color: var(--ph-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .hero-visual {
    position: relative;
    width: 100%;
    margin-top: auto;
  }

  .hero-shot {
    display: block;
    width: 100%;
    height: auto;
    max-height: min(52vh, 560px);
    object-fit: cover;
    object-position: top center;
    border: none;
  }

  .hero-fade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      var(--ph-bg) 0%,
      transparent 18%,
      transparent 72%,
      var(--ph-bg) 100%
    );
  }

  @media (max-width: 640px) {
    .hero {
      min-height: auto;
      padding-top: 24px;
      gap: 32px;
    }

    .cta-row {
      flex-direction: column;
      align-items: stretch;
    }

    .primary-download {
      width: 100%;
    }

    .primary-download .btn-lg {
      flex: 1;
    }

    .hero-shot {
      max-height: 40vh;
    }
  }
</style>
