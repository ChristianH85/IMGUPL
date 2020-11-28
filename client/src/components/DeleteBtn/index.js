import React from "react";


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
console.log(props)
  return (
    <button  className="delete-btn" {...props} role="button" tabIndex="0">
      X
    </button>
  );
}

export default DeleteBtn;
