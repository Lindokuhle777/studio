import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

const toolStyle = {
  cursor: "move",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "3px",
  margin: "5px",
  textAlign: "center",
  zIndex: 2,
};

function Tool({ tool }) {
  useEffect(() => {
    $(`#${tool.draggable}`).draggable({
      helper: "clone",
    });
  }, [$]);

  return (
    <h3 style={toolStyle} id={tool.draggable} className={tool.className}>
      {tool.name}
    </h3>
  );
}

export default Tool;
