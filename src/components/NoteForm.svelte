<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CreateNoteData, UpdateNoteData } from '../types/Note';

  export let initialTitle = '';
  export let initialContent = '';
  export let isEditing = false;
  export let loading = false;

  const dispatch = createEventDispatcher();

  let title = initialTitle;
  let content = initialContent;

  function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    
    const noteData: CreateNoteData | UpdateNoteData = {
      title: title.trim(),
      content: content.trim()
    };
    
    dispatch('submit', noteData);
  }

  function handleCancel() {
    title = initialTitle;
    content = initialContent;
    dispatch('cancel');
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div>
    <label for="title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Title
    </label>
    <input
      id="title"
      type="text"
      bind:value={title}
      placeholder="Enter a catchy title..."
      disabled={loading}
      class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      required
    />
  </div>
  
  <div>
    <label for="content" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Content
    </label>
    <textarea
      id="content"
      bind:value={content}
      placeholder="Share your thoughts..."
      disabled={loading}
      rows="6"
      class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      required
    ></textarea>
  </div>
  
  <div class="flex gap-3 pt-2">
    <button
      type="submit"
      disabled={loading || !title.trim() || !content.trim()}
      class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
    >
      {#if loading}
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {isEditing ? 'Updating...' : 'Creating...'}
        </div>
      {:else}
        <div class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {isEditing ? 'Update Note' : 'Create Note'}
        </div>
      {/if}
    </button>
    
    <button
      type="button"
      on:click={handleCancel}
      disabled={loading}
      class="px-6 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
    >
      Cancel
    </button>
  </div>
</form>