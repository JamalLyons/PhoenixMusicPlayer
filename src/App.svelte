<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from './lib/theme';
  import { fetchLatestRelease } from './lib/releases';
  import type { ReleaseInfo } from './lib/types';
  import Navbar from './lib/Navbar.svelte';
  import Hero from './lib/Hero.svelte';
  import AppPreview from './lib/AppPreview.svelte';
  import Features from './lib/Features.svelte';
  import EqShowcase from './lib/EqShowcase.svelte';
  import TagEditorShowcase from './lib/TagEditorShowcase.svelte';
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
    <AppPreview />
    <Features />
    <EqShowcase />
    <TagEditorShowcase />
    <DownloadPortal release={releaseInfo} />
  </main>

  <Footer />
</div>

<style>
  .landing-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
