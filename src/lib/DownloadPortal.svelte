<script lang="ts">
  import { detectUserPlatform, getPlatformOptions } from './releases';
  import type { ReleaseInfo } from './types';
  import { RELEASES_URL, GITHUB_URL } from './pricing';
  import { Download, Apple, Monitor, Terminal, ExternalLink } from '@lucide/svelte';

  interface Props {
    release?: ReleaseInfo;
  }

  let { release }: Props = $props();

  let userPlatform = $state<'macos-arm' | 'macos-intel' | 'windows' | 'linux'>('macos-arm');

  $effect(() => {
    userPlatform = detectUserPlatform();
  });

  let platformOptions = $derived(getPlatformOptions(release));
  let available = $derived(release?.available === true);

  function platformIcon(key: string) {
    if (key.startsWith('macos')) return Apple;
    if (key === 'windows') return Monitor;
    return Terminal;
  }
</script>

<section id="download" class="download" aria-labelledby="download-title">
  <div class="container">
    <p class="section-label">Get Phoenix</p>
    <h2 id="download-title" class="section-title">Download for your desktop</h2>
    <p class="section-lede">
      Native builds for macOS, Windows, and Linux. Free for listening—Tools licensing comes next.
    </p>

    {#if available}
      {#if release?.version}
        <p class="version-line">Latest release <strong>{release.version}</strong></p>
      {/if}
      <div class="platform-grid">
        {#each platformOptions as option}
          {@const Icon = platformIcon(option.key)}
          <div class="platform-card" class:highlight={option.key === userPlatform}>
            <div class="platform-top">
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3 class="platform-name">{option.label}</h3>
                <p class="platform-sub">{option.sublabel}</p>
              </div>
            </div>
            {#if option.downloadUrl}
              <a href={option.downloadUrl} class="btn btn-primary platform-btn">
                <Download size={16} />
                Download {option.fileExt}
                {#if option.sizeFormatted}
                  <span class="size">· {option.sizeFormatted}</span>
                {/if}
              </a>
            {:else}
              <span class="btn btn-secondary platform-btn disabled">Not in this release</span>
            {/if}
          </div>
        {/each}
      </div>
      <p class="release-link">
        <a href={release?.htmlUrl || RELEASES_URL} target="_blank" rel="noreferrer">
          All releases on GitHub <ExternalLink size={14} />
        </a>
      </p>
    {:else}
      <div class="empty-state">
        <p class="empty-title">Builds are publishing soon</p>
        <p class="empty-body">
          Desktop binaries aren’t on GitHub Releases yet. Watch the repository or join Discord for
          the first public builds—macOS, Windows, and Linux.
        </p>
        <div class="empty-actions">
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" class="btn btn-primary">
            Watch releases
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" class="btn btn-secondary">
            View on GitHub
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .download {
    border-bottom: 1px solid var(--ph-border);
  }

  .version-line {
    margin-top: 28px;
    font-size: 0.875rem;
    color: var(--ph-text-dim);
  }

  .version-line strong {
    font-family: var(--ph-font-mono);
    color: var(--ph-text-muted);
    font-weight: 500;
  }

  .platform-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 28px;
  }

  .platform-card {
    padding: 24px;
    border: 1px solid var(--ph-border);
    background: var(--ph-surface);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .platform-card.highlight {
    border-color: var(--ph-accent-border);
  }

  .platform-top {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    color: var(--ph-text-muted);
  }

  .platform-name {
    font-family: var(--ph-font-display);
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--ph-text);
  }

  .platform-sub {
    font-size: 0.85rem;
    color: var(--ph-text-dim);
    margin-top: 2px;
  }

  .platform-btn {
    width: 100%;
  }

  .platform-btn.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .size {
    font-weight: 500;
    opacity: 0.75;
  }

  .release-link {
    margin-top: 24px;
  }

  .release-link a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--ph-text-muted);
    font-size: 0.875rem;
    text-decoration: none;
  }

  .release-link a:hover {
    color: var(--ph-text);
  }

  .empty-state {
    margin-top: 40px;
    padding: 40px 32px;
    border: 1px dashed var(--ph-border-strong);
    background: var(--ph-surface);
    max-width: 36rem;
  }

  .empty-title {
    font-family: var(--ph-font-display);
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .empty-body {
    color: var(--ph-text-muted);
    font-size: 0.975rem;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .empty-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media (max-width: 640px) {
    .platform-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
