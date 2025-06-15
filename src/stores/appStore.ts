import { writable } from 'svelte/store';

export const currentPage = writable<'intro' | 'notes'>('intro');
export const darkMode = writable(false);

// Initialize dark mode from localStorage
if (typeof window !== 'undefined') {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode) {
    darkMode.set(JSON.parse(savedDarkMode));
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    darkMode.set(prefersDark);
  }
}

// Save dark mode preference to localStorage
darkMode.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', JSON.stringify(value));
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});