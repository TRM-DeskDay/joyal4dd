import React, { useState } from 'react';
import { TableComponent } from './components';
import './App.css';

// data Imports
import tickets from './constants/ticket-constants/tickets.json';
import requests from './constants/request-constants/requests.json';
import projects from './constants/project-constants/projects.json';


// Legacy Imports
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';

// Icons
import { AiOutlineStar, AiOutlineHolder } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';

const App = () => {

  // Inject props into table component
  const [selected, setSelected] = useState('tickets');
  const types = ["tickets", "requests", "projects"];

  // Actions
  const [actionsArray] = useState([
    {
      id: 1,
      name: 'Bookmark',
      icon: <AiOutlineStar />
    },
    {
      id: 2,
      name: 'Move',
      icon: <AiOutlineHolder />
    },
    {
      id: 3,
      name: 'Delete',
      icon: <RiDeleteBin6Line />
    },
  ])

  // Methods
  const handleFormat = (event, newService) => setSelected(newService);

  return (
    <Box sx={{ m: 2, p: 4 }}>
      <ToggleButtonGroup
        exclusive
        value={selected}
        onChange={handleFormat}
      >
        {types.map((element, index) => {
          return (
            <ToggleButton
              key={index}
              value={element}
            >
              {element}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
      <Divider light sx={{ my: 4 }} />
      {(() => {
        if (selected === 'tickets') {
          return (
            <TableComponent
              selected={selected}
              headers={tickets.tickets.headers}
              data={tickets.tickets.data}
              actions={actionsArray}
              haveSelectAll={true}
              haveAddButton={true}
              haveActionButton={true}
              haveSelect={true}
              haveBookmark={true}
            />
          );
        }
        if (selected === 'requests') {
          return (
            <TableComponent
              selected={selected}
              headers={requests.requests.headers}
              data={requests.requests.data}
              actions={actionsArray}
              haveSelectAll={true}
              haveAddButton={true}
              haveActionButton={true}
              haveSelect={true}
              haveBookmark={true}
            />
          )
        }
        if (selected === 'projects') {
          return (
            <TableComponent
              selected={selected}
              headers={projects.projects.headers}
              data={projects.projects.data}
              actions={actionsArray}
              haveSelectAll={true}
              haveAddButton={true}
              haveActionButton={true}
              haveSelect={true}
              haveBookmark={true}
            />
          )
        }
      })()}
    </Box>
  )

}

export default App;
