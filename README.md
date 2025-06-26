# Taskia

Another task management app.

## Features

- [x] Task List
- [ ] New Task
- [ ] Edit Task
- [ ] Delete Task

## Feature Details

### Task List

1. Table columns : name, deadline, status, action (edit, delete)
2. Sort by deadline

### New Task

1. Click the "New Task" button
2. Insert a new row
3. Switch the new row to create mode
4. Focus on input name
5. Switch the new row to display mode on save
6. Dispatch API new task
7. Delete the row on cancel

### Edit Task

1. Display edit button on each task row
2. Switch the row to edit mode on edit
3. Focus on input name
4. Switch the row to display mode on save
5. Rollback to prev row value on cancel
6. Dispatch API update task

### Delete Task

1. Display edit button on each task row
2. Remove the row on delete
3. Dispatch API delete task

### Edit Task Status

1. Dispatch API update task

### Dispatch API New Task

1. Accept data
2. Request to server
3. Get returned id
4. Update the row id to returned id

### Dispatch API Update Task

1. Accept id and data
2. Request to server

### API Dispatch Delete Task

1. Accept id
2. Request to server
