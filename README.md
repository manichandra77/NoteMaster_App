# Notes Management App

A beautiful, responsive notes management application built with Svelte, TypeScript, and TailwindCSS.

## UI Screenshots
![Screenshot (86)](https://github.com/user-attachments/assets/583216b4-43c1-4b7f-ae00-9173aac0e27c)
![Screenshot (89)](https://github.com/user-attachments/assets/68509f71-3222-40c0-8050-bf47d3b8aa67)
![Screenshot (87)](https://github.com/user-attachments/assets/a6684675-6bf4-4c77-9859-37e170914a0d)
![Screenshot (88)](https://github.com/user-attachments/assets/1dcda60e-bdc1-4ccd-93fa-b2e36df3e4ae)

## Features

### Core Functionality
- **View Notes**: Display all notes in a responsive card grid
- **Create Notes**: Add new notes with title and content
- **Edit Notes**: Update existing notes with inline editing modal
- **Delete Notes**: Remove notes with confirmation modal
- **Search**: Filter notes by title and content
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Integrated functionality to use in dark/light mode

### User Experience
- **Modern Design**: Clean, card-based layout with subtle shadows
- **Smooth Animations**: Fade-in, slide-up, and scale transitions
- **Loading States**: Visual feedback during API operations
- **Micro-interactions**: Hover effects and button states
- **Mobile-First**: Optimized for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Tech Stack

- **Frontend**: Svelte 4 + TypeScript
- **Styling**: TailwindCSS 3
- **Build Tool**: Vite
- **API**: MockAPI (configurable)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your API endpoint:
   - Go to [MockAPI.io](https://mockapi.io)
   - Create a new project
   - Add a resource called `notes` with these fields:
     - `title` (text)
     - `content` (text)
     - `createdAt` (date - auto-generated)
   - Copy your API endpoint URL
   - Update `API_BASE_URL` in `src/services/NotesService.ts`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the provided local URL

### API Setup Details

Your MockAPI endpoint should look like:
```
https://YOUR_PROJECT_ID.mockapi.io/api/v1
```

The app expects the following API endpoints:
- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

Example note structure:
```json
{
  "id": 1,
  "title": "My First Note",
  "content": "This is the content of my note",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoadingSpinner.svelte
│   ├── SearchBar.svelte
│   ├── NoteForm.svelte
│   ├── NoteCard.svelte
│   ├── EditNoteModal.svelte
│   └── DeleteConfirmModal.svelte
├── services/           # API service layer
│   └── NotesService.ts
├── stores/             # Svelte stores for state management
│   └── notesStore.ts
├── types/              # TypeScript type definitions
│   └── Note.ts
├── App.svelte          # Main application component
├── main.ts             # Application entry point
└── app.css             # Global styles and Tailwind imports
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte checks

## Design Philosophy

This application follows modern web design principles:

- **Mobile-First**: Designed for mobile devices first, then enhanced for larger screens
- **Component-Based**: Modular, reusable components with clear separation of concerns
- **Accessible**: Proper semantic HTML, ARIA labels, and keyboard navigation
- **Performance**: Optimized animations and efficient state management
- **User-Centric**: Clear visual feedback, error handling, and intuitive interactions

## Trade-offs and Assumptions

### Trade-offs Made
1. **Client-Side Only**: No server-side rendering for simplicity
2. **MockAPI Dependency**: Relies on external service for data persistence
3. **No Authentication**: Focused on core CRUD functionality
4. **No Offline Support**: Requires internet connection for data operations

### Assumptions
1. **API Structure**: Assumes MockAPI response format with id, title, content, createdAt
2. **Modern Browser**: Uses modern CSS features and ES6+ JavaScript
3. **Reasonable Dataset**: Optimized for hundreds of notes, not thousands

## What I'd Do With More Time

### Enhanced Features
- **Authentication**: User accounts and private notes
- **Rich Text Editor**: Markdown support or WYSIWYG editing
- **Categories/Tags**: Organize notes with labels and filtering
- **Offline Support**: Service worker for offline functionality
- **Real-time Sync**: WebSocket updates for multi-device sync

### Technical Improvements
- **Testing**: Unit tests with Jest/Vitest and E2E tests with Playwright
- **Performance**: Virtual scrolling for large datasets
- **PWA Features**: Install prompt and app-like experience
- **Advanced Search**: Full-text search with highlighting
- **Keyboard Shortcuts**: Power-user features

### UX Enhancements
- **Drag & Drop**: Reorder notes and bulk operations
- **Export/Import**: Backup and restore functionality
- **Themes**: Dark mode and customizable color schemes
- **Advanced Animations**: More sophisticated transitions and gestures

## License

MIT License - feel free to use this project as a reference or starting point for your own applications.
