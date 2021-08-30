import "./App.scss";
import Tasks from "./components/Tasks";
import CreateTask from "./components/CreateTask";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/allTasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = async () => {
    await axios
      .post("http://localhost:8000/createTask", {
        text,
        isCheck: false,
      })
      .then((res) => {
        setTasks(res.data);
        setText("");
      });
  };

  const editTask = async (task) => {
    await axios
      .patch("http://localhost:8000/updateTask", {
        ...task,
      })
      .then((res) => {
        setTasks(res.data);
      });
  };

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:8000/deleteTask?id=${id}`)
      .then((res) => {
        setTasks(res.data);
      });
  };

  return (
    <div className="main-container">
      <Typography variant="h2" component="h2" gutterBottom>
        TODO LIST
      </Typography>
      <CreateTask addTask={addTask} text={text} setText={setText} />
      <Tasks tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
