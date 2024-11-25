import { useState } from 'react';
import { Box, Typography, List, ListItem, Avatar, Collapse, IconButton, ListItemText } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export default function GuideSection({ title, steps }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Box className="mb-4">
      <Box 
        className="flex justify-between items-center p-4 bg-white rounded cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton>
          <ExpandMoreIcon 
            className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </IconButton>
      </Box>
      
      <Collapse in={expanded}>
        <List>
          {steps.map((step, index) => (
            <ListItem key={index}>
              <Box className="flex items-start">
                <Avatar className="bg-blue-600 mr-4">{index + 1}</Avatar>
                <ListItemText primary={step} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
}