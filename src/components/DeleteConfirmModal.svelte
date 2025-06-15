<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let show = false;
  export let loading = false;

  const dispatch = createEventDispatcher();

  function handleConfirm() {
    dispatch('confirm');
  }

  function handleCancel() {
    dispatch('cancel');
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  }
</script>

{#if show}
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in border border-gray-200 dark:border-gray-700">
      <!-- Icon -->
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>
      
      <!-- Content -->
      <div class="text-center mb-8">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Delete Note</h3>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this note? This action cannot be undone and your note will be permanently removed.
        </p>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-3">
        <button
          type="button"
          on:click={handleCancel}
          disabled={loading}
          class="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          on:click={handleConfirm}
          disabled={loading}
          class="flex-1 px-6 py-3 text-white bg-red-600 hover:bg-red-700 border border-transparent rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
        >
          {#if loading}
            <div class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Deleting...
            </div>
          {:else}
            Delete Note
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}