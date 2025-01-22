import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CollapseCard = ({ title, children, expanded, setExpanded }) => {
  

  return (
    <Box className="mb-4 shadow-lg rounded-xl bg-white">
      <Box
        className={`flex justify-between items-center p-4 bg-white cursor-pointer bg-blue " +
         ${expanded ? "rounded-t-xl" : "rounded-xl"}`}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6" color="white">
          {title}
        </Typography>
        <IconButton>
          <ExpandMore
            sx={{ color: "white" }}
            className={`transform transition-transform ${expanded ? "rotate-180" : ""
              }`}
          />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <List>
          {children}
        </List>
      </Collapse>
    </Box>
  );
};

export default CollapseCard;
