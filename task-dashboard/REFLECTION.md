# Reflection — Task Management Dashboard

*Sample reflection: revise this to match what you personally built and tested.*

## My approach

I separated the application into small React components so each one had a clear purpose. The Dashboard component keeps the tasks in state, while TaskForm handles the inputs and TaskList displays tasks. I used TypeScript interfaces to describe the task fields and component props.

## Styling

I used Bootstrap 5 for responsive columns, cards, buttons, and form controls. I added a few custom CSS rules for the priority badges and page background. Bootstrap made it easier to create a layout without writing many media queries.

## Challenges and learning

One concept I practiced was passing callback functions from the parent Dashboard to child components. I also practiced updating arrays without changing the original state by using `map()` and `filter()`. I used `useEffect` to save tasks to localStorage when the tasks state changes.

## What I would improve

In a future version, I would consider adding tests, categories, and a backend database so tasks can sync across devices.

*Replace these examples with the specific issues you encountered and how you resolved them before submitting.*
