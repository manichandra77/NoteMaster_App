import { writable } from 'svelte/store';
import type { Note } from '../types/Note';

export const notes = writable<Note[]>([]);
export const loading = writable(false);
export const error = writable<string | null>(null);
export const searchQuery = writable('');