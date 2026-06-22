import fs from "fs";
import chalk from "chalk";

const FILE_PATH = "todo.json";

async function readTodos() {
  try {
    try {
      await fs.promises.access(FILE_PATH);
    } catch {
      await fs.promises.writeFile(FILE_PATH, JSON.stringify([]), "utf8");
      return [];
    }
    const data = await fs.promises.readFile(FILE_PATH, "utf8");
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save data array down to file
async function saveTodos(todos) {
  try {
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(todos, null, 2), "utf8");
  } catch (error) {
    console.error(chalk.red(`⚠️ Save Error: ${error.message}`));
  }
}

async function main() {
  const args = process.argv.slice(2);
  const action = args[0]; 
  const target = args[1]; 

  const todos = await readTodos();

  switch (action) {
    case "add":
      if (!target) {
        console.log(chalk.red("❌ Error: Please specify a task description to add."));
        return;
      }
      
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

      const newTodo = { 
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1, 
        text: target, 
        done: false, 
        createdAt: dateStr 
      };
      
      todos.push(newTodo);
      await saveTodos(todos);
      console.log(chalk.green(`✓ Task added: ${target}`));
      break;

    case "list":
      if (todos.length === 0) {
        console.log(chalk.yellow("Your todo list is currently empty!"));
        return;
      }

      todos.forEach((todo) => {
        if (todo.done) {
          console.log(chalk.green(`${todo.id}. [x] ${todo.text} (done)`));
        } else {
          console.log(`${todo.id}. [ ] ${chalk.blue.bold(todo.text)} (${chalk.yellow('added: ' + todo.createdAt)})`);
        }
      });
      break;

    case "done":
      const idToMark = parseInt(target, 10);
      const todoToMark = todos.find(t => t.id === idToMark);
      
      if (!todoToMark) {
        console.log(chalk.red("❌ Error: Task ID not found."));
        return;
      }

      todoToMark.done = true;
      await saveTodos(todos);
      console.log(chalk.cyan(`✓ Task ${idToMark} marked as done.`));
      break;

    case "delete":
      const idToDelete = parseInt(target, 10);
      const initialLength = todos.length;
      
      const filteredTodos = todos.filter(todo => todo.id !== idToDelete);

      if (filteredTodos.length === initialLength) {
        console.log(chalk.red("❌ Error: Task ID not found."));
        return;
      }

      await saveTodos(filteredTodos);
      console.log(chalk.red(`✓ Task ${idToDelete} was deleted successfully.`));
      break;

    default:
      console.log(chalk.magenta("Usage instructions:"));
      console.log("  node todo.js add 'Task Name'");
      console.log("  node todo.js list");
      console.log("  node todo.js done [id]");
      console.log("  node todo.js delete [id]");
      break;
  }
}

main();
