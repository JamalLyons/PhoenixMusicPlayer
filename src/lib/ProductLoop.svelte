<script lang="ts">
  const steps = [
    {
      name: 'Acquire',
      text: 'Bring downloadable audio into your library without leaving Phoenix.',
    },
    {
      name: 'Organize',
      text: 'Fix titles, artists, artwork, and structure so browsing stays beautiful.',
    },
    {
      name: 'Play',
      text: 'Listen from a real music home—library, playlists, queue, and Now Playing.',
    },
    {
      name: 'Shape',
      text: 'Dial in a 10-band EQ for the album, playlist, or track that needs it.',
    },
    {
      name: 'Personalize',
      text: 'Theme, accent, and density so the room feels like yours.',
    },
  ] as const;
</script>

<section id="journey" class="journey" aria-labelledby="journey-title">
  <div class="container">
    <p class="section-label">One loop</p>
    <h2 id="journey-title" class="section-title">
      Acquire → organize → play → shape → make it home
    </h2>
    <p class="section-lede">
      Not a streaming catalog. Not a file utility. One continuous path from a file you own to a library that sounds and looks intentional.
    </p>

    <ol class="steps">
      {#each steps as step, i}
        <li class="step">
          <span class="step-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3 class="step-name">{step.name}</h3>
          <p class="step-text">{step.text}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .journey {
    background: var(--ph-surface);
    border-top: 1px solid var(--ph-border);
    border-bottom: 1px solid var(--ph-border);
  }

  .steps {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
    margin-top: 56px;
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--ph-accent-border);
  }

  .step-index {
    font-family: var(--ph-font-mono);
    font-size: 0.7rem;
    color: var(--ph-text-dim);
    letter-spacing: 0.04em;
  }

  .step-name {
    font-family: var(--ph-font-display);
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--ph-text);
  }

  .step-text {
    font-size: 0.875rem;
    color: var(--ph-text-muted);
    line-height: 1.55;
  }

  @media (max-width: 960px) {
    .steps {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 520px) {
    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
