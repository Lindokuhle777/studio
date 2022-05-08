import React, { useEffect, useState } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { tools } from "./tools";
import Tool from "./Tool";
// import * as React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const lindo = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "0px",
  bottom: "0px",
  left: "0px",
  right: "0px",
};

const lindo2 = {
  display: "flex",
  flexDirection: "row",
};

const toolStyle = {
  cursor: "move",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "3px",
  margin: "5px",
  textAlign: "center",
  zIndex: 2,
};

function JQ() {
  
  let activeElement = "";
  const [currVidURL, setCurrVidURL] = useState("");

  let canvasTools = [];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrVidURL(document.getElementById("filled-basic").value);
    setOpen(false);
  };

  useEffect(() => {
    $("#droppable").droppable({
      drop: (event, ui) => {
        let currTool = {
          _id: new Date().getTime(),
          position: ui.helper.position(),
        };
        activeElement = document.activeElement;
        // console.log(ui.helper)

        if (ui.helper.hasClass("title")) {
          currTool.type = "title";
        } else if (ui.helper.hasClass("video")) {
          currTool.type = "video";
          // currTool.url = currVidURL;
          // handleClickOpen();

        } else if (ui.helper.hasClass("image")) {
          currTool.type = "image";
        } else {
          return;
        }

        canvasTools.push(currTool);
        console.log(canvasTools)
        renderTools(canvasTools);
      },
    });

    const renderTools = (canvasTools) => {
      $("#droppable").empty();
      for (var t in canvasTools) {
        let currTool = canvasTools[t];

        if (currTool.type !== undefined) {
          let html = "";

          if (currTool.type === "title") {
            html = $("<div></div>")
              .css({
                position: "absolute",
                border: "0px solid red",
                padding: "10px",
                cursor: "move",
              })
              .append(
                $(`<textarea></textarea>`)
                  .css({
                    fontSize: "30px",
                    resize: "none",
                  })
                  .attr("id", currTool._id - 1000)
              )
              .resizable({
                stop: function (event, ui) {
                  const u = document.getElementById(currTool._id - 1000);
                  u.style.cssText = `resize:none;width:${ui.size.width}px;height:${ui.size.height}px;font-size:30px`;

                  console.log(u);
                  var id = ui.helper.attr("id");
                  for (var i in canvasTools) {
                    if (canvasTools[i]._id == id) {
                      canvasTools[i].width = ui.size.width;
                      canvasTools[i].height = ui.size.height;
                    }
                  }
                },
                handles: "se",
              })
              .attr("id", currTool._id);
            html.find("textarea").css({
              width: currTool.width,
              height: currTool.height,
            });
          } else if (currTool.type === "video") {
            html = $("<div><h2>YouTube Video</h2></div>")
              .css({
                position: "absolute",
                padding: "10px",
                cursor: "move",
                textAlign: "center",
                backGroundColor: "white"
              })
              .resizable({
                stop: function (event, ui) {
                  const u = document.getElementById(currTool._id - 1000);
                  // u.style.cssText = `width:${ui.size.width}px;height:${ui.size.height}px`;
                  console.log(u);
                  var id = ui.helper.attr("id");
                  for (var i in canvasTools) {
                    if (canvasTools[i]._id == id) {
                      canvasTools[i].width = ui.size.width;
                      canvasTools[i].height = ui.size.height;
                    }
                  }
                },
                handles: "se",
              })
              .attr("id", currTool._id);
              // html.find("div").css({
              //   width: currTool.width,
              //   height: currTool.height,

              // });
          } else if (currTool.type === "image") {
            html = $("<div></div>")
              .css({
                position: "absolute",
                border: "0px solid red",
                padding: "10px",
                cursor: "move",
              })
              .append($(`<textarea>${currTool.type}</textarea>`));
          }

          // const u = document.getElementById(html);

          // u.style.cssText = `resize:none;width:${currTool.width}px;height:${currTool.height}px;font-size:30px`;

          let temp = window.innerWidth * 0.2;
          let dom = $(html)
            .css({
              position: "absolute",
              top: currTool.position.top,
              left: currTool.position.left - temp,
              width: currTool.width,
              height: currTool.height,
            })
            .draggable({
              stop: (event, ui) => {
                // console.log(ui.position);
                var id = ui.helper.attr("id");
                let temp = window.innerWidth * 0.2;
                for (var i in canvasTools) {
                  if (canvasTools[i]._id == id) {
                    canvasTools[i].position.top = ui.position.top;
                    canvasTools[i].position.left = ui.position.left + temp;
                  }
                }
              },
            })
            .attr("id", currTool._id);

          $("#droppable").append(dom);
        }
      }
    };
  });

  return (
    <>
      <div style={{ ...lindo }}>
        <h2>Drag and Drop</h2>
        <div style={lindo2}>
          <div
            style={{
              ...lindo,
              width: "20%",
              backgroundColor: "gray",
              height: "100%",
              top: "60px",
            }}
            id="tools"
          >
            <h2>Tools</h2>
            {tools.map((tool, index) => {
              return <Tool key={index} tool={tool} />;
            })}
          </div>
          <div
            style={{
              ...lindo,
              width: "80%",
              backgroundColor: "#b5b3b4",
              height: "100%",
              top: "60px",
              left: "20%",
            }}
            id="droppable"
          >
            <h2>Canvas</h2>
          </div>
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <TextField id="filled-basic" label="Filled" variant="filled" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default JQ;
