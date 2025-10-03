# ToDo App (React + TS + Vite)

Mobile-adaptive ToDo app with CRUD, task details, pagination, sorting, and filtering. Uses Redux Toolkit for state, Axios for API calls, Material UI + Tailwind for UI.

### Demo API
Backend docs: `https://todoapp.ideallteam.com/docs/`

### Tech Stack
- React 18, TypeScript, Vite
- Redux Toolkit
- Axios
- MUI (Material UI) + TailwindCSS

## Features
- Create, read, update, delete tasks
- View task details page (click list item)
- Pagination (page, per-page)
- Sorting (Created, Updated, Title, Dates, Completed; asc/desc)
- Filtering: search by title, status (All/Active/Completed)
- Mobile-adaptive layout; completed tasks styled differently

## Getting Started

### Prerequisites
- Node.js 18+

### Install
```bash
npm install
```

### Configure API
This project uses a Vite dev proxy for `https://todoapp.ideallteam.com`.

- Dev server uses proxy path `/api` (see `vite.config.ts`).
- Axios base URL falls back to `/api` if `VITE_API_URL` is unset.

Optional: create `.env` with
```bash
VITE_API_URL=/api
```

### Run Dev
```bash
npm run dev
```
Open the printed Local URL (e.g., `http://localhost:5174`).

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Project Structure
```
src/
  api/
    axios.ts          # Axios instance (baseURL)
    crudApi.ts        # API helpers (optional)
  app/
    store.ts          # Redux store
    hooks.ts          # Typed hooks
  components/
    Layout.tsx        # AppBar, Drawer
    TopBar.tsx        # Search, sort, filters, Add Task
  features/tasks/
    taskSlice.ts      # Thunks + reducers (CRUD, pagination, filters)
    components/
      TaskList.tsx    # Grid of task cards (completed styling)
      AddTaskDialog.tsx
  pages/
    Home.tsx          # List + pagination controls
    TaskDetailsPage.tsx # Edit/Delete a task
  types/taskTypes.ts  # DTOs and query params
```

## Key Implementation Notes
- Search uses the API `title` parameter (not `search`).
- API list response is `{ data: Task[], meta: { page, limit, total, totalPages, hasNextPage, hasPrevPage } }` and the slice maps these into local pagination state.
- Changing search/sort/filter resets the page to 1.
- Completed tasks have a green accent and strikethrough title in `TaskList`.

## Available Scripts
- `dev`: Vite dev server
- `build`: Type-check + build
- `preview`: Serve the build

## GitHub
1) Initialize repo and push
```bash
git init
git add .
git commit -m "feat: todo app with pagination/sort/filter"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## License
MIT
