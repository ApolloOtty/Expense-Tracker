import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import './sidebar.css';
import CalculateIcon from '@mui/icons-material/Calculate';
import {BiCategory, BiDialpadAlt, BiMoney, BiCalculator, BiLogOutCircle, BiHistory} from "react-icons/bi";
import { red } from '@mui/material/colors';
import { BorderColor } from '@mui/icons-material';
import { useRef, useState, useContext} from 'react';
import { FiSettings } from "react-icons/fi";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function MiniDrawer() {
  const styles = theme => ({
    listItemText:{
      fontSize:'0.7em',//Insert your required size
    }
  });
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const[success, setSuccess] = useState(false);

  const handleClick = () => {
    localStorage.clear();
    setSuccess(true);

  };

  const itemsList = [
    {
        name:"Dashboard",
        path:"/dashboard",
        icon:<BiDialpadAlt size={37}/>
    },
    {
        name:"Transcations",
        path:"/transactions",
        icon:<BiMoney size={37}/>
    },
    {
      name:"Calculator",
      path:"/calculator",
      icon:<BiCalculator size={37}/>
    },
    {
      name:"Settings",
      path:"/settings",
      icon:<FiSettings size={37}/>
    }
  ]

  return (
    <>
    {success ? (
                <section>
                    <meta http-equiv="refresh" content="0 url=/" />
                </section>
            ) : (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{
    sx: {
      backgroundColor: "#1C2530"
    }
  }}
  >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {itemsList.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton to={item.path}
                sx={{
                  minHeight: 100,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#868484",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText  primaryTypographyProps={{fontSize: '25px', fontWeight:'500', color:'grey', fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}  primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
  
          ))}
          <button className='logout' onClick={handleClick}><ListItemButton 
          sx={{
            color:'lightgrey',
            justifyContent: open ? 'initial' : 'center',
            px: 2,
          }}>
            <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color:"#868484",
                  }}><BiLogOutCircle size={30}/></ListItemIcon><ListItemText  primaryTypographyProps={{fontSize: '25px', fontWeight:'500', color:'grey', fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}  primary="Log out" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton></button>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2.5 }}>
      </Box>
    </Box>
            )}
    </>
  );
  
}


export default MiniDrawer;