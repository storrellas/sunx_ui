import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RowingIcon from '@material-ui/icons/Rowing';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import WCIcon from '@material-ui/icons/Wc';
import ShareIcon from '@material-ui/icons/Share';
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';


// Project import
import TryASportDialog from "./common/TryASportDialog"
import settingsImage from "../assets/img/tryasport/img_settings.png"

// Redux
import { store, renderConfetti } from "../redux";

const styles = theme => ({
});

class SettingsItem extends React.Component {
  constructor(props) {super(props);}

  render() {
    const { classes, text, onClick } = this.props;
    return (
      <Box mt={2} >
        <Button variant="contained" className={classes.button} style={{ width: "100%"}}>
          {this.props.children}          
          <div style={{flexGrow: 1}}>{text}</div>              
        </Button>
      </Box>
    )
  }
}
const SettingsItemStyled = withStyles(styles)(SettingsItem)

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000
    }
  }

  handleClose() {
    //onClose(selectedValue);
  }

  handleListItemClick(value) {
    onClose(value);
  }

  handleKeyPress(){
    console.log('The link was closed')  
    if(event.key === 'Enter'){
      console.log('enter press here! ')

      // Launch confetti
      store.dispatch( renderConfetti(true) )
      setTimeout(() => { store.dispatch( renderConfetti(false) ) }, 3000);
    }  
  };

  

  render() {
    const { classes, onClose, user, open, translations } = this.props;
    const userJson = (user === undefined)?"":JSON.parse(user);
    //console.log(userJson)
    return (
      <TryASportDialog image={settingsImage} open={open} onClose={onClose}>

          <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            {translations.menu_title}
          </DialogTitle>

          <Box mt={2} ml={3} mr={3} borderRadius={16}>
            <SettingsItemStyled text={translations.menu_login}>
              <VpnKeyIcon style={{backgroundColor: '#117A65'}}/>
            </SettingsItemStyled>
            <SettingsItemStyled text={translations.menu_sports}>
              <RowingIcon style={{backgroundColor: '#117A65'}}/>
            </SettingsItemStyled>
            <SettingsItemStyled text={translations.menu_friends}>
              <WCIcon  style={{backgroundColor: '#117A65'}}/>
            </SettingsItemStyled>
            <SettingsItemStyled text={translations.menu_share}>
              <ShareIcon  style={{backgroundColor: '#117A65'}}/>
            </SettingsItemStyled>
            <SettingsItemStyled text={translations.menu_profile}>
              <PersonIcon  style={{backgroundColor: '#117A65'}}/>
            </SettingsItemStyled>
            
            <h3>User Profile</h3>
            <div>Username:{userJson.username}</div>
            <div>Email:{userJson.email}</div>
            <div>Gender:{userJson.gender}</div>
            <div>Location:{userJson.work_location}</div>
            <div>Birthyear:{userJson.birthday_year}</div>

            <div>{user}</div>

          </Box>
      </ TryASportDialog>
    );
  }
}

/*
FriendDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};
/**/

export default withStyles(styles)(SettingsDialog);

