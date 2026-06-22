**📝 CLI To-Do Application**

## Features
**💾 Local Data Persistence:** All your tasks are safely saved inside a local `todo.json` file.
**🎨 Dynamic Color UI:** Beautifully color-coded status reports in your terminal powered by `chalk`.
**⏰ Smart Date Stamping:** Every task tracks the exact calendar day it was created.
**🛡️ Robust Error Handling:** Gracefully handles missing files, invalid inputs, or incorrect task IDs.

## Tech Stack & Requirements
**Runtime:** [Node.js](https://nodejs.org) (v16.0.0 or higher recommended)
**Dependencies:** `chalk` (v5.x)
**Architecture:** ECMAScript Modules (ESM)

## Installation & Setup
***Follow these simple steps to spin up the application on your computer:***

### 1. Clone or Create your Files
Ensure your project folder contains your script file named `todo.js` and a `package.json` file configured for ES Modules.
Your `package.json` **must** look like this:
```json
{
  "name": "node-cli-todo",
  "version": "1.0.0",
  "type": "module",
  "main": "todo.js",
  "dependencies": {
    "chalk": "^5.6.2"
  }
}
```

### 2. Install Dependencies
Restore the required package modules by running:
```bash
npm install

## Usage & Commands:
Run your application using the command `node todo.js` followed by an action keyword:

### ➕ Add a Task
Creates a new pending item in your list.
```bash
node todo.js add "Buy groceries"
```

### 📋 View Tasks
Lists out all saved tasks with their specific IDs, completion status, and creation timestamps.
```bash
node todo.js list
```

### ✅ Mark a Task Completed
Toggles a pending task to a finished state using its unique numerical ID.
```bash
node todo.js done 1
```

### ❌ Remove a Single Task
Permanently extracts one specific task out of your tracking history.
```bash
node todo.js delete 1
```
### 🧹 Wipe the Slate Clean
Instantly purges every entry, resetting your stored file back to an empty collection.
```bash
node todo.js clear
```

---
## 📁 Storage Blueprint

Your items are automatically mapped to an ordered object tree mapped cleanly within a local database engine wrapper. Below is a structural snapshot of `todo.json` formatting:

```json
[
  {
    "id": 1,
    "text": "Buy groceries",
    "done": true,
    "createdAt": "22/06/2026"
  }
]
```