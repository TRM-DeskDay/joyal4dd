import react, {useState} from 'react';
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

const App = ()=> {
  // Inject props into table component
  const [selected, setSelected] = useState('tickets');
  const types = ["tickets", "requests", "projects"];

  // Methods
  const handleFormat = (event, newService) => setSelected(newService);

  return (
    <Box sx={{m:2, p:4}}>
      <ToggleButtonGroup
        exclusive
        value={selected}
        onChange={handleFormat}
      >
        {types.map((element, index)=> {
          return(
            <ToggleButton 
              key = {index}
              value = {element}
            >
              {element}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
      <Divider light sx={{my:4}}/>
      <TableComponent/>
    </Box>
  )
  
}

export default App;
