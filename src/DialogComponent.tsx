import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type{ TransitionProps } from '@mui/material/transitions';

// List Component 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import GoogleIcon from '@mui/icons-material/Google';
import CodeIcon from '@mui/icons-material/Code';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = () => {
 const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Check Out Here
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>What I learnt: </DialogTitle>
        <DialogContent>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CodeIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Custom Hooks" secondary="To Do API Call" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <GoogleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Material UI" secondary="Implementing Google Design Language" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SettingsSystemDaydreamIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="AWS Cloud Deployment" secondary="Deploy to serverless cloud" />
              </ListItem>
            </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogComponent