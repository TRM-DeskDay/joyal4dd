import React, { useState } from 'react';
import './CustomDrawer.css';

// Material UI Drawer
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import { MdOutlineAdd } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';


const CustomDrawer = (props) => {
    const [drawerState, setDrawerState] = useState(false);

    const toggleDrawer = (drawer) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState(drawer);
    };

    return (
        <div>
            <div className='addheaderbtn' onClick={toggleDrawer(true)}>
                <MdOutlineAdd />
            </div>
            <Drawer
                anchor={'right'}
                open={drawerState}
                onClose={toggleDrawer(false)}
                tabIndex={2}
            >
                <Box
                    sx={{ width: 'right' === 'top' || 'right' === 'bottom' ? 'auto' : 250 }}
                    role="presentation"
                    onClick={toggleDrawer(true)}
                    onKeyDown={toggleDrawer(true)}
                >
                    <div className="headingclose">
                        <h2>{props.title}</h2>
                        <div className="closeicon" onClick={toggleDrawer(false)}>
                            <GrClose />
                        </div>
                    </div>
                    <Divider />
                    {props.children}
                </Box>
            </Drawer>
        </div>
    )
}

export default CustomDrawer