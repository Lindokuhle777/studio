import React, { useState } from "react";
import Tool from "./Tool";
import { useDrop } from "react-dnd";

const tempTools = [
  {
    id: 0,
    name: "first",
  },
  {
    id: 1,
    name: "second",
  },
  {
    id: 2,
    name: "third",
  },
  {
    id: 3,
    name: "fourth",
  },
];

function HomePage() {
  const [tools, setTools] = useState(tempTools);
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tool",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = tempTools.filter((tool) => id === tool.id);
    setBoard([...board,pictureList[0]]);
    // console.log([...board,pictureList[0]])
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          border: "5px solid black",
          width: "200px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tools.map((tool, index) => (
          <Tool key={index} name={tool.name} id={tool.id} />
        ))}
      </div>

      <div
        style={{ border: "5px solid red", width: "700px", height: "500px" }}
        ref={drop}
      >
        {board.map((tool, index) => (
          <Tool key={index} name={tool.name} id={tool.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
