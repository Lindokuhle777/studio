import React,{ useEffect} from 'react';
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";


function TextArea({id}) {

    useEffect(() => {
        $( `#${id}` ).resizable({
            handles: "se"
          });
    },[])

  return (
    <div style={{position : 'absolute' ,
    border: '7px solid red',
    padding: '10px',
    cursor:'move'}}><textarea id={id} value="sabelo"/></div>
  )
}

export default TextArea