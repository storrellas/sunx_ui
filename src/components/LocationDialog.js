import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


// Project import
import TryASportDialog from "./common/TryASportDialog"
import locationImage from "../assets/img/tryasport/img_map_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

// Redux
import { userProfile } from "../redux";
import { connect } from "react-redux";


const styles = theme => ({
});

function mapDispatchToProps(dispatch) {
  return {
    userProfile: (data) => dispatch(userProfile(data)),
  };
}

class LocationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      location: ''
    }
  }

  handleKeyPress(){
    if(event.key === 'Enter'){
      this.handleSubmit()

      // // Launch confetti
      // store.dispatch( renderConfetti(true) )
      // setTimeout(() => { store.dispatch( renderConfetti(false) ) }, 3000);
    }  
  };
  handleChange(e){
    this.setState({ location: e.target.value })
  }

  async handleSubmit(){
    // console.log("Contacting Backend", this.state.location)

    const url = `${config.BASE_API_URL}/api/user/${this.props.userId}/`
    const body = { location: this.state.location }
    let response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },
      method: 'put',
      body: JSON.stringify(body)
    })
    let data = await response.json()

    // Notify watchers
    this.props.userProfile(data)
    this.props.onClose()
  }

  render() {
    const { classes, onClose, open, translations } = this.props;
    return (
      <TryASportDialog image={locationImage} open={open} onClose={onClose}>

          <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            {translations.location_prompt_title}
          </DialogTitle>

          <Box mt={2} ml={3} mr={3} borderRadius={16}>
            <TextField
              id="outlined-location-input"
              label={translations.location_prompt_placeholder}
              className={classes.textField}
              type="text"
              name="code"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              style={{width: "100%"}}
              onChange={(e) => this.handleChange(e)}
              onKeyPress={(e) => this.handleKeyPress(e)}
              value={this.state.location}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={(e) => this.handleSubmit(e)}
                    >
                      <PlayArrowIcon style={{color:'green'}}></PlayArrowIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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

//export default withStyles(styles)(LocationDialog);
export default connect(null, mapDispatchToProps)(withStyles(styles)(LocationDialog));

