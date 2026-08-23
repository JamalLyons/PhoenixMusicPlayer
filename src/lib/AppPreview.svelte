<script lang="ts">
  import { theme, ACCENT_PRESETS } from './theme';
  import { 
    Play, 
    Pause, 
    SkipBack, 
    SkipForward, 
    Volume2, 
    SlidersHorizontal, 
    Disc3, 
    Music2, 
    FolderGit2, 
    Download, 
    Settings, 
    Search, 
    Heart, 
    Shuffle, 
    Repeat, 
    ListMusic 
  } from '@lucide/svelte';

  let isPlaying = $state(true);
  let activeTab = $state<'tracks' | 'eq' | 'downloader'>('tracks');
  let currentSong = $state({
    title: 'Midnight Resonance',
    artist: 'Aura Horizon',
    album: 'Architectures of Silence',
    format: 'FLAC 24-bit / 96kHz',
    duration: '4:32',
    progress: 42,
  });

  const DEMO_SONGS = [
    { id: 1, title: 'Midnight Resonance', artist: 'Aura Horizon', album: 'Architectures of Silence', time: '4:32', format: 'FLAC 96k', active: true },
    { id: 2, title: 'Cascade Dreams', artist: 'Komorebi', album: 'Drift & Form', time: '3:48', format: 'FLAC 44.1k', active: false },
    { id: 3, title: 'Solar Flare (Vinyl Master)', artist: 'Vapour State', album: 'Analog Horizons', time: '5:15', format: 'ALAC 24-bit', active: false },
    { id: 4, title: 'Subterranean Echoes', artist: 'Deep Field', album: 'Low Frequency Studies', time: '6:04', format: 'FLAC 192k', active: false },
    { id: 5, title: 'Parallel Waves', artist: 'Solaris Duo', album: 'Orbital Motion', time: '3:22', format: 'Opus 510k', active: false },
  ];
</script>

