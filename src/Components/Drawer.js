import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ConcernsPanel from './ConcernsPanel'; // Adjust the import path as necessary

// This component handles the state of the Drawer and passes props down to the ConcernsPanel
const DrawerContainer = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // This could be triggered by selecting a body part elsewhere in your application
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <button onClick={handleOpenDrawer}>Pick Body Part</button>
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {/* Here we spread all the props into the ConcernsPanel component */}
        <ConcernsPanel {...props} goBack={toggleDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default DrawerContainer;
