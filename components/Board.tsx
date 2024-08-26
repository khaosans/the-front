"use client";

import { useState } from "react";
import List from "./List";

export default function Board() {
  const [lists, setLists] = useState([
    { id: 1, title: "To Do", tasks: [] },
    { id: 2, title: "In Progress", tasks: [] },
    { id: 3, title: "Done", tasks: [] },
  ]);

  const addList = () => {
    const newList = {
      id: lists.length + 1,
      title: "New List",
      tasks: [],
    };
    setLists([...lists, newList]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
      <button
        onClick={addList}
        className="bg-btn-background hover:bg-btn-background-hover text-white font-bold py-2 px-4 rounded"
      >
        Add New List
      </button>
    </div>
  );
}