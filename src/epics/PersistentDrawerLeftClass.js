import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Container from '@material-ui/core/Container';

// NavBar assets
import logoImage from "../assets/ulma/logo.png"
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// Content assets
import dish1Image from "../assets/ulma/dish1.png"
import dish2Image from "../assets/ulma/dish2.png"
import dish3Image from "../assets/ulma/dish3.png"

// Header content
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TimerIcon from '@material-ui/icons/Timer';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

// Arrow icons
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const drawerWidth = "50%";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fafafa',
    color: 'black',
    boxShadow : '0px 0px 0px 0px white'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }


  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={(e) => this.handleDrawerOpen()}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <img src={logoImage} style={{ width: "50%"}}></img> 
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: '1'}}>
              <NotificationsIcon />
              <SearchIcon />
              <ShoppingCartIcon />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          // variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={(e) => this.handleDrawerClose()}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        
          {/* <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          > */}
          <Container maxWidth="xs">

            {/* Leave some space here for the header*/}
            <div className={classes.drawerHeader}></div>

            {/* Leave some space here for the header*/}

            <div style={{ display: 'flex', padding: '10px 0 10px 0', marginTop: '20px', width: '100%'}}>
              <ArrowLeftIcon fontSize="large"  style={{ alignSelf: 'center'}} />
              
              <div style={{flexGrow: 1, paddingLeft: "20%" }}>
                <div style={{ width: "100%", height: '20%', display: 'flex'}}>
                  <MonetizationOnIcon />
                  <div>389</div>
                </div>
                <div style={{ width: "100%", height: '20%', display: 'flex', marginTop: '20px'}}>
                  <TimerIcon />
                  <div>35 min</div>
                  <FormatListBulletedIcon style={{marginLeft: "10px"}}/>
                  <div>17 steps</div>
                </div>
              </div>
              <ArrowRightIcon fontSize="large" style={{ alignSelf: 'center'}}/>

            </div>


            <div style={{ display: 'flex', border: '1px solid black', borderRadius: '10px', padding: '20px 0 20px 0', marginTop: '20px'}}>
              <ArrowLeftIcon fontSize="large"  style={{ alignSelf: 'center'}} />
              <div style={{ position: 'relative', height: "110px"}}>
                <img src={dish1Image} style={{ top: 0, left: 0, height: "100%", width: "150px"}}></img> 
                <div style={{ position:'absolute', top: 0, left: 0}}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </div> 
              </div>
              <div style={{ flexGrow: 1, paddingLeft: "20px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: "100%", height: '20%', display: 'flex'}}>
                  <MonetizationOnIcon />
                  <div>389</div>
                  <TimerIcon />
                  <div>35</div>
                  <FormatListBulletedIcon/>
                  <div>17</div>
                </div>
                <div style={{ width: "100%", height: '20%', display: 'flex', marginTop: '20px', justifyContent: 'center'}}>
                  <AddCircleIcon />
                  <div>2</div>
                  <RemoveCircleIcon />
                </div>
              </div>
              <ArrowRightIcon fontSize="large" style={{ alignSelf: 'center'}}/>
            </div>

            <div style={{ display: 'flex',  border: '1px solid black', borderRadius: '10px', padding: '20px 0 20px 0', marginTop: '20px'}}>
              <ArrowLeftIcon fontSize="large"  style={{ alignSelf: 'center'}} />
              <div style={{ position: 'relative', height: "110px"}}>
                <img src={dish2Image} style={{ top: 0, left: 0, height: "100%", width: "150px"}}></img> 
                <div style={{ position:'absolute', top: 0, left: 0}}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarBorderIcon />
                </div> 
              </div>
              <div style={{ flexGrow: 1, paddingLeft: "20px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: "100%", height: '20%', display: 'flex'}}>
                  <MonetizationOnIcon />
                  <div>389</div>
                  <TimerIcon />
                  <div>35</div>
                  <FormatListBulletedIcon/>
                  <div>17</div>
                </div>
                <div style={{ width: "100%", height: '20%', display: 'flex', marginTop: '20px', justifyContent: 'center'}}>
                  <AddCircleIcon />
                  <div>35</div>
                  <RemoveCircleIcon />
                </div>
              </div>
              <ArrowRightIcon fontSize="large" style={{ alignSelf: 'center'}}/>
            </div>

            <div style={{ display: 'flex', border: '1px solid black', borderRadius: '10px', padding: '20px 0 20px 0', marginTop: '20px'}}>
              <ArrowLeftIcon fontSize="large"  style={{ alignSelf: 'center'}} />
              <div style={{ position: 'relative', height: "110px"}}>
                <img src={dish3Image} style={{ top: 0, left: 0, height: "100%", width: "150px"}}></img> 
                <div style={{ position:'absolute', top: 0, left: 0}}>
                  <StarIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                </div> 
              </div>
              <div style={{ flexGrow: 1, paddingLeft: "20px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: "100%", height: '20%', display: 'flex'}}>
                  <MonetizationOnIcon />
                  <div>22</div>
                  <TimerIcon />
                  <div>21</div>
                  <FormatListBulletedIcon/>
                  <div>2</div>
                </div>
                <div style={{ width: "100%", height: '20%', display: 'flex', marginTop: '20px', justifyContent: 'center'}}>
                  <AddCircleIcon />
                  <div>4</div>
                  <RemoveCircleIcon />
                </div>
              </div>
              <ArrowRightIcon fontSize="large" style={{ alignSelf: 'center'}}/>
            </div>

            </Container>
          {/* </main> */}

  
      </div>
    );

  }

}

//export default withRouter(withStyles(styles)(Landing));
export default (withStyles(styles)(Landing));