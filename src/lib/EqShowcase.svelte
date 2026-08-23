<script lang="ts">
  import { SlidersHorizontal, RotateCcw } from '@lucide/svelte';

  interface Preset {
    name: string;
    gains: number[];
  }

  const BANDS = ['32Hz', '64Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz'];

  const PRESETS: Preset[] = [
    { name: 'Warm Acoustic', gains: [4, 5, 3, 2, 0, -1, 1, 3, 4, 5] },
    { name: 'Bass Immersion', gains: [9, 8, 6, 3, 0, 0, 0, 1, 2, 2] },
    { name: 'Vocal Air & Presence', gains: [-2, -1, 0, 2, 4, 6, 5, 4, 3, 2] },
    { name: 'Electronic Energy', gains: [7, 6, 2, -1, -2, 1, 3, 6, 8, 9] },
    { name: 'Vinyl Neutral', gains: [1, 2, 1, 0, 0, 0, 0, 0, -1, -2] },
    { name: 'Flat Studio Reference', gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ];

  let activePreset = $state('Warm Acoustic');
  let preampGain = $state(0);
  let bandGains = $state<number[]>([4, 5, 3, 2, 0, -1, 1, 3, 4, 5]);

  function applyPreset(preset: Preset) {
    activePreset = preset.name;
    bandGains = [...preset.gains];
  }

  function resetEq() {
    applyPreset(PRESETS[5]); // Flat
  }

  function updateGain(idx: number, e: Event) {
    const val = parseFloat((e.target as HTMLInputElement).value);
    bandGains[idx] = val;
    activePreset = 'Custom Curve';
  }

  // Generate SVG bezier curve points from gains
  let curvePath = $derived.by(() => {
    const width = 800;
    const height = 180;
    const midY = height / 2;
    const maxDb = 12;

    const points = bandGains.map((gain, i) => {
      const x = (i / (bandGains.length - 1)) * (width - 60) + 30;
      const y = midY - (gain / maxDb) * (height / 2 - 20);
      return { x, y };
    });

    if (points.length === 0) return '';

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX1 = curr.x + (next.x - curr.x) / 2;
      const cpY1 = curr.y;
      const cpX2 = curr.x + (next.x - curr.x) / 2;
      const cpY2 = next.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }

    return d;
  });
</script>

