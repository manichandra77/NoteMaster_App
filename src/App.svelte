<script lang="ts">
  import { onMount } from 'svelte';
  import { currentPage, darkMode } from './stores/appStore';
  
  import IntroPage from './components/IntroPage.svelte';
  import NotesHeader from './components/NotesHeader.svelte';
  import NotesPage from './components/NotesPage.svelte';

  function handleNavigation(event: CustomEvent<'intro' | 'notes'>) {
    currentPage.set(event.detail);
  }

  onMount(() => {
    // Apply dark mode class on mount
    if ($darkMode) {
      document.documentElement.classList.add('dark');
    }
  });
</script>

<main class="min-h-screen transition-colors duration-300">
  {#if $currentPage === 'intro'}
    <IntroPage on:navigate={handleNavigation} />
  {:else}
    <NotesHeader on:navigate={handleNavigation} />
    <NotesPage />
  {/if}
</main>