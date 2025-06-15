import type { Note, CreateNoteData, UpdateNoteData } from '../types/Note';

// Updated with your MockAPI endpoint
const API_BASE_URL = 'https://684f24b2f0c9c9848d2a331c.mockapi.io';

class NotesService {
  async getAllNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('MockAPI endpoint not found. Please check your API URL and ensure the notes resource exists.');
        }
        throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to MockAPI. Please check your internet connection and API URL.');
      }
      throw error;
    }
  }

  async createNote(noteData: CreateNoteData): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create note: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to MockAPI. Please check your internet connection and API URL.');
      }
      throw error;
    }
  }

  async updateNote(id: number, noteData: UpdateNoteData): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to MockAPI. Please check your internet connection and API URL.');
      }
      throw error;
    }
  }

  async deleteNote(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to MockAPI. Please check your internet connection and API URL.');
      }
      throw error;
    }
  }
}

export const notesService = new NotesService();