<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from './lib/theme';
  import { fetchLatestRelease } from './lib/releases';
  import type { ReleaseInfo } from './lib/types';
  import Navbar from './lib/Navbar.svelte';
  import Hero from './lib/Hero.svelte';
  import Problem from './lib/Problem.svelte';
  import ProductLoop from './lib/ProductLoop.svelte';
  import ScreenshotGallery from './lib/ScreenshotGallery.svelte';
  import Pricing from './lib/Pricing.svelte';
  import DownloadPortal from './lib/DownloadPortal.svelte';
  import Footer from './lib/Footer.svelte';

  let releaseInfo = $state<ReleaseInfo | undefined>(undefined);

  onMount(async () => {
    theme.init();
    releaseInfo = await fetchLatestRelease();
  });
</script>

<div class="landing-app">
  <Navbar release={releaseInfo} />

  <main>
    <Hero release={releaseInfo} />
    <Problem />
    <ProductLoop />
    <ScreenshotGallery />
    <Pricing />
    <DownloadPortal release={releaseInfo} />
  </main>

  <Footer />
</div>

<style>
  .landing-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  main {
    flex: 1;
  }
</style>
