
import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleAddOrUpdate = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill both title and description");
      return;
    }

    if (editId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId
          ? { ...task, title: title.trim(), description: description.trim() }
          : task
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    if (editId === id) {
      setEditId(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task.id);
  };

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter((task) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(lowerSearch) ||
        task.description.toLowerCase().includes(lowerSearch)
      );
    })
    // .filter((task) => {
    //   if (filter === "pending") return !task.completed;
    //   if (filter === "completed") return task.completed;
    //   return true;
    // });

  return (
    <div className="container">
      <h1>React To-Do List</h1>

      <div className="form-section">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleAddOrUpdate}>
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id)}
                />
              </div>

              <div className="task-center">
                <h3 className={task.completed ? "completed" : ""}>
                  {task.title}
                </h3>
                <p className={task.completed ? "completed" : ""}>
                  {task.description}
                </p>
              </div>

              <div className="task-right">
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;