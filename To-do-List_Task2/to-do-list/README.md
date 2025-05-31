# Smart Todo List

A modern, responsive, and feature-rich Todo List application built with React.  
This app helps you manage tasks with due dates and times, filter and sort tasks, and keeps your data saved in local storage.

---

## Features

- Add tasks with due date and time.
- Mark tasks as completed.
- Remove tasks.
- Filter tasks by all, active, completed, and overdue.
- Sort tasks by due date, task name, or creation date, ascending or descending.
- Visual priority indicators for tasks (urgent, important, overdue, completed).
- Persistent data saved in browser's localStorage.
- Responsive and clean UI with smooth animations.
- Keyboard accessible (press Enter to add a task).

---
## Folder Structure
 
- `src/components/ToDoList.jsx` — Main ToDo list React component  
- `src/App.jsx` — Root component  
- `src/index.js` — Entry point of the app  
- `src/styles.css` — Stylesheet for the project
---

# brief Testing Guide for Todo List

This guide outlines a broad but shallow testing approach to verify all major functionalities of the Smart Todo List app.

---

## 1. Application Launch

- Open the app in a browser (`npm start`).
- Verify the app loads without errors.
- Check all initial UI elements (header, input form, buttons, filters, task list) appear correctly.

---

## 2. Adding Tasks

- Add a task with only description.
- Add a task with due date only.
- Add a task with due date and time.
- Attempt to add a task with empty description (should show error or prevent submission).

---

## 3. Viewing Tasks

- Confirm new tasks appear correctly.
- Verify task details: description, due date, time.
- Check priority color indicators for upcoming or overdue tasks.

---

## 4. Marking Tasks Completed

- Toggle task completion checkbox.
- Verify visual change (strikethrough or color change).
- Toggle back to active.

---

## 5. Deleting Tasks

- Delete tasks using the trash icon.
- Confirm tasks are removed from list.
- Ensure no other tasks are affected.

---

## 6. Filtering Tasks

- Test filters: All, Active, Completed, Overdue.
- Verify task list updates correctly based on filter.

---

## 7. Sorting Tasks

- Sort tasks by:
  - Due Date (asc/desc)
  - Task Name (A-Z / Z-A)
  - Creation Date (newest/oldest)
- Confirm task order changes appropriately.

---

## 8. Persistent Data

- Add and complete tasks.
- Reload or reopen browser.
- Confirm tasks and states persist.

---

## 9. Keyboard Accessibility

- Add tasks using keyboard (type + Enter).
- Navigate buttons and inputs using Tab key.

---

## 10. Responsive Design

- Resize window to simulate mobile, tablet, desktop.
- Confirm UI adapts without layout issues.

---

## 11. Edge Cases

- Add very long descriptions.
- Add invalid dates/times (if allowed).
- Add multiple tasks rapidly.
- Delete all tasks and verify empty state.

---

## 12. Error Handling

- Check for error messages on invalid input.
- Ensure no crashes or console errors during usage.

---

*Happy Testing!* 🚀
 


