import React from "react";
import Navbar from "./navbar";

const Topbar = (props) => {
  const type = props.type;

  return (
    <div className="">
      {type == "navbar" && (
        <>
          <Navbar />
        </>
      )}
      {

      }
      <div>halo</div>
    </div>
  );
};

export default Topbar;
