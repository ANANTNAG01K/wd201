// Expected output

// My Todo-list

// Overdue
// [ ] Submit assignment 2022-07-21

// Due Today
// [x] Pay rent
// [ ] Service vehicle

// Due Later
// [ ] File taxes 2022-07-23
// [ ] Pay electric bill 2022-07-23


const todoList = () => {
    let all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    // overdue function to check if the duedate is today or past.
    const overdue = () => {
      return all.filter((item) => item.dueDate < today);
    }
  
    // dueToday function to check if the duedate is today.
    const dueToday = () => {
      return all.filter((item) => item.dueDate === today);
    }
  
    //  dueLater function to check if the duedate is in the future.
    const dueLater = () => {
      return all.filter((item) => item.dueDate > today);
    }
  

    // display function for dislpaying state of the todo list.
    const toDisplayableList = (list) => {
      return list.map((item, index) => {
        const checkbox = item.completed ? '[x]' : '[ ]';
        if (item.dueDate === today) {
          return `${checkbox} ${item.title}`;
        } else {
          return `${checkbox} ${item.title} ${item.dueDate}`;
        }
      }).join('\n');
    }
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  const todos = todoList();
  
  const formattedDate = d => {
    return d.toISOString().split("T")[0]
  }
  
  var dateToday = new Date() // getting present date
  const today = formattedDate(dateToday) // today date
  const yesterday = formattedDate(  // yesterday date
    new Date(new Date().setDate(dateToday.getDate() - 1))
  )
  const tomorrow = formattedDate( // tomorrow date
    new Date(new Date().setDate(dateToday.getDate() + 1))
  )
  
  todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
  todos.add({ title: 'Pay rent', dueDate: today, completed: true })
  todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
  todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
  todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
  
  console.log("My Todo-list\n")
  
  console.log("Overdue")
  var overdues = todos.overdue()
  var formattedOverdues = todos.toDisplayableList(overdues)
  console.log(formattedOverdues)
  console.log("\n")
  
  console.log("Due Today")
  let itemsDueToday = todos.dueToday()
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
  console.log(formattedItemsDueToday)
  console.log("\n")
  
  console.log("Due Later")
  let itemsDueLater = todos.dueLater()
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
  console.log(formattedItemsDueLater)
  console.log("\n\n")