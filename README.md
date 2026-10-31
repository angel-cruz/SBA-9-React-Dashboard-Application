# SBA-9-React-Dashboard-Application
React components, state management, TypeScript integration, form handling, and component composition

# Task Management Dashboard — Project Reflection

**Project:** Task Management Dashboard  
**Technologies:** React, TypeScript, Vite, Bootstrap 5, and localStorage

## Question 1: How did you implement React and TypeScript features in your project?


I used React functional components to build the different parts of my Task Management Dashboard. I used `useState` to store the tasks, the selected filters, the sorting option, and the task being edited. I used `useEffect` to save the task list to `localStorage` whenever the tasks changed. I also used `useEffect` in the task form to load the selected task's information when editing.

For TypeScript, I created types and interfaces in `src/types/index.ts` for tasks, form data, filters, and component props. This helped me keep the data consistent and catch mistakes while coding. For example, task statuses are limited to values such as `pending`, `in-progress`, and `completed`.

I used `map()` to update tasks, `filter()` to remove tasks and narrow down search results, and `sort()` to organize tasks. I also created a controlled form, meaning React state keeps track of what the user types. For styling, I used Bootstrap 5 classes for the layout, cards, buttons, and form controls, with a little custom CSS.
