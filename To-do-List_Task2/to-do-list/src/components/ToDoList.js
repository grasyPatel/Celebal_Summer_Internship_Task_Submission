import React, {useState, state, useEffect}from 'react'

export const ToDoList = () => {
    const [task,setTask]=useState(()=>{
        const saveTask=localStorage.getItem("task");
        return saveTask?JSON.parse(saveTask):[];
    });
    const [newTask, setNewTask]=useState("");
    const [filter, setFilter] = useState("all");
    function onSubmit(){
        if(newTask.trim()===""){
            alert("Enter a Valid Task.")
            return;
        }
        const newtaskAdded={
            text:newTask,
            completed:false,
        }
        setTask([...task,newtaskAdded]);
        setNewTask("");
    }
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(task));
    }, [task]);

  return (
    <>
    <div className='to-list-container'>
        <h1>Things to do</h1>
        <input type='text' placeholder='Enter task to do' value={newTask} onChange={(event)=>setNewTask(event.target.value)}  />
        <button onClick={onSubmit}>Add</button>


    </div>

    </>
  )
}
