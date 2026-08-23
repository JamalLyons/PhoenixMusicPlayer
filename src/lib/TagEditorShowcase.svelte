<script lang="ts">
  import { Tags, Sparkles, Image, Check, FileText, ArrowRight, Wand2 } from '@lucide/svelte';

  let rawFilename = $state('04. Tycho - Coastal Brake [Official Video] (320kbps).flac');
  let cleanedTitle = $state('Coastal Brake');
  let cleanedArtist = $state('Tycho');
  let cleanedAlbum = $state('Dive');
  let cleanedTrackNo = $state('4');
  let cleanedYear = $state('2011');
  let appliedMacro = $state(true);

  function toggleMacro() {
    appliedMacro = !appliedMacro;
    if (appliedMacro) {
      cleanedTitle = 'Coastal Brake';
      cleanedArtist = 'Tycho';
    } else {
      cleanedTitle = '04. Tycho - Coastal Brake [Official Video] (320kbps)';
      cleanedArtist = 'Unknown Artist';
    }
  }
</script>

<section id="editor" class="editor-section">
  <div class="container">
    <div class="section-header">
      <div class="badge">Metadata Studio</div>
      <h2 class="section-title">Built-In Tagging & Library Hygiene</h2>
      <p class="section-subtitle">
        Fix titles, artists, track numbers, and missing album artwork right where you listen. No need to export files into third-party taggers.
      </p>
    </div>

    <div class="editor-grid">
      <!-- Left: Interactive Tag Normalizer Mock -->
      <div class="glass-card editor-card">
        <div class="card-header">
          <div class="card-title-group">
            <Wand2 size={18} class="card-icon" />
            <span class="card-title">Instant Cleanup Macros</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick={toggleMacro}>
            {appliedMacro ? 'Show Raw Input' : 'Apply Cleanup Macro'}
          </button>
        </div>

        <div class="raw-box">
          <span class="box-label">Original Filename:</span>
          <code class="raw-code">{rawFilename}</code>
        </div>

        <div class="tag-fields-grid">
          <div class="field-item">
            <span class="field-label">Track Title</span>
            <div class="field-input {appliedMacro ? 'highlight' : ''}">
              <span>{cleanedTitle}</span>
              {#if appliedMacro}<Check size={14} class="check-icon" />{/if}
            </div>
          </div>

          <div class="field-item">
            <span class="field-label">Artist</span>
            <div class="field-input {appliedMacro ? 'highlight' : ''}">
              <span>{cleanedArtist}</span>
              {#if appliedMacro}<Check size={14} class="check-icon" />{/if}
            </div>
          </div>

          <div class="field-item">
            <span class="field-label">Album</span>
            <div class="field-input">
              <span>{cleanedAlbum}</span>
            </div>
          </div>

          <div class="field-item-row">
            <div class="field-item">
              <span class="field-label">Track #</span>
              <div class="field-input"><span>{cleanedTrackNo}</span></div>
            </div>
            <div class="field-item">
              <span class="field-label">Year</span>
              <div class="field-input"><span>{cleanedYear}</span></div>
            </div>
          </div>
        </div>

        <div class="macro-chips">
          <span class="chip active">✓ Strip [Official Video / HD] junk</span>
          <span class="chip active">✓ Smart Title Casing</span>
          <span class="chip active">✓ Extract Track # from filename</span>
        </div>
      </div>

      <!-- Right: Highlights & Features -->
      <div class="editor-features">
        <div class="feature-box glass-card">
          <div class="feature-icon-wrap"><Image size={20} /></div>
          <div class="feature-info">
            <h4>Embedded Artwork Manager</h4>
            <p>Extract, replace, or embed high-resolution album cover artwork directly into audio files (ID3v2 APIC, FLAC Picture blocks, MP4 covr).</p>
          </div>
        </div>

        <div class="feature-box glass-card">
          <div class="feature-icon-wrap"><Tags size={20} /></div>
          <div class="feature-info">
            <h4>Batch Multi-Track Editing</h4>
            <p>Select entire discographies to update album titles, genres, release dates, and track counts simultaneously in one click.</p>
          </div>
        </div>

        <div class="feature-box glass-card">
          <div class="feature-icon-wrap"><FileText size={20} /></div>
          <div class="feature-info">
            <h4>Pattern Extraction (Regex / Tokens)</h4>
            <p>Parse complex folder and file structures like <code>%artist%/%album%/%track% - %title%</code> to populate missing tags effortlessly.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .editor-section {
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

  .editor-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 30px;
    align-items: center;
  }

  .editor-card {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  :global(.card-icon) {
    color: var(--ph-accent);
  }

  .card-title {
    font-weight: 700;
    font-size: 1.0625rem;
  }

  .raw-box {
    background: var(--ph-surface);
    padding: 12px 14px;
    border-radius: var(--ph-radius-md);
    border: 1px solid var(--ph-border);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .box-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--ph-text-dim);
  }

  .raw-code {
    font-family: var(--ph-font-mono);
    font-size: 0.8125rem;
    color: var(--ph-warning);
    word-break: break-all;
  }

  .tag-fields-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .field-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .field-item-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ph-text-muted);
  }

  .field-input {
    background: var(--ph-surface);
    border: 1px solid var(--ph-border);
    padding: 8px 12px;
    border-radius: var(--ph-radius-sm);
    font-size: 0.875rem;
    color: var(--ph-text);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .field-input.highlight {
    border-color: var(--ph-accent-border);
    background: var(--ph-accent-subtle);
  }

  :global(.check-icon) {
    color: var(--ph-success);
  }

  .macro-chips {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 10px;
    border-top: 1px solid var(--ph-border);
  }

  .chip {
    font-size: 0.75rem;
    color: var(--ph-success);
    font-weight: 500;
  }

  .editor-features {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .feature-box {
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .feature-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: var(--ph-radius-md);
    background: var(--ph-accent-muted);
    color: var(--ph-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .feature-info h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .feature-info p {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    line-height: 1.5;
  }

  @media (max-width: 860px) {
    .editor-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
