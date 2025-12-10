Task Manager – React Kanban Board

A simple task-management application built with React.
It allows creating tasks, editing them, organizing them into boards, and dragging them between columns (To-Do, In-Progress, Completed).
Everything is stored in LocalStorage so the data stays even after refresh.

Features

Create, update and delete tasks

Choose priority, status, description and due date

Drag & drop support for moving tasks between boards

Filters for priority and status

Sorting by newest, oldest or closest deadline

Clean and responsive UI built with TailwindCSS

No backend required (LocalStorage based)

Tech Used

React

TailwindCSS

@hello-pangea/dnd (Drag and Drop)

Day.js

UUID

LocalStorage for persistence

Project Structure
src/
  components/
    Navbar.jsx
    FilterBar.jsx
    BoardColumn.jsx
    TaskCard.jsx
    TaskModal.jsx
  hooks/
    useLocalStorage.js
  data/
    tasks.json
  App.jsx
  index.css

How to Run

Install packages:

npm install


Start development server:

npm run dev


Build for production:

npm run build
npm run preview

Author

Saniya Fathima
Task Manager Project