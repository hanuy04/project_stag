import React from "react";
import Navbar from "./navbar";

const Topbar = (props) => {
  const type = props.type;

  return (
    <div className="p-4">
      {type == "navbar" && (
        <>
          <Navbar />
        </>
      )}
    </div>
  );
};

export default Topbar;
