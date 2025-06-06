const express = require('express');
const app = express();
const path=require('path');
const mongoose = require('mongoose');
var methodOverride = require('method-override')
const cors = require('cors');
const http = require('http');
const {Server}=require('socket.io');
require('dotenv').config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  }
});
app.set('io', io);

app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))


async function main(){
    await mongoose.connect(process.env.MONGO_URI)
}


main().then((res)=>{
    console.log('Connected to MongoDB');
    
})
.catch((err)=>{
    console.log(err)
})

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    }
})


const Todo = mongoose.model("Todo",todoSchema);

//  Socket.io listener
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// const addTask= async ()=>{
//     await Todo.insertOne({
//         task:"bath nhiiiiiii karna hai"
//     })
//     .then((res)=>{
//         console.log(res);
        
//     })
//     .catch((err)=>{
//         console.log(err);
        
//     })
// }




app.get("/", async (req,res)=>{
    let tasks= await Todo.find()
    

    
    res.json({tasks})
})

app.post("/add", async (req,res)=>{
    let new_task= req.body.task;
    console.log(new_task);
    
    await Todo.insertOne({
            task:new_task
    }).then((res)=>{
        console.log(res);
        const io = req.app.get('io');
        io.emit('updateTasks');
        
    })
    .catch((err)=>{
        console.log(err);
        
    })

    res.status(200).json({message:"Task added successfully"});


})

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Todo.findByIdAndDelete(id);
    console.log("Deleted:", result);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    const io = req.app.get('io');
    io.emit('updateTasks');

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// app.listen(3000,()=>{
//     console.log('server is running');
    
// })



server.listen(process.env.PORT || 3000);