<section id="eq" class="eq-showcase-section">
  <div class="container">
    <div class="section-header">
      <div class="badge">Precision Audio</div>
      <h2 class="section-title">Parametric 10-Band Equalizer</h2>
      <p class="section-subtitle">
        Shape frequency contours to match your headphones, room acoustics, or musical genre. Assign presets universally or let them automatically trigger per song, album, or playlist.
      </p>
    </div>

    <div class="eq-console glass-card">
      <!-- Top Console Bar -->
      <div class="console-topbar">
        <div class="console-title-group">
          <SlidersHorizontal size={20} class="console-icon" />
          <span class="console-title">Hardware Response Curve</span>
          <span class="active-preset-badge">{activePreset}</span>
        </div>

        <div class="console-actions">
          <div class="preamp-wrap">
            <span class="preamp-label">Preamp</span>
            <input 
              type="range" 
              min="-12" 
              max="12" 
              step="0.5" 
              bind:value={preampGain}
              class="preamp-slider"
            />
            <span class="gain-val">{preampGain > 0 ? `+${preampGain}` : preampGain} dB</span>
          </div>

          <button class="btn btn-secondary btn-sm reset-btn" onclick={resetEq} title="Reset to Flat">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <!-- Real-time SVG Response Graph -->
      <div class="graph-container">
        <svg class="eq-svg" viewBox="0 0 800 180" preserveAspectRatio="none">
          <!-- Grid lines -->
          <line x1="30" y1="20" x2="770" y2="20" class="grid-line" />
          <line x1="30" y1="90" x2="770" y2="90" class="grid-line zero-line" />
          <line x1="30" y1="160" x2="770" y2="160" class="grid-line" />

          <!-- Shaded Area Under Curve -->
          <path 
            d="{curvePath} L 770 180 L 30 180 Z" 
            class="curve-area" 
          />

          <!-- Frequency Curve Line -->
          <path d={curvePath} class="curve-line" />

          <!-- Band Nodes -->
          {#each bandGains as gain, i}
            {@const x = (i / (bandGains.length - 1)) * 740 + 30}
            {@const y = 90 - (gain / 12) * 70}
            <circle cx={x} cy={y} r="5" class="curve-node" />
          {/each}
        </svg>

        <div class="graph-labels">
          <span class="db-label plus">+12 dB</span>
          <span class="db-label zero">0 dB</span>
          <span class="db-label minus">-12 dB</span>
        </div>
      </div>

      <!-- Sliders Rack -->
      <div class="sliders-rack">
        {#each BANDS as band, idx}
          <div class="band-column">
            <span class="gain-readout">{bandGains[idx] > 0 ? `+${bandGains[idx]}` : bandGains[idx]}</span>
            <div class="vertical-slider-wrapper">
              <input 
                type="range" 
                min="-12" 
                max="12" 
                step="0.5" 
                value={bandGains[idx]}
                oninput={(e) => updateGain(idx, e)}
                class="vertical-range"
              />
            </div>
            <span class="band-freq">{band}</span>
          </div>
        {/each}
      </div>

      <!-- Quick Preset Selector Pills -->
      <div class="presets-footer">
        <span class="preset-label">Quick Presets:</span>
        <div class="presets-list">
          {#each PRESETS as preset}
            <button 
              class="preset-pill {activePreset === preset.name ? 'active' : ''}"
              onclick={() => applyPreset(preset)}
            >
              {preset.name}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .eq-showcase-section {
    padding: 80px 0;
  }

  .section-header {
    text-align: center;
    max-width: 700px;
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

  .eq-console {
    padding: 28px;
    border-radius: var(--ph-radius-xl);
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-shadow: var(--ph-shadow-md);
  }

  .console-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .console-title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  :global(.console-icon) {
    color: var(--ph-accent);
  }

  .console-title {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .active-preset-badge {
    font-size: 0.75rem;
    font-family: var(--ph-font-mono);
    padding: 3px 8px;
    border-radius: var(--ph-radius-sm);
    background: var(--ph-accent-muted);
    color: var(--ph-accent);
    border: 1px solid var(--ph-accent-border);
  }

  .console-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .preamp-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8125rem;
    color: var(--ph-text-muted);
  }

  .preamp-slider {
    width: 100px;
    accent-color: var(--ph-accent);
  }

  .gain-val {
    font-family: var(--ph-font-mono);
    font-size: 0.75rem;
    color: var(--ph-text);
    width: 48px;
  }

  .reset-btn {
    padding: 6px 12px;
    font-size: 0.8125rem;
  }

  /* SVG Graph */
  .graph-container {
    position: relative;
    height: 180px;
    background: var(--ph-surface);
    border-radius: var(--ph-radius-md);
    border: 1px solid var(--ph-border);
    overflow: hidden;
  }

  .eq-svg {
    width: 100%;
    height: 100%;
  }

  .grid-line {
    stroke: var(--ph-border);
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }

  .zero-line {
    stroke: var(--ph-border-strong);
    stroke-dasharray: none;
  }

  .curve-area {
    fill: var(--ph-accent-subtle);
  }

  .curve-line {
    fill: none;
    stroke: var(--ph-accent);
    stroke-width: 3;
    stroke-linecap: round;
  }

  .curve-node {
    fill: var(--ph-accent);
    stroke: var(--ph-bg);
    stroke-width: 2;
    transition: r 0.15s ease;
  }

  .graph-labels {
    position: absolute;
    top: 10px;
    left: 12px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }

  .db-label {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
  }

  /* Sliders Rack */
  .sliders-rack {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
    padding: 10px 0;
  }

  .band-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .gain-readout {
    font-size: 0.6875rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-muted);
    height: 16px;
  }

  .vertical-slider-wrapper {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vertical-range {
    appearance: slider-vertical;
    -webkit-appearance: slider-vertical;
    writing-mode: bt-lr;
    width: 6px;
    height: 120px;
    accent-color: var(--ph-accent);
    cursor: pointer;
  }

  .band-freq {
    font-size: 0.75rem;
    font-family: var(--ph-font-mono);
    color: var(--ph-text-dim);
    font-weight: 500;
  }

  /* Presets Footer */
  .presets-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid var(--ph-border);
    flex-wrap: wrap;
  }

  .preset-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--ph-text-dim);
  }

  .presets-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .preset-pill {
    font-size: 0.8125rem;
    padding: 5px 12px;
    border-radius: var(--ph-radius-full);
    background: var(--ph-surface);
    border: 1px solid var(--ph-border);
    color: var(--ph-text-muted);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .preset-pill:hover {
    border-color: var(--ph-border-strong);
    color: var(--ph-text);
  }

  .preset-pill.active {
    background: var(--ph-accent);
    color: var(--ph-accent-text);
    border-color: var(--ph-accent);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .sliders-rack {
      overflow-x: auto;
      padding-bottom: 12px;
    }
  }
</style>
