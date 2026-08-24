<section id="problem" class="problem" aria-labelledby="problem-title">
  <div class="container">
    <p class="section-label">The bind</p>
    <h2 id="problem-title" class="section-title">
      Streaming is rented. File players feel unfinished.
    </h2>
    <p class="section-lede">
      Catalogs change. Offline is temporary. Or you duct-tape a player, a downloader, a tagger, and an EQ utility—and none of them feel like home.
    </p>

    <div class="split">
      <div class="col">
        <h3 class="col-title">Streaming apps</h3>
        <p class="col-body">
          Beautiful and convenient—but the music isn’t really yours. Features and pricing shift. Your taste lives in someone else’s cloud.
        </p>
      </div>
      <div class="divider" aria-hidden="true"></div>
      <div class="col">
        <h3 class="col-title">Legacy library tools</h3>
        <p class="col-body">
          They play files, but look dated or unfinished. Weak EQ. Painful metadata. Getting new tracks in means juggling folders and separate apps.
        </p>
      </div>
    </div>

    <p class="resolve">
      Phoenix is for the person who says: I want my own library, I want it to sound and look the way I want, and I don’t want five apps to make that work.
    </p>
  </div>
</section>

<style>
  .problem {
    border-top: 1px solid var(--ph-border);
  }

  .split {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 40px;
    margin-top: 48px;
    align-items: start;
  }

  .col-title {
    font-family: var(--ph-font-display);
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--ph-text);
  }

  .col-body {
    color: var(--ph-text-muted);
    font-size: 0.975rem;
    line-height: 1.65;
  }

  .divider {
    width: 1px;
    align-self: stretch;
    background: var(--ph-border);
    min-height: 80px;
  }

  .resolve {
    margin-top: 48px;
    max-width: 40rem;
    font-family: var(--ph-font-display);
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    font-weight: 450;
    line-height: 1.45;
    color: var(--ph-text);
    letter-spacing: -0.01em;
  }

  @media (max-width: 720px) {
    .split {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .divider {
      width: 100%;
      height: 1px;
      min-height: 0;
    }
  }
</style>
