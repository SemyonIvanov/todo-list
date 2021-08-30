import { Button, TextField } from "@material-ui/core";

const CreateTask = ({ setText, text, addTask }) => {
  return (
    <div className="add-task">
      <TextField onChange={(e) => setText(e.target.value)} value={text} />
      {/*<button className="add-task__button" onClick={addTask}>*/}
      {/*  Добавить*/}
      {/*</button>*/}
      <Button variant="contained" color="primary" onClick={addTask}>
        Добавить
      </Button>
    </div>
  );
};

export default CreateTask;
