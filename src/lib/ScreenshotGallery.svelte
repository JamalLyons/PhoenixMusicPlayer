<script lang="ts">
  type Shot = {
    src: string;
    alt: string;
    caption: string;
    tier: 'Free' | 'Tools';
  };

  const shots: Shot[] = [
    {
      src: './screenshots/library-songs.png',
      alt: 'Phoenix library songs view',
      caption: 'Browse your local collection',
      tier: 'Free',
    },
    {
      src: './screenshots/playlists.png',
      alt: 'Phoenix playlists overview',
      caption: 'Playlists that stay on your device',
      tier: 'Free',
    },
    {
      src: './screenshots/queue.png',
      alt: 'Phoenix queue panel open',
      caption: 'Queue and Up Next while you listen',
      tier: 'Free',
    },
    {
      src: './screenshots/downloader.png',
      alt: 'Phoenix in-app downloader',
      caption: 'Acquire audio into the same library',
      tier: 'Tools',
    },
    {
      src: './screenshots/tag-editor.png',
      alt: 'Phoenix tag editor sheet',
      caption: 'Fix metadata and artwork in place',
      tier: 'Tools',
    },
    {
      src: './screenshots/eq.png',
      alt: 'Phoenix 10-band equalizer',
      caption: 'Shape sound per album, playlist, or track',
      tier: 'Tools',
    },
  ];

  let active = $state(0);
  let activeShot = $derived(shots[active] ?? shots[0]);

  function select(index: number) {
    active = index;
  }
</script>

<section id="gallery" class="gallery" aria-labelledby="gallery-title">
  <div class="container">
    <p class="section-label">Inside Phoenix</p>
    <h2 id="gallery-title" class="section-title">The product, not a mockup</h2>
    <p class="section-lede">
      Real screens from the desktop app—calm library chrome, playlists, acquisition, tagging, and EQ.
    </p>

    <div class="gallery-frame">
      {#if activeShot}
        <img
          src={activeShot.src}
          alt={activeShot.alt}
          class="gallery-image"
          width="1280"
          height="800"
        />
      {/if}
      <div class="gallery-meta">
        <span class="tier-pill" data-tier={activeShot?.tier}>{activeShot?.tier}</span>
        <p class="gallery-caption">{activeShot?.caption}</p>
      </div>
    </div>

    <div class="thumbs" role="tablist" aria-label="Product screenshots">
      {#each shots as shot, i}
        <button
          type="button"
          class="thumb"
          class:active={i === active}
          role="tab"
          aria-selected={i === active}
          onclick={() => select(i)}
        >
          <img src={shot.src} alt="" width="320" height="200" loading="lazy" />
          <span class="thumb-label">{shot.tier}</span>
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  .gallery {
    border-bottom: 1px solid var(--ph-border);
  }

  .gallery-frame {
    margin-top: 48px;
    position: relative;
    overflow: hidden;
    border-radius: 0;
    border: 1px solid var(--ph-border);
    background: var(--ph-surface);
    animation: ph-fade 0.6s ease both;
  }

  .gallery-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top center;
  }

  .gallery-meta {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border-top: 1px solid var(--ph-border);
    background: var(--ph-surface-raised);
  }

  .tier-pill {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: var(--ph-radius-full);
    border: 1px solid var(--ph-border);
    color: var(--ph-text-muted);
  }

  .tier-pill[data-tier='Tools'] {
    border-color: var(--ph-accent-border);
    background: var(--ph-accent-muted);
    color: var(--ph-text);
  }

  .gallery-caption {
    font-size: 0.95rem;
    color: var(--ph-text-muted);
  }

  .thumbs {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-top: 14px;
  }

  .thumb {
    position: relative;
    padding: 0;
    border: 1px solid var(--ph-border);
    background: var(--ph-surface);
    cursor: pointer;
    overflow: hidden;
    opacity: 0.55;
    transition: opacity 0.2s ease, border-color 0.2s ease;
  }

  .thumb:hover,
  .thumb.active {
    opacity: 1;
    border-color: var(--ph-accent-border);
  }

  .thumb img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
  }

  .thumb-label {
    position: absolute;
    left: 6px;
    bottom: 6px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 2px 6px;
    background: rgba(12, 11, 10, 0.75);
    color: #f4f0ea;
    border-radius: 4px;
  }

  @media (max-width: 800px) {
    .thumbs {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
