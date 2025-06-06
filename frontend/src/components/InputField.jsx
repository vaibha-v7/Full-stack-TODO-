import React, { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const InputField = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await fetch(`${baseUrl}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
      });

      if (res.ok) {
        setTask("");         
        onTaskAdded();       
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  
  
  
  
  return (
    <div>
      <div className="input-group flex-nowrap flex ">

        <form onSubmit={handleSubmit} className='w-full flex justify-center items-center' action="">
          <div className='flex my-10'>

        <input value={task} onChange={(e)=>setTask(e.target.value)} type="text" className="form-control" placeholder="Add your task" aria-label="Username" aria-describedby="addon-wrapping"></input>
        <button className="btn btn-primary mx-2 fw-bolder" type="submit">Submit</button>
          </div>

        </form>


      </div>
    </div>
  )
}

export default InputField

