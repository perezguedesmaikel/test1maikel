import React from "react";
import CardMui from "./CardMui";
export default function TodoElement({ item, setIsEdit, onDelete }) {
  return (
    <div className="d-flex flex-wrap justify-content-center container">
      <CardMui item={item} setIsEdit={setIsEdit} onDelete={onDelete} />
    </div>
  );
}
