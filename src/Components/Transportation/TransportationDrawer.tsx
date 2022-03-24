import { SwipeUp } from '@mui/icons-material';
import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import { useState } from 'react';

import Tickets from './Tickets';

const drawerBleeding = 56;

const TransportationDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          zIndex: '2',
          bottom: '56px',
          width: '30px',
          color: '#F1DAC4',
        }}
        disableRipple={true}
      >
        <SwipeUp />
      </IconButton>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        disableDiscovery={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#474973',
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              p: 2,

              textAlign: 'center',
            }}
          >
            Your Tickets
          </Typography>
        </Box>
        <Box
          className="transportation-box" // Hiding scrollbar
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Tickets />
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default TransportationDrawer;
