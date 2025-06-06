import React, { useState,useEffect } from 'react'
const baseUrl = import.meta.env.VITE_BACKEND_URL;


const List = ({tasks,fetchTasks}) => {


  const handleDelete = async (id) => {
    await fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE",
    });
    fetchTasks(); 
  };

  return (
    <div className=''>
          <ul className="list-group m-3" >

              {tasks.map((tasks,index)=>(
                <li key={tasks._id || index} className="list-group-item  fw-normal" style={{ backgroundColor: "#212529", color: "white" }}>
                  <div className='flex justify-between items-center'>



                  <div >
                  <input  className="form-check-input me-1" type="checkbox" value="" id="firstCheckboxStretched"></input>
                  <label className="form-check-label" >{tasks.task}</label>
                  </div>

                  <button onClick={()=>{handleDelete(tasks._id)}} className="btn btn-danger btn-sm btn-primary mx-2" type="submit">Delete</button>
                  </div>
                  
              </li>

              ))}


              
                      
          </ul>

          
        
    </div>
  )
}

export default List
