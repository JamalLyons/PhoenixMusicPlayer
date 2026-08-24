<script lang="ts">
  import {
    TOOLS_LICENSE_PRICE_LABEL,
    FREE_FEATURES,
    TOOLS_FEATURES,
    LICENSE_WAITLIST_URL,
    DISCORD_URL,
  } from './pricing';
  import { Check, KeyRound } from '@lucide/svelte';
</script>

<section id="pricing" class="pricing" aria-labelledby="pricing-title">
  <div class="container">
    <p class="section-label">Free &amp; Tools</p>
    <h2 id="pricing-title" class="section-title">Listen free. Unlock tools once.</h2>
    <p class="section-lede">
      Core listening stays free forever. Acquisition, tagging, EQ, and library tools unlock with a one-time license—no subscription.
    </p>

    <div class="tiers">
      <article class="tier">
        <header class="tier-head">
          <h3 class="tier-name">Free</h3>
          <p class="tier-price">$0</p>
          <p class="tier-blurb">Your listening home on device.</p>
        </header>
        <ul class="feature-list">
          {#each FREE_FEATURES as feature}
            <li>
              <span class="check" aria-hidden="true"><Check size={16} /></span>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
        <a href="#download" class="btn btn-secondary tier-cta">Download free</a>
      </article>

      <article class="tier tier-tools">
        <header class="tier-head">
          <p class="tools-badge"><KeyRound size={14} /> One-time license</p>
          <h3 class="tier-name">Tools</h3>
          <p class="tier-price">{TOOLS_LICENSE_PRICE_LABEL}</p>
          <p class="tier-blurb">Pay once. Keep the tools as we extend them.</p>
        </header>
        <ul class="feature-list">
          {#each TOOLS_FEATURES as feature}
            <li>
              <span class="check" aria-hidden="true"><Check size={16} /></span>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
        <a href={LICENSE_WAITLIST_URL} target="_blank" rel="noreferrer" class="btn btn-primary tier-cta">Join license waitlist</a>
        <p class="waitlist-note">
          Licensing is rolling out—join
          <a href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a>
          for early access. During beta, Tools are available in the free download.
        </p>
      </article>
    </div>
  </div>
</section>

<style>
  .pricing {
    background: var(--ph-surface);
    border-bottom: 1px solid var(--ph-border);
  }

  .tiers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 56px;
    align-items: stretch;
  }

  .tier {
    display: flex;
    flex-direction: column;
    padding: 36px 32px;
    border: 1px solid var(--ph-border);
    background: var(--ph-bg);
    animation: ph-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .tier-tools {
    border-color: var(--ph-accent-border);
    background: linear-gradient(
      160deg,
      var(--ph-surface-raised) 0%,
      var(--ph-bg) 100%
    );
    animation-delay: 0.12s;
  }

  .tier-head {
    margin-bottom: 28px;
  }

  .tools-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ph-text-muted);
    margin-bottom: 12px;
  }

  .tier-name {
    font-family: var(--ph-font-display);
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .tier-price {
    font-family: var(--ph-font-display);
    font-size: 2.75rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: 10px;
  }

  .tier-blurb {
    color: var(--ph-text-muted);
    font-size: 0.95rem;
  }

  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    margin-bottom: 28px;
  }

  .feature-list li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 0.925rem;
    color: var(--ph-text-muted);
    line-height: 1.45;
  }

  .feature-list .check {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--ph-accent);
    display: inline-flex;
  }

  .tier-cta {
    width: 100%;
  }

  .waitlist-note {
    margin-top: 14px;
    font-size: 0.8rem;
    color: var(--ph-text-dim);
    line-height: 1.5;
  }

  .waitlist-note a {
    color: var(--ph-accent);
  }

  @media (max-width: 720px) {
    .tiers {
      grid-template-columns: 1fr;
    }
  }
</style>
