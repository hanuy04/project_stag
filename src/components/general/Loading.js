import { CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loading = ({message}) => {
  return (
    <div>
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h6" color="text.secondary" margin={"auto"}>
        {message}
      </Typography>
    </div>
  );
};

export default Loading;
