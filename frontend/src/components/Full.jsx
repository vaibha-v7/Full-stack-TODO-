
import InputField from './InputField'
import List from './List'
import { useState, useEffect } from 'react'
import io from 'socket.io-client';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const socket = io(baseUrl);

const Full = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(baseUrl);
      const json = await res.json();
      setTasks(json.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });


    fetchTasks();
    socket.on("updateTasks", fetchTasks);

    // Cleanup
    return () => {
      socket.off("updateTasks");
    };
  }, []);
  
  
  return (
    <div>
         {/* <p>{data}</p> */}
      <div style={{ backgroundColor: '#212121' }} className='flex flex-col justify-center items-center h-screen bg-gray-100 border-purple'>
        
        <div style={{ backgroundColor: '#303030' }}  className='flex flex-col justify-center items-center py-8 px-4 sm:px-2 md:px-4  rounded-4xl'>

          <h1 className='underline fw-semibold'>TODO APP</h1>
          <InputField onTaskAdded={fetchTasks} />
          <List tasks={tasks} fetchTasks={fetchTasks} />
        </div>

      </div>
        
    </div>
  )
}

export default Full
