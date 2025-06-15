<script lang="ts">
  import { onMount } from 'svelte';
  import { notes, loading, error, searchQuery } from '../stores/notesStore';
  import { notesService } from '../services/NotesService';
  import type { Note, CreateNoteData, UpdateNoteData } from '../types/Note';
  
  import LoadingSpinner from './LoadingSpinner.svelte';
  import SearchBar from './SearchBar.svelte';
  import NoteForm from './NoteForm.svelte';
  import NoteCard from './NoteCard.svelte';
  import DeleteConfirmModal from './DeleteConfirmModal.svelte';
  import EditNoteModal from './EditNoteModal.svelte';

  let showCreateForm = false;
  let showEditModal = false;
  let showDeleteModal = false;
  let editingNote: Note | null = null;
  let deletingNoteId: number | null = null;
  let createLoading = false;
  let editLoading = false;
  let deleteLoading = false;

  // Filtered notes based on search query
  $: filteredNotes = $notes.filter(note =>
    note.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes($searchQuery.toLowerCase())
  );

  onMount(() => {
    loadNotes();
  });

  async function loadNotes() {
    try {
      loading.set(true);
      error.set(null);
      const fetchedNotes = await notesService.getAllNotes();
      notes.set(fetchedNotes);
    } catch (err) {
      error.set(err instanceof Error ? err.message : 'Failed to load notes');
      console.error('Error loading notes:', err);
    } finally {
      loading.set(false);
    }
  }

  async function handleCreateNote(event: CustomEvent<CreateNoteData>) {
    try {
      createLoading = true;
      error.set(null);
      const newNote = await notesService.createNote(event.detail);
      notes.update(currentNotes => [newNote, ...currentNotes]);
      showCreateForm = false;
    } catch (err) {
      error.set(err instanceof Error ? err.message : 'Failed to create note');
      console.error('Error creating note:', err);
    } finally {
      createLoading = false;
    }
  }

  async function handleEditNote(event: CustomEvent<{ id: number; data: UpdateNoteData }>) {
    try {
      editLoading = true;
      error.set(null);
      const updatedNote = await notesService.updateNote(event.detail.id, event.detail.data);
      notes.update(currentNotes =>
        currentNotes.map(note => note.id === event.detail.id ? updatedNote : note)
      );
      showEditModal = false;
      editingNote = null;
    } catch (err) {
      error.set(err instanceof Error ? err.message : 'Failed to update note');
      console.error('Error updating note:', err);
    } finally {
      editLoading = false;
    }
  }

  async function handleDeleteNote() {
    if (!deletingNoteId) return;
    
    try {
      deleteLoading = true;
      error.set(null);
      await notesService.deleteNote(deletingNoteId);
      notes.update(currentNotes => currentNotes.filter(note => note.id !== deletingNoteId));
      showDeleteModal = false;
      deletingNoteId = null;
    } catch (err) {
      error.set(err instanceof Error ? err.message : 'Failed to delete note');
      console.error('Error deleting note:', err);
    } finally {
      deleteLoading = false;
    }
  }

  function openEditModal(event: CustomEvent<Note>) {
    editingNote = event.detail;
    showEditModal = true;
  }

  function openDeleteModal(event: CustomEvent<number>) {
    deletingNoteId = event.detail;
    showDeleteModal = true;
  }

  function closeEditModal() {
    showEditModal = false;
    editingNote = null;
  }

  function closeDeleteModal() {
    showDeleteModal = false;
    deletingNoteId = null;
  }

  function toggleCreateForm() {
    showCreateForm = !showCreateForm;
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Title -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Notes</h2>
      <p class="text-gray-600 dark:text-gray-400">Organize your thoughts and ideas</p>
    </div>

    <!-- Error Message -->
    {#if $error}
      <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-800 dark:text-red-200 text-sm">{$error}</p>
        </div>
      </div>
    {/if}

    <!-- Search and Create Button -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
      <div class="w-full sm:flex-1 sm:max-w-md">
        <SearchBar />
      </div>
      <button
        on:click={toggleCreateForm}
        class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {showCreateForm ? 'Cancel' : 'New Note'}
      </button>
    </div>

    <!-- Create Note Form -->
    {#if showCreateForm}
      <div class="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 animate-slide-up">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create New Note
        </h3>
        <NoteForm
          loading={createLoading}
          on:submit={handleCreateNote}
          on:cancel={toggleCreateForm}
        />
      </div>
    {/if}

    <!-- Loading State -->
    {#if $loading}
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading your notes...</p>
        </div>
      </div>
    {:else if filteredNotes.length === 0}
      <!-- Empty State -->
      <div class="text-center py-20">
        <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg class="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {$searchQuery ? 'No notes found' : 'No notes yet'}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {$searchQuery ? 'Try adjusting your search terms to find what you\'re looking for.' : 'Start capturing your thoughts and ideas by creating your first note.'}
        </p>
        {#if !$searchQuery && !showCreateForm}
          <button
            on:click={toggleCreateForm}
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Create Your First Note
          </button>
        {/if}
      </div>
    {:else}
      <!-- Notes Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each filteredNotes as note (note.id)}
          <NoteCard
            {note}
            loading={editLoading || deleteLoading}
            on:edit={openEditModal}
            on:delete={openDeleteModal}
          />
        {/each}
      </div>
    {/if}
  </div>

  <!-- Edit Note Modal -->
  <EditNoteModal
    show={showEditModal}
    note={editingNote}
    loading={editLoading}
    on:submit={handleEditNote}
    on:cancel={closeEditModal}
  />

  <!-- Delete Confirmation Modal -->
  <DeleteConfirmModal
    show={showDeleteModal}
    loading={deleteLoading}
    on:confirm={handleDeleteNote}
    on:cancel={closeDeleteModal}
  />
</div>