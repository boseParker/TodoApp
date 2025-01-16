import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
function TodoApp() {
  const [task1, setTask1] = useState("");
  const [tasks, setTasks] = useState(() => {
    const store = localStorage.getItem("tasks");
    return store ? JSON.parse(store) : [];
  });
  const [isEditing, setIsEditing] = useState(null); // Track index of task being edited
  const [editText, setEditText] = useState(""); // Text for editing

  function handleTask(event) {
    setTask1(event.target.value);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onSubmit(event) {
    event.preventDefault();
    if (task1.trim()) {
      setTasks([...tasks, task1]);
      setTask1("");
    }
  }

  function startEditing(index) {
    setIsEditing(index);
    setEditText(tasks[index]); // Pre-fill the input with the current task value
  }

  function handleEditChange(event) {
    setEditText(event.target.value);
  }

  function saveEdit(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editText; // Update the specific task
    setTasks(updatedTasks);
    setIsEditing(null); // Exit edit mode
    setEditText(""); // Clear the edit text
  }

  function cancelEdit() {
    setIsEditing(null); // Exit edit mode without saving
    setEditText(""); // Clear the edit text
  }

  function remove(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1); // Remove task at the specified index
    setTasks(updatedTasks);
  }

  return (
    <div className="d-flex flex-column align-items-center" style={{ margin: "auto",marginBlockStart: "50px", width: "80vw", textAlign: "center",}}>
      <div>
        <h1>TODO LIST</h1>
      </div>
      <div className="d-flex gap-3" style={{ marginBlock: "50px", outline: "none" }}>
        <input type="text" name="tasks" value={task1} onChange={handleTask} style={{ width: "50vw", border: "2px solid" }}/>
        <button onClick={onSubmit} className="fs-5">Add</button>
      </div>

      <div className="" style={{ textAlign: "center" }}>
        <h2>Lists
          <hr />
        </h2>

        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <div className="d-flex  mb-5 gap-3 justify-content-between flex-wrap bg-light ps-4 pe-4 p-3" key={index}>
              {isEditing === index ? (
                <div className="d-flex flex-column flex-sm-row gap-2 align-items-center">
                  <input type="text" value={editText} onChange={handleEditChange} style={{ border: "1px solid", padding: "5px" }} />
                  <button className="bg-success rounded text-light p-1" onClick={() => saveEdit(index)}>Save</button>
                  <button className="bg-secondary rounded text-light p-1" onClick={cancelEdit}> Cancel</button>
                </div>) : (
                <div className=" d-flex flex-column flex-sm-row gap-5 justify-content-between" style={{width:"100%"}}>
                  <h4 className="text-start">{task}</h4>
                  <div className="d-flex gap-3">
                  <button className="bg-info rounded text-light p-2" onClick={() => startEditing(index)}>Edit</button>
                  <button className="bg-danger rounded text-light p-1" onClick={() => remove(index)}>Remove</button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TodoApp;
