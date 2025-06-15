<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Note } from '../types/Note';

  export let note: Note;
  export let loading = false;

  const dispatch = createEventDispatcher();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function handleEdit() {
    dispatch('edit', note);
  }

  function handleDelete() {
    dispatch('delete', note.id);
  }
</script>

<div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:scale-105 animate-slide-up">
  <!-- Header with Actions -->
  <div class="flex justify-between items-start mb-4">
    <div class="flex-1 min-w-0">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {note.title}
      </h3>
    </div>
    <div class="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        on:click={handleEdit}
        disabled={loading}
        class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 disabled:opacity-50"
        title="Edit note"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        on:click={handleDelete}
        disabled={loading}
        class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 disabled:opacity-50"
        title="Delete note"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Content -->
  <p class="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-4 leading-relaxed">
    {note.content}
  </p>
  
  <!-- Footer -->
  <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
    <div class="text-xs text-gray-400 dark:text-gray-500 flex items-center">
      <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {formatDate(note.createdAt)}
    </div>
    <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>