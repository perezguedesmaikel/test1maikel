import { useState } from "react";
import TodoElement from "./TodoElement";
import FormEdit from "./FormEdit";

export default function Todo({ item, setTodos, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      {isEdit ? (
        <div>
          <TodoElement item={item} setIsEdit={setIsEdit} onDelete={onDelete} />
          <FormEdit
            setIsEdit={setIsEdit}
            item={item}
            setTodos={setTodos}
            onUpdate={onUpdate}
          />
        </div>
      ) : (
        <TodoElement item={item} setIsEdit={setIsEdit} onDelete={onDelete} />
      )}
    </div>
  );
}
