import { useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";

const Task = ({ task, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(task.text);

  const handleChangeTask = (value) => {
    editTask({ text: value, _id: task._id });
    setIsEditing(false);
  };
  return (
    <ListItem role={undefined} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.isCheck}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": task._id }}
          onClick={() => editTask({ _id: task._id, isCheck: !task.isCheck })}
        />
      </ListItemIcon>
      {isEditing ? (
        <TextField
          type="text"
          className="text-task"
          value={textValue}
          onChange={(e) => {
            setTextValue(e.target.value);
          }}
          onBlur={() => handleChangeTask(textValue)}
          autoFocus={true}
        />
      ) : (
        <ListItemText
          id={task._id}
          primary={task.text}
          classes={{
            primary: "text-task",
          }}
        />
      )}

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
// <div className="task">
//   <input
//     type="checkbox"
//     checked={task.isCheck}
//     onChange={() => editTask({ _id: task._id, isCheck: !task.isCheck })}
//   />
//   {isEditing ? (
//     <input
//       type="text"
//       className="text-task"
//       value={textValue}
//       onChange={(e) => {
//         setTextValue(e.target.value);
//       }}
//       onBlur={() => handleChangeTask(textValue)}
//     />
//   ) : (
//     <p className="text-task">{task.text}</p>
//   )}
//   <button
//     className="delete-button"
//     onClick={() => {
//       deleteTask(task._id);
//     }}
//   >
//     <DeleteForeverIcon />
//   </button>
//   <button
//     className="edit-button"
//     onClick={() => {
//       setIsEditing(true);
//     }}
//   >
//     <EditIcon />
//   </button>
// </div>

export default Task;
