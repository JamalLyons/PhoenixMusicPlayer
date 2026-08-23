<script lang="ts">
  import { 
    Music, 
    SlidersHorizontal, 
    Tags, 
    Download, 
    Palette, 
    ShieldCheck, 
    Zap, 
    Database, 
    Sparkles, 
    FileAudio, 
    Layers, 
    Sliders 
  } from '@lucide/svelte';

  const PILLARS = [
    {
      id: 'playback',
      icon: Music,
      title: 'Local High-Fidelity Playback',
      badge: 'Pillar 01',
      tagline: 'Your music, uncompressed and undisturbed.',
      desc: 'Bit-perfect audio decoding for FLAC, ALAC, WAV, MP3, AAC, and Opus. Phoenix is engineered with zero cloud dependencies, instant search over 100,000+ tracks, and zero background telemetry.',
      points: [
        'Hi-Res Lossless up to 24-bit / 192kHz',
        'Instant-search powered by SQLite WAL mode',
        'Gapless playback & custom crossfade curves',
        'Smart Up Next queue with drag & drop reordering'
      ]
    },
    {
      id: 'downloader',
      icon: Download,
      title: 'Built-in Audio Acquisition',
      badge: 'Pillar 02',
      tagline: 'Expand your collection without leaving the player.',
      desc: 'Acquire downloadable audio directly into your library. Phoenix parses artist and track metadata, strips messy web noise, embeds cover art, and places clean files straight into your library storage.',
      points: [
        'Direct download directly into your music directory',
        'Automatic title & artist cleanup on import',
        'Staging Inbox to review new tracks before publishing',
        'Zero messy external converter websites'
      ]
    },
    {
      id: 'eq',
      icon: SlidersHorizontal,
      title: '10-Band Parametric Equalizer',
      badge: 'Pillar 03',
      tagline: 'Shape your sound with surgical precision.',
      desc: 'Studio-grade Web Audio equalizer with preamp gain control, real-time frequency response visualization, and context-aware presets assigned globally, per-album, per-playlist, or per-song.',
      points: [
        '10 ISO standard frequency bands (32Hz – 16kHz)',
        'Per-album, playlist, and track preset override',
        'Preamp gain staging with zero digital clipping',
        'Curated acoustic, electronic, and vocal presets'
      ]
    },
    {
      id: 'metadata',
      icon: Tags,
      title: 'In-Place Metadata & Tag Editor',
      badge: 'Pillar 04',
      tagline: 'Curate your library with precision tools.',
      desc: 'Never suffer broken metadata or missing album art again. Phoenix includes batch tag editing, regular expression pattern extraction from file paths, title cleanup macros, and high-res cover art embedding.',
      points: [
        'ID3v2, Vorbis Comments, and MP4 tag support via Lofty',
        'One-click cleanup macros (strip junk, fix casing)',
        'Batch album builder & tag find-and-replace',
        'Embedded high-resolution artwork manager'
      ]
    },
    {
      id: 'customization',
      icon: Palette,
      title: 'Personalized Themes & Density',
      badge: 'Pillar 05',
      tagline: 'Adapts to your workspace and aesthetic.',
      desc: 'Designed with calm luxury in mind. Switch between dark & light themes, customize dynamic accent palettes, or change layout density between Compact, Cozy, and Comfortable modes.',
      points: [
        'Tailored Dark and Crisp Light modes',
        'Dynamic accent color mixer with ambient glow',
        'Adjustable layout density modes',
        'Native macOS & Windows translucent window styling'
      ]
    }
  ];
</script>

<section id="features" class="features-section">
  <div class="container">
    <div class="section-header">
      <div class="badge">Architecture & Craft</div>
      <h2 class="section-title">Built for the dedicated listener.</h2>
      <p class="section-subtitle">
        Phoenix unites the five core pillars of music ownership into one seamless, native desktop experience.
      </p>
    </div>

    <div class="pillars-grid">
      {#each PILLARS as pillar, idx}
        <div class="pillar-card glass-card {idx === 0 ? 'pillar-featured' : ''}">
          <div class="pillar-top">
            <div class="pillar-icon-wrap">
              <pillar.icon size={24} />
            </div>
            <span class="pillar-badge">{pillar.badge}</span>
          </div>

          <h3 class="pillar-title">{pillar.title}</h3>
          <p class="pillar-tagline">{pillar.tagline}</p>
          <p class="pillar-desc">{pillar.desc}</p>

          <ul class="pillar-points">
            {#each pillar.points as point}
              <li class="point-item">
                <span class="point-bullet">✓</span>
                <span>{point}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .features-section {
    padding: 80px 0;
  }

  .section-header {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 60px auto;
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

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 24px;
  }

  .pillar-card {
    padding: 32px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .pillar-featured {
    grid-column: span 1;
    border-color: var(--ph-accent-border);
    box-shadow: 0 0 30px var(--ph-accent-subtle);
  }

  .pillar-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .pillar-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: var(--ph-radius-md);
    background: var(--ph-accent-muted);
    color: var(--ph-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ph-accent-border);
  }

  .pillar-badge {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    text-transform: uppercase;
    color: var(--ph-text-dim);
    letter-spacing: 0.08em;
  }

  .pillar-title {
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }

  .pillar-tagline {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--ph-accent);
    margin-bottom: 14px;
  }

  .pillar-desc {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .pillar-points {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid var(--ph-border);
  }

  .point-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.8125rem;
    color: var(--ph-text);
  }

  .point-bullet {
    color: var(--ph-accent);
    font-weight: 700;
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    .pillars-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
