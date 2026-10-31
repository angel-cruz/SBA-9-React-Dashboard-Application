# SBA-9-React-Dashboard-Application
React components, state management, TypeScript integration, form handling, and component composition

# Task Management Dashboard — Project Reflection

**Project:** Task Management Dashboard  
**Technologies:** React, TypeScript, Vite, Bootstrap 5, and localStorage

## Question 1: How did you implement React and TypeScript features in your project?


I used React functional components to build the different parts of my Task Management Dashboard. I used `useState` to store the tasks, the selected filters, the sorting option, and the task being edited. I used `useEffect` to save the task list to `localStorage` whenever the tasks changed. I also used `useEffect` in the task form to load the selected task's information when editing.

For TypeScript, I created types and interfaces in `src/types/index.ts` for tasks, form data, filters, and component props. This helped me keep the data consistent and catch mistakes while coding. For example, task statuses are limited to values such as `pending`, `in-progress`, and `completed`.

I used `map()` to update tasks, `filter()` to remove tasks and narrow down search results, and `sort()` to organize tasks. I also created a controlled form, meaning React state keeps track of what the user types. For styling, I used Bootstrap 5 classes for the layout, cards, buttons, and form controls, with a little custom CSS.

## Question 2: What challenges did you encounter, and how did you overcome them?



One of the harder parts to understand was how to update a task without changing the original task array directly. I worked through this by using `map()` to create an updated array and changing only the task with the matching ID. For deleting tasks, I used `filter()` to return an array without the selected task.

Another challenging part was connecting the task form to the dashboard. The form needed to work for both adding a new task and editing an existing one. I handled this by passing the selected task into `TaskForm` through props. When there is a task to edit, the form fills in its current information. Otherwise, it starts with empty fields.

I also had to think about saving tasks after a page refresh. I used `localStorage` to load saved tasks when the dashboard starts and save changes whenever the task list updates. Breaking the code into smaller components and adding inline comments made the logic easier to follow.

*Before submitting, adjust this answer so it reflects the problems you personally ran into while running and testing the project.*

## Question 3: What was your approach to component composition and state management?


I tried to keep each component focused on one main job instead of putting everything in one large file. `Dashboard` is the main component that holds the task list and handles adding, editing, deleting, and updating tasks. `TaskForm` handles the input fields and validation. `TaskFilter` handles searching, filtering, and sorting. `TaskList` displays the tasks, and `TaskItem` displays an individual task.

I kept the main task state in `Dashboard` because multiple components need to use or update the same data. I passed information down through props and passed callback functions to child components so they could tell the dashboard when something changed. For example, clicking Delete in `TaskItem` calls a function passed down from `Dashboard`, which updates the task list.

I kept the form's input state inside `TaskForm` because those values only need to be managed while the user is filling out the form. I also put filtering, sorting, validation, and date formatting in `taskUtils.ts` so the components would be easier to read.


## Final Thoughts

This project helped me practice how React components work together and how TypeScript can make a project easier to manage. The biggest things I focused on were understanding state, passing props, working with arrays, and keeping the code organized. If I continue improving this dashboard, I would like to add task categories and maybe a backend database so tasks could be saved across different devices.