<section class="preview-section">
  <div class="container">
    <div class="preview-frame glass">
      <!-- Window Title Bar -->
      <div class="window-titlebar">
        <div class="window-controls">
          <span class="control-dot close"></span>
          <span class="control-dot min"></span>
          <span class="control-dot max"></span>
        </div>
        <div class="window-title">Phoenix — Local High-Fidelity Audio</div>
        <div class="window-actions">
          <div class="theme-accent-pills">
            {#each ACCENT_PRESETS.slice(0, 4) as p}
              <button 
                class="accent-dot" 
                style="background-color: {p.color};"
                onclick={() => theme.setAccent(p.color)}
                title="Preview accent: {p.name}"
                aria-label={p.name}
              ></button>
            {/each}
          </div>
        </div>
      </div>

      <!-- App Shell Layout -->
      <div class="app-layout">
        <!-- Sidebar -->
        <div class="mock-sidebar">
          <div class="sidebar-section">
            <span class="sidebar-heading">Library</span>
            <button 
              class="sidebar-item {activeTab === 'tracks' ? 'active' : ''}"
              onclick={() => activeTab = 'tracks'}
            >
              <Music2 size={16} />
              <span>Tracks</span>
              <span class="count-badge">1,482</span>
            </button>
            <div class="sidebar-item">
              <Disc3 size={16} />
              <span>Albums</span>
            </div>
            <div class="sidebar-item">
              <ListMusic size={16} />
              <span>Artists</span>
            </div>
          </div>

          <div class="sidebar-section">
            <span class="sidebar-heading">Tools</span>
            <button 
              class="sidebar-item {activeTab === 'downloader' ? 'active' : ''}"
              onclick={() => activeTab = 'downloader'}
            >
              <Download size={16} />
              <span>Acquisition</span>
            </button>
            <button 
              class="sidebar-item {activeTab === 'eq' ? 'active' : ''}"
              onclick={() => activeTab = 'eq'}
            >
              <SlidersHorizontal size={16} />
              <span>Equalizer</span>
            </button>
            <div class="sidebar-item">
              <FolderGit2 size={16} />
              <span>Staging Inbox</span>
            </div>
          </div>

          <div class="sidebar-footer">
            <div class="sidebar-item">
              <Settings size={16} />
              <span>Settings</span>
            </div>
          </div>
        </div>

        <!-- Main View Area -->
        <div class="mock-main">
          <!-- Topbar Search -->
          <div class="mock-topbar">
            <div class="mock-search">
              <Search size={15} />
              <span>Search songs, albums, artists, or genres...</span>
            </div>
            <div class="view-chip">
              <span>Owned Files • 48.2 GB</span>
            </div>
          </div>

          <!-- Content Tab Views -->
          {#if activeTab === 'tracks'}
            <div class="songs-table">
              <div class="table-header">
                <span class="col-num">#</span>
                <span class="col-title">Title</span>
                <span class="col-album">Album</span>
                <span class="col-format">Quality</span>
                <span class="col-time">Time</span>
              </div>

              {#each DEMO_SONGS as song, i}
                <div class="song-row {song.active ? 'playing' : ''}">
                  <span class="col-num">
                    {#if song.active && isPlaying}
                      <div class="mini-spectrum">
                        <span class="bar b1"></span>
                        <span class="bar b2"></span>
                        <span class="bar b3"></span>
                      </div>
                    {:else}
                      {i + 1}
                    {/if}
                  </span>
                  <div class="col-title">
                    <div class="art-thumb">
                      <Disc3 size={18} />
                    </div>
                    <div class="meta-wrap">
                      <span class="song-title">{song.title}</span>
                      <span class="song-artist">{song.artist}</span>
                    </div>
                  </div>
                  <span class="col-album">{song.album}</span>
                  <span class="col-format">
                    <span class="format-pill">{song.format}</span>
                  </span>
                  <span class="col-time">{song.time}</span>
                </div>
              {/each}
            </div>
          {:else if activeTab === 'downloader'}
            <div class="downloader-mock">
              <div class="dl-card glass-card">
                <span class="dl-title">Direct In-App Acquisition</span>
                <p class="dl-desc">Add downloadable audio you own directly into your local library with automatic metadata lookup and tag normalization.</p>
                <div class="dl-input-box">
                  <span class="dl-url-placeholder">https://... (audio source URL or direct media link)</span>
                  <button class="btn btn-primary btn-sm">Acquire</button>
                </div>
                <div class="dl-status-row">
                  <div class="dl-item">
                    <span>✓ Ready for library indexing</span>
                    <span class="speed-badge">Instant Import</span>
                  </div>
                </div>
              </div>
            </div>
          {:else if activeTab === 'eq'}
            <div class="eq-mini-mock">
              <div class="eq-header-row">
                <span class="eq-title">10-Band Parametric Equalizer</span>
                <span class="badge">Acoustic Warmth Preset Active</span>
              </div>
              <div class="eq-bars-preview">
                {#each [3, 6, 8, 4, 1, -2, -1, 3, 5, 7] as gain, idx}
                  <div class="eq-slider-col">
                    <div class="slider-track">
                      <div class="slider-fill" style="height: {50 + (gain * 4)}%;"></div>
                      <div class="slider-thumb" style="bottom: {50 + (gain * 4)}%;"></div>
                    </div>
                    <span class="slider-hz">{['32', '64', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'][idx]}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Player Bar Bottom -->
      <div class="mock-playerbar">
        <div class="player-left">
          <div class="nowplaying-art">
            <Disc3 size={24} />
          </div>
          <div class="nowplaying-info">
            <span class="np-title">{currentSong.title}</span>
            <span class="np-artist">{currentSong.artist} • <span class="np-format">{currentSong.format}</span></span>
          </div>
          <button class="icon-btn-small" aria-label="Favorite">
            <Heart size={15} />
          </button>
        </div>

        <div class="player-center">
          <div class="transport-controls">
            <button class="icon-btn-small" aria-label="Shuffle"><Shuffle size={14} /></button>
            <button class="icon-btn-small" aria-label="Previous"><SkipBack size={16} /></button>
            <button 
              class="play-btn" 
              onclick={() => isPlaying = !isPlaying}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {#if isPlaying}
                <Pause size={18} />
              {:else}
                <Play size={18} />
              {/if}
            </button>
            <button class="icon-btn-small" aria-label="Next"><SkipForward size={16} /></button>
            <button class="icon-btn-small" aria-label="Repeat"><Repeat size={14} /></button>
          </div>

          <div class="scrubber-bar">
            <span class="time-label">1:54</span>
            <div class="progress-track">
              <div class="progress-fill" style="width: {currentSong.progress}%;"></div>
            </div>
            <span class="time-label">{currentSong.duration}</span>
          </div>
        </div>

        <div class="player-right">
          <button class="icon-btn-small" aria-label="Equalizer" onclick={() => activeTab = 'eq'}>
            <SlidersHorizontal size={16} />
          </button>
          <div class="volume-row">
            <Volume2 size={16} />
            <div class="volume-track">
              <div class="volume-fill" style="width: 78%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .preview-section {
    padding-top: 10px;
    padding-bottom: 80px;
  }

  .preview-frame {
    border-radius: var(--ph-radius-xl);
    overflow: hidden;
    box-shadow: var(--ph-shadow-lg), 0 0 40px var(--ph-accent-glow);
    border: 1px solid var(--ph-border-strong);
    background: var(--ph-bg);
  }

  .window-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: var(--ph-surface-raised);
    border-bottom: 1px solid var(--ph-border);
  }

  .window-controls {
    display: flex;
    gap: 8px;
  }

  .control-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .control-dot.close { background: #ff5f56; }
  .control-dot.min { background: #ffbd2e; }
  .control-dot.max { background: #27c93f; }

  .window-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--ph-text-muted);
  }

  .theme-accent-pills {
    display: flex;
    gap: 6px;
  }

  .accent-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .accent-dot:hover {
    transform: scale(1.25);
  }

  .app-layout {
    display: flex;
    min-height: 420px;
  }

  .mock-sidebar {
    width: 220px;
    background: var(--ph-surface);
    border-right: 1px solid var(--ph-border);
    padding: 18px 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sidebar-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .sidebar-heading {
    font-size: 0.6875rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--ph-text-dim);
    padding: 4px 10px;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: var(--ph-radius-sm);
    color: var(--ph-text-muted);
    font-size: 0.875rem;
    font-weight: 500;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: all 0.15s ease;
  }

  .sidebar-item:hover {
    color: var(--ph-text);
    background: var(--ph-surface-raised);
  }

  .sidebar-item.active {
    color: var(--ph-text);
    background: var(--ph-accent-muted);
    font-weight: 600;
  }

  .count-badge {
    margin-left: auto;
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
  }

  .sidebar-footer {
    margin-top: auto;
  }

  .mock-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--ph-bg);
    padding: 16px 22px;
    overflow: hidden;
  }

  .mock-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .mock-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--ph-surface);
    border: 1px solid var(--ph-border);
    padding: 7px 14px;
    border-radius: var(--ph-radius-md);
    color: var(--ph-text-dim);
    font-size: 0.8125rem;
    width: 320px;
  }

  .view-chip {
    font-size: 0.75rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
    background: var(--ph-surface-raised);
    padding: 4px 10px;
    border-radius: var(--ph-radius-sm);
    border: 1px solid var(--ph-border);
  }

  .songs-table {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .table-header {
    display: grid;
    grid-template-columns: 36px 1fr 1fr 120px 60px;
    padding: 6px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ph-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--ph-border);
  }

  .song-row {
    display: grid;
    grid-template-columns: 36px 1fr 1fr 120px 60px;
    align-items: center;
    padding: 8px 10px;
    border-radius: var(--ph-radius-sm);
    font-size: 0.875rem;
    transition: background 0.15s ease;
  }

  .song-row:hover {
    background: var(--ph-surface-raised);
  }

  .song-row.playing {
    background: var(--ph-accent-muted);
  }

  .col-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .art-thumb {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: var(--ph-surface-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ph-accent);
  }

  .meta-wrap {
    display: flex;
    flex-direction: column;
  }

  .song-title {
    font-weight: 600;
    color: var(--ph-text);
  }

  .song-artist {
    font-size: 0.75rem;
    color: var(--ph-text-muted);
  }

  .col-album {
    color: var(--ph-text-muted);
    font-size: 0.8125rem;
  }

  .format-pill {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    padding: 2px 6px;
    border-radius: 4px;
    background: var(--ph-surface-overlay);
    color: var(--ph-text-muted);
    border: 1px solid var(--ph-border);
  }

  .col-time {
    font-size: 0.8125rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
  }

  .mini-spectrum {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }

  .mini-spectrum .bar {
    width: 2px;
    background: var(--ph-accent);
    animation: bounce 0.8s ease-in-out infinite alternate;
  }

  .mini-spectrum .b1 { height: 60%; animation-delay: 0.1s; }
  .mini-spectrum .b2 { height: 100%; animation-delay: 0.3s; }
  .mini-spectrum .b3 { height: 40%; animation-delay: 0.2s; }

  @keyframes bounce {
    0% { height: 20%; }
    100% { height: 100%; }
  }

  /* Mock Playerbar */
  .mock-playerbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 20px;
    background: var(--ph-surface-raised);
    border-top: 1px solid var(--ph-border);
  }

  .player-left {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 280px;
  }

  .nowplaying-art {
    width: 44px;
    height: 44px;
    border-radius: var(--ph-radius-sm);
    background: var(--ph-surface-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ph-accent);
  }

  .nowplaying-info {
    display: flex;
    flex-direction: column;
  }

  .np-title {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .np-artist {
    font-size: 0.75rem;
    color: var(--ph-text-muted);
  }

  .np-format {
    font-family: var(--ph-font-mono);
    color: var(--ph-accent);
  }

  .player-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    max-width: 480px;
  }

  .transport-controls {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .play-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--ph-accent);
    color: var(--ph-accent-text);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px var(--ph-accent-glow);
  }

  .icon-btn-small {
    background: transparent;
    border: none;
    color: var(--ph-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn-small:hover {
    color: var(--ph-text);
  }

  .scrubber-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .time-label {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
  }

  .progress-track {
    flex: 1;
    height: 4px;
    background: var(--ph-surface-overlay);
    border-radius: var(--ph-radius-full);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--ph-accent);
  }

  .player-right {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 200px;
    justify-content: flex-end;
  }

  .volume-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ph-text-muted);
  }

  .volume-track {
    width: 80px;
    height: 4px;
    background: var(--ph-surface-overlay);
    border-radius: var(--ph-radius-full);
    overflow: hidden;
  }

  .volume-fill {
    height: 100%;
    background: var(--ph-text-muted);
  }

  /* Downloader & EQ Mock Views */
  .downloader-mock {
    padding: 30px 10px;
  }

  .dl-card {
    padding: 24px;
  }

  .dl-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 6px;
    display: block;
  }

  .dl-desc {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    margin-bottom: 20px;
  }

  .dl-input-box {
    display: flex;
    gap: 10px;
    background: var(--ph-surface);
    padding: 8px 12px;
    border-radius: var(--ph-radius-md);
    border: 1px solid var(--ph-border);
    margin-bottom: 16px;
  }

  .dl-url-placeholder {
    flex: 1;
    font-size: 0.8125rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
    display: flex;
    align-items: center;
  }

  .dl-status-row {
    font-size: 0.8125rem;
    color: var(--ph-success);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .speed-badge {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
  }

  .eq-mini-mock {
    padding: 20px 10px;
  }

  .eq-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .eq-title {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .eq-bars-preview {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 12px;
    height: 180px;
    padding: 10px 0;
  }

  .eq-slider-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .slider-track {
    flex: 1;
    width: 6px;
    background: var(--ph-surface-overlay);
    border-radius: var(--ph-radius-full);
    position: relative;
    margin-bottom: 8px;
  }

  .slider-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--ph-accent);
    border-radius: var(--ph-radius-full);
  }

  .slider-thumb {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--ph-text);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .slider-hz {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
  }

  @media (max-width: 860px) {
    .mock-sidebar {
      display: none;
    }
    .player-right {
      display: none;
    }
    .col-album {
      display: none;
    }
    .table-header, .song-row {
      grid-template-columns: 30px 1fr 90px 50px;
    }
  }
</style>
