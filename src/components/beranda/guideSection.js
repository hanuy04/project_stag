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
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import CollapseCard from "../general/CollapseCard";

export default function GuideSection({ title, steps }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CollapseCard title="Tata Cara Peminjaman Ruangan">
      {steps.map((step, index) => (
        <ListItem key={index}>
          <Box className="flex items-start">
            <Avatar className="bg-blue mr-4">{index + 1}</Avatar>
            <ListItemText primary={step} />
          </Box>
        </ListItem>
      ))}
    </CollapseCard>
  );
}
