import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Collapse,
  IconButton,
  ListItemText,
} from "@mui/material";
import CollapseCard from "../general/CollapseCard";
import { Color } from "@/styles/Color";

export default function GuideSection({ title, steps, expanded, setExpanded }) {

  return (
    <CollapseCard title={title} expanded={expanded} setExpanded={setExpanded}>
      {steps.map((step, index) => (
        <ListItem key={index}>
          <Box className="flex items-start">
            <Avatar className="bg-blue mr-4" style={{ backgroundColor: Color.blue }}>{index + 1}</Avatar>
            <ListItemText primary={step} />
          </Box>
        </ListItem>
      ))}
    </CollapseCard>
  );
}
