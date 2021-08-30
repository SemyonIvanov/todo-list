import Task from "./Task";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tasks = ({ tasks, editTask, deleteTask }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {tasks.map((item) => (
        <Task
          task={item}
          editTask={editTask}
          deleteTask={deleteTask}
          key={item._id}
        />
      ))}
    </List>
  );
};

export default Tasks;
